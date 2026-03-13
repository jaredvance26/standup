import React, { useRef } from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { StandupWizardFooter, StandupWizardHeader } from "./components";
import { useStandupWizardStore } from "./standup-wizard-store";
import { Standup, StandupSummary, TeamSelection } from "./steps";
import { SettingsModal } from "./settings-modal";
import { COLOR_SHADES } from "./constants";
import { MessageAlertHost } from "../alerts/MessageAlertHost";

const steps = ["Team Selection", "Standup", "Standup Summary"];

const StepOne = () => <TeamSelection />;
const StepTwo = () => <Standup />;
const StepThree = () => {
  const summaryRef = useRef<HTMLDivElement>(null);
  return <StandupSummary ref={summaryRef} />;
};

const stepComponents = [StepOne, StepTwo, StepThree];

const hexToRgb = (hex: string): string => {
  const normalizedHex = hex.replace("#", "");
  const parsedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalizedHex;

  const value = Number.parseInt(parsedHex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const withAlpha = (hex: string, alpha: number): string =>
  `rgba(${hexToRgb(hex)}, ${alpha})`;

export const StandupWizard = () => {
  const [
    { currentStep, settings, selectedTeamMemberIds, userId, isStandupSaveLoading },
    {
      navigateBackwardAction,
      navigateForwardAction,
      resetStandupWizardStoreAction,
      setStandupWizardStateAction,
      saveStandupAction,
    },
  ] = useStandupWizardStore();
  const { selectedColor, teamName } = settings;
  const selectedShade = COLOR_SHADES[selectedColor];

  const theme = createTheme({
    palette: {
      primary: {
        main: selectedShade.main,
        light: selectedShade.light,
        dark: selectedShade.dark,
      },
      background: {
        default: "#f6f3eb",
        paper: "#fffdfa",
      },
    },
    typography: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      h4: {
        fontFamily: '"Newsreader", serif',
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: "0.02em",
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 18,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            boxShadow: "none",
            paddingLeft: 18,
            paddingRight: 18,
          },
          contained: {
            backgroundImage: `linear-gradient(135deg, ${selectedShade.main}, ${selectedShade.dark})`,
            color: "#ffffff",
            textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
            "&.Mui-disabled": {
              backgroundImage: "none",
              backgroundColor: withAlpha(selectedShade.main, 0.45),
              color: "rgba(255, 255, 255, 0.85)",
            },
          },
          outlined: {
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            borderColor: withAlpha(selectedShade.dark, 0.35),
            color: selectedShade.dark,
            "&:hover": {
              borderColor: withAlpha(selectedShade.dark, 0.55),
              backgroundColor: "rgba(255, 255, 255, 0.92)",
            },
            "&.Mui-disabled": {
              borderColor: "rgba(19, 41, 61, 0.16)",
              color: "rgba(19, 41, 61, 0.42)",
            },
          },
        },
      },
    },
  });

  const StepContent = stepComponents[currentStep];
  const contentHeight =
    currentStep === 1
      ? "clamp(560px, calc(100vh - 300px), 1200px)"
      : "clamp(460px, calc(100vh - 340px), 900px)";
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      if (settings.saveStandupData && userId) {
        await saveStandupAction();
      }
      resetStandupWizardStoreAction();
    } else {
      navigateForwardAction();
    }
  };

  const canMoveForward =
    (currentStep === 0 ? selectedTeamMemberIds.length > 0 : true) &&
    !isStandupSaveLoading;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessageAlertHost />
      <Box
        width="100%"
        px={2.5}
        py={3}
        sx={{
          minHeight: "100vh",
          background: `
            radial-gradient(circle at 12% 12%, ${withAlpha(selectedShade.light, 0.22)} 0, transparent 34%),
            radial-gradient(circle at 88% 8%, rgba(141, 174, 207, 0.34) 0, transparent 32%),
            linear-gradient(145deg, rgba(228, 237, 245, 0.96), ${withAlpha(selectedShade.dark, 0.2)})
          `,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "min(96vw, 3200px)",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <StandupWizardHeader
            onSettingsClick={() =>
              setStandupWizardStateAction({ settingsModalOpen: true })
            }
            currentStep={currentStep}
            teamName={teamName}
          />
          <Stepper
            activeStep={currentStep}
            alternativeLabel={true}
            sx={{
              mb: 3,
              "& .MuiStepIcon-root": {
                fontSize: 34,
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: theme.palette.primary.dark,
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography
                    fontSize="clamp(22px, 1.1vw, 40px)"
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
            height: contentHeight,
            width: "100%",
          }}
        >
          <Box
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
              padding: 3,
              width: "100%",
              maxWidth: "min(96vw, 3120px)",
              margin: "auto",
              background:
                `linear-gradient(145deg, rgba(255,255,255,0.96), ${withAlpha(selectedShade.light, 0.14)})`,
              borderRadius: 6,
              border: `1px solid ${withAlpha(selectedShade.dark, 0.12)}`,
              boxShadow:
                "0 28px 50px -36px rgba(19, 41, 61, 0.38), 0 8px 18px -14px rgba(19, 41, 61, 0.22)",
              height: "100%",
              WebkitOverflowScrolling: "touch",
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
