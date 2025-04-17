export interface Sprint {
	id: string;
	name: string;
	state: string;
	startDate: string;
	endDate: string;
	goals: string;
	issues: JiraIssue[];
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
	sprint: Sprint | null;
  }

  export enum JiraIssueStatus {
	ToDo = 'toDo',
	InProgress = 'in progress',
	CodeReview = 'code review',
	ReadyForUpload = 'ready for upload',
	Done = 'done',
	Cancelled = 'cancelled'
  }
  