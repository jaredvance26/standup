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

export const settingsRouter = router;
