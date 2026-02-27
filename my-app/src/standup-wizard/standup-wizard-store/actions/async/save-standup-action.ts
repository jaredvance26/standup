import { createStandup } from "../../../api";
import { TeamMember } from "../../../../types";
import { StandupWizardAction } from "../../standup-wizard-store";

export const saveStandupAction =
  (): StandupWizardAction =>
  async ({ getState, setState }) => {
    const {
      userId,
      selectedTeamMemberIds,
      teamMembers,
      settings,
      isStandupSaveLoading,
    } = getState();

    if (isStandupSaveLoading || !settings.saveStandupData || !userId) {
      return;
    }

    setState({ isStandupSaveLoading: true });

    try {
      const selectedTeamMembers = selectedTeamMemberIds
        .map((id) => teamMembers[id as keyof typeof teamMembers])
        .filter(Boolean) as TeamMember[];

      if (selectedTeamMembers.length === 0) {
        return;
      }

      await createStandup(userId, {
        showStatusField: settings.showStatusField,
        teamMembers: selectedTeamMembers.map((teamMember) => ({
          memberId: String(teamMember.id),
          firstName: teamMember.firstName,
          lastName: teamMember.lastName,
          position: teamMember.position || null,
          jiraId: teamMember.jiraId || null,
          status: teamMember.status,
          notes: teamMember.notes || "",
        })),
      });
    } catch (error) {
      console.error("Failed to save standup:", error);
    } finally {
      setState({ isStandupSaveLoading: false });
    }
  };
