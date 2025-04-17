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
};

const StandupWizardStore = createStore({
  name: "StandupWizardStore",
  initialState: initialState,
  actions,
});

export const useStandupWizardStore = createHook(StandupWizardStore);

export type StandupWizardAction = Action<StandupWizardState>;

export const StandupWizardContainer = createContainer<
  typeof initialState,
  typeof actions
>(StandupWizardStore, {
  onInit:
    () =>
    ({ dispatch }) => {
      dispatch(getJiraDataAction());
    },
});

export const useGetJiraSectionContent = createHook(StandupWizardStore, {
  selector: getJiraSectionContentSelector,
});
