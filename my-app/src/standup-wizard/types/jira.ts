export interface Sprint {
	id: string;
	name: string;
	state: string;
	startDate: string;
	endDate: string;
	goals: string;
  }

  export interface JiraIssue {
	id: string;
	key: string;
	fields: {
	  summary: string;
	  description: string;
	  status: {
		name: string;
		id: string;
	  };
	  assignee: {
		accountId: string;
		displayName: string;
		emailAddress: string;
	  };
	};
  }

  export interface JiraGetData {
	issues: JiraIssue[];
	sprint: Sprint | null;
  }