import { Colors } from "../types";


export interface SettingsContract {
	theme: Colors;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
  }
