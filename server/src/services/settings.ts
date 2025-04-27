import Settings, { ISettings } from '../models/settings';

class SettingsService {
  /**
   * Fetch settings for a specific user by userId.
   * @param userId The user's ObjectId as string
   */
  async getSettingsByUserId(userId: string): Promise<ISettings | null> {
    return Settings.findOne({ userId }).exec();
  }
}

export default new SettingsService();
