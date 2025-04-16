import { ReactElement, useState } from "react";
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

  const teamMemberCount = Object.keys(teamMembers).length;
  const selectDeselectLabel = selectedTeamMemberIds.length === teamMemberCount
    ? "DESELECT ALL"
    : "SELECT ALL";

  const onSelectDeselect = () => {
    if (selectedTeamMemberIds.length === teamMemberCount) {
      setStandupWizardStateAction({ selectedTeamMemberIds: [] });
      return;
    }
    setStandupWizardStateAction({
      selectedTeamMemberIds: shuffle(Object.values(teamMembers).map((member) => member.id)),
    });
  };

  const onRemoveGuest = (id: number) => {
    const foundMember = teamMembers[id];
    if (foundMember) {
      const { [id]: _, ...newTeamMembers } = teamMembers;
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
        teamMembers={Object.values(teamMembers).sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        )}
      />
    </Box>
  );
};
