import { VisibilityOff } from "@mui/icons-material";
import { Box, Switch, Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

interface GeneralTabProps {
  hideEmployees: boolean;
  onToggleHideEmployees: () => void;
}

export const GeneralTab = (props: GeneralTabProps): ReactElement => {
  const { hideEmployees, onToggleHideEmployees } = props;
  const { palette } = useTheme();

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              color={palette.grey[800]}
              fontSize={18}
              fontWeight={500}
            >
              Hide employees
            </Typography>
            <VisibilityOff sx={{ fill: palette.grey[800] }} />
          </Box>
          <Typography fontSize={14} color={palette.grey[700]}>
            Hide employees who have not been selected yet during standup.
          </Typography>
        </Box>
        <Switch checked={hideEmployees} onChange={onToggleHideEmployees} />
      </Box>
    </Box>
  );
};
