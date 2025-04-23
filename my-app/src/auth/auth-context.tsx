import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "./auth-store/auth-store";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ isAuthenticated }, { setAuthDataAction }] = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3001/api/auth/validate-token", { token })
        .then((response) => {
          setAuthDataAction({ isAuthenticated: response.data.valid });
        })
        .catch(() => {
          setAuthDataAction({ isAuthenticated: false });
          localStorage.removeItem("token");
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: (value: boolean) =>
          setAuthDataAction({ isAuthenticated: value }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
