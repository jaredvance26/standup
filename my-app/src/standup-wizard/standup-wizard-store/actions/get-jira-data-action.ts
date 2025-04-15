import { StandupWizardAction } from "../standup-wizard-store";
import { getJiraData } from "../../api/get-jira-data";

export const getJiraDataAction = (): StandupWizardAction => async ({ getState, setState }) => {
  const { isJiraDataLoading } = getState();
  if (isJiraDataLoading) return;
  setState({ isJiraDataLoading: true });
  try {
    const jiraData = await getJiraData();
    if (jiraData) {
      setState({
        issues: jiraData.issues,
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
  } finally {
    setState({ isJiraDataLoading: false });
  }
};