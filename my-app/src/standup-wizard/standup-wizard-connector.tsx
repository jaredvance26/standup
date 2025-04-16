import { ReactElement } from "react";
import { StandupWizard } from "./standup-wizard";
import { StandupWizardContainer } from "./standup-wizard-store/standup-wizard-store";

export const StandupWizardConnector = (): ReactElement => {
  return (
    <StandupWizardContainer>
      <StandupWizard />
    </StandupWizardContainer>
  );
};
