import { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";

export interface BlankStateProps {
  icon: ReactElement;
  title: string;
  description: string;
  actionButton?: ReactElement;
}

export const BlankState = (props: BlankStateProps): ReactElement => {
  const { icon, title, description, actionButton } = props;
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{
        backgroundColor: palette.grey[200],
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          "& > *": {
            opacity: 0.5,
          },
        }}
      >
        {icon}
        <Typography marginTop={2} fontSize={24} fontWeight={500}>
          {title}
        </Typography>
        <Typography fontSize={16} color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box marginTop={3}>{actionButton}</Box>
    </Box>
  );
};
