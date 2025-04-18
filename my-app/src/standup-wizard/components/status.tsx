import { ReactElement } from "react";
import { MemberStatus } from "../../types";
import { Box, Typography, useTheme } from "@mui/material";

export const Status = ({ status }: { status: MemberStatus }): ReactElement => {
  const { palette } = useTheme();
  const statusComponents = {
    [MemberStatus.None]: (
      <Typography color={palette.grey[500]}>Status</Typography>
    ),
    [MemberStatus.Green]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ borderRadius: 1, backgroundColor: "green", width: "20px", height: "20px" }}></Box>
        <Typography fontWeight={600}>GREEN</Typography>
      </Box>
    ),
    [MemberStatus.Yellow]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ borderRadius: 1, backgroundColor: "#E5E500", width: "20px", height: "20px" }}></Box>
        <Typography fontWeight={600}>YELLOW</Typography>
      </Box>
    ),
    [MemberStatus.Red]: (
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ borderRadius: 1, backgroundColor: "red", width: "20px", height: "20px" }}></Box>
        <Typography fontWeight={600}>RED</Typography>
      </Box>
    ),
  };
  return statusComponents[status];
};
