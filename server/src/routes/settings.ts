import express from "express";
import SettingsService from "../services/settings";
import {
  authenticateToken,
  requireOwnUserIdFromParams,
} from "../middleware/auth";

const router = express.Router();

// GET /api/user/:userId/settings - Fetch settings for a specific user
router.get(
  "/user/:userId/settings",
  authenticateToken,
  requireOwnUserIdFromParams,
  async (req, res) => {
  const { userId } = req.params;
  try {
    const settings = await SettingsService.getSettingsByUserId(userId);
    if (!settings) {
      return res.status(404).json({ error: "Settings not found" });
    }
    // Extract and transform jiraData fields
    const {
      jiraData,
      userId: id,
      createdAt,
      updatedAt,
      __v,
      _id,
      ...safeSettings
    } = settings.toObject();
    const jiraFields = {
      jiraUsername: jiraData?.jiraUsername || null,
      jiraUrl: jiraData?.jiraUrl || null,
      hasJiraApiToken: Boolean(jiraData?.apiToken),
      jiraBoardId: jiraData?.jiraBoardId || null,
    };
    res.json({ ...safeSettings, jiraData: { ...jiraFields } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings", details: error });
  }
});

// PUT /api/user/:userId/settings - Update settings for a specific user
router.put(
  "/user/:userId/settings",
  authenticateToken,
  requireOwnUserIdFromParams,
  async (req, res) => {
  const { userId } = req.params;
  const update = req.body;
  try {
    const updatedSettings = await SettingsService.updateSettingsByUserId(
      userId,
      update
    );
    if (!updatedSettings) {
      return res.status(404).json({ error: "Settings not found" });
    }
    // Extract and transform jiraData fields
    const {
      jiraData,
      userId: id,
      createdAt,
      updatedAt,
      __v,
      _id,
      ...safeSettings
    } = updatedSettings.toObject();
    const jiraFields = {
      jiraUsername: jiraData?.jiraUsername || null,
      jiraUrl: jiraData?.jiraUrl || null,
      hasJiraApiToken: Boolean(jiraData?.apiToken),
      jiraBoardId: jiraData?.jiraBoardId || null,
    };
    res.json({ ...safeSettings, jiraData: { ...jiraFields } });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update settings", details: error });
  }
});

export const settingsRouter = router;
