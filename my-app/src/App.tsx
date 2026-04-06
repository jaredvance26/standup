import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";

import { AuthConnector, LoginPage, useAuthStore } from "./auth";
import { StandupWizardConnector } from "./standup-wizard";
import { TeamMemberManagerConnector } from "./team-member-manager";
import { StandupHistoryConnector } from "./standup-history";
import { Loader, NavBar } from "./components";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
    <NavBar />
    <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
  </Box>
);

const AppRoutes = () => {
  const [{ isAuthenticated, userId, isTokenValidationLoading, isLoading }] =
    useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isTokenValidationLoading ? (
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
          ) : isAuthenticated ? (
            <Navigate to="/standup" />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/standup"
        element={
          isAuthenticated && !isTokenValidationLoading && !isLoading ? (
            <AuthenticatedLayout>
              <StandupWizardConnector userId={userId || ""} />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/team-members"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <TeamMemberManagerConnector userId={userId || ""} />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/standup-history"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <StandupHistoryConnector userId={userId || ""} />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthConnector>
          <AppRoutes />
        </AuthConnector>
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
