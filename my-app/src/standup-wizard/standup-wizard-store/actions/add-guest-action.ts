import { MemberStatus } from "../../../types";
import { StandupWizardAction } from "../standup-wizard-store";

export const addGuestAction =
  (name: string): StandupWizardAction =>
  ({ getState, setState }) => {
    const { selectedTeamMemberIds, teamMembers } = getState();

    const newTeamMember = {
      id: Math.max(0, ...Object.keys(teamMembers).map(Number)) + 1,
      firstName: name,
      lastName: "",
      position: "",
      photoUrl: "",
      notes: "",
      status: MemberStatus.None,
      jiraId: "",
	  hasBeenViewed: false,
    };

    setState({
      selectedTeamMemberIds: [...selectedTeamMemberIds, newTeamMember.id],
      teamMembers: { ...teamMembers, [newTeamMember.id]: newTeamMember },
    });
  };
