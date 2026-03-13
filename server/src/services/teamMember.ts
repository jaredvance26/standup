import TeamMember, { ITeamMember } from "../models/teamMember";

export class TeamMemberService {
  /**
   * Get all team members for a specific user
   * @param userId - The user ID to filter by
   */
  async getAllTeamMembers(userId: string): Promise<ITeamMember[]> {
    try {
      return await TeamMember.find(
        { userId },
        { createdAt: 0, updatedAt: 0 }
      ).sort({ lastName: 1, firstName: 1 });
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  }

  /**
   * Create a new team member
   * @param teamMemberData - The team member data
   */
  async createTeamMember(teamMemberData: {
    firstName: string;
    lastName: string;
    position?: string;
    jiraId?: string;
    photoUrl?: string | null;
    photoPublicId?: string | null;
    userId: string;
  }): Promise<ITeamMember> {
    try {
      const newTeamMember = new TeamMember(teamMemberData);
      return await newTeamMember.save();
    } catch (error) {
      console.error("Error creating team member:", error);
      throw error;
    }
  }

  /**
   * Update a team member
   * @param id - The team member ID
   * @param updateData - The data to update
   */
  async updateTeamMember(
    id: string,
    updateData: Partial<{
      firstName: string;
      lastName: string;
      position?: string;
      jiraId?: string;
      photoUrl?: string | null;
      photoPublicId?: string | null;
      userId?: string;
    }>
  ): Promise<ITeamMember | null> {
    try {
      return await TeamMember.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
    } catch (error) {
      console.error(`Error updating team member with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a team member
   * @param id - The team member ID
   */
  async deleteTeamMember(id: string): Promise<ITeamMember | null> {
    try {
      return await TeamMember.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error deleting team member with id ${id}:`, error);
      throw error;
    }
  }

  async getTeamMemberById(id: string): Promise<ITeamMember | null> {
    try {
      return await TeamMember.findById(id);
    } catch (error) {
      console.error(`Error fetching team member with id ${id}:`, error);
      throw error;
    }
  }
}
