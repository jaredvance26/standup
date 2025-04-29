import Settings, { ISettings } from '../models/settings';

class SettingsService {
  /**
   * Fetch settings for a specific user by userId.
   * @param userId The user's ObjectId as string
   */
  async getSettingsByUserId(userId: string): Promise<ISettings | null> {
    return Settings.findOne({ userId }).exec();
  }

  /**
   * Update settings for a specific user by userId.
   * @param userId The user's ObjectId as string
   * @param settings Partial settings to update
   * @returns The updated settings document
   */
  async updateSettingsByUserId(userId: string, settings: Partial<ISettings>): Promise<ISettings | null> {
    return Settings.findOneAndUpdate(
      { userId },
      { $set: settings },
      { new: true, upsert: true }
    ).exec();
  }
}

export default new SettingsService();
