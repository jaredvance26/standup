import express from 'express';
import { JiraService } from '../services/jira';
import {
  authenticateToken,
  requireOwnUserIdFromParams,
} from "../middleware/auth";

const router = express.Router();

// Get issues for user
router.get(
  "/user/:userId/jira/issues",
  authenticateToken,
  requireOwnUserIdFromParams,
  async (req, res) => {
	const jiraService = new JiraService(req.params.userId);
  try {
    const issues = await jiraService.getUserIssues();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Jira issues' });
  }
});


export const jiraRouter = router;
