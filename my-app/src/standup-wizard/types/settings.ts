import { Colors } from "./colors";

export interface Settings {
	theme: Colors;
	standup: {
	  hideUnselectedEmployees: boolean;
	  showStatusField: boolean;
	};
  }