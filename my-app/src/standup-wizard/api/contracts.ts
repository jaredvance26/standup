import { Colors } from "../types";

export interface SettingsGETContract {
	theme: Colors;
	teamName: string;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	  saveStandupData: boolean;
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
	  saveStandupData: boolean;
	};
	jiraData: {
		apiToken: string | null;
		jiraUsername: string | null;
		jiraUrl: string | null;
		jiraBoardId: string | null;
	}
}

export interface StandupTeamMemberSnapshotContract {
	memberId: string;
	firstName: string;
	lastName: string;
	position: string | null;
	jiraId: string | null;
	status: string;
	notes: string;
}

export interface CreateStandupPOSTContract {
	showStatusField: boolean;
	teamMembers: StandupTeamMemberSnapshotContract[];
}

export interface StandupGETContract {
	_id: string;
	userId: string;
	completedAt: string;
	showStatusField: boolean;
	teamMembers: StandupTeamMemberSnapshotContract[];
	createdAt: string;
	updatedAt: string;
}
