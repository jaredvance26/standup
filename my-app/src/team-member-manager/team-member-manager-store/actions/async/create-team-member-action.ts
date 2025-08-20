import { getTeamMembersAction } from "./get-team-members-action";
import { TeamMemberManagerAction } from "../../team-member-manager-store";
import { TeamMemberContract } from "../../../../api/contracts";
import { createTeamMember } from "../../../../api/team-members";

export const createTeamMemberAction =
  (
    teamMemberData: Omit<TeamMemberContract, "id">,
    onSuccess: () => void
  ): TeamMemberManagerAction =>
  async ({ getState, dispatch, setState }) => {
    const { userId } = getState();
    setState({
      isTeamDataLoading: true,
    });
    try {
      await createTeamMember(teamMemberData);
      dispatch(getTeamMembersAction(userId));
      onSuccess();
    } catch (error) {
      console.error("Error fetching team members:", error);
      setState({
        isTeamDataLoading: false,
      });
    }
  };
