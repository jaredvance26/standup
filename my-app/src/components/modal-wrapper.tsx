import { ReactElement, ReactNode } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalWrapperInterface {
  children: ReactNode;
  headerName: string;
  modalIcon: ReactElement;
  modalHeight?: number;
  onClose: () => void
}

export const ModalWrapper = (props: ModalWrapperInterface): ReactElement => {
  const { children, headerName, modalIcon, modalHeight = 600, onClose } = props;
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        minHeight: modalHeight,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 24,
        p: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: palette.grey[100],
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: 1,
          borderColor: "divider",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {modalIcon}
          <Typography
            fontSize={32}
            fontWeight={600}
            sx={{ color: palette.primary.main }}
          >
            {headerName}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: palette.primary.main,
            "&:hover": {
              color: palette.primary.dark,
            },
          }}
        >
          <Close sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
};
