import { Action, createHook, createStore, defaults } from "react-sweet-state";
import {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  resetStandupWizardStoreAction,
  setStandupWizardStateAction,
} from "./actions";
import { TeamMember } from "../../types";
import { teamMembers } from "../../local";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
  teamMembers: Record<number, TeamMember>;
  settingsModalOpen: boolean;
}

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  teamMembers: teamMembers.reduce((acc, member) => ({ ...acc, [member.id]: member }), {}),
  settingsModalOpen: false,
};

const actions = {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  resetStandupWizardStoreAction,
  setStandupWizardStateAction,
};

const StandupWizardStore = createStore({
  name: "StandupWizardStore",
  initialState: initialState,
  actions,
});

export const useStandupWizardStore = createHook(StandupWizardStore);

export type StandupWizardAction = Action<StandupWizardState>;
// type StandupWizardShape = typeof initialState;
// type StandupWizardActions = typeof actions;
