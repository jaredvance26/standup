import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { TeamMemberService } from "../services/teamMember";
import {
  authenticateToken,
  AuthenticatedRequest,
  requireOwnUserIdFromBody,
  requireOwnUserIdFromParams,
} from "../middleware/auth";

const router = express.Router();
const teamMemberService = new TeamMemberService();
const maxPhotoSizeInBytes = 2 * 1024 * 1024;
const supportedImageMimeTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
]);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const validatePhotoDataUrl = (photoDataUrl: string): void => {
  const matches = photoDataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid image data format");
  }

  const mimeType = matches[1].toLowerCase();
  const base64Content = matches[2];

  if (!supportedImageMimeTypes.has(mimeType)) {
    throw new Error("Only png, jpg, webp, and gif images are supported");
  }

  const photoBuffer = Buffer.from(base64Content, "base64");
  if (photoBuffer.length > maxPhotoSizeInBytes) {
    throw new Error("Image size must be 2MB or less");
  }
};

const uploadPhotoToCloudinary = async (
  photoDataUrl: string,
  userId: string
): Promise<{ photoUrl: string; photoPublicId: string }> => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary credentials are missing");
  }

  validatePhotoDataUrl(photoDataUrl);

  const result = await cloudinary.uploader.upload(photoDataUrl, {
    folder: `standup/team-members/${userId}`,
    resource_type: "image",
  });

  return {
    photoUrl: result.secure_url,
    photoPublicId: result.public_id,
  };
};

const deleteCloudinaryPhoto = async (
  photoPublicId?: string | null
): Promise<void> => {
  if (!photoPublicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(photoPublicId, { resource_type: "image" });
  } catch (error) {
    console.error("Failed to delete Cloudinary photo:", error);
  }
};

// Get all team members for a specific user
router.get(
  "/user/:userId/team-members",
  authenticateToken,
  requireOwnUserIdFromParams,
  async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required as a path parameter" });
    }

    const teamMembers = await teamMemberService.getAllTeamMembers(userId);
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// Create a new team member
router.post("/team-member", authenticateToken, requireOwnUserIdFromBody, async (req, res) => {
  let uploadedPhotoPublicId: string | null = null;

  try {
    const { firstName, lastName, position, jiraId, userId, photoDataUrl } =
      req.body;

    if (!firstName || !lastName || !userId) {
      return res.status(400).json({
        error:
          "Missing required fields. Please provide firstName, lastName, and userId",
      });
    }

    let photoUrl: string | null = null;
    let photoPublicId: string | null = null;

    if (typeof photoDataUrl === "string" && photoDataUrl.trim()) {
      const uploadedPhoto = await uploadPhotoToCloudinary(photoDataUrl, userId);
      photoUrl = uploadedPhoto.photoUrl;
      photoPublicId = uploadedPhoto.photoPublicId;
      uploadedPhotoPublicId = uploadedPhoto.photoPublicId;
    }

    const newTeamMember = await teamMemberService.createTeamMember({
      firstName,
      lastName,
      position,
      jiraId,
      photoUrl,
      photoPublicId,
      userId,
    });

    res.status(201).json(newTeamMember);
  } catch (error: any) {
    if (uploadedPhotoPublicId) {
      await deleteCloudinaryPhoto(uploadedPhotoPublicId);
    }

    if (
      typeof error?.message === "string" &&
      (error.message.includes("image") ||
        error.message.includes("Cloudinary") ||
        error.message.includes("credentials"))
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to create team member" });
  }
});

// Update a team member
router.put("/team-member/:id", authenticateToken, async (req: AuthenticatedRequest, res) => {
  let uploadedNewPhotoPublicId: string | null = null;

  try {
    const updateData: any = {};
    const {
      firstName,
      lastName,
      position,
      jiraId,
      userId,
      photoDataUrl,
      photoRemoved,
    } = req.body;

    const existingTeamMember = await teamMemberService.getTeamMemberById(
      req.params.id
    );

    if (!existingTeamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    if (!req.user?.userId || req.user.userId !== existingTeamMember.userId) {
      return res.status(403).json({ error: "Access denied for team member" });
    }

    if (typeof userId !== "undefined" && userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied for requested user" });
    }

    const photoFolderUserId = userId || existingTeamMember.userId;

    if (typeof firstName !== "undefined") updateData.firstName = firstName;
    if (typeof lastName !== "undefined") updateData.lastName = lastName;
    if (typeof position !== "undefined") updateData.position = position;
    if (typeof jiraId !== "undefined") updateData.jiraId = jiraId;
    if (typeof userId !== "undefined") updateData.userId = userId;

    if (photoRemoved) {
      updateData.photoUrl = null;
      updateData.photoPublicId = null;
    }

    if (typeof photoDataUrl === "string" && photoDataUrl.trim()) {
      const uploadedPhoto = await uploadPhotoToCloudinary(
        photoDataUrl,
        photoFolderUserId
      );
      updateData.photoUrl = uploadedPhoto.photoUrl;
      updateData.photoPublicId = uploadedPhoto.photoPublicId;
      uploadedNewPhotoPublicId = uploadedPhoto.photoPublicId;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const updatedTeamMember = await teamMemberService.updateTeamMember(
      req.params.id,
      updateData
    );

    if (!updatedTeamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    const oldPhotoPublicId = existingTeamMember.photoPublicId;
    const shouldDeleteOldPhoto =
      oldPhotoPublicId &&
      (photoRemoved ||
        (typeof photoDataUrl === "string" && photoDataUrl.trim().length > 0));

    if (shouldDeleteOldPhoto) {
      await deleteCloudinaryPhoto(oldPhotoPublicId);
    }

    res.json(updatedTeamMember);
  } catch (error: any) {
    if (uploadedNewPhotoPublicId) {
      await deleteCloudinaryPhoto(uploadedNewPhotoPublicId);
    }

    if (
      typeof error?.message === "string" &&
      (error.message.includes("image") ||
        error.message.includes("Cloudinary") ||
        error.message.includes("credentials"))
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to update team member" });
  }
});

// Delete a team member
router.delete("/team-member/:id", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const existingTeamMember = await teamMemberService.getTeamMemberById(
      req.params.id
    );

    if (!existingTeamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    if (!req.user?.userId || req.user.userId !== existingTeamMember.userId) {
      return res.status(403).json({ error: "Access denied for team member" });
    }

    const deletedTeamMember = await teamMemberService.deleteTeamMember(
      req.params.id
    );

    if (!deletedTeamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    await deleteCloudinaryPhoto(existingTeamMember?.photoPublicId);

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export const teamMemberRouter = router;
