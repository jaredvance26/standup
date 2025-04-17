import { ReactElement } from "react";
import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";

import { getJiraIssueStatusColor } from "../utils";
import { JiraIssue, JiraIssueStatus } from "../../../types";

interface JiraIssuesProps {
  issues: JiraIssue[];
}

export const JiraIssues = (props: JiraIssuesProps): ReactElement => {
  const { issues } = props;
  const statusOrder = Object.values(JiraIssueStatus);
  const sortedIssues = [...issues].sort((a, b) => {
    const aIndex = statusOrder.indexOf(a.fields.status.name.toLowerCase() as JiraIssueStatus);
    const bIndex = statusOrder.indexOf(b.fields.status.name.toLowerCase() as JiraIssueStatus);
    return aIndex - bIndex;
  });

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {sortedIssues.map((issue) => (
        <Card key={issue.id} variant="outlined" sx={{ width: "100%", borderRadius: 3, height: 140 }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box sx={{ width: "100%", maxWidth: "100%", mb: 2 }}>
              <Typography
                fontSize={14}
                fontWeight={500}
                gutterBottom
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
               <b>{issue.key}</b>: {issue.fields.summary}
              </Typography>
            </Box>
            <Box>
              <Chip
                label={issue.fields.status.name}
                size="small"
                color={getJiraIssueStatusColor(issue.fields.status.name.toLowerCase() as JiraIssueStatus)}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
