import Standup, { IStandup, IStandupTeamMemberSnapshot } from "../models/standup";

class StandupService {
  async createStandup(params: {
    userId: string;
    showStatusField: boolean;
    teamMembers: IStandupTeamMemberSnapshot[];
  }): Promise<IStandup> {
    const standup = new Standup({
      userId: params.userId,
      showStatusField: params.showStatusField,
      teamMembers: params.teamMembers,
      completedAt: new Date(),
    });

    return standup.save();
  }

  async getStandupsByUserId(userId: string): Promise<IStandup[]> {
    return Standup.find({ userId }).sort({ completedAt: -1 }).exec();
  }

  async deleteStandupById(userId: string, standupId: string): Promise<IStandup | null> {
    return Standup.findOneAndDelete({ _id: standupId, userId }).exec();
  }
}

export default new StandupService();
