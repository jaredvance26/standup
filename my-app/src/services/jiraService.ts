import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface Sprint {
  id: string;
  name: string;
  state: string;
  startDate: string;
  endDate: string;
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
      displayName: string;
      emailAddress: string;
    };
  };
}

class JiraService {
  private async request<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}/jira${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Jira API error:', error);
      throw error;
    }
  }

  async getUserIssues(): Promise<{ issues: JiraIssue[]; sprint: Sprint | null }> {
    return this.request('/issues');
  }

  async getIssue(issueId: string): Promise<JiraIssue> {
    return this.request(`/issues/${issueId}`);
  }

  async updateIssueStatus(issueId: string, statusId: string): Promise<void> {
    return this.request(`/issues/${issueId}/status`, 'PATCH', { statusId });
  }
}

export const jiraService = new JiraService();
