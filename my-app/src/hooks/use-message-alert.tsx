import React, { useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

/**
 * useMessageAlert - Custom hook for showing a drop-down MUI Alert for 5 seconds
 * @returns [setMessage, AlertComponent]
 */
export function useMessageAlert(): [
  (severity: "success" | "info" | "warning" | "error", message: string) => void,
  React.ReactElement | null
] {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [alertMessage, setAlertMessage] = useState("");
  const alertTimeout = useRef<NodeJS.Timeout | null>(null);

  const setMessage = useCallback(
    (severity: "success" | "info" | "warning" | "error", message: string) => {
      setAlertSeverity(severity);
      setAlertMessage(message);
      setAlertOpen(true);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
      alertTimeout.current = setTimeout(() => setAlertOpen(false), 3000);
    },
    []
  );

  const AlertComponent = typeof window !== 'undefined' && window.document
    ? ReactDOM.createPortal(
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            zIndex: 1400,
          }}
        >
          <Collapse in={alertOpen}>
            <Alert
              severity={alertSeverity}
              onClose={() => setAlertOpen(false)}
              sx={{ borderRadius: 3 }}
              variant="filled"
            >
              {alertMessage}
            </Alert>
          </Collapse>
        </Box>,
        window.document.body
      )
    : null;

  return [setMessage, AlertComponent];
}
