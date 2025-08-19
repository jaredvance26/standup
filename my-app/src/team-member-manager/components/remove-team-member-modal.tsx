import React, { ReactElement } from "react";
import { Avatar, Box, Modal, Typography, useTheme } from "@mui/material";

import { ModalFooter, ModalWrapper } from "../../components";
import { PersonRemove, Warning } from "@mui/icons-material";
import { TeamMemberContract } from "../../api/contracts";

interface RemoveTeamMemberModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  selectedTeamMember: TeamMemberContract;
}

export const RemoveTeamMemberModal = (
  props: RemoveTeamMemberModalInterface
): ReactElement => {
  const { isOpen, onClose, onRemove, selectedTeamMember } = props;
  const { palette } = useTheme();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalWrapper
        onClose={onClose}
        headerName="Remove Team Member"
        modalHeight={500}
        modalIcon={
          <PersonRemove
            sx={{ mr: 1, fontSize: 45, color: palette.primary.main }}
          />
        }
      >
        <Box
          marginTop={5}
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: .5,
          }}
        >
          <Warning sx={{ fontSize: 85, color: palette.warning.main }} />
          <Typography fontSize={25} fontWeight={600} color={palette.grey[800]}>
            Are you sure you want to remove this team member?
          </Typography>
          <Box
            sx={{
              marginTop: 5,
              backgroundColor: palette.grey[100],
              borderRadius: 3,
              padding: 2,
              display: "flex",
              gap: 1,
              width: "45%",
            }}
          >
            <Avatar
              alt={selectedTeamMember.firstName}
              sx={{
                marginRight: 2,
                bgcolor: palette.primary.dark,
                borderRadius: 3,
                width: 50,
                height: 50,
              }}
            >{`${selectedTeamMember.firstName[0]}`}</Avatar>
            <Box>
              <Typography
                fontSize={20}
                fontWeight={600}
                color={palette.common.black}
              >
                {`${selectedTeamMember.firstName} ${selectedTeamMember.lastName}`}
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color={palette.grey[800]}
                >
                  {selectedTeamMember.position}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
        <ModalFooter
          onPrimaryClick={onRemove}
          onCancel={onClose}
          isPrimaryDisabled={false}
          primaryButtonLabel="Remove Team Member"
        />
      </ModalWrapper>
    </Modal>
  );
};
