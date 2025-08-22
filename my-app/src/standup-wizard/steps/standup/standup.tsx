import { ReactElement, useState } from "react";
import { Box, TextField } from "@mui/material";

import { AddMember, EmployeeList, StatusSelect } from "./components";
import {
  useGetJiraSectionContent,
  useStandupWizardStore,
} from "../../standup-wizard-store";
import { AddGuest } from "../../components";
import { MemberStatus, TeamMember } from "../../../types";

export const Standup = (): ReactElement => {
  const [store, { addGuestAction, setStandupWizardStateAction }] =
    useStandupWizardStore();
  const {
    selectedTeamMemberIds,
    teamMembers,
    issues,
    settings,
  } = store;

  const selectedTeamMembers = selectedTeamMemberIds
    .map((id) => teamMembers[id])
    .filter((teamMember): teamMember is TeamMember => teamMember !== undefined);

  const [addedGuest, setAddedGuest] = useState<string>("");
  const [addedMember, setAddedMember] = useState<number | null>(null);

  // Get the first team member's ID
  const firstTeamMemberId = selectedTeamMembers[0]?.id ?? -1;

  // Handle marking the first team member as viewed and setting the selectedEmployeeId
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(() => {
    // This function only runs once during initial render
    if (firstTeamMemberId !== -1 && teamMembers[firstTeamMemberId]) {
      // Mark the first employee as viewed during initialization
      const updatedTeamMembers = {
        ...teamMembers,
        [firstTeamMemberId]: {
          ...teamMembers[firstTeamMemberId],
          hasBeenViewed: true,
        },
      };

      // Update the store after the component has mounted
      setStandupWizardStateAction({ teamMembers: updatedTeamMembers });
    }
    // Return the ID to initialize the state
    return firstTeamMemberId;
  });

  const selectedEmployeeIssues =
    issues?.filter(
      (issue) =>
        issue.fields.assignee?.accountId ===
        teamMembers[selectedEmployeeId]?.jiraId
    ) ?? [];

  const [jiraSection] = useGetJiraSectionContent({
    ...store,
    issues: selectedEmployeeIssues,
  });

  const leftOverTeamMembers = Object.values(teamMembers).filter(
    (teamMember) => !selectedTeamMemberIds.includes(teamMember.id)
  );

  return (
    <Box display="flex" gap={2}>
      <Box flex={1}>
        <EmployeeList
          hideEmployeesSetting={settings.hideEmployees}
          teamMembers={selectedTeamMembers}
          selectedEmployeeId={selectedEmployeeId}
          onEmployeeSelect={(id: number) => {
            setSelectedEmployeeId(id);
            setStandupWizardStateAction({
              teamMembers: {
                ...teamMembers,
                [id]: {
                  ...teamMembers[id],
                  hasBeenViewed: true,
                },
              },
            });
          }}
        />
      </Box>
      {jiraSection}
      <Box flex={1}>
        <Box display="flex" flexDirection="column" gap={2}>
          {settings.showStatusField && (
            <StatusSelect
              value={
                teamMembers[selectedEmployeeId]?.status || MemberStatus.None
              }
              onChange={(status) => {
                setStandupWizardStateAction({
                  teamMembers: {
                    ...teamMembers,
                    [selectedEmployeeId]: {
                      ...teamMembers[selectedEmployeeId],
                      status,
                    },
                  },
                });
              }}
            />
          )}
          <TextField
            fullWidth={true}
            multiline={true}
            placeholder="Notes"
            rows={5}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "white",
              },
            }}
            value={teamMembers[selectedEmployeeId]?.notes || ""}
            onChange={(e) => {
              const cursorPos = e.target.selectionStart;
              setCursorPosition(cursorPos);
              setStandupWizardStateAction({
                teamMembers: {
                  ...teamMembers,
                  [selectedEmployeeId]: {
                    ...teamMembers[selectedEmployeeId],
                    notes: e.target.value,
                  },
                },
              });
            }}
            onFocus={(e) => {
              if (cursorPosition !== null) {
                e.target.selectionStart = cursorPosition;
                e.target.selectionEnd = cursorPosition;
              }
            }}
          />
          <AddMember
            teamMembers={leftOverTeamMembers}
            onAddMember={() => {
              if (addedMember) {
                setStandupWizardStateAction({
                  selectedTeamMemberIds: [
                    ...selectedTeamMemberIds,
                    addedMember,
                  ],
                });
              }
            }}
            selectedTeamMember={addedMember}
            setSelectedTeamMember={(value: number | null) =>
              setAddedMember(value)
            }
          />
          <AddGuest
            addedGuest={addedGuest}
            onAddGuest={() => {
              addGuestAction(addedGuest);
            }}
            setAddedGuest={(value: string) => setAddedGuest(value)}
          />
        </Box>
      </Box>
    </Box>
  );
};
