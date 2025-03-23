import React, { ReactElement } from "react";
import { Grid2 } from "@mui/material";

import { SelectableBox } from "./selectable-box";
import { TeamMember } from "../../../../types";

interface SelectableBoxGroupProps {
  teamMembers: TeamMember[];
  selectedIds: number[];
  setSelectedIds: (selectedIds: number[]) => void;
}

export const SelectableBoxGroup = (props: SelectableBoxGroupProps): ReactElement => {
  const { selectedIds, setSelectedIds, teamMembers } = props;

  const handleToggle = (id: number) => {
   const newValues = (prevSelectedIds: number[]) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

  setSelectedIds(newValues(selectedIds));
  };

  return (
    <Grid2 container spacing={4}>
      {teamMembers.map((teamMember) => (
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4}} key={teamMember.id}>
          <SelectableBox
            key={teamMember.id}
            imageUrl={teamMember.photoUrl}
            name={`${teamMember.firstName} ${teamMember.lastName}`}
            position={teamMember.position}
            selected={selectedIds.includes(teamMember.id)}
            onToggle={() => handleToggle(teamMember.id)}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
