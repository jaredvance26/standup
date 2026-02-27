import { ReactElement } from "react";
import { ArrowBack, History } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import roundTable from "../../static/round-table.png";

export const StandupHistoryHeader = (): ReactElement => {
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={6}
    >
      <Button
        variant="outlined"
        href="/standup"
        sx={{
          position: "absolute",
          left: 45,
        }}
      >
        <ArrowBack />
      </Button>
      <Box display="flex" gap={2} alignItems="center">
        <img
          src={roundTable}
          alt="round table"
          style={{ width: 75, height: 75 }}
        />
        <Box display="flex" flexDirection="column">
          <Typography textAlign="center" fontSize={32} fontWeight={800}>
            Standup History
          </Typography>
          <Box display="flex" justifyContent="center">
            <History />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
