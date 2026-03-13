import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../auth-store";
import { ModalWrapper } from "../../components";
import roundTable from "../../static/round-table.png";

interface SignupModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = (
  props: SignupModalInterface
): React.ReactElement => {
  const { isOpen, onClose } = props;
  const { palette } = useTheme();
  const [, { signupAction }] = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  // Password requirements
  const passwordRequirements: {
    label: string;
    test: (pw: string) => boolean;
  }[] = [
    {
      label: "At least 6 characters",
      test: (pw: string) => pw.length >= 6,
    },
    {
      label: "At least one uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one number",
      test: (pw: string) => /[0-9]/.test(pw),
    },
    {
      label: "At least one symbol",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];
  const passwordValid = passwordRequirements.every((req) => req.test(password));

  const handleSignup = () => {
    signupAction(email, password, () => {
      onClose();
      navigate("/standup");
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disableEscapeKeyDown
      disableAutoFocus
      aria-labelledby="signup-modal-title"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(0, 0, 0, .5)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
    >
      <ModalWrapper
        onClose={onClose}
        headerName="Sign Up"
        modalIcon={<img src={roundTable} alt="Logo" width={50} height={50} />}
        modalHeight={850}
        containerSx={{
          borderRadius: 5,
          border: "1px solid rgba(19, 41, 61, 0.12)",
          boxShadow: "0 28px 60px rgba(19, 41, 61, 0.22)",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,242,232,0.95))",
        }}
        headerSx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(244,238,227,0.9))",
          borderBottom: "1px solid rgba(19, 41, 61, 0.12)",
          p: 2.25,
        }}
        titleSx={{
          fontFamily: '"Newsreader", serif',
          fontSize: 38,
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1,
        }}
        closeButtonSx={{
          color: "text.primary",
          "&:hover": {
            color: "primary.dark",
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            overflowY: "auto",
            px: { xs: 2, md: 5 },
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                borderRadius: 4,
                px: 2.5,
                py: 2,
                border: "1px solid rgba(19, 41, 61, 0.1)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(244,238,227,0.8))",
                boxShadow: "0 12px 30px -22px rgba(19, 41, 61, 0.4)",
              }}
            >
              <Typography fontSize={22} fontWeight={700} mb={0.5}>
                Create your account
              </Typography>
              <Typography color={palette.text.secondary}>
                Choose a secure password to get started.
              </Typography>
            </Box>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.length > 0 && !emailValid}
              helperText={
                email.length > 0 && !emailValid
                  ? "Please enter a valid email address."
                  : ""
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
            <Box>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                  },
                }}
              />
              <Box
                sx={{
                  mt: 1.5,
                  p: 1.25,
                  borderRadius: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.88)",
                  border: "1px solid rgba(19, 41, 61, 0.08)",
                }}
              >
                {passwordRequirements.map((req) => {
                  const fulfilled = req.test(password);
                  return (
                    <Box
                      key={req.label}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: fulfilled
                          ? "rgba(67, 160, 71, 0.12)"
                          : "transparent",
                        borderRadius: 2,
                        px: 1.25,
                        py: 0.75,
                        mb: 0.75,
                        border: fulfilled
                          ? "1px solid rgba(67, 160, 71, 0.38)"
                          : "1px solid rgba(19, 41, 61, 0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: 1,
                          backgroundColor: fulfilled
                            ? "success.main"
                            : "rgba(19, 41, 61, 0.2)",
                        }}
                      />
                      <Typography
                        sx={{
                          color: fulfilled ? "success.dark" : "text.secondary",
                          fontWeight: fulfilled ? 600 : 500,
                        }}
                      >
                        {req.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={
                confirmPassword.length > 0 && password !== confirmPassword
                  ? "Passwords do not match."
                  : ""
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              disabled={
                !emailValid || !passwordValid || password !== confirmPassword
              }
              sx={{
                borderRadius: 999,
                width: "100%",
                height: 48,
                fontSize: 17,
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
                boxShadow: "0 16px 30px -18px rgba(19, 41, 61, 0.5)",
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.82)",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </ModalWrapper>
    </Modal>
  );
};
