import mongoose, { Document, Schema } from "mongoose";

export interface IStandupTeamMemberSnapshot {
  memberId: string;
  firstName: string;
  lastName: string;
  position: string | null;
  jiraId: string | null;
  status: string;
  notes: string;
}

export interface IStandup extends Document {
  userId: mongoose.Types.ObjectId;
  completedAt: Date;
  showStatusField: boolean;
  teamMembers: IStandupTeamMemberSnapshot[];
}

const standupTeamMemberSnapshotSchema = new Schema<IStandupTeamMemberSnapshot>(
  {
    memberId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, default: null },
    jiraId: { type: String, default: null },
    status: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const standupSchema = new Schema<IStandup>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", index: true },
    completedAt: { type: Date, required: true, default: Date.now, index: true },
    showStatusField: { type: Boolean, required: true, default: true },
    teamMembers: { type: [standupTeamMemberSnapshotSchema], required: true, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IStandup>("Standup", standupSchema, "standups");
