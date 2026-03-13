import React, { ReactElement } from "react";
import { Box, Button } from "@mui/material";

interface StandupWizardFooterProps {
  currentStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext?: () => void;
}

export const StandupWizardFooter = (
  props: StandupWizardFooterProps
): ReactElement => {
  const { currentStep, steps, handleBack, handleNext } = props;

  const primaryFooterText = currentStep === steps.length - 1 ? "Finish" : "Next";
  const isNextDisabled = !handleNext;

  return (
    <Box display="flex" justifySelf="center" sx={{ mt: 2, gap: 1.5 }}>
      <Button
        disabled={currentStep === 0}
        onClick={handleBack}
        variant="outlined"
        sx={{ minWidth: 120 }}
      >
        Back
      </Button>
      <Button
        size="large"
        variant="contained"
        onClick={handleNext}
        disabled={isNextDisabled}
        sx={{ minWidth: 140 }}
      >
        {primaryFooterText}
      </Button>
    </Box>
  );
};
