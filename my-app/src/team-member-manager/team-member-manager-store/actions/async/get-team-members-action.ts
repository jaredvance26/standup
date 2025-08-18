import { TeamMemberManagerAction } from "../../team-member-manager-store";
import { TeamMemberContract } from "../../../../api/contracts";
import { getTeamMembers } from "../../../../api/team-members";

export const getTeamMembersAction =
  (userId: string): TeamMemberManagerAction =>
  async ({ setState }) => {
    setState({
      isTeamDataLoading: true,
    });
    try {
      // Fetch team members from API
      const teamMembersData = await getTeamMembers(userId);

      // Convert array to record object with id as key
      const teamMembers: TeamMemberContract[] = teamMembersData.map(
        (member) => ({
          ...member,
          id: member.id,
        })
      );

      setState({
        teamMembers,
        isTeamDataLoading: false,
      });
    } catch (error) {
      console.error("Error fetching team members:", error);
      setState({
        isTeamDataLoading: false,
      });
    }
  };
