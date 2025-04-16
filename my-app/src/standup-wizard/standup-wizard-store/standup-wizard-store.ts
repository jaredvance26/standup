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
import { TeamMember } from "../../types";
import { teamMembers } from "../../local";
import { Colors, JiraIssue, Sprint } from "../types";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedColor: Colors;
  selectedTeamMemberIds: number[];
  teamMembers: Record<number, TeamMember>;
  settingsModalOpen: boolean;
  // Jira data
  isJiraDataLoading: boolean;
  sprint: Sprint | null;
  issues: JiraIssue[];
}

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  selectedColor: Colors.Blue,
  teamMembers: teamMembers.reduce(
    (acc, member) => ({ ...acc, [member.id]: member }),
    {}
  ),
  settingsModalOpen: false,
  // Jira data
  isJiraDataLoading: false,
  sprint: null,
  issues: [],
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
