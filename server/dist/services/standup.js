"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standup_1 = __importDefault(require("../models/standup"));
class StandupService {
    async createStandup(params) {
        const standup = new standup_1.default({
            userId: params.userId,
            showStatusField: params.showStatusField,
            teamMembers: params.teamMembers,
            completedAt: new Date(),
        });
        return standup.save();
    }
    async getStandupsByUserId(userId) {
        return standup_1.default.find({ userId }).sort({ completedAt: -1 }).exec();
    }
    async deleteStandupById(userId, standupId) {
        return standup_1.default.findOneAndDelete({ _id: standupId, userId }).exec();
    }
}
exports.default = new StandupService();
