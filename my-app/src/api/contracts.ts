export interface TeamMemberContract {
	id: string;
	firstName: string;
	lastName: string;
	position?: string;
	jiraId?: string;
	photoUrl?: string | null;
	userId: string;
}

export interface TeamMemberUpsertContract {
	firstName: string;
	lastName: string;
	position?: string;
	jiraId?: string;
	photoUrl?: string | null;
	photoDataUrl?: string;
	photoRemoved?: boolean;
	userId: string;
}
