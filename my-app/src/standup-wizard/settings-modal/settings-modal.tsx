import React, { useState, ReactElement } from 'react';
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  IconButton,
} from '@mui/material';
import { Cable, Close, Palette, Star, Settings } from '@mui/icons-material';

import { TabLabel, TabPanel } from './components';
import { useStandupWizardStore } from '../standup-wizard-store';


export const SettingsModal = (): ReactElement => {
  const [tabValue, setTabValue] = useState(0);
  const { palette } = useTheme();
  const [{ settingsModalOpen }, { setStandupWizardStateAction }] = useStandupWizardStore();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={settingsModalOpen}
      disableEscapeKeyDown
      disableAutoFocus
      aria-labelledby="settings-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          minHeight: 500,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 0,
        }}
      >
        <Box sx={{ backgroundColor: palette.grey[100], borderRadius: 3, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 1, borderColor: 'divider', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Settings sx={{ mr: 1, fontSize: 45, color: palette.primary.main }} />
            <Typography fontSize={32} fontWeight={600} sx={{ color: palette.primary.main }}>
              Settings
            </Typography>
          </Box>
          <IconButton
            onClick={() => setStandupWizardStateAction({ settingsModalOpen: false })}
            sx={{
              color: palette.primary.main,
              '&:hover': {
                color: palette.primary.dark,
              },
            }}
          >
            <Close sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>

        <Box marginTop={2} marginLeft={2}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={<TabLabel label="Integrations" icon={<Cable />} />} />
            <Tab label={<TabLabel label="Theme" icon={<Palette />} />} />
            <Tab label={<TabLabel label="Fun" icon={<Star />} />} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          Integrations Content
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Theme Content
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Fun Content
        </TabPanel>
      </Box>
    </Modal>
  );
};
