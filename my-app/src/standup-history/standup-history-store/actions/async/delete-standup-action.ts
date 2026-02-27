import { deleteStandup } from "../../../../standup-wizard/api";
import { StandupHistoryAction } from "../../standup-history-store";

export const deleteStandupAction =
  (standupId: string): StandupHistoryAction =>
  async ({ getState, setState }) => {
    const { deletingStandupId, userId, standups } = getState();
    if (deletingStandupId || !userId) return;

    setState({ deletingStandupId: standupId });

    try {
      await deleteStandup(userId, standupId);
      setState({
        standups: standups.filter((standup) => standup._id !== standupId),
      });
    } catch (error) {
      console.error("Failed to delete standup:", error);
      throw error;
    } finally {
      setState({ deletingStandupId: null });
    }
  };
