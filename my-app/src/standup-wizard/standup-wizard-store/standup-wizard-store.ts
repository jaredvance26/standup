import {
  Action,
  createContainer,
  createHook,
  createStore,
  defaults,
} from "react-sweet-state";
import {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  resetStandupWizardStoreAction,
  setStandupWizardStateAction,
  getJiraDataAction,
  getUserSettingsAction,
  updateSettingsAction,
  getTeamMembersAction,
} from "./actions";
import { getJiraSectionContentSelector } from "./selectors";
import { Colors, JiraIssue, Sprint, Settings, QuestionOfDay } from "../types";
import { TeamMemberContract } from "../../api/contracts";
import { TeamMember } from "../../types";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
  teamMembers: Record<number, TeamMember>;
  settingsModalOpen: boolean;
  userId: string;
  questionOfDay: QuestionOfDay;
  // Jira data
  isJiraDataLoading: boolean;
  sprint: Sprint | null;
  issues: JiraIssue[];
  // settings
  isSettingsDataLoading: boolean;
  settings: Settings;
  originalSettings: Settings;
  // team member
  areTeamMembersLoading: boolean;
  serverTeamMembers: TeamMemberContract[];
}

const initialSettingsState = {
  selectedColor: Colors.Blue,
  hideEmployees: true,
  showStatusField: true,
  teamName: "",
  jiraSettings: {
    apiToken: null,
    jiraUsername: null,
    jiraUrl: null,
    jiraBoardId: null,
  },
};

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  teamMembers: {},
  userId: "",
  settingsModalOpen: false,
  questionOfDay: {
	includeQuestion: false,
	isDuringStandup: false,
	question: ""
  },
  // Jira data
  isJiraDataLoading: false,
  sprint: null,
  issues: [],
  //settings
  isSettingsDataLoading: false,
  settings: initialSettingsState,
  originalSettings: initialSettingsState,
  // team member
  areTeamMembersLoading: false,
  serverTeamMembers: [],
};

const actions = {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  resetStandupWizardStoreAction,
  setStandupWizardStateAction,
  getJiraDataAction,
  getUserSettingsAction,
  updateSettingsAction,
  getTeamMembersAction,
};

const StandupWizardStore = createStore({
  name: "StandupWizardStore",
  initialState: initialState,
  actions,
});

export const useStandupWizardStore = createHook(StandupWizardStore);

export type StandupWizardAction = Action<StandupWizardState>;

type StandupWizardProps = {
  userId: string;
};

export const StandupWizardContainer = createContainer<
  typeof initialState,
  typeof actions,
  StandupWizardProps
>(StandupWizardStore, {
  onInit:
    () =>
    ({ setState, dispatch }, { userId }) => {
      if (userId) {
        dispatch(getJiraDataAction(userId));
        setState({ userId });
        dispatch(getUserSettingsAction(userId));
        dispatch(getTeamMembersAction());
      }
    },
  onUpdate:
    () =>
    ({ setState, dispatch }, { userId }) => {
      if (userId) {
        setState({ userId });
		dispatch(getJiraDataAction(userId));
        dispatch(getUserSettingsAction(userId));
        dispatch(getTeamMembersAction());
      }
    },
});

export const useGetJiraSectionContent = createHook(StandupWizardStore, {
  selector: getJiraSectionContentSelector,
});
