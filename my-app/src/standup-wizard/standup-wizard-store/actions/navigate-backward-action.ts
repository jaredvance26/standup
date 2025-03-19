import { StandupWizardAction } from "../standup-wizard-store";

export const navigateBackwardAction =
  (): StandupWizardAction =>
  ({ getState, setState }) => {
	const { currentStep } = getState();
	setState({ currentStep: currentStep - 1 });
  };
