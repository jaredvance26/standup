"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __importDefault(require("../models/settings"));
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
        return settings_1.default.findOneAndUpdate({ userId }, { $set: settings }, { new: true, upsert: true }).exec();
    }
}
exports.default = new SettingsService();
