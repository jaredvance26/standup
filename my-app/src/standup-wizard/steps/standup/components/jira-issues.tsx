import { ReactElement } from "react";
import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";
import { JiraIssue } from "../../../types";

interface JiraIssuesProps {
  issues: JiraIssue[];
}

export const JiraIssues = (props: JiraIssuesProps): ReactElement => {
  const { issues } = props;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {issues.map((issue) => (
        <Card key={issue.id} variant="outlined" sx={{ width: "100%", borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
              <Typography
                fontSize={14}
                fontWeight={500}
                gutterBottom
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  display: "block",
                }}
              >
               <b>{issue.key}</b>: {issue.fields.summary}
              </Typography>
            </Box>
            <Chip
              label={issue.fields.status.name}
              size="small"
              color={
                issue.fields.status.name.toLowerCase() === "done"
                  ? "success"
                  : "default"
              }
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
