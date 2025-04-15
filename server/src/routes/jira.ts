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


export const jiraRouter = router;
