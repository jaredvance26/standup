"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_1 = __importDefault(require("../services/account"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const SECRET = process.env.SECRET;
if (!SECRET) {
    throw new Error("JWT SECRET environment variable is not set");
}
// Update user email
router.put("/email", auth_1.authenticateToken, async (req, res) => {
    const { userId, newEmail } = req.body;
    // Validate request body
    if (!userId || !newEmail) {
        return res
            .status(400)
            .json({ error: "User ID and new email are required" });
    }
    try {
        // Verify the user is updating their own account or is an admin
        if (req.user?.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You can only update your own account" });
        }
        const updatedUser = await account_1.default.updateEmail(userId, newEmail);
        // Update token with new email
        const token = jsonwebtoken_1.default.sign({ userId: updatedUser.id, email: updatedUser.email }, SECRET, { expiresIn: "1h" });
        res.json({
            message: "Email updated successfully",
            token,
            user: updatedUser,
        });
    }
    catch (error) {
        if (error.message.includes("already in use")) {
            return res.status(409).json({ error: error.message });
        }
        if (error.message.includes("same as your current email")) {
            return res.status(400).json({ error: error.message });
        }
        if (error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Email update error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Update user password
router.put("/password", auth_1.authenticateToken, async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    // Validate request body
    if (!userId || !currentPassword || !newPassword) {
        return res
            .status(400)
            .json({
            error: "User ID, current password, and new password are required",
        });
    }
    if (newPassword.length < 6) {
        return res
            .status(400)
            .json({ error: "New password must be at least 6 characters long" });
    }
    try {
        // Verify the user is updating their own account
        if (req.user?.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You can only update your own account" });
        }
        const result = await account_1.default.updatePassword(userId, currentPassword, newPassword);
        res.json(result);
    }
    catch (error) {
        if (error.message.includes("Current password is incorrect")) {
            return res.status(401).json({ error: error.message });
        }
        if (error.message.includes("different from your current password")) {
            return res.status(400).json({ error: error.message });
        }
        if (error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Password update error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.accountRouter = router;
