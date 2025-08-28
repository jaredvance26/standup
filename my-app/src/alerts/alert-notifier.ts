export type AlertSeverity = "success" | "info" | "warning" | "error";

export type AlertListener = (severity: AlertSeverity, message: string) => void;

class AlertNotifier {
  private listeners = new Set<AlertListener>();

  subscribe(listener: AlertListener) {
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: AlertListener) {
    this.listeners.delete(listener);
  }

  emit(severity: AlertSeverity, message: string) {
    this.listeners.forEach((listener) => {
      try {
        listener(severity, message);
      } catch (e) {
        // swallow listener errors to avoid breaking others
        // eslint-disable-next-line no-console
        console.error("Alert listener error:", e);
      }
    });
  }
}

const notifier = new AlertNotifier();

export const notifyAlert = (severity: AlertSeverity, message: string) => {
  notifier.emit(severity, message);
};

export const subscribeToAlerts = (listener: AlertListener) => notifier.subscribe(listener);
