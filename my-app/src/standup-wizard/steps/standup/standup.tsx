import { ReactElement, useState } from "react";
import { Box, TextField } from "@mui/material";

import { AddMember, EmployeeList, StatusSelect } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { AddGuest } from "../../components";
import { MemberStatus, TeamMember } from "../../../types";

export const Standup = (): ReactElement => {
  const [
    { selectedTeamMemberIds, teamMembers },
    { addGuestAction, setStandupWizardStateAction },
  ] = useStandupWizardStore();

  const selectedTeamMembers = selectedTeamMemberIds
    .map((id) => teamMembers[id])
    .filter((teamMember): teamMember is TeamMember => teamMember !== undefined);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(
    selectedTeamMembers[0]?.id ?? -1
  );
  const [addedGuest, setAddedGuest] = useState<string>("");
  const [addedMember, setAddedMember] = useState<number | null>(null);

  const leftOverTeamMembers = Object.values(teamMembers).filter(
    (teamMember) => !selectedTeamMemberIds.includes(teamMember.id)
  );

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
      {/* <Box flex={1}></Box> */}
      <Box flex={1}>
        <Box display="flex"flexDirection="column" gap={2}>
          <StatusSelect
            value={
              teamMembers[selectedEmployeeId]?.status || MemberStatus.Green
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
          <TextField
            fullWidth={true}
            multiline={true}
            placeholder="Notes"
            rows={5}
            sx={{ backgroundColor: "white" }}
            value={teamMembers[selectedEmployeeId]?.notes || ""}
            onChange={(e) => {
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
          />
          <AddMember
            teamMembers={leftOverTeamMembers}
            onAddMember={() => {
              if (addedMember) {
                setStandupWizardStateAction({selectedTeamMemberIds: [...selectedTeamMemberIds, addedMember],
                });
              }
            }}
            selectedTeamMember={addedMember}
            setSelectedTeamMember={(value: number | null) => setAddedMember(value)}
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
