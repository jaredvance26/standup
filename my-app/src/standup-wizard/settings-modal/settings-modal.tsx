import React, { useState, ReactElement } from "react";
import { Modal, Box, Tabs, Tab, useTheme } from "@mui/material";
import {
  Cable,
  Palette,
  Star,
  Settings,
  Tune,
  Person,
} from "@mui/icons-material";
import { isEqual } from "lodash";

import { TabLabel, TabPanel } from "./components";
import {
  AccountTab,
  FunTab,
  GeneralTab,
  IntegrationsTab,
  ThemeTab,
} from "./tabs";
import { useStandupWizardStore } from "../standup-wizard-store";
import { ModalFooter, ModalWrapper } from "../../components";
import { notifyAlert } from "../../alerts/alert-notifier";
import { QuestionOfDay } from "../types";

export const SettingsModal = (): ReactElement => {
  const [tabValue, setTabValue] = useState(0);
  const { palette } = useTheme();
  const [
    { settings, userId, settingsModalOpen, originalSettings, questionOfDay },
    { setStandupWizardStateAction, updateSettingsAction },
  ] = useStandupWizardStore();
  const {
    selectedColor,
    hideEmployees,
    showStatusField,
    teamName,
    jiraSettings,
  } = settings;

  enum SettingTabs {
    Account = 0,
    General = 1,
    Integrations = 2,
    Theme = 3,
    Fun = 4,
  }

  const [tempQuestionOfDay, setTempQuestionOfDay] = useState<QuestionOfDay>({
    includeQuestion: questionOfDay.includeQuestion,
    question: questionOfDay.question,
    isDuringStandup: questionOfDay.isDuringStandup,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isPrimaryDisabled = () => {
    if (tabValue === SettingTabs.Fun) {
      return (
        (tempQuestionOfDay.includeQuestion &&
          !Boolean(tempQuestionOfDay.question)) ||
        isEqual(tempQuestionOfDay, questionOfDay)
      );
    }
    return isEqual(settings, originalSettings);
  };

  return (
    <Modal
      open={settingsModalOpen}
      disableEscapeKeyDown
      disableAutoFocus
      aria-labelledby="settings-modal-title"
    >
      <ModalWrapper
        onClose={() => {
          setStandupWizardStateAction({ settingsModalOpen: false });
          if (tabValue === SettingTabs.Fun) {
            setTempQuestionOfDay({
              includeQuestion: questionOfDay.includeQuestion,
              question: questionOfDay.question,
              isDuringStandup: questionOfDay.isDuringStandup,
            });
            return;
          }
          setStandupWizardStateAction({ settings: originalSettings });
        }}
        headerName="Settings"
        modalIcon={
          <Settings sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
        }
      >
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Box marginTop={2} marginLeft={2}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={<TabLabel label="Account" icon={<Person />} />} />
              <Tab label={<TabLabel label="General" icon={<Tune />} />} />
              <Tab label={<TabLabel label="Integrations" icon={<Cable />} />} />
              <Tab label={<TabLabel label="Theme" icon={<Palette />} />} />
              <Tab label={<TabLabel label="Fun" icon={<Star />} />} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={SettingTabs.Account}>
            <AccountTab />
          </TabPanel>
          <TabPanel value={tabValue} index={SettingTabs.General}>
            <GeneralTab
              hideEmployees={hideEmployees}
              onToggleHideEmployees={() =>
                setStandupWizardStateAction({
                  settings: { ...settings, hideEmployees: !hideEmployees },
                })
              }
              showStatusField={showStatusField}
              onToggleShowStatusField={() =>
                setStandupWizardStateAction({
                  settings: { ...settings, showStatusField: !showStatusField },
                })
              }
              teamName={teamName}
              onTeamNameChange={(teamName) =>
                setStandupWizardStateAction({
                  settings: { ...settings, teamName },
                })
              }
            />
          </TabPanel>
          <TabPanel value={tabValue} index={SettingTabs.Integrations}>
            <IntegrationsTab
              jiraSettings={jiraSettings}
              onJiraSettingsChange={(newValue, key) =>
                setStandupWizardStateAction({
                  settings: {
                    ...settings,
                    jiraSettings: { ...jiraSettings, [key]: newValue },
                  },
                })
              }
            />
          </TabPanel>
          <TabPanel value={tabValue} index={SettingTabs.Theme}>
            <ThemeTab
              selectedColor={selectedColor}
              onColorSelect={(color) =>
                setStandupWizardStateAction({
                  settings: { ...settings, selectedColor: color },
                })
              }
            />
          </TabPanel>
          <TabPanel value={tabValue} index={SettingTabs.Fun}>
            <FunTab
              questionOfDay={tempQuestionOfDay}
              onQuestionOfTheDayChange={(questionOfDay) =>
                setTempQuestionOfDay(questionOfDay)
              }
            />
          </TabPanel>
        </Box>
        <ModalFooter
          onPrimaryClick={() => {
            if (tabValue === SettingTabs.Fun) {
              setStandupWizardStateAction({
                questionOfDay: tempQuestionOfDay,
              });
              notifyAlert(
                "success",
                "Question of the day updated successfully"
              );
              return;
            }
            updateSettingsAction(userId);
            notifyAlert("success", "Settings updated successfully");
          }}
          onCancel={() => {
            setStandupWizardStateAction({ settingsModalOpen: false });
            if (tabValue === SettingTabs.Fun) {
              setTempQuestionOfDay({
                includeQuestion: questionOfDay.includeQuestion,
                question: questionOfDay.question,
                isDuringStandup: questionOfDay.isDuringStandup,
              });
              return;
            }
            setStandupWizardStateAction({ settings: originalSettings });
          }}
          isPrimaryDisabled={isPrimaryDisabled()}
        />
      </ModalWrapper>
    </Modal>
  );
};
