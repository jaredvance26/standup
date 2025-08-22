import { Settings } from "../types";
import { SettingsContract } from "../api/contracts";

export const prepareUpdatedSettings = (
  settings: Settings
): SettingsContract => {
  const { apiToken, jiraUsername, jiraUrl } = settings.jiraSettings;
  return {
    theme: settings.selectedColor,
    teamName: settings.teamName,
    standup: {
      hideUnselectedEmployees: settings.hideEmployees,
      showStatusField: settings.showStatusField,
    },
    jiraData: {
      apiToken,
      jiraUsername,
      jiraUrl,
    },
  };
};
