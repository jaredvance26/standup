import { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Coffee } from "@mui/icons-material";
import { format, parseISO } from "date-fns";

import { JiraIssues } from "./jira-issues";
import { JiraIssue, Sprint } from "../../../types/jira";
import { useStandupWizardStore } from "../../../standup-wizard-store";
import { BlankState } from "../../../../components";

interface JiraSectionProps {
  sprint: Sprint;
  issues: JiraIssue[];
}

export const JiraSection = (props: JiraSectionProps): ReactElement => {
  const { sprint, issues } = props;
  const [{ settings }] = useStandupWizardStore();
  const { palette } = useTheme();

  const endDate = parseISO(sprint.endDate);

  return (
    <Box flex={1} alignSelf="start">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box
          sx={{
            backgroundColor: palette.grey[300],
            borderRadius: 3,
            padding: 2,
          }}
        >
          <Box display="flex" alignItems="end" gap={1}>
            <Box
              sx={{
                maxWidth: "310px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                textAlign="center"
                fontSize={20}
                fontWeight={600}
                marginBottom={0.5}
                color={palette.primary.dark}
              >
                {sprint.name}
              </Typography>
            </Box>
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
          <Box display="flex">
            <Typography whiteSpace="pre-line" fontSize={14} fontWeight={500}>
              {sprint.goals}
            </Typography>
          </Box>
        </Box>
        <Box height="400px" overflow="auto">
          {issues.length ? (
            <JiraIssues
              issues={issues}
              jiraUrl={settings.jiraSettings.jiraUrl || ""}
            />
          ) : (
            <BlankState
              icon={<Coffee sx={{ fontSize: 100 }} />}
              title="Taking a breather from tickets"
              description="Sometimes the best work happens outside of Jira"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
