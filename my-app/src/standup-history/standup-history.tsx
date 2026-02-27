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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: COLOR_SHADES[themeColor].main,
            light: COLOR_SHADES[themeColor].light,
            dark: COLOR_SHADES[themeColor].dark,
          },
        },
        typography: {
          fontFamily: '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
          button: {
            textTransform: "none",
          },
        },
        shape: {
          borderRadius: 3,
        },
      }),
    [themeColor]
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
      <Box marginY={3}>
        <StandupHistoryHeader />
        <Box
          margin={3}
          padding={5}
          borderRadius={3}
          sx={{
            height: "77vh",
            backgroundColor: "#F6F6F4",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              padding: 3,
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
                    border: 1,
                    borderColor: "divider",
                    p: 2,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
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
        >
          <Box
            marginTop={5}
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
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
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 3,
                  padding: 2,
                  display: "flex",
                  gap: 1,
                  width: "45%",
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
