"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const settings_1 = __importDefault(require("../services/settings"));
const router = express_1.default.Router();
// GET /api/settings/:userId - Fetch settings for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const settings = await settings_1.default.getSettingsByUserId(userId);
        if (!settings) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        // Omit jiraData before sending
        const { jiraData, userId: id, ...safeSettings } = settings.toObject();
        res.json(safeSettings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings', details: error });
    }
});
// PUT /api/settings/:userId - Update settings for a specific user
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const update = req.body;
    try {
        const updatedSettings = await settings_1.default.updateSettingsByUserId(userId, update);
        if (!updatedSettings) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        // Omit jiraData before sending
        const { jiraData, userId: id, ...safeSettings } = updatedSettings.toObject();
        res.json(safeSettings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update settings', details: error });
    }
});
exports.settingsRouter = router;
