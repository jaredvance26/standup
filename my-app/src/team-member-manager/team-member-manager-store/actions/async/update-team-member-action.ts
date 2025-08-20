import { getTeamMembersAction } from "./get-team-members-action";
import { TeamMemberManagerAction } from "../../team-member-manager-store";
import { TeamMemberContract } from "../../../../api/contracts";
import { updateTeamMember } from "../../../../api/team-members";

export const updateTeamMemberAction =
  (
    updatedTeamMember: Omit<TeamMemberContract, "id">,
    teamMemberId: string,
    onSuccess: () => void
  ): TeamMemberManagerAction =>
  async ({ getState, dispatch, setState }) => {
    const { userId } = getState();
    setState({
      isTeamDataLoading: true,
    });
    try {
      await updateTeamMember(teamMemberId, updatedTeamMember);
      dispatch(getTeamMembersAction(userId));
      onSuccess();
    } catch (error) {
      console.error("Error fetching team members:", error);
      setState({
        isTeamDataLoading: false,
      });
    }
  };
