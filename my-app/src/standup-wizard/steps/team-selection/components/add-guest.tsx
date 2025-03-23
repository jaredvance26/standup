import { PersonAdd } from "@mui/icons-material";
import { Box, IconButton, TextField, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

interface AddGuestProps {
  addedGuest: string;
  setAddedGuest: (value: string) => void;
  onAddGuest: () => void;
}

export const AddGuest = (props: AddGuestProps): ReactElement => {
  const { addedGuest, onAddGuest, setAddedGuest } = props;
  const { palette } = useTheme();

  return (
    <Box alignItems="center" display="flex" gap={2}>
      <TextField
        placeholder="Add Guest"
        sx={{ backgroundColor: "#FFFFFD" }}
        onChange={(e) => setAddedGuest(e.target.value)}
        value={addedGuest}
      />
      <IconButton
        color="primary"
        disabled={!Boolean(addedGuest)}
		onClick={() => {
			onAddGuest()
			setAddedGuest('')
		}}
        size="large"
        sx={{
          backgroundColor: palette.primary.main,
          color: "white",
          width: "55px",
          borderRadius: "45%",
          "&:hover": {
            backgroundColor: palette.primary.dark,
          },
          "&:disabled": {
            backgroundColor: palette.grey[300],
          },
          transition: "background-color 0.3s ease",
        }}
      >
        <PersonAdd />
      </IconButton>
    </Box>
  );
};
