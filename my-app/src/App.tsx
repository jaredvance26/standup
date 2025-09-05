import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { AuthConnector, LoginPage, useAuthStore } from "./auth";
import { StandupWizardConnector } from "./standup-wizard";
import { TeamMemberManagerConnector } from "./team-member-manager";
import { Loader } from "./components";

const AppRoutes = () => {
  const [{ isAuthenticated, userId, isTokenValidationLoading, isLoading }] =
    useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated && isTokenValidationLoading ? (
            <Loader />
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

// Get the API URL from environment or use a fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [serverAwakeAttempts, setServerAwakeAttempts] = useState(0);
  
  useEffect(() => {
    // Function to check if server is awake
    const checkServerStatus = async () => {
      try {
        // Send a request to the health check endpoint with full URL
        const response = await fetch(`${API_URL}/health`);
        
        if (response.ok) {
          setIsInitialLoading(false);
        } else {
          // If server isn't ready yet, retry after a delay
          if (serverAwakeAttempts < 5) {
            setTimeout(() => {
              setServerAwakeAttempts(prev => prev + 1);
            }, 3000); // Retry every 3 seconds
          } else {
            // After 5 attempts (15 seconds), proceed anyway
            setIsInitialLoading(false);
          }
        }
      } catch (error) {
        // Network error likely means server isn't up yet
        if (serverAwakeAttempts < 5) {
          setTimeout(() => {
            setServerAwakeAttempts(prev => prev + 1);
          }, 3000); // Retry every 3 seconds
        } else {
          // After 5 attempts (15 seconds), proceed anyway
          setIsInitialLoading(false);
        }
      }
    };
    
    // Initial check
    checkServerStatus();
    
    // Retry when attempts change
    if (serverAwakeAttempts > 0 && isInitialLoading) {
      checkServerStatus();
    }
    
  }, [serverAwakeAttempts, isInitialLoading]);
  
  if (isInitialLoading) {
    return <Loader message="Waking up the server, please wait..." />;
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
