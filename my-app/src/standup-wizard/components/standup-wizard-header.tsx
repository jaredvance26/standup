import React, { ReactElement } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { format } from "date-fns";

import roundTable from "../../static/round-table.png";
import { TEAM } from "../../local";

interface StandupWizardHeaderProps {
  onSettingsClick: () => void;
}

export const StandupWizardHeader = (props: StandupWizardHeaderProps): ReactElement => {
	const { onSettingsClick } = props;
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
        <img src={roundTable} alt="round table" style={{ width: 75, height: 75 }}/>
		<Box>

        <Typography
          textAlign="center"
          fontSize={32}
          fontWeight={800}
        >{`${TEAM.name} Standup`}</Typography>
		<Typography
			fontSize={18}
			fontWeight={500}
		>
			{format(new Date(), 'EEEE, MMMM d, yyyy')}
		</Typography>
		</Box>
      </Box>
      <IconButton
        onClick={onSettingsClick}
        sx={{
          position: 'absolute',
          right: 45
        }}
      >
        <Settings sx={{ fontSize: 50, color: palette.primary.main }}	 />
      </IconButton>
    </Box>
  );
};
