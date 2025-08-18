import React, { ReactElement } from "react";
import { TeamMemberManager } from "./team-member-manager";
import { TeamMemberManagerContainer } from "./team-member-manager-store";

interface TeamMemberManagerConnectorProps {
  userId: string;
}

export const TeamMemberManagerConnector = ({
  userId,
}: TeamMemberManagerConnectorProps): ReactElement => {

  return (
    <TeamMemberManagerContainer userId={userId}>
      <TeamMemberManager />
    </TeamMemberManagerContainer>
  );
};
