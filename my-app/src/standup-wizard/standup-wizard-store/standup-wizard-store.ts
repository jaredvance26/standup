import { Action, createHook, createStore, defaults } from "react-sweet-state";
import {
  navigateBackwardAction,
  navigateForwardAction,
  setStandupWizardStateAction,
} from "./actions";

defaults.devtools = true;

export interface StandupWizardState {
  currentStep: number;
  selectedTeamMemberIds: number[];
}

const initialState: StandupWizardState = {
  currentStep: 0,
  selectedTeamMemberIds: [],
};

const actions = {
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
