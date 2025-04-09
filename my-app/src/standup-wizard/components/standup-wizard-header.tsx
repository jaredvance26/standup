import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

import roundTable from "../images/round-table.png";
import { TEAM } from "../../local";

export const StandupWizardHeader = (): ReactElement => {
  return (
    <Box
      display="flex"
      gap={2}
      justifyContent="center"
      alignItems="center"
      marginBottom={6}
    >
      <img src={roundTable} alt="round table" />
      <Typography
        textAlign="center"
        fontSize={32}
        fontWeight={700}
      >{`${TEAM.name} Standup`}</Typography>
    </Box>
  );
};
