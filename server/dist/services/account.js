"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
class AccountService {
    /**
     * Updates a user's email address
     * @param userId The ID of the user
     * @param newEmail The new email address
     * @returns The updated user object
     */
    async updateEmail(userId, newEmail) {
        if (!userId || !newEmail) {
            throw new Error("User ID and new email are required");
        }
        // Get the current user to compare emails
        const currentUser = await user_1.default.findById(userId);
        if (!currentUser) {
            throw new Error("User not found");
        }
        // Check if the new email is the same as the current one
        if (currentUser.email === newEmail) {
            throw new Error("New email is the same as your current email");
        }
        // Check if email already exists for another user
        const existingUser = await user_1.default.findOne({
            email: newEmail,
            _id: { $ne: userId },
        });
        if (existingUser) {
            throw new Error("Email is already in use by another account");
        }
        // Update the user's email
        const updatedUser = await user_1.default.findByIdAndUpdate(userId, { email: newEmail }, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return {
            id: updatedUser._id,
            email: updatedUser.email,
            updatedAt: updatedUser.updatedAt,
        };
    }
    /**
     * Updates a user's password
     * @param userId The ID of the user
     * @param currentPassword The current password for verification
     * @param newPassword The new password
     * @returns Success message
     */
    async updatePassword(userId, currentPassword, newPassword) {
        if (!userId || !currentPassword || !newPassword) {
            throw new Error("User ID, current password, and new password are required");
        }
        // Validate password length
        if (newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        // Get the user
        const user = await user_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Verify current password
        const isPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }
        // Check if new password is the same as current password
        const isSamePassword = await bcryptjs_1.default.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new Error("New password must be different from your current password");
        }
        // Hash and update password
        const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
        await user_1.default.findByIdAndUpdate(userId, { password: passwordHash }, { new: true });
        return { message: "Password updated successfully" };
    }
}
exports.AccountService = AccountService;
exports.default = new AccountService();
