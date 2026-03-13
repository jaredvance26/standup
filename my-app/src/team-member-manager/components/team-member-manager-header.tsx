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
      marginBottom={3}
      sx={{
        maxWidth: "min(96vw, 3200px)",
        marginX: "auto",
      }}
    >
      <Button
        variant="outlined"
        href="/"
        sx={{
          position: "absolute",
          left: { xs: 8, md: 20 },
          borderRadius: 4,
          minWidth: 0,
          width: 52,
          height: 52,
        }}
      >
        <ArrowBack />
      </Button>
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        sx={{
          borderRadius: 6,
          px: { xs: 2, md: 3 },
          py: 2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.93), rgba(244,238,227,0.9))",
          border: "1px solid rgba(19, 41, 61, 0.1)",
          boxShadow: "0 14px 30px rgba(19, 41, 61, 0.12)",
          width: { xs: "100%", md: "auto" },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          <img
            src={roundTable}
            alt="round table"
            style={{ width: 68, height: 68 }}
          />
        </Box>
        <Typography
          textAlign="center"
          fontFamily='"Newsreader", serif'
          fontSize={{ xs: 32, md: 42 }}
          fontWeight={800}
          lineHeight={1}
        >
          Team Member Manager
        </Typography>
      </Box>
    </Box>
  );
};
