import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  firstName: string;
  lastName: string;
  position: string;
  jiraId: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    jiraId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
