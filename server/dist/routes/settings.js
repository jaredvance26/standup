"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const settings_1 = __importDefault(require("../services/settings"));
const router = express_1.default.Router();
// GET /api/user/:userId/settings - Fetch settings for a specific user
router.get("/user/:userId/settings", async (req, res) => {
    const { userId } = req.params;
    try {
        const settings = await settings_1.default.getSettingsByUserId(userId);
        if (!settings) {
            return res.status(404).json({ error: "Settings not found" });
        }
        // Extract and transform jiraData fields
        const { jiraData, userId: id, createdAt, updatedAt, __v, _id, ...safeSettings } = settings.toObject();
        const jiraFields = {
            jiraUsername: jiraData?.jiraUsername || null,
            jiraUrl: jiraData?.jiraUrl || null,
            hasJiraApiToken: Boolean(jiraData?.apiToken),
            jiraBoardId: jiraData?.jiraBoardId || null,
        };
        res.json({ ...safeSettings, jiraData: { ...jiraFields } });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch settings", details: error });
    }
});
// PUT /api/user/:userId/settings - Update settings for a specific user
router.put("/user/:userId/settings", async (req, res) => {
    const { userId } = req.params;
    const update = req.body;
    try {
        const updatedSettings = await settings_1.default.updateSettingsByUserId(userId, update);
        if (!updatedSettings) {
            return res.status(404).json({ error: "Settings not found" });
        }
        // Extract and transform jiraData fields
        const { jiraData, userId: id, createdAt, updatedAt, __v, _id, ...safeSettings } = updatedSettings.toObject();
        const jiraFields = {
            jiraUsername: jiraData?.jiraUsername || null,
            jiraUrl: jiraData?.jiraUrl || null,
            hasJiraApiToken: Boolean(jiraData?.apiToken),
            jiraBoardId: jiraData?.jiraBoardId || null,
        };
        res.json({ ...safeSettings, jiraData: { ...jiraFields } });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to update settings", details: error });
    }
});
exports.settingsRouter = router;
