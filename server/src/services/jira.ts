import axios from 'axios';

export class JiraService {
  private baseUrl: string;
  private auth: { username: string; password: string };

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

  private async request(endpoint: string, method: string = 'GET', data?: any) {
    try {
      const response = await axios({
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
    } catch (error) {
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
      sprint: {
        id: activeSprint.id,
        name: activeSprint.name,
        state: activeSprint.state,
        startDate: activeSprint.startDate,
        endDate: activeSprint.endDate,
		goals: activeSprint.goal,
		issues: issues.issues || [],
      }
    };
  }
}
