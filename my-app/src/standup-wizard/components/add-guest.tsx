import { ReactElement } from "react";
import { PersonAdd } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

interface AddGuestProps {
  addedGuest: string;
  setAddedGuest: (value: string) => void;
  onAddGuest: () => void;
}

export const AddGuest = (props: AddGuestProps): ReactElement => {
  const { addedGuest, onAddGuest, setAddedGuest } = props;

  return (
    <Box
      onKeyDown={(e) => {
        if (e.key === "Enter" && document.activeElement === e.target && addedGuest) {
          onAddGuest();
          setAddedGuest("");
        }
      }}
      alignItems="center"
      display="flex"
      gap={2}
    >
      <TextField
        placeholder="Add Guest"
        fullWidth={true}
        sx={{ backgroundColor: "#FFFFFD" }}
        onChange={(e) => setAddedGuest(e.target.value)}
        value={addedGuest}
      />
      <Button
        disabled={!Boolean(addedGuest)}
        onClick={() => {
          onAddGuest();
          setAddedGuest("");
        }}
        variant="contained"
        sx={{ width: "50px", height: "50px", borderRadius: "45%" }}
      >
        <PersonAdd />
      </Button>
    </Box>
  );
};
