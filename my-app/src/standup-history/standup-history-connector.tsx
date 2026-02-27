import { ReactElement } from "react";

import { StandupHistory } from "./standup-history";
import { StandupHistoryContainer } from "./standup-history-store";

interface StandupHistoryConnectorProps {
  userId: string;
}

export const StandupHistoryConnector = ({
  userId,
}: StandupHistoryConnectorProps): ReactElement => {
  return (
    <StandupHistoryContainer userId={userId}>
      <StandupHistory />
    </StandupHistoryContainer>
  );
};
