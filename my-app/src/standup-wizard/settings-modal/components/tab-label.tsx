import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

interface TabLabelProps {
	label: string;
	icon: ReactElement;
}

export const TabLabel = ({ label, icon }: TabLabelProps): ReactElement => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
		{icon}
		<Typography fontSize={18} fontWeight={500}>{label}</Typography>
	</Box>
  );
};