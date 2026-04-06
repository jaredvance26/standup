import { TeamMemberManagerAction } from "../../team-member-manager-store";
import { getUserSettings } from "../../../../standup-wizard/api";
import { setAppThemeColor } from "../../../../stores/app-theme-store";

export const getUserSettingsAction =
  (userId: string): TeamMemberManagerAction =>
  async ({ getState, setState }) => {
    const { isSettingsDataLoading } = getState();
    if (isSettingsDataLoading) return;

    setState({ isSettingsDataLoading: true });
    try {
      const userSettings = await getUserSettings(userId);
      if (userSettings) {
        setAppThemeColor(userSettings.theme);
        setState({
          themeColor: userSettings.theme,
          isSettingsDataLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setState({ isSettingsDataLoading: false });
    }
  };
