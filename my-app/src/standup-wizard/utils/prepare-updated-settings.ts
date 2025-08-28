import { Settings } from "../types";
import { SettingsPOSTContract } from "../api/contracts";

export const prepareUpdatedSettings = (
  settings: Settings
): SettingsPOSTContract => {
  const { apiToken, jiraUsername, jiraUrl, jiraBoardId } =
    settings.jiraSettings;
  return {
    theme: settings.selectedColor,
    teamName: settings.teamName,
    standup: {
      hideUnselectedEmployees: settings.hideEmployees,
      showStatusField: settings.showStatusField,
    },
    jiraData: {
      apiToken: apiToken === "*********************" ? null : apiToken,
      jiraUsername,
      jiraUrl,
      jiraBoardId,
    },
  };
};
