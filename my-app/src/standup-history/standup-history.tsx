import { ReactElement, useMemo, useState } from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { History } from "@mui/icons-material";
import { format } from "date-fns";

import { StandupGETContract } from "../standup-wizard/api/contracts";
import { COLOR_SHADES } from "../standup-wizard/constants";
import { useStandupHistoryStore } from "./standup-history-store";
import { Loader, BlankState } from "../components";
import { StandupDetailsModal, StandupHistoryHeader } from "./components";
import { MessageAlertHost } from "../alerts/MessageAlertHost";

export const StandupHistory = (): ReactElement => {
  const [{ standups, isStandupsLoading, isSettingsLoading, themeColor }] =
    useStandupHistoryStore();
  const [selectedStandup, setSelectedStandup] = useState<StandupGETContract | null>(
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
                  <Typography fontSize={20} fontWeight={600}>
                    {format(new Date(standup.completedAt), "PP")}
                  </Typography>
                  <Typography fontSize={16} fontWeight={500} color="text.secondary">
                    {format(new Date(standup.completedAt), "pp")}
                  </Typography>
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
    </ThemeProvider>
  );
};
