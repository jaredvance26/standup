import axios from "axios";
import { TeamMemberContract } from "./contracts";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";


/**
 * Get all team members for a specific user
 * @param userId - The user ID to filter by
 * @returns Promise with team members array
 */
export const getTeamMembers = async (
  userId: string
): Promise<TeamMemberContract[]> => {
  try {
    const response = await axios.get<TeamMemberContract[]>(
      `${API_BASE_URL}/team-members`,
      {
        params: { userId },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to fetch team members:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Create a new team member
 * @param teamMemberData - The team member data
 * @returns Promise with created team member
 */
export const createTeamMember = async (
  teamMemberData: Omit<TeamMemberContract, "id">
): Promise<TeamMemberContract> => {
  try {
    const response = await axios.post<TeamMemberContract>(
      `${API_BASE_URL}/team-members`,
      teamMemberData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to create team member:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Update a team member
 * @param id - The team member ID
 * @param updateData - The data to update
 * @returns Promise with updated team member
 */
export const updateTeamMember = async (
  id: string,
  updateData: Partial<TeamMemberContract>
): Promise<TeamMemberContract> => {
  try {
    const response = await axios.put<TeamMemberContract>(
      `${API_BASE_URL}/team-members/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Failed to update team member with id ${id}:`,
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Delete a team member
 * @param id - The team member ID
 * @returns Promise with success message
 */
export const deleteTeamMember = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `${API_BASE_URL}/team-members/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Failed to delete team member with id ${id}:`,
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
