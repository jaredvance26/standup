import { teamMembers } from "../../../local";
import { StandupWizardAction } from "../standup-wizard-store";

export const resetStandupWizardStoreAction = (): StandupWizardAction => ({ setState }) => {
  setState({
    currentStep: 0,
    selectedTeamMemberIds: [],
	teamMembers: teamMembers.reduce((acc, member) => ({ ...acc, [member.id]: member }), {}),
  });
};
