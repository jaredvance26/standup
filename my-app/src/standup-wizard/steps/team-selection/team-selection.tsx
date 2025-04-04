import React, { ReactElement, useState } from "react";
import { Box, Button } from "@mui/material";
import { shuffle } from "lodash";

import { SelectableBoxGroup } from "./components";
import { AddGuest } from "../../components";
import { useStandupWizardStore } from "../../standup-wizard-store";

export const TeamSelection = (): ReactElement => {
  const [
    { selectedTeamMemberIds, teamMembers },
    { addGuestAction, setStandupWizardStateAction },
  ] = useStandupWizardStore();
  const [addedGuest, setAddedGuest] = useState<string>("");

  const selectDeselectLabel = selectedTeamMemberIds.length === teamMembers.length
    ? "Deselect All"
    : "Select All";

  const onSelectDeselect = () => {
    if (selectedTeamMemberIds.length === teamMembers.length) {
      setStandupWizardStateAction({ selectedTeamMemberIds: [] });
      return;
    }
    setStandupWizardStateAction({
      selectedTeamMemberIds: teamMembers.map((member) => member.id),
    });
  };

  const onRemoveGuest = (id: number) => {
    const foundMember = teamMembers.find((member) => member.id === id);
    if (foundMember) {
      const newTeamMembers = teamMembers.filter((member) => member.id !== id);
      setStandupWizardStateAction({
        selectedTeamMemberIds: selectedTeamMemberIds.filter(
          (selectedId) => selectedId !== id
        ),
        teamMembers: newTeamMembers,
      });
    }
  };

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
          onAddGuest={() => addGuestAction(addedGuest)}
          setAddedGuest={(value) => setAddedGuest(value)}
        />
        <Button size="large" onClick={onSelectDeselect} variant="text">
          {selectDeselectLabel}
        </Button>
      </Box>
      <SelectableBoxGroup
        onRemoveGuest={onRemoveGuest}
        selectedIds={selectedTeamMemberIds}
        setSelectedIds={(newValues: number[]) =>
          setStandupWizardStateAction({ selectedTeamMemberIds: shuffle(newValues) })
        }
        teamMembers={teamMembers}
      />
    </Box>
  );
};
