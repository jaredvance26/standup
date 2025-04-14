"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jiraRouter = void 0;
const express_1 = __importDefault(require("express"));
const jira_1 = require("../services/jira");
const router = express_1.default.Router();
const jiraService = new jira_1.JiraService();
// Get issues for user
router.get('/issues', async (req, res) => {
    try {
        const issues = await jiraService.getUserIssues();
        res.json(issues);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch Jira issues' });
    }
});
// Get single issue
router.get('/issues/:issueId', async (req, res) => {
    try {
        const issue = await jiraService.getIssue(req.params.issueId);
        res.json(issue);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch Jira issue' });
    }
});
// Update issue status
router.patch('/issues/:issueId/status', async (req, res) => {
    try {
        const { statusId } = req.body;
        await jiraService.updateIssueStatus(req.params.issueId, statusId);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update issue status' });
    }
});
exports.jiraRouter = router;
