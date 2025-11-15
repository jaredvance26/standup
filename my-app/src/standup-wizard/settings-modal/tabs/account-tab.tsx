import { Box, Button, TextField, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { putUserEmail, putUserPassword } from "../../api";
import { notifyAlert } from "../../../alerts/alert-notifier";

interface AccountTabProps {
  userId: string;
}

export const AccountTab = (props: AccountTabProps): ReactElement => {
  const { userId } = props;

  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  return (
    <Box display="flex" flexDirection="column" gap={3} marginTop={2}>
      <Box padding={2} sx={{ backgroundColor: "#F5F5F5", borderRadius: 3 }}>
        <Typography variant="h6" marginBottom={1.5}>
          Change Email
        </Typography>
        <TextField
          label="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
              width: "500px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            try {
              await putUserEmail(userId, email);
              setEmail("");
              notifyAlert("success", "Email updated successfully!");
            } catch (error: any) {
              notifyAlert(
                "error",
                error.response?.data?.error || "Failed to update email"
              );
            }
          }}
          size="small"
          disabled={email.length === 0}
          sx={{
            fontSize: 14,
            display: "block",
            width: "150px",
            borderRadius: 3,
            marginTop: 3,
          }}
        >
          Update Email
        </Button>
      </Box>
      <Box padding={2} sx={{ backgroundColor: "#F5F5F5", borderRadius: 3 }}>
        <Typography variant="h6" marginBottom={1.5}>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
              width: "500px",
              marginBottom: 1.5,
            },
          }}
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "white",
              width: "500px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            try {
              await putUserPassword(userId, currentPassword, newPassword);
              setCurrentPassword("");
              setNewPassword("");
              notifyAlert("success", "Password updated successfully!");
            } catch (error: any) {
              notifyAlert(
                "error",
                error.response?.data?.error || "Failed to update password"
              );
            }
          }}
          size="small"
          disabled={currentPassword.length === 0 || newPassword.length === 0}
          sx={{
            fontSize: 14,
            width: "150px",
            borderRadius: 3,
            display: "block",
            marginTop: 3,
          }}
        >
          Update Password
        </Button>
      </Box>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        variant="contained"
        color="primary"
        sx={{
          fontSize: 18,
          width: "200px",
          borderRadius: 3,
          alignSelf: "center",
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};
