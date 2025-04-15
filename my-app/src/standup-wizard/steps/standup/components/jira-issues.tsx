import {ReactElement } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack
} from '@mui/material';
import { JiraIssue } from '../../../types';

interface JiraIssuesProps {
	issues: JiraIssue[];
}

export const JiraIssues = (props: JiraIssuesProps): ReactElement => {
  const { issues } = props;

  return (
    <Stack spacing={2} p={2}>
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
