import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Chip,
  Stack
} from '@mui/material';
import { jiraService, JiraIssue, Sprint } from '../services/jiraService';

export const JiraIssues: React.FC = () => {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const response = await jiraService.getUserIssues();
      setIssues(response.issues);
      setSprint(response.sprint);
      setError(null);
    } catch (err) {
      setError('Failed to load Jira issues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} p={2}>
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          My Jira Issues
        </Typography>
        {sprint && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Sprint: {sprint.name} ({new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()})
          </Typography>
        )}
      </Box>
      {issues.map((issue) => (
        <Card key={issue.id} variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              {issue.key}: {issue.fields.summary}
            </Typography>
            <Chip 
              label={issue.fields.status.name}
              size="small"
              color={issue.fields.status.name.toLowerCase() === 'done' ? 'success' : 'default'}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
