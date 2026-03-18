"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jiraRouter = void 0;
const express_1 = __importDefault(require("express"));
const jira_1 = require("../services/jira");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get issues for user
router.get("/user/:userId/jira/issues", auth_1.authenticateToken, auth_1.requireOwnUserIdFromParams, async (req, res) => {
    const jiraService = new jira_1.JiraService(req.params.userId);
    try {
        const issues = await jiraService.getUserIssues();
        res.json(issues);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch Jira issues' });
    }
});
exports.jiraRouter = router;
