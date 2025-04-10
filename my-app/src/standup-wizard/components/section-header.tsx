import { Typography, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader = ({
  children,
}: SectionHeaderProps): ReactElement => {
  const { palette } = useTheme();
  return (
    <Typography
      fontSize={40}
      marginBottom={3}
      textAlign="center"
      fontWeight={600}
      sx={{ color: palette.primary.main }}
    >
      {children}
    </Typography>
  );
};
