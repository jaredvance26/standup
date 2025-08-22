import { StandupWizardAction } from "../../standup-wizard-store";
import { getUserSettings } from "../../../api/get-user-settings";

export const getUserSettingsAction =
  (userId: string): StandupWizardAction =>
  async ({ getState, setState }) => {
    const { isSettingsDataLoading } = getState();
    if (isSettingsDataLoading) return;
    setState({ isSettingsDataLoading: true });
    try {
      const userSettings = await getUserSettings(userId);
      if (userSettings) {
        setState({
          settings: {
            teamName: userSettings.teamName,
            selectedColor: userSettings.theme,
            hideEmployees: userSettings.standup.hideUnselectedEmployees,
            showStatusField: userSettings.standup.showStatusField,
            jiraSettings: {
				apiToken: userSettings.jiraData.apiToken,
				jiraUsername: userSettings.jiraData.jiraUsername,
				jiraUrl: userSettings.jiraData.jiraUrl,
			}
          },
          originalSettings: {
            teamName: userSettings.teamName,
            selectedColor: userSettings.theme,
            hideEmployees: userSettings.standup.hideUnselectedEmployees,
            showStatusField: userSettings.standup.showStatusField,
            jiraSettings: {
				apiToken: userSettings.jiraData.apiToken,
				jiraUsername: userSettings.jiraData.jiraUsername,
				jiraUrl: userSettings.jiraData.jiraUrl,
			}
          },
          isSettingsDataLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setState({ isSettingsDataLoading: false });
    }
  };
