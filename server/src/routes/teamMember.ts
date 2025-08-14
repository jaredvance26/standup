import express from "express";
import { TeamMemberService } from "../services/teamMember";

const router = express.Router();
const teamMemberService = new TeamMemberService();

// Get all team members
router.get("/", async (req, res) => {
  try {
    const teamMembers = await teamMemberService.getAllTeamMembers();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// Create a new team member
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, position, jiraId } = req.body;

    if (!firstName || !lastName || !position || !jiraId) {
      return res.status(400).json({
        error:
          "Missing required fields. Please provide firstName, lastName, position, and jiraId",
      });
    }

    const newTeamMember = await teamMemberService.createTeamMember({
      firstName,
      lastName,
      position,
      jiraId,
    });

    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
});

// Update a team member
router.put("/:id", async (req, res) => {
  try {
    const updateData: any = {};
    const { firstName, lastName, position, jiraId } = req.body;

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (position) updateData.position = position;
    if (jiraId) updateData.jiraId = jiraId;

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
router.delete("/:id", async (req, res) => {
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
