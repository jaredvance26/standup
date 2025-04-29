import { ReactElement } from "react";
import { Box, Button, useTheme } from "@mui/material";

interface SettingsModalFooterProps {
	onPrimaryClick: () => void;
	onCancel: () => void;
	isPrimaryDisabled: boolean;
}
export const SettingsModalFooter = (props: SettingsModalFooterProps): ReactElement => {
  const { onPrimaryClick, onCancel, isPrimaryDisabled } = props;
  const { palette } = useTheme();
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 1,
        borderTop: 1,
        borderColor: "divider",
        p: 2,
        marginTop: "auto",
        backgroundColor: palette.grey[50],
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      <Button
        variant="text"
        color="primary"
        onClick={onCancel}
        sx={{ mr: 1, fontSize: 16 }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onPrimaryClick}
        sx={{ fontSize: 18, borderRadius: 3 }}
        disabled={isPrimaryDisabled}
      >
        Save
      </Button>
    </Box>
  );
};
