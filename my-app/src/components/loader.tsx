import React, { ReactElement } from "react";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

export const Loader = (): ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <DotWave size="120" speed="1" color="#1976d2" />
    </div>
  );
};