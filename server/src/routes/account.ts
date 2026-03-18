import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import accountService from "../services/account";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();
const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error("JWT SECRET environment variable is not set");
}

// Update user email
router.put("/email", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { userId, newEmail } = req.body;

  // Validate request body
  if (!userId || !newEmail) {
    return res
      .status(400)
      .json({ error: "User ID and new email are required" });
  }

  try {
    // Verify the user is updating their own account or is an admin
    if (req.user?.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own account" });
    }

    const updatedUser = await accountService.updateEmail(userId, newEmail);

    // Update token with new email
    const token = jwt.sign(
      { userId: updatedUser.id, email: updatedUser.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Email updated successfully",
      token,
      user: updatedUser,
    });
  } catch (error: any) {
    if (error.message.includes("already in use")) {
      return res.status(409).json({ error: error.message });
    }
    
    if (error.message.includes("same as your current email")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }

    console.error("Email update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user password
router.put("/password", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Validate request body
  if (!userId || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({
        error: "User ID, current password, and new password are required",
      });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "New password must be at least 6 characters long" });
  }

  try {
    // Verify the user is updating their own account
    if (req.user?.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own account" });
    }

    const result = await accountService.updatePassword(
      userId,
      currentPassword,
      newPassword
    );

    res.json(result);
  } catch (error: any) {
    if (error.message.includes("Current password is incorrect")) {
      return res.status(401).json({ error: error.message });
    }
    
    if (error.message.includes("different from your current password")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }

    console.error("Password update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const accountRouter = router;
