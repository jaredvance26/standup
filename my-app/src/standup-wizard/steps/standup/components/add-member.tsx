import { ReactElement } from "react";
import { TeamMember } from "../../../../types";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

interface AddMemberProps {
  teamMembers: TeamMember[];
  onAddMember: (teamMember: number | null) => void;
  selectedTeamMember: number | null;
  setSelectedTeamMember: (teamMember: number | null) => void;
}

export const AddMember = (props: AddMemberProps): ReactElement => {
  const {
    teamMembers,
    onAddMember,
    selectedTeamMember,
    setSelectedTeamMember,
  } = props;
  const { palette } = useTheme();

  const teamMember = teamMembers.find(
    (teamMember) => teamMember.id === selectedTeamMember
  );

  return (
    <Box>
      <Box display="flex" gap={2} alignItems="center">
        <Select
          disabled={teamMembers.length === 0}
          displayEmpty={true}
          fullWidth={true}
          sx={{
			borderRadius: 3,
            backgroundColor: "#FFFFFD",
            "&.Mui-disabled": {
              backgroundColor: palette.grey[300],
            },
          }}
          value={selectedTeamMember || ''}
          onChange={(e) => setSelectedTeamMember(e.target.value)}
          renderValue={(value) =>
            value ? (
              `${teamMember?.firstName} ${teamMember?.lastName}`
            ) : (
              <Typography color={palette.grey[500]}>
                Add Team Member
              </Typography>
            )
          }
        >
          {teamMembers.map((teamMember) => (
            <MenuItem key={teamMember.id} value={teamMember.id}>
              {`${teamMember.firstName} ${teamMember.lastName}`}
            </MenuItem>
          ))}
        </Select>
        <Button
          disabled={!selectedTeamMember}
          onClick={() => {
            onAddMember(selectedTeamMember);
            setSelectedTeamMember(null);
          }}
          variant="contained"
          sx={{ width: "50px", height: "50px", borderRadius: 3 }}
        >
          <PersonAdd />
        </Button>
      </Box>
    </Box>
  );
};
