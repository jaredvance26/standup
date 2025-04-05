import { ReactElement } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";

import { Status } from "../../../components";
import { MemberStatus } from "../../../../types";

interface StatusSelectProps {
  value: MemberStatus;
  onChange: (value: MemberStatus) => void;
}

export const StatusSelect = ({
  value,
  onChange,
}: StatusSelectProps): ReactElement => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as MemberStatus);
  };
  const { palette } = useTheme();

  return (
    <Select
      value={value}
      variant="outlined"
      onChange={handleChange}
      displayEmpty
      renderValue={() => <Status status={value} />}
      fullWidth
      sx={{ backgroundColor: palette.common.white }}
    >
      <MenuItem value={MemberStatus.Green}>{<Status status={MemberStatus.Green} />}</MenuItem>
      <MenuItem value={MemberStatus.Yellow}>{<Status status={MemberStatus.Yellow} />}</MenuItem>
      <MenuItem value={MemberStatus.Red}>{<Status status={MemberStatus.Red} />}</MenuItem>
    </Select>
  );
};
