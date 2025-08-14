import TeamMember, { ITeamMember } from '../models/teamMember';

export class TeamMemberService {
  /**
   * Get all team members
   */
  async getAllTeamMembers(): Promise<ITeamMember[]> {
    try {
      return await TeamMember.find().sort({ lastName: 1, firstName: 1 });
    } catch (error) {
      console.error('Error fetching team members:', error);
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
    position: string;
    jiraId: string;
  }): Promise<ITeamMember> {
    try {
      const newTeamMember = new TeamMember(teamMemberData);
      return await newTeamMember.save();
    } catch (error) {
      console.error('Error creating team member:', error);
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
      position: string;
      jiraId: string;
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
}
