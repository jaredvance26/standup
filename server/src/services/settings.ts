import Settings, { ISettings } from "../models/settings";
import { EncryptionService } from "../utils/encryption";

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
  async updateSettingsByUserId(
    userId: string,
    settings: Partial<ISettings>
  ): Promise<ISettings | null> {
    // Create a deep copy to avoid mutating the input settings
    const settingsToUpdate = JSON.parse(JSON.stringify(settings));

    // Encrypt the Jira API token if it exists
    if (settingsToUpdate.jiraData && settingsToUpdate.jiraData.apiToken) {

      settingsToUpdate.jiraData.apiToken = EncryptionService.encrypt(
        settingsToUpdate.jiraData.apiToken
      );
    }

    // Update the settings
    return Settings.findOneAndUpdate(
      { userId },
      { $set: settingsToUpdate },
      { new: true, upsert: true }
    ).exec();
  }
}

export default new SettingsService();
