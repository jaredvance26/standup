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
} from "./actions";
import { getJiraSectionContentSelector } from "./selectors";
import { TeamMember } from "../../types";
import { teamMembers } from "../../local";
import { Colors, JiraIssue, Sprint } from "../types";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
  teamMembers: Record<number, TeamMember>;
  settingsModalOpen: boolean;
  // Jira data
  isJiraDataLoading: boolean;
  sprint: Sprint | null;
  issues: JiraIssue[];
  // settings
  isSettingsDataLoading: boolean;
  settings: {
    selectedColor: Colors;
    hideEmployees: boolean;
  };
}

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  teamMembers: teamMembers.reduce(
    (acc, member) => ({ ...acc, [member.id]: member }),
    {}
  ),
  settingsModalOpen: false,
  // Jira data
  isJiraDataLoading: false,
  sprint: null,
  issues: [],
  //settings
  isSettingsDataLoading: false,
  settings: {
    selectedColor: Colors.Blue,
    hideEmployees: true,
  },
};

const actions = {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  resetStandupWizardStoreAction,
  setStandupWizardStateAction,
  getJiraDataAction,
  getUserSettingsAction,
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
    ({ dispatch }, { userId }) => {
      dispatch(getJiraDataAction());
      if (userId) {
        dispatch(getUserSettingsAction(userId));
      }
    },
	onUpdate:
		() =>
		({ dispatch }, { userId }) => {
		  if (userId) {
			  dispatch(getUserSettingsAction(userId));
		  }
		},
});

export const useGetJiraSectionContent = createHook(StandupWizardStore, {
  selector: getJiraSectionContentSelector,
});
