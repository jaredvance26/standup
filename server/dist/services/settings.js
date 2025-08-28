"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __importDefault(require("../models/settings"));
const encryption_1 = require("../utils/encryption");
class SettingsService {
    /**
     * Fetch settings for a specific user by userId.
     * @param userId The user's ObjectId as string
     */
    async getSettingsByUserId(userId) {
        return settings_1.default.findOne({ userId }).exec();
    }
    /**
     * Update settings for a specific user by userId.
     * @param userId The user's ObjectId as string
     * @param settings Partial settings to update
     * @returns The updated settings document
     */
    async updateSettingsByUserId(userId, settings) {
        // Create a deep copy to avoid mutating the input settings
        const settingsToUpdate = JSON.parse(JSON.stringify(settings));
        // Encrypt the Jira API token if it exists
        if (settingsToUpdate.jiraData) {
            if (settingsToUpdate.jiraData.apiToken) {
                // Encrypt when provided (non-null, non-empty)
                settingsToUpdate.jiraData.apiToken = encryption_1.EncryptionService.encrypt(settingsToUpdate.jiraData.apiToken);
            }
        }
        // Build a dot-notation $set payload so we don't overwrite subdocuments
        const updatePayload = {};
        const buildDotNotation = (obj, prefix = "") => {
            if (!obj || typeof obj !== "object")
                return;
            for (const key of Object.keys(obj)) {
                const value = obj[key];
                if (typeof value === "undefined")
                    continue;
                const path = prefix ? `${prefix}.${key}` : key;
                // Special-case: skip updating jiraData.apiToken when value is null
                if (path === "jiraData.apiToken" && value === null) {
                    continue;
                }
                if (value !== null && typeof value === "object" && !Array.isArray(value)) {
                    buildDotNotation(value, path);
                }
                else {
                    updatePayload[path] = value;
                }
            }
        };
        buildDotNotation(settingsToUpdate);
        // Update the settings
        if (Object.keys(updatePayload).length === 0) {
            // Nothing to update, return current document
            return settings_1.default.findOne({ userId }).exec();
        }
        return settings_1.default.findOneAndUpdate({ userId }, { $set: updatePayload }, { new: true, upsert: true }).exec();
    }
}
exports.default = new SettingsService();
