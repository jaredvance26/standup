import { StandupWizardAction } from "../../standup-wizard-store";
import { getUserSettings } from "../../../api/get-user-settings";
import { setAppThemeColor } from "../../../../stores/app-theme-store";

export const getUserSettingsAction =
  (userId: string): StandupWizardAction =>
  async ({ getState, setState }) => {
    const { isSettingsDataLoading } = getState();
    if (isSettingsDataLoading) return;
    setState({ isSettingsDataLoading: true });
    try {
      const userSettings = await getUserSettings(userId);
      if (userSettings) {
        const settings = {
          teamName: userSettings.teamName,
          selectedColor: userSettings.theme,
          hideEmployees: userSettings.standup.hideUnselectedEmployees,
          showStatusField: userSettings.standup.showStatusField,
          saveStandupData: userSettings.standup.saveStandupData,
          jiraSettings: {
            apiToken: userSettings.jiraData.hasJiraApiToken ? '*********************' : '',
            jiraUsername: userSettings.jiraData.jiraUsername,
            jiraUrl: userSettings.jiraData.jiraUrl,
            jiraBoardId: userSettings.jiraData.jiraBoardId,
          },
        };
        setAppThemeColor(userSettings.theme);
        setState({
          settings: settings,
          originalSettings: settings,
          isSettingsDataLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setState({ isSettingsDataLoading: false });
    }
  };
