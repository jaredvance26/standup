import React, { ReactElement, useState } from "react";
import { Box, Button } from "@mui/material";

import { AddGuest, SelectableBoxGroup } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { teamMembers } from "../../../local";

export const TeamSelection = (): ReactElement => {
  const [{ selectedTeamMemberIds }, { setStandupWizardStateAction }] =
    useStandupWizardStore();
  const [addedGuest, setAddedGuest] = useState<string>("");
  console.log({addedGuest})

  const selectDeselectLabel = selectedTeamMemberIds.length
    ? "Deselect All"
    : "Select All";

  const onSelectDeselect = () => {
    if (selectedTeamMemberIds.length) {
      setStandupWizardStateAction({ selectedTeamMemberIds: [] });
      return;
    }
    setStandupWizardStateAction({
      selectedTeamMemberIds: teamMembers.map((member) => member.id),
    });
  };

  const onAddGuest = () => {
	const newTeamMember = {
		id: teamMembers.length + 1,
		firstName: addedGuest,
		lastName: "",
		position: "",
		photoUrl: "",
	}
	teamMembers.push(newTeamMember)
	setStandupWizardStateAction({
		selectedTeamMemberIds: [...selectedTeamMemberIds, newTeamMember.id]
	})
  }

  return (
    <Box>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom={4}
      >
        <AddGuest
          addedGuest={addedGuest}
		  onAddGuest={onAddGuest}
          setAddedGuest={(value) => setAddedGuest(value)}
        />
        <Button size="large" onClick={onSelectDeselect} variant="text">
          {selectDeselectLabel}
        </Button>
      </Box>
      <SelectableBoxGroup
        selectedIds={selectedTeamMemberIds}
        setSelectedIds={(newValues: number[]) =>
          setStandupWizardStateAction({ selectedTeamMemberIds: newValues })
        }
        teamMembers={teamMembers}
      />
    </Box>
  );
};
