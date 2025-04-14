import express from 'express';
import { JiraService } from '../services/jira';

const router = express.Router();
const jiraService = new JiraService();

// Get issues for user
router.get('/issues', async (req, res) => {
  try {
    const issues = await jiraService.getUserIssues();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Jira issues' });
  }
});

// Get single issue
router.get('/issues/:issueId', async (req, res) => {
  try {
    const issue = await jiraService.getIssue(req.params.issueId);
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Jira issue' });
  }
});

// Update issue status
router.patch('/issues/:issueId/status', async (req, res) => {
  try {
    const { statusId } = req.body;
    await jiraService.updateIssueStatus(req.params.issueId, statusId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update issue status' });
  }
});

export const jiraRouter = router;
