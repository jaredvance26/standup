import { ReactElement } from "react";
import { Button } from "@mui/material";

interface NavigationButtonProps {
  icon: ReactElement;
  isDisabled: boolean;
  onClick: () => void;
}

export const NavigationButton = (
  props: NavigationButtonProps
): ReactElement => {
  const { icon, isDisabled, onClick } = props;
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant="contained"
      sx={{ width: "50px", height: "50px", borderRadius: "45%" }}
    >
      {icon}
    </Button>
  );
};
