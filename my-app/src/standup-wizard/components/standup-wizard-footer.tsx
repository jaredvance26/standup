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
    <Box display='flex' justifySelf='center' sx={{ mt: 2 }}>
      <Button disabled={currentStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Button 
        size='large' 
        variant="contained" 
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        {primaryFooterText}
      </Button>
    </Box>
  );
};
