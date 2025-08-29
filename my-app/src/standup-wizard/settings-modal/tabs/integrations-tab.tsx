import { ReactElement } from "react";
import { Box, TextField } from "@mui/material";
import jiraLogo from "../../../static/jira-logo.png";

interface IntegrationsTabProps {
  jiraSettings: {
    apiToken: string | null;
    jiraBoardId: string | null;
    jiraUsername: string | null;
    jiraUrl: string | null;
  };
  onJiraSettingsChange: (newValue: string, key: string) => void;
}

export const IntegrationsTab = (props: IntegrationsTabProps): ReactElement => {
  const { jiraSettings, onJiraSettingsChange } = props;
  const { apiToken, jiraBoardId, jiraUsername, jiraUrl } = jiraSettings;

  const getPlaceHolder = (
    value: string | null,
    placeholder: string
  ): string => {
    return value ? "" : placeholder;
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", borderRadius: 3 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
      >
        <img
          src={jiraLogo}
          alt="Jira Logo"
          style={{ width: 100, height: 100 }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginTop={1.5}
        padding={3}
      >
        <TextField
          label="Jira Board ID"
          placeholder={getPlaceHolder(jiraBoardId, "e.g. 111")}
          value={jiraBoardId}
          onChange={(e) => onJiraSettingsChange(e.target.value, "jiraBoardId")}
          sx={{
            width: "70%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
            },
          }}
        />

        <TextField
          label="Jira URL"
          placeholder={getPlaceHolder(
            jiraUrl,
            "https://your-company.atlassian.net"
          )}
          value={jiraUrl}
          onChange={(e) => onJiraSettingsChange(e.target.value, "jiraUrl")}
          sx={{
            width: "70%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
            },
          }}
        />
        <TextField
          label="Jira Username"
          placeholder={getPlaceHolder(jiraUsername, "Your email tied to Jira")}
          value={jiraUsername}
          onChange={(e) => onJiraSettingsChange(e.target.value, "jiraUsername")}
          sx={{
            width: "70%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
            },
          }}
        />
        <TextField
          label="Jira API Token"
          placeholder={getPlaceHolder(
            apiToken,
            "Jira > Account Settings > Security > Create and manage API tokens "
          )}
          value={apiToken}
          onChange={(e) => onJiraSettingsChange(e.target.value, "apiToken")}
          sx={{
            width: "70%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
            },
          }}
        />
        {/* <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#1868DB", borderRadius: 3 }}
        >
          Test Connection
        </Button> */}
      </Box>
    </Box>
  );
};
