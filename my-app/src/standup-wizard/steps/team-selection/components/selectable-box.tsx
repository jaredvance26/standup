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
import { teamMembers } from "../../../../local";

interface SelectableBoxProps {
  id: number;
  imageUrl: string;
  name: string;
  position: string;
  selected: boolean;
  onRemoveGuest: (id: number) => void;
  onToggle: () => void;
}

export const SelectableBox = (props: SelectableBoxProps) => {
  const { id, imageUrl, name, position, selected, onRemoveGuest, onToggle } =
    props;
  const { palette } = useTheme();
  const isGuest = id > teamMembers.length;

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
        backgroundColor: selected ? "lightblue" : "white",
        transition: "background-color 0.3s ease",
      }}
    >
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{ marginRight: 2 }}
        variant="rounded"
      />
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
