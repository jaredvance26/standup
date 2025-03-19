import { StandupWizardAction } from "../standup-wizard-store";

export const navigateForwardAction =
  (): StandupWizardAction =>
  ({ getState, setState }) => {
	const { currentStep } = getState();
    setState({ currentStep: currentStep + 1 });
  };
