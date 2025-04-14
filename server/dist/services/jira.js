"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraService = void 0;
const axios_1 = __importDefault(require("axios"));
class JiraService {
    constructor() {
        if (!process.env.JIRA_URL || !process.env.JIRA_EMAIL || !process.env.JIRA_API_TOKEN) {
            throw new Error('Missing required Jira configuration');
        }
        this.baseUrl = process.env.JIRA_URL;
        this.auth = {
            username: process.env.JIRA_EMAIL,
            password: process.env.JIRA_API_TOKEN
        };
    }
    async request(endpoint, method = 'GET', data) {
        try {
            const response = await (0, axios_1.default)({
                method,
                url: `${this.baseUrl}${endpoint}`,
                auth: this.auth,
                data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Jira API error:', error);
            throw error;
        }
    }
    async getUserIssues() {
        const sprintData = await this.request('/rest/agile/1.0/board/186/sprint?state=active');
        if (!sprintData.values || sprintData.values.length === 0) {
            return { issues: [], sprint: null };
        }
        const activeSprint = sprintData.values[0];
        const issues = await this.request(`/rest/agile/1.0/sprint/${activeSprint.id}/issue?fields=assignee,summary,status,issuetype`);
        return {
            issues: issues.issues || [],
            sprint: {
                id: activeSprint.id,
                name: activeSprint.name,
                state: activeSprint.state,
                startDate: activeSprint.startDate,
                endDate: activeSprint.endDate
            }
        };
    }
    async getIssue(issueId) {
        return this.request(`/rest/api/3/issue/${issueId}`);
    }
    async updateIssueStatus(issueId, statusId) {
        const data = {
            transition: {
                id: statusId
            }
        };
        return this.request(`/rest/api/3/issue/${issueId}/transitions`, 'POST', data);
    }
}
exports.JiraService = JiraService;
