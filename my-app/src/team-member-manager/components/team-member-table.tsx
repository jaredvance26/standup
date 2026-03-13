import React, { ReactElement, useState } from "react";
import {
  Avatar,
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
import { TeamMemberContract, TeamMemberUpsertContract } from "../../api/contracts";
import { notifyAlert } from "../../alerts/alert-notifier";
import { TeamMemberModal } from "./team-member-modal";
import { Loader } from "../../components";

export const TeamMemberTable = (): ReactElement => {
  const [state, { removeTeamMemberAction, updateTeamMemberAction }] =
    useTeamMemberManagerStore();
  const { teamMembers, isTeamDataLoading, userId } = state;
  const { palette } = useTheme();

  const [isRemoveTeamMemberModalOpen, setIsRemoveTeamMemberOpen] =
    useState<boolean>(false);
  const [selectedTeamMember, setSelectedTeamMember] =
    useState<TeamMemberContract | null>(null);
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] =
    useState<boolean>(false);

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
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(19, 41, 61, 0.1)",
          boxShadow: "none",
        }}
      >
        <Table aria-label="team members table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color={palette.common.white}
                >
                  Photo
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color={palette.common.white}
                >
                  First Name
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color={palette.common.white}
                >
                  Last Name
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color={palette.common.white}
                >
                  Position
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  color={palette.common.white}
                >
                  Jira ID
                </Typography>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: palette.primary.dark }}
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
                  "& .action-buttons": { opacity: 0.92 },
                  "&:hover .action-buttons": { opacity: 1 },
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.05)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    src={member.photoUrl || undefined}
                    alt={`${member.firstName} ${member.lastName}`}
                    sx={{
                      width: 46,
                      height: 46,
                      bgcolor: palette.primary.main,
                      borderRadius: 2.5,
                    }}
                  >
                    {member.firstName[0]}
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography fontSize={17} fontWeight={600}>
                    {member.firstName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={17} fontWeight={600}>
                    {member.lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={16.5}>
                    {member.position || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={16.5} sx={{ letterSpacing: "0.04em" }}>
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
                      <IconButton
                        onClick={() => {
                          setSelectedTeamMember(member);
                          setIsTeamMemberModalOpen(true);
                        }}
                        size="small"
                        sx={{
                          color: palette.primary.dark,
                          backgroundColor: "rgba(25, 118, 210, 0.16)",
                          border: "1px solid rgba(25, 118, 210, 0.35)",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.25)",
                            borderColor: "rgba(25, 118, 210, 0.55)",
                          },
                        }}
                      >
                        <EditIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setSelectedTeamMember(member);
                          setIsRemoveTeamMemberOpen(true);
                        }}
                        size="small"
                        sx={{
                          color: palette.error.dark,
                          backgroundColor: "rgba(211, 47, 47, 0.14)",
                          border: "1px solid rgba(211, 47, 47, 0.33)",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.22)",
                            borderColor: "rgba(211, 47, 47, 0.5)",
                          },
                        }}
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
                <TableCell colSpan={6} align="center">
                  {isTeamDataLoading ? <Loader /> : "No added team members"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTeamMember && (
        <>
          <RemoveTeamMemberModal
            isOpen={isRemoveTeamMemberModalOpen}
            onClose={() => {
              setIsRemoveTeamMemberOpen(false);
              setSelectedTeamMember(null);
            }}
            onRemove={() => {
              removeTeamMemberAction(selectedTeamMember.id, () =>
                notifyAlert("success", "Team member removed successfully")
              );
              setIsRemoveTeamMemberOpen(false);
              setSelectedTeamMember(null);
            }}
            selectedTeamMember={selectedTeamMember}
          />
          <TeamMemberModal
            isOpen={isTeamMemberModalOpen}
            onClose={() => {
              setIsTeamMemberModalOpen(false);
              setSelectedTeamMember(null);
            }}
            selectedTeamMember={selectedTeamMember}
            userId={userId}
            primaryButtonAction={(
              teamMemberData: TeamMemberUpsertContract
            ) =>
              updateTeamMemberAction(
                teamMemberData,
                selectedTeamMember.id,
                () => {
                  setIsTeamMemberModalOpen(false);
                  notifyAlert("success", "Team member updated successfully");
                }
              )
            }
          />
        </>
      )}
    </Box>
  );
};
