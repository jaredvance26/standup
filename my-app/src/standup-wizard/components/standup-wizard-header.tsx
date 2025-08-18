import React, { ReactElement } from "react";
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
import { Group, Settings } from "@mui/icons-material";
import { format } from "date-fns";

import roundTable from "../../static/round-table.png";
import { TEAM } from "../../local";

interface StandupWizardHeaderProps {
  onSettingsClick: () => void;
  currentStep: number;
}

export const StandupWizardHeader = (
  props: StandupWizardHeaderProps
): ReactElement => {
  const { onSettingsClick, currentStep } = props;
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
          >{`${TEAM.name} Standup`}</Typography>
          <Typography fontSize={18} fontWeight={500}>
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </Typography>
        </Box>
      </Box>
      {currentStep === 0 && (
        <Button
          href="/team-members"
          variant="contained"
          sx={{
            position: "absolute",
            right: 115,
            borderRadius: 3,
            width: "55px",
            height: "60px",
          }}
        >
          <Group sx={{ fontSize: 40 }} />
        </Button>
      )}
      <IconButton
        onClick={onSettingsClick}
        sx={{
          position: "absolute",
          right: 20,
        }}
      >
        <Settings sx={{ fontSize: 70, color: palette.primary.main }} />
      </IconButton>
    </Box>
  );
};
