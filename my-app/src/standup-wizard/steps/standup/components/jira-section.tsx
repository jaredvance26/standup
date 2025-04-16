import { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";

import { JiraIssue, Sprint } from "../../../types/jira";
import { JiraIssues } from "./jira-issues";

interface JiraSectionProps {
  sprint: Sprint;
  issues: JiraIssue[];
}

export const JiraSection = (props: JiraSectionProps): ReactElement => {
  const { sprint, issues } = props;
  const { palette } = useTheme();

  const endDate = parseISO(sprint.endDate);

  return (
    <Box flex={1} alignSelf="start">
      <Box display='flex' flexDirection="column" gap={2}>
        <Box
          sx={{
            backgroundColor: palette.grey[300],
            borderRadius: 3,
            padding: 2,
          }}
        >
          <Box display="flex" alignItems="end" gap={1} justifyContent="center">
            <Typography
              textAlign="center"
              fontSize={24}
              fontWeight={500}
              marginBottom={0.5}
            >
              {sprint.name}
            </Typography>
            <Typography
              textAlign="center"
              fontSize={15}
              color={palette.grey[900]}
              marginBottom={1}
            >
              {`${format(parseISO(sprint.startDate), "M/d/yy")} - ${format(
                endDate,
                "M/d/yy"
              )}`}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography whiteSpace="pre-line" fontSize={14} fontWeight={500}>
              {sprint.goals}
            </Typography>
          </Box>
        </Box>
        <Box
          height="400px"
          overflow="auto"
        >
          <JiraIssues issues={issues} />
        </Box>
      </Box>
    </Box>
  );
};
