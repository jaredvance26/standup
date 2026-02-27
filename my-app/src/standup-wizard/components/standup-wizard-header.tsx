import React, { ReactElement } from "react";
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
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
  const { palette } = useTheme();
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={6}
    >
      <Box display="flex" gap={2} alignItems="center">
        <img
          src={roundTable}
          alt="round table"
          style={{ width: 75, height: 75 }}
        />
        <Box>
          <Typography
            textAlign="center"
            fontSize={32}
            fontWeight={800}
          >{`${teamName} Standup`}</Typography>
          <Typography fontSize={18} fontWeight={500}>
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 20,
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
                borderRadius: 3,
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
                borderRadius: 3,
                width: "55px",
                height: "60px",
                minWidth: "55px",
              }}
            >
              <Group sx={{ fontSize: 40 }} />
            </Button>
          </>
        )}
        <IconButton onClick={onSettingsClick}>
          <Settings sx={{ fontSize: 70, color: palette.primary.main }} />
        </IconButton>
      </Box>
    </Box>
  );
};
