import { Box, Button } from "@mui/material";
import { ReactElement } from "react";

export const AccountTab = (): ReactElement => {
  return (
    <Box>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        variant="text"
        color="info"
        sx={{ fontSize: 18 }}
      >
        Sign out
      </Button>
    </Box>
  );
};
