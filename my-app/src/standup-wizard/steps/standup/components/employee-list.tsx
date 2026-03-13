import React, { ReactElement } from "react";
import { ArrowBack, ArrowForward, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { hashStringToNumber } from "../../../utils";
import { TeamMember } from "../../../../types";

interface EmployeeListProps {
  teamMembers: TeamMember[];
  selectedEmployeeId: number;
  onEmployeeSelect: (id: number) => void;
  hideEmployeesSetting: boolean;
}

export const EmployeeList = (props: EmployeeListProps): ReactElement => {
  const {
    teamMembers,
    selectedEmployeeId,
    onEmployeeSelect,
    hideEmployeesSetting,
  } = props;
  const { palette } = useTheme();
  const employeeIndex = teamMembers.findIndex(
    (teamMember) => teamMember.id === selectedEmployeeId
  );

  // const to disable back button
  const backIsDisabled = employeeIndex === 0;
  // const to disable forward button
  const forwardIsDisabled = employeeIndex === teamMembers.length - 1;

  // Reference to the scrollable container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollIfNeeded = (element: HTMLElement | null) => {
    if (!element || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Check if element is fully visible
    const isFullyVisible =
      elementRect.top >= containerRect.top &&
      elementRect.bottom <= containerRect.bottom;

    // Only scroll if not fully visible
    if (!isFullyVisible) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const onForward = () => {
    const nextEmployee = teamMembers[employeeIndex + 1];
    if (nextEmployee) {
      onEmployeeSelect(nextEmployee.id);
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        const nextEmployeeBox = document.getElementById(
          `employee-${nextEmployee.id}`
        );
        scrollIfNeeded(nextEmployeeBox);
      }, 0);
    }
  };

  const onBack = () => {
    const previousEmployee = teamMembers[employeeIndex - 1];
    if (previousEmployee) {
      onEmployeeSelect(previousEmployee.id);
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        const previousEmployeeBox = document.getElementById(
          `employee-${previousEmployee.id}`
        );
        scrollIfNeeded(previousEmployeeBox);
      }, 0);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" minHeight={0}>
      <Box
        ref={scrollContainerRef}
        borderRadius={3}
        overflow="auto"
        sx={{ flex: 1, minHeight: 0 }}
      >
        {teamMembers.map((teamMember) => {
          const isSelected = teamMember.id === selectedEmployeeId;

          return (
            <Box
              key={teamMember.id}
              mb={2}
              id={`employee-${teamMember.id}`}
              onClick={() => onEmployeeSelect(teamMember.id)}
              sx={{ cursor: "pointer" }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  backgroundColor: isSelected
                    ? palette.primary.dark
                    : teamMember.hasBeenViewed || !hideEmployeesSetting
                    ? palette.common.white
                    : palette.grey[300],
                  minHeight: "70px",
                  border: "1px solid rgba(19, 41, 61, 0.1)",
                  boxShadow:
                    "0 12px 24px -20px rgba(19, 41, 61, 0.45), 0 2px 6px rgba(19, 41, 61, 0.08)",
                }}
              >
                {teamMember.hasBeenViewed || !hideEmployeesSetting ? (
                  <Box display="flex" gap={1} p={1} alignItems="center">
                    <Box mr={1}>
                      <Avatar
                        src={teamMember.photoUrl}
                        alt={`${teamMember.firstName} ${teamMember.lastName}`}
                        sx={{
                          color: palette.common.white,
                          width: 50,
                          height: 50,
                          backgroundColor: `hsl(${
                            hashStringToNumber(
                              `${teamMember.firstName} ${teamMember.lastName}`
                            ) % 360
                          }, 70%, 45%)`,
                          borderRadius: 3,
                        }}
                      >
                        {teamMember.firstName[0]}
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography
                        lineHeight={1}
                        variant="h6"
                        color={
                          isSelected ? palette.common.white : "textPrimary"
                        }
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
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1.5}
                    minHeight="70px"
                    sx={{
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08))",
                      border: "1px dashed rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 3,
                          backgroundColor: "rgba(255,255,255,0.45)",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          color={palette.grey[700]}
                        >
                          Hidden Until Selected
                        </Typography>
                        <Typography variant="body2" color={palette.grey[600]}>
                          Select with arrows or click to reveal
                        </Typography>
                      </Box>
                    </Box>
                    <VisibilityOff sx={{ color: palette.grey[600] }} />
                  </Box>
                )}
              </Paper>
            </Box>
          );
        })}
      </Box>
      <Box marginTop={2} flexShrink={0}>
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
