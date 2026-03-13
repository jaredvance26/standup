import React, { ReactElement } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { Download } from "@mui/icons-material";

import { Status } from "../../components";
import { useStandupWizardStore } from "../../standup-wizard-store";
import { COLOR_SHADES } from "../../constants";
import { captureTableScreenshot } from "../../utils";
import { MemberStatus, TeamMember } from "../../../types";

export const StandupSummary = React.forwardRef<HTMLDivElement>(
  (_, ref): ReactElement => {
    const [{ selectedTeamMemberIds, teamMembers, settings, questionOfDay }] =
      useStandupWizardStore();
    const { palette } = useTheme();
    const { showStatusField } = settings;

    const selectedEmployees = selectedTeamMemberIds.map(
      (id) => teamMembers[id]
    );

    return (
      <Box display="flex" flexDirection="column" height="100%" minHeight={0}>
        {questionOfDay.includeQuestion && !questionOfDay.isDuringStandup && (
          <Box
            marginBottom={2}
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              p: 2,
              flexShrink: 0,
            }}
          >
            <Typography
              fontWeight={600}
              variant="h6"
              color={COLOR_SHADES[settings.selectedColor].dark}
            >
              Question of the Day
            </Typography>
            <Typography
              variant="body1"
              color={COLOR_SHADES[settings.selectedColor].dark}
            >
              {questionOfDay.question}
            </Typography>
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          marginBlock={2}
          flexShrink={0}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              captureTableScreenshot();
            }}
          >
            <Download />
          </Button>
        </Box>
        <TableContainer
          className="standup-summary-table-container"
          ref={ref}
          component={Paper}
          sx={{ flex: 1, minHeight: 0, backgroundColor: "#fff" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                  <Typography fontSize={20} fontWeight={700} color="white">
                    Name
                  </Typography>
                </TableCell>
                {showStatusField && (
                  <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                    <Typography fontSize={20} fontWeight={700} color="white">
                      Status
                    </Typography>
                  </TableCell>
                )}
                <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                  <Typography fontSize={20} fontWeight={700} color="white">
                    Notes
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedEmployees.map((employee: TeamMember) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Typography
                      fontSize={18}
                    >{`${employee.firstName} ${employee.lastName}`}</Typography>
                  </TableCell>
                  {showStatusField && (
                    <TableCell>
                      {employee.status !== MemberStatus.None ? (
                        <Status status={employee.status} />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography fontSize={18}>
                      {employee.notes &&
                        employee.notes.split("\n").join("  |  ")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
);

StandupSummary.displayName = "StandupSummary";
