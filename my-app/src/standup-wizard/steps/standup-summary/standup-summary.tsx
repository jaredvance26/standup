import React, { ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import { useStandupWizardStore } from '../../standup-wizard-store';
import { MemberStatus, TeamMember } from '../../../types';
import { Status } from '../../components';

export const StandupSummary = React.forwardRef<HTMLDivElement>((_, ref): ReactElement => {
	const [{ selectedTeamMemberIds, teamMembers }] = useStandupWizardStore();
	const { palette } = useTheme();

	const selectedEmployees = selectedTeamMemberIds.map(id => teamMembers[id]);

	return (
		<TableContainer ref={ref} component={Paper} sx={{ height: 550, backgroundColor: '#fff' }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell sx={{ backgroundColor: palette.primary.dark }}><Typography fontSize={20} fontWeight={700} color="white">Name</Typography></TableCell>
						<TableCell sx={{ backgroundColor: palette.primary.dark }}><Typography fontSize={20} fontWeight={700} color="white">Status</Typography></TableCell>
						<TableCell sx={{ backgroundColor: palette.primary.dark }}><Typography fontSize={20} fontWeight={700} color="white">Notes</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{selectedEmployees.map((employee: TeamMember) => (
						<TableRow key={employee.id}>
							<TableCell><Typography fontSize={18}>{`${employee.firstName} ${employee.lastName}`}</Typography></TableCell>
							<TableCell>{employee.status !== MemberStatus.None ? <Status status={employee.status} /> : '—'}</TableCell>
							<TableCell><Typography fontSize={18}>{employee.notes.split('\n').join('  |  ')}</Typography></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

StandupSummary.displayName = 'StandupSummary';