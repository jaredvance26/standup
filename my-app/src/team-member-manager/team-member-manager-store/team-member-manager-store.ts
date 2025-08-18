import {
  Action,
  createContainer,
  createHook,
  createStore,
  defaults,
} from "react-sweet-state";
import {
  setTeamMemberManagerStateAction,
  getTeamMembersAction,
} from "./actions";
import { TeamMemberContract } from "../../api/contracts";

defaults.devtools = true;

export interface TeamMemberManagerState {
  teamMembers: TeamMemberContract[];
  selectedTeamMemberIds: number[];
  isTeamDataLoading: boolean;
}

const initialState: TeamMemberManagerState = {
  teamMembers: [],
  selectedTeamMemberIds: [],
  isTeamDataLoading: false,
};

const actions = {
  setTeamMemberManagerStateAction,
  getTeamMembersAction,
};

const TeamMemberManagerStore = createStore({
  name: "TeamMemberManagerStore",
  initialState: initialState,
  actions,
});

export const useTeamMemberManagerStore = createHook(TeamMemberManagerStore);

export type TeamMemberManagerAction = Action<TeamMemberManagerState>;

type TeamMemberManagerProps = {
  userId: string;
};

export const TeamMemberManagerContainer = createContainer<
  typeof initialState,
  typeof actions,
  TeamMemberManagerProps
>(TeamMemberManagerStore, {
  onInit:
    () =>
    ({ dispatch }, { userId }) => {
      if (userId) {
        dispatch(getTeamMembersAction(userId));
      }
    },
  onUpdate:
    () =>
    ({ dispatch }, { userId }) => {
      if (userId) {
        dispatch(getTeamMembersAction(userId));
      }
    },
});
