import { ReactElement } from "react";
import { Box, Button, SxProps, Theme, useTheme } from "@mui/material";

interface ModalFooterProps {
  onPrimaryClick: () => void;
  onCancel: () => void;
  isPrimaryDisabled: boolean;
  primaryButtonLabel?: string;
  containerSx?: SxProps<Theme>;
  cancelButtonSx?: SxProps<Theme>;
  primaryButtonSx?: SxProps<Theme>;
}
export const ModalFooter = (
  props: ModalFooterProps
): ReactElement => {
  const {
    onPrimaryClick,
    onCancel,
    isPrimaryDisabled,
    primaryButtonLabel = "Save",
    containerSx,
    cancelButtonSx,
    primaryButtonSx,
  } = props;
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
        ...containerSx,
      }}
    >
      <Button
        variant="text"
        color="primary"
        onClick={onCancel}
        sx={{ mr: 1, fontSize: 16, ...cancelButtonSx }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onPrimaryClick}
        sx={{ fontSize: 18, borderRadius: 3, ...primaryButtonSx }}
        disabled={isPrimaryDisabled}
      >
        {primaryButtonLabel}
      </Button>
    </Box>
  );
};
