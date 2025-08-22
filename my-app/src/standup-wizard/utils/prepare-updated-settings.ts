import { Settings } from "../types";
import { SettingsContract } from '../api/contracts'

export const prepareUpdatedSettings = (settings: Settings): SettingsContract => {
  return {
	theme: settings.selectedColor,
	teamName: settings.teamName,
	standup: {
	  hideUnselectedEmployees: settings.hideEmployees,
	  showStatusField: settings.showStatusField
	}
  }
};