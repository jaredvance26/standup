import { Colors } from "../types";


export interface SettingsContract {
	theme: Colors;
	teamName: string;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
	jiraData: {
		apiToken: string | null;
		jiraUsername: string | null;
		jiraUrl: string | null;
	}
  }
