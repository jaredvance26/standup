import axios from "axios";
import settingsService from "./settings";
import { EncryptionService } from "../utils/encryption";

export class JiraService {
  private baseUrl: string = "";
  private auth: { username: string; password: string } = {
    username: "",
    password: "",
  };
  private userId: string;
  private boardId: string | null = null;

  constructor(userId: string) {
    this.userId = userId;
  }

  private async initializeJiraConfig() {
    const settings = await settingsService.getSettingsByUserId(this.userId);

    if (!settings || !settings.jiraData) {
      throw new Error("Missing Jira configuration in user settings");
    }

    // Check for required fields
    const { jiraUrl, jiraUsername, apiToken } = settings.jiraData;

    if (!jiraUrl || !jiraUsername || !apiToken) {
      throw new Error(
        "Incomplete Jira configuration: URL, username, and API token are required"
      );
    }

    // Update the properties with the settings values
    this.baseUrl = jiraUrl;
    this.boardId = settings.jiraData.jiraBoardId;

    // Handle decryption of the API token - we've checked above that it's not null
    // Even though we've verified apiToken is not null, decrypt can still return null on errors
    // So we need to handle that case with a default empty string
    const decryptedToken = EncryptionService.decrypt(apiToken!) || '';

    this.auth = {
      username: jiraUsername,
      password: decryptedToken
    };
  }

  private async request(endpoint: string, method: string = "GET", data?: any) {
    // Make sure Jira config is initialized
    if (!this.baseUrl) {
      await this.initializeJiraConfig();
    }

    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        auth: this.auth,
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Jira API error:", error);
      throw error;
    }
  }

  async getUserIssues() {
    // Make sure Jira config is initialized
    if (!this.baseUrl) {
      await this.initializeJiraConfig();
    }

    // Use the board ID from user settings or fall back to default if not set
    const boardId = this.boardId ?? "186";

    const sprintData = await this.request(
      `/rest/agile/1.0/board/${boardId}/sprint?state=active`
    );
    if (!sprintData.values || sprintData.values.length === 0) {
      return { issues: [], sprint: null };
    }

    // Find the active sprint that matches the board ID
    const activeSprint = sprintData.values.find((sprint: any) => {
      const originBoardId = sprint.originBoardId?.toString() || "";
      return originBoardId === boardId;
    });

    if (!activeSprint) {
      return { issues: [], sprint: null };
    }

    const issues = await this.request(
      `/rest/agile/1.0/sprint/${activeSprint.id}/issue?fields=assignee,summary,status,issuetype`
    );

    return {
      sprint: {
        id: activeSprint.id,
        name: activeSprint.name,
        state: activeSprint.state,
        startDate: activeSprint.startDate,
        endDate: activeSprint.endDate,
        goals: activeSprint.goal,
        issues: issues.issues || [],
      },
    };
  }
}
