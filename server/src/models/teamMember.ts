import mongoose, { Document, Schema } from "mongoose";

export interface ITeamMember extends Document {
  id: string;
  firstName: string;
  lastName: string;
  position?: string;
  jiraId?: string;
  photoUrl?: string | null;
  photoPublicId?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: false },
    jiraId: { type: String, required: false },
    photoUrl: { type: String, required: false, default: null },
    photoPublicId: { type: String, required: false, default: null },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.photoPublicId;
        return ret;
      },
    },
    id: true,
  }
);

export default mongoose.model<ITeamMember>(
  "TeamMember",
  teamMemberSchema,
  "teamMembers"
);
