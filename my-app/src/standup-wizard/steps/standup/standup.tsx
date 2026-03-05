import { ReactElement, useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

import {
  AddMember,
  EmojiAutocompletePopper,
  EmployeeList,
  StatusSelect,
} from "./components";
import {
  useGetJiraSectionContent,
  useStandupWizardStore,
} from "../../standup-wizard-store";
import { useEmojiAutocomplete } from "./hooks";
import { AddGuest } from "../../components";
import { MemberStatus, TeamMember } from "../../../types";
import { COLOR_SHADES } from "../../constants";

export const Standup = (): ReactElement => {
  const [store, { addGuestAction, setStandupWizardStateAction }] =
    useStandupWizardStore();
  const {
    selectedTeamMemberIds,
    teamMembers,
    issues,
    settings,
    questionOfDay,
  } = store;

  const selectedTeamMembers = selectedTeamMemberIds
    .map((id) => teamMembers[id])
    .filter((teamMember): teamMember is TeamMember => teamMember !== undefined);

  const [addedGuest, setAddedGuest] = useState<string>("");
  const [addedMember, setAddedMember] = useState<number | null>(null);
  const notesInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Get the first team member's ID
  const firstTeamMemberId = selectedTeamMembers[0]?.id ?? -1;

  // Handle marking the first team member as viewed and setting the selectedEmployeeId
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

  const noteValue = teamMembers[selectedEmployeeId]?.notes || "";

  const updateNotes = (notes: string) => {
    setStandupWizardStateAction({
      teamMembers: {
        ...teamMembers,
        [selectedEmployeeId]: {
          ...teamMembers[selectedEmployeeId],
          notes,
        },
      },
    });
  };

  const {
    filteredEmojiOptions,
    selectedEmojiIndex,
    isEmojiMenuOpen,
    handleInputChange,
    handleInputInteraction,
    handleInputKeyUp,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelectOption,
  } = useEmojiAutocomplete({
    value: noteValue,
    onValueChange: updateNotes,
    inputRef: notesInputRef,
  });

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
          {questionOfDay.includeQuestion && questionOfDay.isDuringStandup && (
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Typography fontWeight={600} variant="h6" color={COLOR_SHADES[settings.selectedColor].dark	}>
                Question of the Day
              </Typography>
              <Typography variant="body1" color={COLOR_SHADES[settings.selectedColor].main}>
                {questionOfDay.question}
              </Typography>
            </Box>
          )}
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
            inputRef={notesInputRef}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "white",
              },
            }}
            value={noteValue}
            onChange={(e) => {
              const cursorPos = e.target.selectionStart ?? e.target.value.length;
              handleInputChange(e.target.value, cursorPos);
            }}
            onClick={handleInputInteraction}
            onKeyUp={handleInputKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <EmojiAutocompletePopper
            open={isEmojiMenuOpen}
            anchorEl={notesInputRef.current}
            options={filteredEmojiOptions}
            selectedIndex={selectedEmojiIndex}
            onSelect={handleSelectOption}
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
