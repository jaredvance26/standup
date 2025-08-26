import { updateSettings } from "../../../api";
import { prepareUpdatedSettings } from "../../../utils";
import { StandupWizardAction } from "../../standup-wizard-store";

export const updateSettingsAction =
  (userId: string): StandupWizardAction =>
  async ({ getState, setState }) => {
    const { settings, isSettingsDataLoading } = getState();
    if (isSettingsDataLoading) return;
    setState({ isSettingsDataLoading: true });
    const updatedSettings = prepareUpdatedSettings(settings);
    try {
      const newSettings = await updateSettings(userId, updatedSettings);
      if (newSettings) {
        const settings = {
          teamName: newSettings.teamName,
          selectedColor: newSettings.theme,
          hideEmployees: newSettings.standup.hideUnselectedEmployees,
          showStatusField: newSettings.standup.showStatusField,
          jiraSettings: {
            apiToken: newSettings.jiraData.hasJiraApiToken
              ? "*********************"
              : "",
            jiraUsername: newSettings.jiraData.jiraUsername,
            jiraUrl: newSettings.jiraData.jiraUrl,
            jiraBoardId: newSettings.jiraData.jiraBoardId,
          },
        };
        setState({
          settings: settings,
          originalSettings: settings,
          isSettingsDataLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setState({ isSettingsDataLoading: false });
    }
  };
