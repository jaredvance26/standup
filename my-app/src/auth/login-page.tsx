import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "./auth-store";
import { SignupModal } from "./components";
import roundTable from "../static/round-table.png";
import { Loader } from "../components";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [{ email, password, isLoading }, { loginAction, setAuthDataAction }] =
    useAuthStore();

  const [signupModalOpen, setSignupModalOpen] = useState<boolean>(false);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        marginY={3}
        justifyContent="center"
      >
        <img src={roundTable} alt="Logo" />
        <Typography
          fontFamily='"Raleway", "Roboto", "Helvetica", "Arial", sans-serif'
          fontSize={64}
          fontWeight={800}
        >
          Standup
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#F6F6F4",
        }}
      >
        <Box
          component="form"
          padding={5}
          borderRadius={3}
          marginTop={10}
          sx={{
            width: "75%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "white",
          }}
        >
          <Typography
            fontFamily='"Raleway", "Roboto", "Helvetica", "Arial", sans-serif'
            fontSize={32}
            textAlign="center"
            fontWeight={600}
          >
            Welcome Back
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setAuthDataAction({ email: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setAuthDataAction({ password: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Loader size='80' />
            </Box>
          ) : (
            <Button
              disabled={!email || !password}
              onClick={() => loginAction(() => navigate("/standup"))}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 3,
                width: "50%",
                margin: "auto",
                height: "45px",
                marginTop: 2,
                fontSize: 18,
              }}
            >
              Login
            </Button>
          )}
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography
              fontFamily='"Raleway", "Roboto", "Helvetica", "Arial", sans-serif'
              fontSize={16}
            >
              Don't have an account?
            </Typography>
            <Button
              onClick={() => setSignupModalOpen(true)}
              variant="text"
              sx={{
                textTransform: "none",
                fontSize: 16,
                fontFamily:
                  '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
      />
    </Box>
  );
};
