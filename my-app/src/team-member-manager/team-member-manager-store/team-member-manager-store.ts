import {
  Action,
  createContainer,
  createHook,
  createStore,
  defaults,
} from "react-sweet-state";
import { Colors } from "../../standup-wizard/types";
import {
  createTeamMemberAction,
  setTeamMemberManagerStateAction,
  getTeamMembersAction,
  removeTeamMemberAction,
  updateTeamMemberAction,
  getUserSettingsAction,
} from "./actions";
import { TeamMemberContract } from "../../api/contracts";

defaults.devtools = true;

export interface TeamMemberManagerState {
  teamMembers: TeamMemberContract[];
  selectedTeamMemberIds: number[];
  isTeamDataLoading: boolean;
  userId: string;
  isSettingsDataLoading: boolean;
  themeColor: Colors;
}

const initialState: TeamMemberManagerState = {
  teamMembers: [],
  selectedTeamMemberIds: [],
  isTeamDataLoading: false,
  userId: "",
  isSettingsDataLoading: false,
  themeColor: Colors.Blue,
};

const actions = {
  createTeamMemberAction,
  setTeamMemberManagerStateAction,
  getTeamMembersAction,
  removeTeamMemberAction,
  updateTeamMemberAction,
  getUserSettingsAction,
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
    ({ dispatch, setState }, { userId }) => {
      if (userId) {
        setState({ userId });
        dispatch(getTeamMembersAction(userId));
        dispatch(getUserSettingsAction(userId));
      }
    },
  onUpdate:
    () =>
    ({ dispatch, setState }, { userId }) => {
      if (userId) {
        setState({ userId });
        dispatch(getTeamMembersAction(userId));
        dispatch(getUserSettingsAction(userId));
      }
    },
});
