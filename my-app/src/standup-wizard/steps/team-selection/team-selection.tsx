import { ReactElement, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { People } from "@mui/icons-material";
import { shuffle } from "lodash";

import { SelectableBoxGroup } from "./components";
import { AddGuest } from "../../components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { BlankState } from "../../../components";

export const TeamSelection = (): ReactElement => {
  const [
    { selectedTeamMemberIds, teamMembers },
    { addGuestAction, setStandupWizardStateAction },
  ] = useStandupWizardStore();
  const [addedGuest, setAddedGuest] = useState<string>("");
  const { palette } = useTheme();

  const teamMemberCount = Object.keys(teamMembers).length;
  const selectDeselectLabel =
    selectedTeamMemberIds.length === teamMemberCount
      ? "DESELECT ALL"
      : "SELECT ALL";

  const onSelectDeselect = () => {
    if (selectedTeamMemberIds.length === teamMemberCount) {
      setStandupWizardStateAction({ selectedTeamMemberIds: [] });
      return;
    }
    setStandupWizardStateAction({
      selectedTeamMemberIds: shuffle(
        Object.values(teamMembers).map((member) => member.id)
      ),
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

  if (teamMemberCount === 0) {
    return (
      <BlankState
        actionButton={
          <Button href="/team-members" variant="contained">
            Start adding team members
          </Button>
        }
        icon={<People sx={{ fontSize: 100 }} />}
        title="No team members have been added yet"
        description="Add team members to get started"
      />
    );
  }

  return (
    <Box>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom={6}
      >
        <AddGuest
          addedGuest={addedGuest}
          onAddGuest={() => addGuestAction(addedGuest)}
          setAddedGuest={(value) => setAddedGuest(value)}
        />
        <Box display="flex" flexDirection="column">
          <Button
            onClick={onSelectDeselect}
            variant="text"
            sx={{ fontSize: 20, fontWeight: 600 }}
          >
            {selectDeselectLabel}
          </Button>
          <Typography
            fontSize={16}
            fontWeight={600}
            color={palette.common.white}
            sx={{
              backgroundColor: palette.primary.dark,
              padding: 1,
              borderRadius: 3,
              display: "inline-block",
            }}
          >
            {selectedTeamMemberIds.length} Team Member
            {selectedTeamMemberIds.length === 1 ? "" : "s"} Selected
          </Typography>
        </Box>
      </Box>
      <SelectableBoxGroup
        onRemoveGuest={onRemoveGuest}
        selectedIds={selectedTeamMemberIds}
        setSelectedIds={(newValues: number[]) =>
          setStandupWizardStateAction({
            selectedTeamMemberIds: shuffle(newValues),
          })
        }
        teamMembers={Object.values(teamMembers).sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        )}
      />
    </Box>
  );
};
