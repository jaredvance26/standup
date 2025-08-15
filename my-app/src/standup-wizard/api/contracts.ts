import { Colors } from "../types";


export interface SettingsContract {
	theme: Colors;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
  }

  export interface TeamMemberContract {
	id: string;
	firstName: string;
	lastName: string;
	position?: string;
	jiraId?: string;
	userId: string;
  }