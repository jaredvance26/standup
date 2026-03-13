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
import { hashStringToNumber } from "../../../utils";

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
        backgroundColor: selected
          ? "rgba(19, 41, 61, 0.14)"
          : "rgba(255, 255, 255, 0.38)",
        border: "1px solid rgba(19, 41, 61, 0.14)",
        boxShadow: "none",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          backgroundColor: selected
            ? "rgba(19, 41, 61, 0.18)"
            : "rgba(255, 255, 255, 0.52)",
          borderColor: "rgba(19, 41, 61, 0.24)",
        },
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
