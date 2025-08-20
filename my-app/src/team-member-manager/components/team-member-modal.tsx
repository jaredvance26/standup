import { ReactElement, useState, useEffect } from "react";
import { Box, Modal, useTheme, TextField, Typography } from "@mui/material";

import { TeamMemberContract } from "../../api/contracts";
import { ModalFooter, ModalWrapper } from "../../components";
import { PersonAdd, Edit } from "@mui/icons-material";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeamMember: TeamMemberContract | null;
  userId: string;
  primaryButtonAction: (teamMemberData: Omit<TeamMemberContract, "id">) => void;
}

export const TeamMemberModal = (props: TeamMemberModalProps): ReactElement => {
  const { isOpen, onClose, selectedTeamMember, userId, primaryButtonAction } = props;
  const { palette } = useTheme();

  // Form state
  const [firstName, setFirstName] = useState<string>(
    selectedTeamMember?.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    selectedTeamMember?.lastName || ""
  );
  const [position, setPosition] = useState<string>(
    selectedTeamMember?.position || ""
  );
  const [jiraId, setJiraId] = useState<string>(
    selectedTeamMember?.jiraId || ""
  );

  // Form validation errors
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  // If editing, populate form with selected team member data
  useEffect(() => {
    if (selectedTeamMember) {
      setFirstName(selectedTeamMember.firstName || "");
      setLastName(selectedTeamMember.lastName || "");
      setPosition(selectedTeamMember.position || "");
      setJiraId(selectedTeamMember.jiraId || "");
    } else {
      // Reset form when opening to add a new team member
      setFirstName("");
      setLastName("");
      setPosition("");
      setJiraId("");
    }
    // Reset validation errors
    setFirstNameError("");
    setLastNameError("");
  }, [selectedTeamMember, isOpen]);

  const teamMemberModalData = () => {
    if (selectedTeamMember) {
      return {
        headerName: "Edit Team Member",
        modalIcon: (
          <Edit sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
        ),
        actionButtonLabel: "Save",
      };
    }
    return {
      headerName: "Add Team Member",
      modalIcon: (
        <PersonAdd sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
      ),
      actionButtonLabel: "Add Team Member",
    };
  };
  const { headerName, modalIcon, actionButtonLabel } = teamMemberModalData();

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate first name (required)
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate last name (required)
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const teamMemberData: Omit<TeamMemberContract, "id"> = {
        userId,
        firstName,
        lastName,
        position,
        jiraId,
      };

      primaryButtonAction(teamMemberData);
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        // Only allow close via explicit button clicks, not backdrop clicks
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      disableEscapeKeyDown={false}
    >
      <ModalWrapper
        headerName={headerName}
        modalIcon={modalIcon}
        onClose={onClose}
        modalHeight={500}
      >
        <Box
          marginBottom={3.5}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: "60%",
          }}
        >
          {/* First Name - Required */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              First Name <span style={{ color: palette.error.main }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              error={!!firstNameError}
              helperText={firstNameError}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Last Name - Required */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Last Name <span style={{ color: palette.error.main }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              error={!!lastNameError}
              helperText={lastNameError}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Position - Optional */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Position
            </Typography>
            <TextField
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Jira ID - Optional */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Jira ID
            </Typography>
            <TextField
              fullWidth
              value={jiraId}
              onChange={(e) => setJiraId(e.target.value)}
              placeholder="Enter Jira ID"
              size="small"
              type="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        </Box>
        <ModalFooter
          onCancel={onClose}
          onPrimaryClick={handleSubmit}
          isPrimaryDisabled={!firstName || !lastName}
          primaryButtonLabel={actionButtonLabel}
        />
      </ModalWrapper>
    </Modal>
  );
};
