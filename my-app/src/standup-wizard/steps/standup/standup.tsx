import { ReactElement, useState } from "react";
import { Box, TextField } from "@mui/material";

import { EmployeeList } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { AddGuest } from "../../components";
import { TeamMember } from "../../../types";

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
            value={teamMembers[selectedEmployeeId]?.notes || ""}
            onChange={(e) => {
              setStandupWizardStateAction({
                teamMembers: {
                  ...teamMembers,
                  [selectedEmployeeId]: {
                    ...teamMembers[selectedEmployeeId],
                    notes: e.target.value
                  }
                }
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
