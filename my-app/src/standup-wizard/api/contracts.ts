import { Colors } from "../types";

export interface SettingsGETContract {
	theme: Colors;
	teamName: string;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
	jiraData: {
		jiraUsername: string | null;
		hasJiraApiToken: boolean;
		jiraBoardId: string | null;
		jiraUrl: string | null;
	}
  }


export interface SettingsPOSTContract {
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
		jiraBoardId: string | null;
	}
  }
