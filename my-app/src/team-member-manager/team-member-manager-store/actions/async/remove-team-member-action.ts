import { getTeamMembersAction } from "./get-team-members-action";
import { TeamMemberManagerAction } from "../../team-member-manager-store";
import { deleteTeamMember } from "../../../../api/team-members";

export const removeTeamMemberAction =
  (teamMemberId: string, onSuccess: () => void): TeamMemberManagerAction =>
  async ({ getState, setState, dispatch }) => {
    const { userId } = getState();
    setState({
      isTeamDataLoading: true,
    });
    try {
      await deleteTeamMember(teamMemberId);
      dispatch(getTeamMembersAction(userId));
      onSuccess();
    } catch (error) {
      console.error("Error fetching team members:", error);
      setState({
        isTeamDataLoading: false,
      });
    }
  };
