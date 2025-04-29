import { StandupWizardAction } from "../../standup-wizard-store";
import { getUserSettings } from "../../../api/get-user-settings";

export const getUserSettingsAction = (userId: string): StandupWizardAction => async ({ getState, setState }) => {
  const { isSettingsDataLoading } = getState();
  if (isSettingsDataLoading) return;
  setState({ isSettingsDataLoading: true });
  try {
    const userSettings = await getUserSettings(userId);
    if (userSettings) {
      setState({
        settings: {
          selectedColor: userSettings.theme,
          hideEmployees: userSettings.standup.hideUnselectedEmployees
        },
        originalSettings: {
          selectedColor: userSettings.theme,
          hideEmployees: userSettings.standup.hideUnselectedEmployees
        },
        isSettingsDataLoading: false
      });
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error);
  } finally {
    setState({ isSettingsDataLoading: false });
  }
};