import { ReactElement } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Link,
} from "@mui/material";

import { getJiraIssueStatusColor } from "../utils";
import { JiraIssue, JiraIssueStatus } from "../../../types";

import { OpenInNew } from "@mui/icons-material";

interface JiraIssuesProps {
  issues: JiraIssue[];
  jiraUrl: string;
}

export const JiraIssues = (props: JiraIssuesProps): ReactElement => {
  const { issues, jiraUrl } = props;
  const statusOrder = Object.values(JiraIssueStatus);
  const sortedIssues = [...issues].sort((a, b) => {
    const aIndex = statusOrder.indexOf(
      a.fields.status.name.toLowerCase() as JiraIssueStatus
    );
    const bIndex = statusOrder.indexOf(
      b.fields.status.name.toLowerCase() as JiraIssueStatus
    );
    return aIndex - bIndex;
  });

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {sortedIssues.map((issue) => (
        <Card
          key={issue.id}
          variant="outlined"
          sx={{ width: "100%", borderRadius: 3, height: 140 }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "100%", mb: 2 }}>
              <Typography fontSize={14} fontWeight={500} gutterBottom>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                  <Box
                    component="span"
                    sx={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "normal",
                    }}
                  >
                    <b>{issue.key}</b>: {issue.fields.summary}
                  </Box>
                  {jiraUrl && (
                    <Link
                      href={`${jiraUrl}/browse/${issue.key}`}
                      target="_blank"
                    >
                      <OpenInNew sx={{ cursor: "pointer" }} />
                    </Link>
                  )}
                </Box>
              </Typography>
            </Box>
            <Box>
              <Chip
                label={issue.fields.status.name}
                size="small"
                color={getJiraIssueStatusColor(
                  issue.fields.status.name.toLowerCase() as JiraIssueStatus
                )}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
