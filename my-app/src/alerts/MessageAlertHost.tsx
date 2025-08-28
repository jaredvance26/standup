import React, { useEffect } from "react";
import { useMessageAlert } from "../hooks/use-message-alert";
import { subscribeToAlerts, AlertSeverity } from "./alert-notifier";

export const MessageAlertHost: React.FC = () => {
  const [setMessage, AlertPortal] = useMessageAlert();

  useEffect(() => {
    const unsubscribe = subscribeToAlerts((severity: AlertSeverity, message: string) => {
      setMessage(severity, message);
    });
    return () => unsubscribe();
  }, [setMessage]);

  return AlertPortal;
};
