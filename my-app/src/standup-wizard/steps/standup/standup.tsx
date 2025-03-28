import React, { ReactElement, useState } from "react";
import { Box, TextField } from "@mui/material";
import { shuffle } from "lodash";

import { EmployeeList } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";

export const Standup = (): ReactElement => {
  const [{ selectedTeamMemberIds, teamMembers }] = useStandupWizardStore();
  const [selectedTeamMembers] = useState(() =>
    shuffle(
      teamMembers.filter((teamMember) =>
        selectedTeamMemberIds.includes(teamMember.id)
      )
    )
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(
    selectedTeamMembers[0].id
  );
  const onEmployeeSelect = (id: number) => {
    setSelectedEmployeeId(id);
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Box flex={1}>
        <EmployeeList
          teamMembers={selectedTeamMembers}
          selectedEmployeeId={selectedEmployeeId}
          onEmployeeSelect={onEmployeeSelect}
        />
      </Box>
      <Box flex={1}>
        <Box display="flex" height="100%" flexDirection="column">
          <TextField
            fullWidth={true}
            multiline={true}
            placeholder="Notes"
            rows={15}
            sx={{ backgroundColor: "white" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
