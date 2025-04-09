import React, { useRef } from "react";
import { captureTableScreenshot } from "./utils";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
const StepThree = () => {
  const summaryRef = useRef<HTMLDivElement>(null);
  return <StandupSummary ref={summaryRef} />;
};

const stepComponents = [StepOne, StepTwo, StepThree];

export const StandupWizard = () => {
  const [
    { currentStep },
    {
      navigateBackwardAction,
      navigateForwardAction,
      resetStandupWizardStoreAction,
    },
  ] = useStandupWizardStore();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
    },
    typography: {
      fontFamily: '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 3,
    },
  });

  const onFinish = () => {
    captureTableScreenshot();
    resetStandupWizardStoreAction();
  };
  const StepContent = stepComponents[currentStep];
  const overflowSetting = currentStep === 1 ? "hidden" : "auto";
  const isLastStep = currentStep === steps.length - 1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box marginY={3} width="100%">
        <StandupWizardHeader />
        <Stepper
          activeStep={currentStep}
          alternativeLabel={true}
          sx={{ mb: 3 }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography fontSize={24} fontWeight={500}>{label}</Typography>
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
              overflow: overflowSetting,
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
            handleNext={isLastStep ? onFinish : navigateForwardAction}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
