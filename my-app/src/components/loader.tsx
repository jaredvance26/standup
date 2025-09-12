import React, { ReactElement } from "react";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

interface LoaderProps {
  size?: string;
}

export const Loader = (props: LoaderProps): ReactElement => {
  const { size = "120" } = props;
  return <DotWave size={size} speed="1" color="#1976d2" />;
};
