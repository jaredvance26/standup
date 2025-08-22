import { Colors } from "../types";


export interface SettingsContract {
	theme: Colors;
	teamName: string;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
  }
