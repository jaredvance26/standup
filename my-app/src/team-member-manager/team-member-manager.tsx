import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import {
  TeamMemberManagerHeader,
  TeamMemberTable,
  TeamMemberModal,
} from "./components";
import { useTeamMemberManagerStore } from "./team-member-manager-store";
import { TeamMemberUpsertContract } from "../api/contracts";
import { notifyAlert } from "../alerts/alert-notifier";
import { MessageAlertHost } from "../alerts/MessageAlertHost";
import { COLOR_SHADES } from "../standup-wizard/constants";
import { Loader } from "../components";

export const TeamMemberManager = (): ReactElement => {
  // Access the store directly
  const [
    { userId, themeColor, isTeamDataLoading, isSettingsDataLoading },
    { createTeamMemberAction },
  ] = useTeamMemberManagerStore();

  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] =
    useState<boolean>(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: COLOR_SHADES[themeColor].main,
        light: COLOR_SHADES[themeColor].light,
        dark: COLOR_SHADES[themeColor].dark,
      },
    },
    typography: {
      fontFamily: '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 3,
    },
  });

  if (isTeamDataLoading || isSettingsDataLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessageAlertHost />
      <Box marginY={3}>
        <TeamMemberManagerHeader />
        <Box
          margin={3}
          padding={5}
          borderRadius={3}
          sx={{
            height: "77vh",
            backgroundColor: "#F6F6F4",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              padding: 3,
            }}
          >
            <Button
              startIcon={<PersonAdd />}
              variant="contained"
              onClick={() => setIsTeamMemberModalOpen(true)}
            >
              Add Team Member
            </Button>
            <TeamMemberTable />
          </Box>
        </Box>
        <TeamMemberModal
          isOpen={isTeamMemberModalOpen}
          onClose={() => setIsTeamMemberModalOpen(false)}
          selectedTeamMember={null}
          userId={userId}
          primaryButtonAction={(
            teamMemberData: TeamMemberUpsertContract
          ) =>
            createTeamMemberAction(teamMemberData, () => {
              setIsTeamMemberModalOpen(false);
              notifyAlert("success", "Team member added successfully");
            })
          }
        />
      </Box>
    </ThemeProvider>
  );
};
