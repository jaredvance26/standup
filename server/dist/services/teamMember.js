"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberService = void 0;
const teamMember_1 = __importDefault(require("../models/teamMember"));
class TeamMemberService {
    /**
     * Get all team members for a specific user
     * @param userId - The user ID to filter by
     */
    async getAllTeamMembers(userId) {
        try {
            return await teamMember_1.default.find({ userId }, { createdAt: 0, updatedAt: 0 }).sort({ lastName: 1, firstName: 1 });
        }
        catch (error) {
            console.error("Error fetching team members:", error);
            throw error;
        }
    }
    /**
     * Create a new team member
     * @param teamMemberData - The team member data
     */
    async createTeamMember(teamMemberData) {
        try {
            const newTeamMember = new teamMember_1.default(teamMemberData);
            return await newTeamMember.save();
        }
        catch (error) {
            console.error("Error creating team member:", error);
            throw error;
        }
    }
    /**
     * Update a team member
     * @param id - The team member ID
     * @param updateData - The data to update
     */
    async updateTeamMember(id, updateData) {
        try {
            return await teamMember_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        }
        catch (error) {
            console.error(`Error updating team member with id ${id}:`, error);
            throw error;
        }
    }
    /**
     * Delete a team member
     * @param id - The team member ID
     */
    async deleteTeamMember(id) {
        try {
            return await teamMember_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(`Error deleting team member with id ${id}:`, error);
            throw error;
        }
    }
}
exports.TeamMemberService = TeamMemberService;
