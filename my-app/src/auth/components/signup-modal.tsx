import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  Checkbox,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useAuthStore } from "../auth-store";
import roundTable from "../../static/round-table.png";
import { useNavigate } from "react-router-dom";

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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 800,
          bgcolor: palette.common.white,
          borderRadius: 3,
          boxShadow: 24,
          p: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: palette.grey[100],
            borderRadius: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: 1,
            borderColor: "divider",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <img src={roundTable} alt="Logo" width={50} height={50} />
            <Typography fontSize={32} fontWeight={600}>
              Sign Up
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "75%",
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.length > 0 && !/^\S+@\S+\.\S+$/.test(email)}
              helperText={
                email.length > 0 && !/^\S+@\S+\.\S+$/.test(email)
                  ? "Please enter a valid email address."
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
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
                    borderRadius: 3,
                  },
                }}
              />
              {/* Password checklist */}
              <Box bgcolor={palette.grey[100]} p={1} sx={{ ml: 1, mt: 2, borderRadius: 3 }}>
                {passwordRequirements.map((req, idx) => {
                  const fulfilled = req.test(password);
                  return (
                    <Box
                      key={req.label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: fulfilled ? '#e6f4ea' : 'transparent',
                        borderRadius: 2,
                        px: 1,
                        py: 0.5,
                        mb: 0.5,
                      }}
                    >
                      <Checkbox
                        checked={fulfilled}
                        disabled
                        sx={{ p: 0.5, color: fulfilled ? 'success.main' : undefined }}
                      />
                      <span style={{ color: fulfilled ? '#2e7d32' : undefined, fontWeight: fulfilled ? 600 : 400 }}>{req.label}</span>
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              disabled={
                !passwordValid ||
                password !== confirmPassword ||
                !/^\S+@\S+\.\S+$/.test(email)
              }
              sx={{
                borderRadius: 3,
                width: "50%",
                margin: "auto",
                height: "45px",
                marginTop: 2,
                fontSize: 18,
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
