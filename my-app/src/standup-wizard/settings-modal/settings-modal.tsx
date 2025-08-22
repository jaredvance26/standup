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
import { AccountTab, GeneralTab, ThemeTab } from "./tabs";
import { useStandupWizardStore } from "../standup-wizard-store";
import { ModalFooter, ModalWrapper } from "../../components";
import { useMessageAlert } from "../../hooks";

export const SettingsModal = (): ReactElement => {
  const [tabValue, setTabValue] = useState(0);
  const { palette } = useTheme();
  const [setMessage, AlertComponent] = useMessageAlert();
  const [
    { settings, userId, settingsModalOpen, originalSettings },
    { setStandupWizardStateAction, updateSettingsAction },
  ] = useStandupWizardStore();
  const { selectedColor, hideEmployees, showStatusField } = settings;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isPrimaryDisabled = isEqual(settings, originalSettings);

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
          <TabPanel value={tabValue} index={0}>
            <AccountTab />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
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
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Integrations content coming soon...
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ThemeTab
              selectedColor={selectedColor}
              onColorSelect={(color) =>
                setStandupWizardStateAction({
                  settings: { ...settings, selectedColor: color },
                })
              }
            />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            Fun content coming soon...
          </TabPanel>
        </Box>
        <ModalFooter
          onPrimaryClick={() => {
            updateSettingsAction(userId);
            setMessage("success", "Settings updated successfully");
          }}
          onCancel={() => {
            setStandupWizardStateAction({ settingsModalOpen: false });
            setStandupWizardStateAction({ settings: originalSettings });
          }}
          isPrimaryDisabled={isPrimaryDisabled}
        />
        {AlertComponent}
      </ModalWrapper>
    </Modal>
  );
};
