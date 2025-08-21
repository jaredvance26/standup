import { StandupWizardAction } from "../standup-wizard-store";

export const resetStandupWizardStoreAction =
  (): StandupWizardAction =>
  ({ setState, getState }) => {
    const { serverTeamMembers } = getState();
    setState({
      currentStep: 0,
      selectedTeamMemberIds: [],
      teamMembers: serverTeamMembers.reduce(
        (acc, member) => ({ ...acc, [member.id]: member }),
        {}
      ),
    });
  };
