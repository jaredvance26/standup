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
} from "./actions";
import { getJiraSectionContentSelector } from "./selectors";
import { Colors, JiraIssue, Sprint, Settings } from "../types";
import { TeamMember } from "../../types";
import { teamMembers } from "../../local";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
  teamMembers: Record<number, TeamMember>;
  settingsModalOpen: boolean;
  userId: string;
  // Jira data
  isJiraDataLoading: boolean;
  sprint: Sprint | null;
  issues: JiraIssue[];
  // settings
  isSettingsDataLoading: boolean;
  settings: Settings;
  originalSettings: Settings;
}

const initialSettingsState = {
  selectedColor: Colors.Blue,
  hideEmployees: true,
};

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  teamMembers: teamMembers.reduce(
    (acc, member) => ({ ...acc, [member.id]: member }),
    {}
  ),
  userId: "",
  settingsModalOpen: false,
  // Jira data
  isJiraDataLoading: false,
  sprint: null,
  issues: [],
  //settings
  isSettingsDataLoading: false,
  settings: initialSettingsState,
  originalSettings: initialSettingsState,
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
      dispatch(getJiraDataAction());
      if (userId) {
        setState({ userId });
        dispatch(getUserSettingsAction(userId));
      }
    },
	onUpdate:
		() =>
		({ setState, dispatch }, { userId }) => {
		  if (userId) {
			  setState({ userId });
			  dispatch(getUserSettingsAction(userId));
		  }
		},
});

export const useGetJiraSectionContent = createHook(StandupWizardStore, {
  selector: getJiraSectionContentSelector,
});
