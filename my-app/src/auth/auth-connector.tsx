import { ReactElement } from "react";

import { AuthContainer } from "./auth-store";
import { AuthProvider } from "./components";

export const AuthConnector = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  return (
    <AuthContainer>
      <AuthProvider>{children}</AuthProvider>
    </AuthContainer>
  );
};
