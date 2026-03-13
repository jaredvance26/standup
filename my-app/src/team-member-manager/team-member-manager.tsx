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
  const hexToRgb = (hex: string): string => {
    const normalizedHex = hex.replace("#", "");
    const parsedHex =
      normalizedHex.length === 3
        ? normalizedHex
            .split("")
            .map((char) => `${char}${char}`)
            .join("")
        : normalizedHex;

    const value = Number.parseInt(parsedHex, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `${r}, ${g}, ${b}`;
  };

  const withAlpha = (hex: string, alpha: number): string =>
    `rgba(${hexToRgb(hex)}, ${alpha})`;

  const selectedShade = COLOR_SHADES[themeColor];

  const theme = createTheme({
    palette: {
      primary: {
        main: selectedShade.main,
        light: selectedShade.light,
        dark: selectedShade.dark,
      },
      background: {
        default: "#f6f3eb",
        paper: "#fffdfa",
      },
    },
    typography: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      h4: {
        fontFamily: '"Newsreader", serif',
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: "0.02em",
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            boxShadow: "none",
            paddingLeft: 18,
            paddingRight: 18,
          },
          contained: {
            backgroundImage: `linear-gradient(135deg, ${selectedShade.main}, ${selectedShade.dark})`,
            color: "#ffffff",
            "&.Mui-disabled": {
              backgroundImage: "none",
              backgroundColor: "rgba(19, 41, 61, 0.16)",
              color: "rgba(19, 41, 61, 0.58)",
            },
          },
          outlined: {
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            borderColor: withAlpha(selectedShade.dark, 0.35),
            color: selectedShade.dark,
          },
        },
      },
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
      <Box
        px={2.5}
        py={2}
        sx={{
          minHeight: "100dvh",
          background: `linear-gradient(180deg, rgba(245, 247, 250, 0.96), ${withAlpha(selectedShade.light, 0.12)})`,
        }}
      >
        <TeamMemberManagerHeader />
        <Box
          sx={{
            maxWidth: "min(96vw, 3200px)",
            margin: "0 auto",
            borderRadius: 4,
            p: { xs: 2, md: 3 },
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            border: "1px solid rgba(19, 41, 61, 0.1)",
          }}
        >
          <Button
            startIcon={<PersonAdd />}
            variant="contained"
            onClick={() => setIsTeamMemberModalOpen(true)}
            sx={{ mb: 1.5 }}
          >
            Add Team Member
          </Button>
          <TeamMemberTable />
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
