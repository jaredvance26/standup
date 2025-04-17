import { ReactElement } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { TeamMember } from "../../../../types";

interface EmployeeListProps {
  teamMembers: TeamMember[];
  selectedEmployeeId: number;
  onEmployeeSelect: (id: number) => void;
}

export const EmployeeList = (props: EmployeeListProps): ReactElement => {
  const { teamMembers, selectedEmployeeId, onEmployeeSelect } = props;
  const { palette } = useTheme();
  const employeeIndex = teamMembers.findIndex(
    (teamMember) => teamMember.id === selectedEmployeeId
  );

  // const to disable back button
  const backIsDisabled = employeeIndex === 0;
  // const to disable forward button
  const forwardIsDisabled = employeeIndex === teamMembers.length - 1;

  const onForward = () => {
    const nextEmployee = teamMembers[employeeIndex + 1];
    if (nextEmployee) {
      onEmployeeSelect(nextEmployee.id);
      const nextEmployeeBox = document.getElementById(
        `employee-${nextEmployee.id}`
      );
      if (nextEmployeeBox) {
        nextEmployeeBox.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const onBack = () => {
    const previousEmployee = teamMembers[employeeIndex - 1];
    if (previousEmployee) {
      onEmployeeSelect(previousEmployee.id);
      const previousEmployeeBox = document.getElementById(
        `employee-${previousEmployee.id}`
      );
      if (previousEmployeeBox) {
        previousEmployeeBox.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Box>
      <Box borderRadius={3} overflow="auto" height="500px">
        {teamMembers.map((teamMember) => {
          const isSelected = teamMember.id === selectedEmployeeId;

          return (
            <Box
              key={teamMember.id}
              m={2}
              id={`employee-${teamMember.id}`}
              onClick={() => onEmployeeSelect(teamMember.id)}
              sx={{ cursor: "pointer" }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  backgroundColor: isSelected
                    ? palette.primary.dark
                    : teamMember.hasBeenViewed
                      ? palette.common.white
                      : palette.grey[300],
                  minHeight: '70px', 
                }}
              >
                {teamMember.hasBeenViewed? (
                  <Box display="flex" gap={1} p={1} alignItems="center">
                    <Box mr={1}>
                      <Avatar
                        variant="rounded"
                        src={teamMember.photoUrl}
                        alt={`${teamMember.firstName} ${teamMember.lastName}`}
                        sx={{
                          color: palette.primary.main,
                          width: 50,
                          height: 50,
                          backgroundColor: palette.grey[100],
                        }}
                      >
                        {teamMember.firstName[0]}
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography
                        lineHeight={1}
                        variant="h6"
                        color={isSelected ? palette.common.white : "textPrimary"}
                      >
                        {teamMember.firstName} {teamMember.lastName}
                      </Typography>
                      <Typography
                        whiteSpace="nowrap"
                        variant="body2"
                        color={
                          isSelected ? palette.common.white : "textSecondary"
                        }
                      >
                        {teamMember.position}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  // Render a gray box if the team member hasn't been viewed yet
                  <Box p={1} height="100%" width="100%" sx={{ backgroundColor: palette.grey[300], borderRadius:3 }}></Box>
                )}
              </Paper>
            </Box>
          );
        })}
      </Box>
      <Box flex={1} marginTop={2}>
        <Box display="flex" gap={5} justifyContent="center">
          <Button variant="outlined" onClick={onBack} disabled={backIsDisabled}>
            <ArrowBack />
          </Button>
          <Button
            variant="outlined"
            onClick={onForward}
            disabled={forwardIsDisabled}
          >
            <ArrowForward />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
