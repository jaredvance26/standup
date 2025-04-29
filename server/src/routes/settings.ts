import express from 'express';
import SettingsService from '../services/settings';

const router = express.Router();

// GET /api/settings/:userId - Fetch settings for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const settings = await SettingsService.getSettingsByUserId(userId);
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    // Omit jiraData before sending
    const { jiraData, userId: id, ...safeSettings } = settings.toObject();
    res.json(safeSettings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings', details: error });
  }
});

// PUT /api/settings/:userId - Update settings for a specific user
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const update = req.body;
  try {
    const updatedSettings = await SettingsService.updateSettingsByUserId(userId, update);
    if (!updatedSettings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    // Omit jiraData before sending
    const { jiraData, userId: id, ...safeSettings } = updatedSettings.toObject();
    res.json(safeSettings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings', details: error });
  }
});

export const settingsRouter = router;
