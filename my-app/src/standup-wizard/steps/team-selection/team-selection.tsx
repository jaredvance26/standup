import React, { ReactElement, useState } from "react";
import { Box, Button } from "@mui/material";

import { AddGuest, SelectableBoxGroup } from "./components";
import { useStandupWizardStore } from "../../standup-wizard-store";

export const TeamSelection = (): ReactElement => {
  const [
    { selectedTeamMemberIds, teamMembers },
    { setStandupWizardStateAction },
  ] = useStandupWizardStore();
  const [addedGuest, setAddedGuest] = useState<string>("");

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
    };
    setStandupWizardStateAction({
      selectedTeamMemberIds: [...selectedTeamMemberIds, newTeamMember.id],
      teamMembers: [newTeamMember, ...teamMembers],
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
          onAddGuest={onAddGuest}
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
          setStandupWizardStateAction({ selectedTeamMemberIds: newValues })
        }
        teamMembers={teamMembers}
      />
    </Box>
  );
};
