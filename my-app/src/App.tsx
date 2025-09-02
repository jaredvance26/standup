import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthConnector, LoginPage, useAuthStore } from "./auth";
import { StandupWizardConnector } from "./standup-wizard";
import { TeamMemberManagerConnector } from "./team-member-manager";
import { Loader } from "./components";

const AppRoutes = () => {
  const [{ isAuthenticated, userId }] = useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/standup" /> : <LoginPage />}
      />
      <Route
        path="/standup"
        element={
          isAuthenticated ? (
            <StandupWizardConnector userId={userId || ""} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/team-members"
        element={
          isAuthenticated ? (
            <TeamMemberManagerConnector userId={userId || ""} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

function App() {
  const [{ isLoading, isTokenValidationLoading }] = useAuthStore();

  if (isLoading || isTokenValidationLoading) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AuthConnector>
          <AppRoutes />
        </AuthConnector>
      </div>
    </BrowserRouter>
  );
}

export default App;
