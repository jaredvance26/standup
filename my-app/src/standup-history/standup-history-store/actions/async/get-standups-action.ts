import { getStandups } from "../../../../standup-wizard/api";
import { StandupHistoryAction } from "../../standup-history-store";

export const getStandupsAction =
  (userId: string): StandupHistoryAction =>
  async ({ getState, setState }) => {
    const { isStandupsLoading } = getState();
    if (isStandupsLoading) return;

    setState({ isStandupsLoading: true });

    try {
      const standups = await getStandups(userId);
      setState({ standups });
    } catch (error) {
      console.error("Failed to fetch standup history:", error);
    } finally {
      setState({ isStandupsLoading: false });
    }
  };
