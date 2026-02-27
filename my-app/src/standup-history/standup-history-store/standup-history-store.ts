import {
  Action,
  createContainer,
  createHook,
  createStore,
  defaults,
} from "react-sweet-state";
import { StandupGETContract } from "../../standup-wizard/api/contracts";
import { Colors } from "../../standup-wizard/types";
import {
  deleteStandupAction,
  getStandupsAction,
  getUserSettingsAction,
  setStandupHistoryStateAction,
} from "./actions";

defaults.devtools = true;

export interface StandupHistoryState {
  userId: string;
  standups: StandupGETContract[];
  isStandupsLoading: boolean;
  isSettingsLoading: boolean;
  deletingStandupId: string | null;
  themeColor: Colors;
}

const initialState: StandupHistoryState = {
  userId: "",
  standups: [],
  isStandupsLoading: false,
  isSettingsLoading: false,
  deletingStandupId: null,
  themeColor: Colors.Blue,
};

const actions = {
  deleteStandupAction,
  getStandupsAction,
  getUserSettingsAction,
  setStandupHistoryStateAction,
};

const StandupHistoryStore = createStore({
  name: "StandupHistoryStore",
  initialState,
  actions,
});

export const useStandupHistoryStore = createHook(StandupHistoryStore);
export type StandupHistoryAction = Action<StandupHistoryState>;

type StandupHistoryProps = {
  userId: string;
};

export const StandupHistoryContainer = createContainer<
  typeof initialState,
  typeof actions,
  StandupHistoryProps
>(StandupHistoryStore, {
  onInit:
    () =>
    ({ dispatch, setState }, { userId }) => {
      if (!userId) return;

      setState({ userId });
      dispatch(getStandupsAction(userId));
      dispatch(getUserSettingsAction(userId));
    },
  onUpdate:
    () =>
    ({ dispatch, setState }, { userId }) => {
      if (!userId) return;

      setState({ userId });
      dispatch(getStandupsAction(userId));
      dispatch(getUserSettingsAction(userId));
    },
});
