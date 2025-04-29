import { Colors } from "./colors";

export interface SettingsContract {
	theme: Colors;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
  }