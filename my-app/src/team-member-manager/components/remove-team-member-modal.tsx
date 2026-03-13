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
        modalHeight={560}
        containerSx={{
          borderRadius: 5,
          border: "1px solid rgba(19, 41, 61, 0.12)",
          boxShadow: "0 28px 60px rgba(19, 41, 61, 0.22)",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,242,232,0.95))",
        }}
        headerSx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(244,238,227,0.9))",
          borderBottom: "1px solid rgba(19, 41, 61, 0.12)",
          p: 2.25,
        }}
        titleSx={{
          fontFamily: '"Newsreader", serif',
          fontSize: 36,
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1,
        }}
        modalIcon={
          <PersonRemove
            sx={{ mr: 1, fontSize: 45, color: palette.primary.main }}
          />
        }
      >
        <Box
          sx={{
            marginTop: 5,
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            px: 4,
          }}
        >
          <Warning sx={{ fontSize: 85, color: palette.warning.main }} />
          <Typography fontSize={28} fontWeight={800} color={palette.grey[800]}>
            Are you sure you want to remove this team member?
          </Typography>
          <Box
            sx={{
              marginTop: 4,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(244,238,227,0.75))",
              borderRadius: 3.5,
              border: "1px solid rgba(19, 41, 61, 0.12)",
              padding: 2.5,
              display: "flex",
              gap: 1,
              width: "100%",
              maxWidth: 460,
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
              </Typography>
              <Typography fontSize={16} fontWeight={600} color={palette.grey[800]}>
                {selectedTeamMember.position}
              </Typography>
            </Box>
          </Box>
        </Box>
        <ModalFooter
          onPrimaryClick={onRemove}
          onCancel={onClose}
          isPrimaryDisabled={false}
          primaryButtonLabel="Remove Team Member"
          containerSx={{
            gap: 1.5,
            p: 2.5,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(244,238,227,0.78))",
          }}
          cancelButtonSx={{
            fontSize: 15.5,
            borderRadius: 999,
            px: 2,
          }}
          primaryButtonSx={{
            minWidth: 220,
            height: 44,
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 700,
            px: 3,
          }}
        />
      </ModalWrapper>
    </Modal>
  );
};
