import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import roundTable from "../../static/round-table.png";
import { ArrowBack } from "@mui/icons-material";

export const TeamMemberManagerHeader = (): ReactElement => {
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
        href="/"
        sx={{
          position: "absolute",
          left: 45,
        }}
      >
        <ArrowBack />
      </Button>
      <Box display="flex" gap={2} alignItems="center">
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          <img
            src={roundTable}
            alt="round table"
            style={{ width: 75, height: 75 }}
          />
        </Box>
        <Typography textAlign="center" fontSize={32} fontWeight={800}>
          Team Member Manager
        </Typography>
      </Box>
    </Box>
  );
};
