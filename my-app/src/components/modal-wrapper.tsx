import { forwardRef, ReactElement, ReactNode } from "react";
import {
  Box,
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalWrapperInterface {
  children: ReactNode;
  headerName: string;
  modalIcon: ReactElement;
  modalHeight?: number;
  containerSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  closeButtonSx?: SxProps<Theme>;
  onClose: () => void;
}

export const ModalWrapper = forwardRef<HTMLDivElement, ModalWrapperInterface>(
  (props, ref): ReactElement => {
    const {
      children,
      headerName,
      modalIcon,
      modalHeight = 600,
      containerSx,
      headerSx,
      titleSx,
      closeButtonSx,
      onClose,
    } = props;
    const { palette } = useTheme();

    return (
      <Box
        ref={ref}
        tabIndex={-1}
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
          ...containerSx,
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
            ...headerSx,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {modalIcon}
            <Typography
              fontSize={32}
              fontWeight={600}
              sx={{ color: palette.primary.main, ...titleSx }}
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
              ...closeButtonSx,
            }}
          >
            <Close sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    );
  }
);

ModalWrapper.displayName = "ModalWrapper";
