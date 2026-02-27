import express from "express";
import StandupService from "../services/standup";

const router = express.Router();

router.get("/user/:userId/standups", async (req, res) => {
  const { userId } = req.params;

  try {
    const standups = await StandupService.getStandupsByUserId(userId);
    res.json(standups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch standup history", details: error });
  }
});

router.post("/user/:userId/standups", async (req, res) => {
  const { userId } = req.params;
  const { teamMembers, showStatusField } = req.body;

  if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
    return res.status(400).json({ error: "teamMembers must be a non-empty array" });
  }

  if (typeof showStatusField !== "boolean") {
    return res.status(400).json({ error: "showStatusField must be a boolean" });
  }

  try {
    const standup = await StandupService.createStandup({
      userId,
      showStatusField,
      teamMembers,
    });

    res.status(201).json(standup);
  } catch (error) {
    res.status(500).json({ error: "Failed to save standup", details: error });
  }
});

export const standupRouter = router;
