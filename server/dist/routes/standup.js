"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standupRouter = void 0;
const express_1 = __importDefault(require("express"));
const standup_1 = __importDefault(require("../services/standup"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/user/:userId/standups", auth_1.authenticateToken, auth_1.requireOwnUserIdFromParams, async (req, res) => {
    const { userId } = req.params;
    try {
        const standups = await standup_1.default.getStandupsByUserId(userId);
        res.json(standups);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch standup history", details: error });
    }
});
router.post("/user/:userId/standups", auth_1.authenticateToken, auth_1.requireOwnUserIdFromParams, async (req, res) => {
    const { userId } = req.params;
    const { teamMembers, showStatusField } = req.body;
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
        return res.status(400).json({ error: "teamMembers must be a non-empty array" });
    }
    if (typeof showStatusField !== "boolean") {
        return res.status(400).json({ error: "showStatusField must be a boolean" });
    }
    try {
        const standup = await standup_1.default.createStandup({
            userId,
            showStatusField,
            teamMembers,
        });
        res.status(201).json(standup);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save standup", details: error });
    }
});
router.delete("/user/:userId/standups/:standupId", auth_1.authenticateToken, auth_1.requireOwnUserIdFromParams, async (req, res) => {
    const { userId, standupId } = req.params;
    try {
        const deletedStandup = await standup_1.default.deleteStandupById(userId, standupId);
        if (!deletedStandup) {
            return res.status(404).json({ error: "Standup not found" });
        }
        res.json({ message: "Standup deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete standup", details: error });
    }
});
exports.standupRouter = router;
