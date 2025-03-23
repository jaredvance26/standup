import { Typography } from "@mui/material";
import React, { ReactElement } from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader = ({ children }: SectionHeaderProps): ReactElement => {
  return <Typography fontSize={32} marginBottom={3} textAlign="center">{children}</Typography>;
};
