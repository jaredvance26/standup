import React, { ReactElement } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Group, History, Settings } from "@mui/icons-material";
import { format } from "date-fns";

import roundTable from "../../static/round-table.png";

interface StandupWizardHeaderProps {
  onSettingsClick: () => void;
  currentStep: number;
  teamName: string;
}

export const StandupWizardHeader = (
  props: StandupWizardHeaderProps
): ReactElement => {
  const { onSettingsClick, currentStep, teamName } = props;
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={4}
      px={{ xs: 1, md: 0 }}
    >
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        sx={{
          borderRadius: 6,
          px: { xs: 2, md: 3 },
          py: 2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.93), rgba(244,238,227,0.9))",
          border: "1px solid rgba(19, 41, 61, 0.1)",
          boxShadow: "0 14px 30px rgba(19, 41, 61, 0.12)",
          width: { xs: "100%", md: "auto" },
          justifyContent: "center",
        }}
      >
        <img src={roundTable} alt="round table" style={{ width: 68, height: 68 }} />
        <Box textAlign={{ xs: "left", md: "center" }}>
          <Typography
            fontFamily='"Newsreader", serif'
            fontSize={{ xs: 28, md: 36 }}
            fontWeight={800}
          >{`${teamName} Standup`}</Typography>
          <Typography fontSize={{ xs: 16, md: 18 }} fontWeight={500}>
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: { xs: 12, md: 20 },
          top: { xs: -12, md: "auto" },
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {currentStep === 0 && (
          <>
            <Button
              href="/standup-history"
              variant="contained"
              sx={{
                borderRadius: 4,
                width: "55px",
                height: "60px",
                minWidth: "55px",
              }}
            >
              <History sx={{ fontSize: 36 }} />
            </Button>
            <Button
              href="/team-members"
              variant="contained"
              sx={{
                borderRadius: 4,
                width: "55px",
                height: "60px",
                minWidth: "55px",
              }}
            >
              <Group sx={{ fontSize: 40 }} />
            </Button>
          </>
        )}
        <Button
          variant="contained"
          onClick={onSettingsClick}
          sx={{
            borderRadius: 4,
            width: "55px",
            height: "60px",
            minWidth: "55px",
          }}
        >
          <Settings sx={{ fontSize: 40 }} />
        </Button>
      </Box>
    </Box>
  );
};
