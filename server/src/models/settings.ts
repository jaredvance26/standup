import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  userId: string;
  theme: string;
  teamName: string;
  standup: {
	hideUnselectedEmployees: boolean;
	showStatusField: boolean;
  };
  jiraData: {
	apiToken: string | null;
	jiraBoardId: string | null;
	jiraUsername: string | null;
	jiraUrl: string | null;
  };
}

const settingsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    theme: { type: String, default: 'blue' },
    teamName: { type: String, default: '' },
    standup: {
      hideUnselectedEmployees: { type: Boolean, default: false, required: true },
      showStatusField: { type: Boolean, default: true, required: true },
    },
    jiraData: {
      apiToken: { type: String, default: null },
      jiraUsername: { type: String, default: null },
      jiraUrl: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
