import { createSelector } from "react-sweet-state";
import { StandupWizardState } from "../standup-wizard-store";
import { getJiraSectionContent } from "../../steps/standup/utils/get-jira-section-content";
import { JiraIssue } from "../../types";

export const getJiraSectionContentSelector = createSelector(
  (state: StandupWizardState) => state.sprint,
  (_,props: { issues: JiraIssue[] }) => props.issues,
  (sprint, issues) => getJiraSectionContent(sprint, issues)
);