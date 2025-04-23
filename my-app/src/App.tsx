import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StandupWizardConnector } from "./standup-wizard";
import { LoginPage } from "./auth/login-page";
import { AuthProvider, useAuth } from "./auth/auth-context";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/standup" /> : <LoginPage />} />
      <Route
        path="/standup"
        element={
          isAuthenticated ? <StandupWizardConnector /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
};

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
