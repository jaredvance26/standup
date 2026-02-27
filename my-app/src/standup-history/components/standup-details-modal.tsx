import { ReactElement } from "react";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { History } from "@mui/icons-material";
import { format } from "date-fns";

import { ModalWrapper } from "../../components";
import { StandupGETContract } from "../../standup-wizard/api/contracts";
import { Status } from "../../standup-wizard/components";
import { MemberStatus } from "../../types";

interface StandupDetailsModalProps {
  standup: StandupGETContract | null;
  onClose: () => void;
}

export const StandupDetailsModal = ({
  standup,
  onClose,
}: StandupDetailsModalProps): ReactElement => {
  const { palette } = useTheme();

  return (
    <Modal open={Boolean(standup)} onClose={onClose}>
      <ModalWrapper
        headerName={
          standup
            ? `Standup - ${format(new Date(standup.completedAt), "PPpp")}`
            : "Standup"
        }
        modalIcon={
          <History sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
        }
        onClose={onClose}
      >
        <Box sx={{ p: 2, overflowY: "auto", maxHeight: 520 }}>
          {standup && (
            <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: palette.primary.dark }}>
                      <Typography fontSize={20} fontWeight={700} color="white">
                        Name
                      </Typography>
                    </TableCell>
                    {standup.showStatusField && (
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
                  {standup.teamMembers.map((teamMember) => (
                    <TableRow key={`${standup._id}-${teamMember.memberId}`}>
                      <TableCell>
                        <Typography fontSize={18}>{`${teamMember.firstName} ${teamMember.lastName}`}</Typography>
                      </TableCell>
                      {standup.showStatusField && (
                        <TableCell>
                          {teamMember.status !== MemberStatus.None ? (
                            <Status status={teamMember.status as MemberStatus} />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography fontSize={18}>
                          {teamMember.notes &&
                            teamMember.notes.split("\n").join("  |  ")}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </ModalWrapper>
    </Modal>
  );
};
