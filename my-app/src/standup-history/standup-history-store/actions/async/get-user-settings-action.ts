import { getUserSettings } from "../../../../standup-wizard/api";
import { StandupHistoryAction } from "../../standup-history-store";
import { setAppThemeColor } from "../../../../stores/app-theme-store";

export const getUserSettingsAction =
  (userId: string): StandupHistoryAction =>
  async ({ getState, setState }) => {
    const { isSettingsLoading } = getState();
    if (isSettingsLoading) return;

    setState({ isSettingsLoading: true });

    try {
      const settings = await getUserSettings(userId);
      setAppThemeColor(settings.theme);
      setState({ themeColor: settings.theme });
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setState({ isSettingsLoading: false });
    }
  };
