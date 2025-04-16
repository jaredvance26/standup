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
import { SettingsModal } from "./settings-modal";
import { COLOR_SHADES } from "./constants";

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
    { currentStep, selectedColor },
    {
      navigateBackwardAction,
      navigateForwardAction,
      resetStandupWizardStoreAction,
      setStandupWizardStateAction,
    },
  ] = useStandupWizardStore();
  const theme = createTheme({
    palette: {
      primary: {
        main: COLOR_SHADES[selectedColor].main,
        light: COLOR_SHADES[selectedColor].light,
        dark: COLOR_SHADES[selectedColor].dark,
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

  const [{ selectedTeamMemberIds }] = useStandupWizardStore();

  const StepContent = stepComponents[currentStep];
  const overflowSetting = currentStep === 1 ? "hidden" : "auto";
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      captureTableScreenshot();
      resetStandupWizardStoreAction();
    } else {
      navigateForwardAction();
    }
  };

  const canMoveForward =
    currentStep === 0 ? selectedTeamMemberIds.length > 0 : true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box marginY={3} width="100%">
        <StandupWizardHeader
          onSettingsClick={() =>
            setStandupWizardStateAction({ settingsModalOpen: true })
          }
        />
        <Stepper
          activeStep={currentStep}
          alternativeLabel={true}
          sx={{ mb: 3 }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography
                  fontSize={24}
                  fontWeight={500}
                  sx={{
                    color:
                      index === currentStep
                        ? theme.palette.primary.main
                        : undefined,
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "600px",
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
			  height: '100%'
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
            handleNext={canMoveForward ? handleNext : undefined}
          />
        </Box>
      </Box>
      <SettingsModal />
    </ThemeProvider>
  );
};
