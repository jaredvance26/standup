import { TeamMemberManagerAction, TeamMemberManagerState } from "../team-member-manager-store";

export const setTeamMemberManagerStateAction =
  (state: Partial<TeamMemberManagerState>): TeamMemberManagerAction =>
  ({ setState }) => {
    setState(state);
  };
