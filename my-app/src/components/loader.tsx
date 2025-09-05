import React, { ReactElement } from "react";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message }: LoaderProps): ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <DotWave size="120" speed="1" color="#1976d2" />
      {message && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "#1976d2" }}>
          {message}
        </div>
      )}
    </div>
  );
};
