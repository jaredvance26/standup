import React, { ReactElement } from "react";
import { Adjust, Group, VisibilityOff } from "@mui/icons-material";
import { Box, Switch, TextField, Typography, useTheme } from "@mui/material";

interface GeneralTabProps {
  teamName: string;
  onTeamNameChange: (teamName: string) => void;
  hideEmployees: boolean;
  onToggleHideEmployees: () => void;
  showStatusField: boolean;
  onToggleShowStatusField: () => void;
}

export const GeneralTab = (props: GeneralTabProps): ReactElement => {
  const {
    hideEmployees,
    onToggleHideEmployees,
    showStatusField,
    onToggleShowStatusField,
    teamName,
    onTeamNameChange,
  } = props;
  const { palette } = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Team name */}
      <Box>
		<Box display="flex" alignItems="center" gap={1}>
        <Typography color={palette.grey[800]} fontSize={18} fontWeight={500}>
          Team name
        </Typography>
		<Group sx={{ fill: palette.grey[800] }} />
		</Box>
        <TextField
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          variant="outlined"
          placeholder="Enter your team name"
          sx={{
            width: "35%",
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Hide employees */}
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
      {/* Show status field */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              color={palette.grey[800]}
              fontSize={18}
              fontWeight={500}
            >
              Show status field
            </Typography>
            <Adjust sx={{ fill: palette.grey[800] }} />
          </Box>
          <Typography fontSize={14} color={palette.grey[700]}>
            Asks each team member for their status — GREEN, YELLOW, or RED.
          </Typography>
        </Box>
        <Switch checked={showStatusField} onChange={onToggleShowStatusField} />
      </Box>
    </Box>
  );
};
