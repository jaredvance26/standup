import React from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

import { StandupWizardFooter, StandupWizardHeader } from "./components";
import { useStandupWizardStore } from "./standup-wizard-store";
import { Standup, StandupSummary, TeamSelection } from "./steps";

const steps = ["Team Selection", "Standup", "Standup Summary"];

const StepOne = () => <TeamSelection />;
const StepTwo = () => <Standup />;
const StepThree = () => <StandupSummary />;

const stepComponents = [StepOne, StepTwo, StepThree];

export const StandupWizard = () => {
  const [{ currentStep }, { navigateBackwardAction, navigateForwardAction }] =
    useStandupWizardStore();
  const StepContent = stepComponents[currentStep];

  return (
    <Box marginTop={3} sx={{ width: "100%" }}>
      <StandupWizardHeader />
      <Stepper activeStep={currentStep} alternativeLabel={true} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography fontSize={18}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <StepContent />
        <StandupWizardFooter
          currentStep={currentStep}
          steps={steps}
          handleBack={navigateBackwardAction}
          handleNext={navigateForwardAction}
        />
      </Box>
    </Box>
  );
};
