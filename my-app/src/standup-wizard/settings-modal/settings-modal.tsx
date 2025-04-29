import React, { useState, ReactElement } from "react";
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Cable,
  Close,
  Palette,
  Star,
  Settings,
  Tune,
  Person,
} from "@mui/icons-material";
import { isEqual } from "lodash";

import { SettingsModalFooter, TabLabel, TabPanel } from "./components";
import { AccountTab, GeneralTab, ThemeTab } from "./tabs";
import { useStandupWizardStore } from "../standup-wizard-store";

export const SettingsModal = (): ReactElement => {
  const [tabValue, setTabValue] = useState(0);
  const { palette } = useTheme();
  const [
    { settings, userId, settingsModalOpen, originalSettings },
    { setStandupWizardStateAction, updateSettingsAction },
  ] = useStandupWizardStore();
  const { selectedColor, hideEmployees } = settings;

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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          minHeight: 600,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: palette.grey[100],
            borderRadius: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: 1,
            borderColor: "divider",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Settings
              sx={{ mr: 1, fontSize: 45, color: palette.primary.main }}
            />
            <Typography
              fontSize={32}
              fontWeight={600}
              sx={{ color: palette.primary.main }}
            >
              Settings
            </Typography>
          </Box>
          <IconButton
            onClick={() =>
              setStandupWizardStateAction({ settingsModalOpen: false })
            }
            sx={{
              color: palette.primary.main,
              "&:hover": {
                color: palette.primary.dark,
              },
            }}
          >
            <Close sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>

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
        {/* Modal Footer */}
        <SettingsModalFooter
          onPrimaryClick={() =>
            updateSettingsAction(userId)
          }
          onCancel={() => {
            setStandupWizardStateAction({ settingsModalOpen: false });
			setStandupWizardStateAction({settings: originalSettings})
          }}
          isPrimaryDisabled={isPrimaryDisabled}
        />
      </Box>
    </Modal>
  );
};
