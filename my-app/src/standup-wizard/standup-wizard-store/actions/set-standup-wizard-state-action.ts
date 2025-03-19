import {
  StandupWizardAction,
  StandupWizardState,
} from "../standup-wizard-store";

export const setStandupWizardStateAction =
  (partialState: Partial<StandupWizardState>): StandupWizardAction =>
  ({ setState }) => {
    setState(partialState);
  };
