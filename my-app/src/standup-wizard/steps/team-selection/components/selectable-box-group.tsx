import React, { ReactElement } from "react";
import { Grid } from "@mui/material";

import { SelectableBox } from "./selectable-box";
import { TeamMember } from "../../../../types";

interface SelectableBoxGroupProps {
  onRemoveGuest: (id: number) => void;
  selectedIds: number[];
  setSelectedIds: (selectedIds: number[]) => void;
  teamMembers: TeamMember[];
}

export const SelectableBoxGroup = (
  props: SelectableBoxGroupProps
): ReactElement => {
  const { onRemoveGuest, selectedIds, setSelectedIds, teamMembers } = props;

  const handleToggle = (id: number) => {
    const newValues = (prevSelectedIds: number[]) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

    setSelectedIds(newValues(selectedIds));
  };

  return (
    <Grid container spacing={4}>
      {teamMembers.map((teamMember) => (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={teamMember.id}>
          <SelectableBox
            key={teamMember.id}
            id={teamMember.id}
            imageUrl={teamMember.photoUrl || ""	}
            isGuest={teamMember.isGuest}
            name={`${teamMember.firstName} ${teamMember.lastName}`}
            onRemoveGuest={onRemoveGuest}
            position={teamMember.position || ""}
            selected={selectedIds.includes(teamMember.id)}
            onToggle={() => handleToggle(teamMember.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
