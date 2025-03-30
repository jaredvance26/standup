import { Action, createHook, createStore, defaults } from "react-sweet-state";
import {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
  setStandupWizardStateAction,
} from "./actions";
import { TeamMember } from "../../types";
import { teamMembers } from "../../local";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
  teamMembers: TeamMember[];
  teamMemberNotes: Record<number, string>;
}

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
  teamMembers: [...teamMembers],
  teamMemberNotes: {},
};

const actions = {
  addGuestAction,
  navigateBackwardAction,
  navigateForwardAction,
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
