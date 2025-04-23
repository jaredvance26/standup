import React, { createContext } from "react";
import { useAuthStore } from "../auth-store";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ isAuthenticated }, { setAuthDataAction }] = useAuthStore();

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
