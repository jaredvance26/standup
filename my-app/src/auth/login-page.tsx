import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "./auth-store";
import { SignupModal } from "./components";
import { notifyAlert } from "../alerts/alert-notifier";
import { MessageAlertHost } from "../alerts/MessageAlertHost";
import roundTable from "../static/round-table.png";
import { Loader } from "../components";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [{ email, password, isLoading }, { loginAction, setAuthDataAction }] =
    useAuthStore();

  const [signupModalOpen, setSignupModalOpen] = useState<boolean>(false);

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <MessageAlertHost />
      <Box
        sx={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffd6a6, transparent 68%)",
          top: -70,
          right: -110,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(150deg, rgba(255,253,248,0.92), rgba(245,238,226,0.9))",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            border: "1px solid rgba(19, 41, 61, 0.12)",
            boxShadow: "0 24px 50px rgba(19, 41, 61, 0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,246,238,0.96))",
          }}
        >
          <Box display="flex" alignItems="center" gap={2} justifyContent="center">
            <img src={roundTable} alt="Logo" style={{ width: 56, height: 56 }} />
            <Box>
              <Typography
                fontFamily='"Newsreader", serif'
                fontSize={{ xs: 38, md: 44 }}
                lineHeight={1}
                fontWeight={700}
              >
                Standup
              </Typography>
              <Typography
                fontSize={14}
                letterSpacing="0.08em"
                textTransform="uppercase"
                color="text.secondary"
              >
                Daily Team Pulse
              </Typography>
            </Box>
          </Box>
          <Typography fontSize={20} textAlign="center" fontWeight={600}>
            Welcome Back
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setAuthDataAction({ email: e.target.value })}
            autoComplete="email"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setAuthDataAction({ password: e.target.value })}
            autoComplete="current-password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          />
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Loader size="80" />
            </Box>
          ) : (
            <Button
              disabled={!email || !password}
              onClick={() =>
                loginAction(
                  () => navigate("/standup"),
                  () => notifyAlert("error", "Invalid username or password")
                )
              }
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 999,
                width: "60%",
                margin: "auto",
                height: "48px",
                marginTop: 2,
                fontSize: 17,
                color: "#ffffff",
                backgroundImage:
                  "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.82)",
                  backgroundImage: "none",
                  backgroundColor: "rgba(15, 118, 110, 0.45)",
                },
              }}
            >
              Login
            </Button>
          )}
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography
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
                fontWeight: 700,
              }}
            >
              Sign up
            </Button>
          </Box>
        </Paper>
      </Box>
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
      />
    </Box>
  );
};
