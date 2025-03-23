import React from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

import {
  SectionHeader,
  StandupWizardFooter,
  StandupWizardHeader,
} from "./components";
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
    <Box marginY={3} width="100%">
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
      <SectionHeader>{steps[currentStep]}</SectionHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "500px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            padding: 3,
            width: "80%",
            margin: "auto",
            backgroundColor: "#F6F6F4",
            borderRadius: 3,
          }}
        >
          <StepContent />
        </Box>
      </Box>
      <Box marginTop={3}>
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
