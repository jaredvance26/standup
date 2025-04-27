import { ReactElement } from "react";
import { StandupWizard } from "./standup-wizard";
import { StandupWizardContainer } from "./standup-wizard-store/standup-wizard-store";

export const StandupWizardConnector = (props: { userId: string }): ReactElement => {
	const { userId } = props;

  return (
    <StandupWizardContainer userId={userId}>
      <StandupWizard />
    </StandupWizardContainer>
  );
};
