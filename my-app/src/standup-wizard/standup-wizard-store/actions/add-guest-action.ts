import { StandupWizardAction } from "../standup-wizard-store";

export const addGuestAction =
  (name: string): StandupWizardAction =>
  ({ getState, setState }) => {
    const { selectedTeamMemberIds, teamMembers } = getState();

    const newTeamMember = {
      id: teamMembers.length + 1,
      firstName: name,
      lastName: "",
      position: "",
      photoUrl: "",
    };

    setState({
      selectedTeamMemberIds: [...selectedTeamMemberIds, newTeamMember.id],
      teamMembers: [newTeamMember, ...teamMembers],
    });
  };
