import { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Coffee } from "@mui/icons-material";
import { format, parseISO } from "date-fns";

import { JiraIssues } from "./jira-issues";
import { JiraIssue, Sprint } from "../../../types/jira";
import { useStandupWizardStore } from "../../../standup-wizard-store";

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
    <Box flex={1} width="100%" alignSelf="start" minWidth={0}>
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
        <Box sx={{ height: 400, overflow: "auto" }}>
          {issues.length ? (
            <JiraIssues
              issues={issues}
              jiraUrl={settings.jiraSettings.jiraUrl || ""}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px dashed ${palette.grey[400]}`,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,255,255,0.45))",
                px: 3,
                py: 2.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Coffee sx={{ fontSize: 56, color: palette.grey[500], mb: 1 }} />
              <Typography fontSize={30} lineHeight={1} mb={1}>
                ...
              </Typography>
              <Typography fontSize={28} fontWeight={700} color={palette.grey[700]}>
                Taking a breather from tickets
              </Typography>
              <Typography
                fontSize={15}
                color={palette.grey[600]}
                maxWidth={320}
                mt={0.75}
              >
                Sometimes the best work happens outside of Jira
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
