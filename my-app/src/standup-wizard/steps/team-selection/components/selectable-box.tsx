import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

interface SelectableBoxProps {
  id: number;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  position: string;
  selected: boolean;
  onRemoveGuest: (id: number) => void;
  onToggle: () => void;
}

// Create a hash from a string to use for generating consistent colors
const hashStringToNumber = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  // Make sure it's positive
  return Math.abs(hash);
};

export const SelectableBox = (props: SelectableBoxProps) => {
  const {
    id,
    imageUrl,
    isGuest,
    name,
    position,
    selected,
    onRemoveGuest,
    onToggle,
  } = props;
  const { palette } = useTheme();

  return (
    <Paper
      onClick={onToggle}
      elevation={3}
      sx={{
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        padding: 3.5,
        cursor: "pointer",
        backgroundColor: selected ? palette.grey[300] : palette.common.white,
        transition: "background-color 0.3s ease",
      }}
    >
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{
          marginRight: 2,
          bgcolor: `hsl(${hashStringToNumber(name) % 360}, 70%, 45%)`,
          borderRadius: 3,
          width: 50,
          height: 50,
        }}
      >{`${name[0]}`}</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography lineHeight={1.25} variant="h6">
          {name}
        </Typography>
        <Typography whiteSpace="nowrap" variant="body2" color="textSecondary">
          {position}
        </Typography>
      </Box>
      {isGuest && (
        <IconButton onClick={() => onRemoveGuest(id)}>
          <Delete
            sx={{
              transition: "color .03s ease",
              "&:hover": { color: palette.error.main },
            }}
          />
        </IconButton>
      )}
      <Checkbox
        color="primary"
        checked={selected}
        onChange={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onClick={onToggle}
      />
    </Paper>
  );
};
