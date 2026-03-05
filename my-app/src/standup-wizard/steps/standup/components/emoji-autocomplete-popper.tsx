import { ReactElement } from "react";
import { List, ListItemButton, ListItemText, Paper, Popper } from "@mui/material";
import { EmojiOption } from "../utils";

type EmojiAutocompletePopperProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  options: EmojiOption[];
  selectedIndex: number;
  onSelect: (option: EmojiOption) => void;
};

export const EmojiAutocompletePopper = ({
  open,
  anchorEl,
  options,
  selectedIndex,
  onSelect,
}: EmojiAutocompletePopperProps): ReactElement => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 1400 }}>
      <Paper elevation={4} sx={{ mt: 1, width: 320 }}>
        <List dense disablePadding>
          {options.map((option, index) => (
            <ListItemButton
              key={option.name}
              selected={index === selectedIndex}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(option);
              }}
            >
              <ListItemText
                primary={`${option.emoji}  :${option.name}:`}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Popper>
  );
};
