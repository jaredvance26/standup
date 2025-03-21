import React, { ReactElement } from "react";
import { Box } from "@mui/material";

import { SectionHeader, SelectableBoxGroup } from "../../components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { teamMembers } from "../../../local";

export const TeamSelection = (): ReactElement => {
  const [{ selectedTeamMemberIds }, { setStandupWizardStateAction }] =
    useStandupWizardStore();

  return (
    <Box>
      <Box marginBottom={3}>
        <SectionHeader>Team Selection</SectionHeader>
      </Box>
      <Box margin="auto">
        <SelectableBoxGroup
          selectedIds={selectedTeamMemberIds}
          setSelectedIds={(newValues: number[]) =>
            setStandupWizardStateAction({ selectedTeamMemberIds: newValues })
          }
          teamMembers={teamMembers}
        />
      </Box>
    </Box>
  );
};
