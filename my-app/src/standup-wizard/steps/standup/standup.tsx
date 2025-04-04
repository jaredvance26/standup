import { ReactElement, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { first, shuffle } from "lodash";

import { EmployeeList } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { AddGuest } from "../../components";
import { TeamMember } from "../../../types";

export const Standup = (): ReactElement => {
  const [
    { selectedTeamMemberIds, teamMembers, teamMemberNotes },
    { addGuestAction, setStandupWizardStateAction },
  ] = useStandupWizardStore();
  const [selectedTeamMembers] = useState(() =>
    shuffle(
      teamMembers.filter((teamMember) =>
        selectedTeamMemberIds.includes(teamMember.id)
      )
    )
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(
    selectedTeamMembers[0]?.id ?? -1
  );
  const [addedGuest, setAddedGuest] = useState<string>("");

  // initialize the teamMemberNotes for the selectedTeamMembers
  if (selectedTeamMembers.length && !Object.keys(teamMemberNotes).length) {
    setStandupWizardStateAction({
      teamMemberNotes: selectedTeamMembers.reduce((acc, teamMember) => {
        acc[teamMember.id] = "";
        return acc;
      }, {} as Record<number, string>),
    });
  }

  useEffect(() => {
    if (selectedTeamMemberIds.length > selectedTeamMembers.length) {
      selectedTeamMembers.push(first(teamMembers) as TeamMember);
      setStandupWizardStateAction({
        teamMemberNotes: {
          ...teamMemberNotes,
          [selectedTeamMembers[selectedTeamMembers.length - 1].id]: "",
        },
      });
    }
  }, [
    selectedTeamMemberIds,
    selectedTeamMembers,
    setStandupWizardStateAction,
    teamMemberNotes,
    teamMembers,
  ]);

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Box flex={1}>
        <EmployeeList
          teamMembers={selectedTeamMembers}
          selectedEmployeeId={selectedEmployeeId}
          onEmployeeSelect={(id: number) => {
            setSelectedEmployeeId(id);
          }}
        />
      </Box>
      <Box flex={1}>
        <Box display="flex" height="100%" flexDirection="column" gap={2}>
          <TextField
            fullWidth={true}
            multiline={true}
            placeholder="Notes"
            rows={5}
            sx={{ backgroundColor: "white" }}
            value={teamMemberNotes[selectedEmployeeId]}
            onChange={(e) => {
              setStandupWizardStateAction({
                teamMemberNotes: {
                  ...teamMemberNotes,
                  [selectedEmployeeId]: e.target.value,
                },
              });
            }}
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
