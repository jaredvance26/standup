import React, { ReactElement } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";

import { MemberStatus } from "../../../../types/member-status";
import { Circle } from "@mui/icons-material";

interface StatusSelectProps {
  value: MemberStatus;
  onChange: (value: MemberStatus) => void;
}

export const StatusSelect = ({
  value,
  onChange,
}: StatusSelectProps): ReactElement => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as MemberStatus);
  };
  const { palette } = useTheme();

  const statusComponents = {
    [MemberStatus.None]: (
      <Typography color={palette.grey[500]}>Status</Typography>
    ),
    [MemberStatus.Green]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "green" }} />
		<Typography>GREEN</Typography>
      </Box>
    ),
    [MemberStatus.Yellow]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "#E5E500" }} />
		<Typography>YELLOW</Typography>
      </Box>
    ),
    [MemberStatus.Red]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "red" }} />
		<Typography>RED</Typography>
      </Box>
    ),
  };

  return (
    <Select
      value={value}
      variant="outlined"
      onChange={handleChange}
      displayEmpty
      renderValue={() => statusComponents[value]}
      fullWidth
      sx={{ backgroundColor: palette.common.white }}
    >
      <MenuItem value={MemberStatus.Green}>{statusComponents[MemberStatus.Green]}</MenuItem>
      <MenuItem value={MemberStatus.Yellow}>{statusComponents[MemberStatus.Yellow]}</MenuItem>
      <MenuItem value={MemberStatus.Red}>{statusComponents[MemberStatus.Red]}</MenuItem>
    </Select>
  );
};
