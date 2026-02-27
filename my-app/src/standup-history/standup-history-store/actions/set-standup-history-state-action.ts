import { StandupHistoryAction, StandupHistoryState } from "../standup-history-store";

export const setStandupHistoryStateAction =
  (payload: Partial<StandupHistoryState>): StandupHistoryAction =>
  ({ setState }) => {
    setState(payload);
  };
