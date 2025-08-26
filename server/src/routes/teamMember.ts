import express from "express";
import { TeamMemberService } from "../services/teamMember";

const router = express.Router();
const teamMemberService = new TeamMemberService();

// Get all team members for a specific user
router.get("/user/:userId/team-members", async (req, res) => {
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
router.post("/team-member", async (req, res) => {
  try {
    const { firstName, lastName, position, jiraId, userId } = req.body;

    if (!firstName || !lastName || !userId) {
      return res.status(400).json({
        error:
          "Missing required fields. Please provide firstName, lastName, and userId",
      });
    }

    const newTeamMember = await teamMemberService.createTeamMember({
      firstName,
      lastName,
      position,
      jiraId,
      userId,
    });

    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
});

// Update a team member
router.put("/team-member/:id", async (req, res) => {
  try {
    const updateData: any = {};
    const { firstName, lastName, position, jiraId, userId } = req.body;

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (position) updateData.position = position;
    if (jiraId) updateData.jiraId = jiraId;
    if (userId) updateData.userId = userId;

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

    res.json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

// Delete a team member
router.delete("/team-member/:id", async (req, res) => {
  try {
    const deletedTeamMember = await teamMemberService.deleteTeamMember(
      req.params.id
    );

    if (!deletedTeamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export const teamMemberRouter = router;
