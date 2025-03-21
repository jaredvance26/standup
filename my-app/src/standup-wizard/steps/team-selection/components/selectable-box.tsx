import { Avatar, Box, Checkbox, Paper, Typography } from "@mui/material";

interface SelectableBoxProps {
  imageUrl: string;
  name: string;
  position: string;
  selected: boolean;
  onToggle: () => void;
}

export const SelectableBox = (props: SelectableBoxProps) => {
  const { imageUrl, name, position, selected, onToggle } = props;
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
		transition: 'background-color 0.3s ease'
      }}
    >
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{ marginRight: 2 }}
        variant="rounded"
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography lineHeight={1} variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {position}
        </Typography>
      </Box>
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
