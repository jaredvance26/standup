import { ReactElement, useMemo, useState } from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  Modal,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { DeleteOutline, History, Warning } from "@mui/icons-material";
import { format } from "date-fns";

import { StandupGETContract } from "../standup-wizard/api/contracts";
import { COLOR_SHADES } from "../standup-wizard/constants";
import { useStandupHistoryStore } from "./standup-history-store";
import { Loader, BlankState } from "../components";
import { StandupDetailsModal, StandupHistoryHeader } from "./components";
import { MessageAlertHost } from "../alerts/MessageAlertHost";
import { notifyAlert } from "../alerts/alert-notifier";
import { ModalFooter, ModalWrapper } from "../components";

const hexToRgb = (hex: string): string => {
  const normalizedHex = hex.replace("#", "");
  const parsedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalizedHex;

  const value = Number.parseInt(parsedHex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const withAlpha = (hex: string, alpha: number): string =>
  `rgba(${hexToRgb(hex)}, ${alpha})`;

export const StandupHistory = (): ReactElement => {
  const [
    { standups, isStandupsLoading, isSettingsLoading, themeColor, deletingStandupId },
    { deleteStandupAction },
  ] = useStandupHistoryStore();
  const [selectedStandup, setSelectedStandup] = useState<StandupGETContract | null>(
    null
  );
  const [standupToDelete, setStandupToDelete] = useState<StandupGETContract | null>(
    null
  );
  const selectedShade = COLOR_SHADES[themeColor];

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: selectedShade.main,
            light: selectedShade.light,
            dark: selectedShade.dark,
          },
          background: {
            default: "#f6f3eb",
            paper: "#fffdfa",
          },
        },
        typography: {
          fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
          h4: {
            fontFamily: '"Newsreader", serif',
            fontWeight: 700,
          },
          button: {
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: "0.02em",
          },
        },
        shape: {
          borderRadius: 14,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
                boxShadow: "none",
                paddingLeft: 18,
                paddingRight: 18,
              },
              contained: {
                backgroundImage: `linear-gradient(135deg, ${selectedShade.main}, ${selectedShade.dark})`,
                color: "#ffffff",
              },
              outlined: {
                backgroundColor: "rgba(255, 255, 255, 0.72)",
                borderColor: withAlpha(selectedShade.dark, 0.35),
                color: selectedShade.dark,
              },
            },
          },
        },
      }),
    [selectedShade.main, selectedShade.light, selectedShade.dark]
  );

  if (isStandupsLoading || isSettingsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessageAlertHost />
      <Box
        px={2.5}
        py={2}
        sx={{
          minHeight: "100dvh",
          background: `
            radial-gradient(circle at 12% 12%, ${withAlpha(selectedShade.light, 0.22)} 0, transparent 34%),
            radial-gradient(circle at 88% 8%, rgba(141, 174, 207, 0.34) 0, transparent 32%),
            linear-gradient(145deg, rgba(228, 237, 245, 0.96), ${withAlpha(selectedShade.dark, 0.2)})
          `,
        }}
      >
        <StandupHistoryHeader />
        <Box
          sx={{
            maxWidth: "min(96vw, 3200px)",
            margin: "0 auto",
            borderRadius: 6,
            p: { xs: 2, md: 3 },
            background:
              `linear-gradient(145deg, rgba(255,255,255,0.96), ${withAlpha(selectedShade.light, 0.14)})`,
            border: `1px solid ${withAlpha(selectedShade.dark, 0.12)}`,
            boxShadow:
              "0 28px 50px -36px rgba(19, 41, 61, 0.38), 0 8px 18px -14px rgba(19, 41, 61, 0.22)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 4,
              border: "1px solid rgba(19, 41, 61, 0.1)",
              p: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: "100%",
            }}
          >
            {standups.length === 0 ? (
              <BlankState
                icon={<History sx={{ fontSize: 70 }} />}
                title="No standups yet"
                description="Complete a standup with save enabled to build history."
              />
            ) : (
              standups.map((standup) => (
                <Paper
                  key={standup._id}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid rgba(19, 41, 61, 0.1)",
                    p: 2,
                    cursor: "pointer",
                    boxShadow:
                      "0 12px 24px -20px rgba(19, 41, 61, 0.45), 0 2px 6px rgba(19, 41, 61, 0.08)",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.16s ease",
                  }}
                  onClick={() => setSelectedStandup(standup)}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography fontSize={20} fontWeight={600}>
                        {format(new Date(standup.completedAt), "PP")}
                      </Typography>
                      <Typography fontSize={16} fontWeight={500} color="text.secondary">
                        {format(new Date(standup.completedAt), "pp")}
                      </Typography>
                    </Box>
                    <IconButton
                      disabled={Boolean(deletingStandupId)}
                      onClick={(event) => {
                        event.stopPropagation();
                        setStandupToDelete(standup);
                      }}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "error.main",
                        },
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        </Box>
      </Box>
      <StandupDetailsModal
        standup={selectedStandup}
        onClose={() => setSelectedStandup(null)}
      />
      <Modal
        open={Boolean(standupToDelete)}
        onClose={() => setStandupToDelete(null)}
      >
        <ModalWrapper
          headerName="Delete Standup"
          modalIcon={
            <DeleteOutline
              sx={{ mr: 1, fontSize: 45, color: theme.palette.primary.main }}
            />
          }
          onClose={() => setStandupToDelete(null)}
          modalHeight={500}
          containerSx={{
            borderRadius: 5,
            border: "1px solid rgba(19, 41, 61, 0.12)",
            boxShadow: "0 28px 60px rgba(19, 41, 61, 0.22)",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,242,232,0.95))",
          }}
          headerSx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(244,238,227,0.9))",
            borderBottom: "1px solid rgba(19, 41, 61, 0.12)",
            p: 2.25,
          }}
          titleSx={{
            fontFamily: '"Newsreader", serif',
            fontSize: 36,
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1,
          }}
        >
          <Box
            sx={{
              marginTop: 4,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 4,
            }}
          >
            <Warning sx={{ fontSize: 85, color: theme.palette.warning.main }} />
            <Typography
              fontSize={28}
              fontWeight={800}
              color={theme.palette.grey[800]}
            >
              Are you sure you want to delete this standup?
            </Typography>
            {standupToDelete && (
              <Box
                sx={{
                  marginTop: 4,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(244,238,227,0.75))",
                  borderRadius: 3.5,
                  border: "1px solid rgba(19, 41, 61, 0.12)",
                  padding: 2.5,
                  display: "flex",
                  gap: 1,
                  width: "100%",
                  maxWidth: 460,
                  alignItems: "center",
                }}
              >
                <History sx={{ color: theme.palette.primary.dark, fontSize: 28 }} />
                <Divider orientation="vertical" flexItem />
                <Box>
                  <Typography
                    fontSize={20}
                    fontWeight={600}
                    color={theme.palette.common.black}
                  >
                    {format(new Date(standupToDelete.completedAt), "PP")}
                  </Typography>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    color={theme.palette.grey[800]}
                  >
                    {format(new Date(standupToDelete.completedAt), "pp")}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <ModalFooter
            isPrimaryDisabled={Boolean(deletingStandupId)}
            primaryButtonLabel="Delete"
            onCancel={() => setStandupToDelete(null)}
            containerSx={{
              gap: 1.5,
              p: 2.5,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(244,238,227,0.78))",
            }}
            cancelButtonSx={{
              fontSize: 15.5,
              borderRadius: 999,
              px: 2,
            }}
            primaryButtonSx={{
              minWidth: 180,
              minHeight: 44,
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 700,
              px: 3,
            }}
            onPrimaryClick={async () => {
              if (!standupToDelete) return;

              try {
                await deleteStandupAction(standupToDelete._id);

                if (selectedStandup?._id === standupToDelete._id) {
                  setSelectedStandup(null);
                }

                setStandupToDelete(null);
                notifyAlert("success", "Standup deleted successfully");
              } catch {
                notifyAlert("error", "Failed to delete standup");
              }
            }}
          />
        </ModalWrapper>
      </Modal>
    </ThemeProvider>
  );
};
