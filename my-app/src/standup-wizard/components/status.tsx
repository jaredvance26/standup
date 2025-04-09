import { ReactElement } from "react";
import { MemberStatus } from "../../types";
import { Box, Typography, useTheme } from "@mui/material";
import { Circle } from "@mui/icons-material";

export const Status = ({ status }: { status: MemberStatus }): ReactElement => {
  const { palette } = useTheme();
  const statusComponents = {
    [MemberStatus.None]: (
      <Typography color={palette.grey[500]}>Status</Typography>
    ),
    [MemberStatus.Green]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "green" }} />
        <Typography fontWeight={600}>GREEN</Typography>
      </Box>
    ),
    [MemberStatus.Yellow]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "#E5E500" }} />
        <Typography fontWeight={600}>YELLOW</Typography>
      </Box>
    ),
    [MemberStatus.Red]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Circle style={{ fontSize: "1.5rem", fill: "red" }} />
        <Typography fontWeight={600}>RED</Typography>
      </Box>
    ),
  };
  return statusComponents[status];
};
