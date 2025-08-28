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
    if (settingsToUpdate.jiraData) {
      if (settingsToUpdate.jiraData.apiToken) {
        // Encrypt when provided (non-null, non-empty)
        settingsToUpdate.jiraData.apiToken = EncryptionService.encrypt(
          settingsToUpdate.jiraData.apiToken
        );
      }
    }

    // Build a dot-notation $set payload so we don't overwrite subdocuments
    const updatePayload: Record<string, any> = {};

    const buildDotNotation = (obj: any, prefix = "") => {
      if (!obj || typeof obj !== "object") return;
      for (const key of Object.keys(obj)) {
        const value = obj[key as keyof typeof obj];
        if (typeof value === "undefined") continue;

        const path = prefix ? `${prefix}.${key}` : key;

        // Special-case: skip updating jiraData.apiToken when value is null
        if (path === "jiraData.apiToken" && value === null) {
          continue;
        }

        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          buildDotNotation(value, path);
        } else {
          updatePayload[path] = value;
        }
      }
    };

    buildDotNotation(settingsToUpdate);

    // Update the settings
    if (Object.keys(updatePayload).length === 0) {
      // Nothing to update, return current document
      return Settings.findOne({ userId }).exec();
    }

    return Settings.findOneAndUpdate(
      { userId },
      { $set: updatePayload },
      { new: true, upsert: true }
    ).exec();
  }
}

export default new SettingsService();
