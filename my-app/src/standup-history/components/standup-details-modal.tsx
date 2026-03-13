import { ReactElement } from "react";
import {
  Box,
  IconButton,
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
import { Download, History } from "@mui/icons-material";
import { format } from "date-fns";

import { ModalWrapper } from "../../components";
import { StandupGETContract } from "../../standup-wizard/api/contracts";
import { Status } from "../../standup-wizard/components";
import { captureTableScreenshot } from "../../standup-wizard/utils";
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
        modalHeight={680}
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
          fontSize: 34,
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.1,
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 }, overflowY: "auto", maxHeight: 560 }}>
          {standup && (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="end"
                marginBottom={2}
              >
                <IconButton
                  aria-label="Download standup"
                  color="primary"
                  onClick={() => {
                    captureTableScreenshot({
                      containerSelector: ".standup-details-table-container",
                      title: `Standup - ${format(
                        new Date(standup.completedAt),
                        "PPpp"
                      )}`,
                      fileNamePrefix: "past-standup",
                      fileNameDate: format(
                        new Date(standup.completedAt),
                        "yyyy-MM-dd"
                      ),
                    });
                  }}
                  sx={{
                    border: "1px solid rgba(19, 41, 61, 0.15)",
                    borderRadius: 2.5,
                    backgroundColor: "rgba(255,255,255,0.88)",
                  }}
                >
                  <Download />
                </IconButton>
              </Box>
              <TableContainer
                className="standup-details-table-container"
                component={Paper}
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(19, 41, 61, 0.1)",
                  borderRadius: 3,
                  boxShadow:
                    "0 18px 34px -26px rgba(19, 41, 61, 0.45), 0 2px 8px rgba(19, 41, 61, 0.08)",
                }}
              >
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
            </>
          )}
        </Box>
      </ModalWrapper>
    </Modal>
  );
};
