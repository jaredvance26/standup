import { JiraIssueStatus } from "../../../types";

export const getJiraIssueStatusColor = (status: JiraIssueStatus) => {
	if (status === JiraIssueStatus.Done) {
		return 'success';
	}
	if (status === JiraIssueStatus.InProgress || status === JiraIssueStatus.CodeReview) {
		return 'info';
	}
	return 'default';
}