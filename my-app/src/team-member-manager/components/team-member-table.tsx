import React, { ReactElement, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { RemoveTeamMemberModal } from "./remove-team-member-modal";
import { useTeamMemberManagerStore } from "../team-member-manager-store/team-member-manager-store";
import { TeamMemberContract } from "../../api/contracts";
import { useMessageAlert } from "../../hooks";

export const TeamMemberTable = (): ReactElement => {
  const [state, { removeTeamMemberAction }] = useTeamMemberManagerStore();
  const { teamMembers, isTeamDataLoading } = state;
  const { palette } = useTheme();
  const [setMessage, AlertComponent] = useMessageAlert();

  const [isRemoveTeamMemberModalOpen, setIsRemoveTeamMemberOpen] =
    useState<boolean>(false);
  const [selectedTeamMember, setSelectedTeamMember] =
    useState<TeamMemberContract | null>(null);

  const maskJiraId = (jiraId: string | undefined): string => {
    if (!jiraId) return "--";
    // Limit to 8 characters
    const limitedId = jiraId.length > 8 ? jiraId.substring(0, 8) : jiraId;
    // Mask all characters with '*'
    const maskedId = "*".repeat(limitedId.length);

    return maskedId;
  };

  return (
    <Box marginTop={3} sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="team members table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: palette.grey[400] }}>
                <Typography fontSize={20} fontWeight={700} color={palette.grey[800]}>
                  First Name
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.grey[400] }}>
                <Typography fontSize={20} fontWeight={700} color={palette.grey[800]}>
                  Last Name
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.grey[400] }}>
                <Typography fontSize={20} fontWeight={700} color={palette.grey[800]}>
                  Position
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.grey[400] }}>
                <Typography fontSize={20} fontWeight={700} color={palette.grey[800]}>
                  Jira ID
                </Typography>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: palette.grey[400] }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((member: TeamMemberContract) => (
              <TableRow
                key={member.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& .action-buttons": { opacity: 0 },
                  "&:hover .action-buttons": { opacity: 1 },
                  transition: "all 0.2s",
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography fontSize={18}>{member.firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={18}>{member.lastName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={18}>
                    {member.position || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={18}>
                    {maskJiraId(member.jiraId)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    className="action-buttons"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton onClick={() => null} size="small">
                        <EditIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setIsRemoveTeamMemberOpen(true);
                          setSelectedTeamMember(member);
                        }}
                        size="small"
                      >
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {teamMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {isTeamDataLoading
                    ? "Loading team members..."
                    : "No team members found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTeamMember && (
        <RemoveTeamMemberModal
          isOpen={isRemoveTeamMemberModalOpen}
          onClose={() => setIsRemoveTeamMemberOpen(false)}
          onRemove={() => {
            removeTeamMemberAction(selectedTeamMember.id, () =>
              setMessage("success", "Team member removed successfully")
            );
            setIsRemoveTeamMemberOpen(false);
          }}
          selectedTeamMember={selectedTeamMember}
        />
      )}
      {AlertComponent}
    </Box>
  );
};
