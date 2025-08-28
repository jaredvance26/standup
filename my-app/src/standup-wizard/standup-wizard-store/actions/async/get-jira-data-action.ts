import { StandupWizardAction } from "../../standup-wizard-store";
import { getJiraData } from "../../../api/get-jira-data";
import { notifyAlert } from "../../../../alerts/alert-notifier";

export const getJiraDataAction = (userId: string): StandupWizardAction => async ({ getState, setState }) => {
  const { isJiraDataLoading } = getState();
  if (isJiraDataLoading) return;
  setState({ isJiraDataLoading: true });
  try {
    const jiraData = await getJiraData(userId);
    if (jiraData) {
      setState({
        issues: jiraData.sprint?.issues || [],
        sprint: jiraData.sprint
      });
    }
  } catch (error) {
    console.error('Failed to fetch Jira data:', error);
    // Set empty state on error
    setState({
      issues: [],
      sprint: null
    });
    notifyAlert('error', 'Failed to fetch Jira data');
  } finally {
    setState({ isJiraDataLoading: false });
  }
};