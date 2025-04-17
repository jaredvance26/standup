import { MemberStatus } from "./member-status";

export interface TeamMember {
	firstName: string;
	id: number;
	jiraId?: string;
	lastName: string;
	photoUrl: string;
	position: string;
	notes: string;
	status: MemberStatus;
	hasBeenViewed: boolean;
}