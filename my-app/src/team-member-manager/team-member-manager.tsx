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
import { TeamMemberContract } from "../api/contracts";
import { useMessageAlert } from "../hooks";

export const TeamMemberManager = (): ReactElement => {
  // Access the store directly
  const [{ userId }, { createTeamMemberAction }] = useTeamMemberManagerStore();
  const [setMessage, AlertComponent] = useMessageAlert();

  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] =
    useState<boolean>(false);
  const theme = createTheme({
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            teamMemberData: Omit<TeamMemberContract, "id">
          ) =>
            createTeamMemberAction(teamMemberData, () => {
              setIsTeamMemberModalOpen(false);
              setMessage("success", "Team member added successfully");
            })
          }
        />
        {AlertComponent}
      </Box>
    </ThemeProvider>
  );
};
