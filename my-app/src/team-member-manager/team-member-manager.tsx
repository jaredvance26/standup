import React, { ReactElement } from "react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { TeamMemberManagerHeader, TeamMemberTable } from "./components";
import { useTeamMemberManagerStore } from "./team-member-manager-store";
import { PersonAdd } from "@mui/icons-material";

export const TeamMemberManager = (): ReactElement => {
  // Access the store directly
  const [{ teamMembers }] = useTeamMemberManagerStore();
  console.log({ teamMembers });
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
            <Button startIcon={<PersonAdd />} variant="contained">
              Add Team Member
            </Button>
            <TeamMemberTable />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
