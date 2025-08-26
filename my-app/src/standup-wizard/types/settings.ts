import { Colors } from "./colors";

export interface Settings {
	teamName: string;
	selectedColor: Colors;
	hideEmployees: boolean;
	showStatusField: boolean;
	jiraSettings: {
		apiToken: string | null;
		jiraUsername: string | null;
		jiraUrl: string | null;
		jiraBoardId: string | null;
	}
}