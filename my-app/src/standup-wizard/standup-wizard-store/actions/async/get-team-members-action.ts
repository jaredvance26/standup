import { StandupWizardAction } from "../../standup-wizard-store";
import { getTeamMembers } from "../../../../api/team-members";
import { MemberStatus } from "../../../../types";

export const getTeamMembersAction =
  (): StandupWizardAction =>
  async ({ setState, getState }) => {
    const { userId } = getState();

    if (!userId) {
      console.error("Cannot fetch team members: userId is not set");
      return;
    }

    setState({
      areTeamMembersLoading: true,
    });

    try {
      const teamMembersData = await getTeamMembers(userId);

      // Convert array to record object with id as key
      const teamMembersRecord = teamMembersData.reduce(
        (acc, member) => ({
          ...acc,
          [member.id]: {
            ...member,
            isGuest: false,
            notes: "",
            status: MemberStatus.None,
            hasBeenViewed: false,
          },
        }),
        {}
      );

      setState({
        teamMembers: teamMembersRecord,
        areTeamMembersLoading: false,
        serverTeamMembers: teamMembersData,
      });
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      setState({
        areTeamMembersLoading: false,
      });
    }
  };
