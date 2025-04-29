import { Settings, SettingsContract } from "../types";

export const prepareUpdatedSettings = (settings: Settings): SettingsContract => {
  return {
	theme: settings.selectedColor,
	standup: {
	  hideUnselectedEmployees: settings.hideEmployees,
	  showStatusField: false
	}
  }
};