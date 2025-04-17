import { ReactElement } from "react";
import { JiraIssue, Sprint } from "../../../types";
import { JiraSection } from "../components";


export const getJiraSectionContent = (sprint: Sprint | null, issues: JiraIssue[]): ReactElement => {
	if (sprint && sprint.id) {
		return <JiraSection sprint={sprint} issues={issues} />
	}
	return <></>
}