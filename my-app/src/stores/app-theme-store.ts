import { createStore, createHook, Action, defaultRegistry } from "react-sweet-state";
import { Colors } from "../standup-wizard/types";

interface AppThemeState {
  themeColor: Colors;
}

type AppThemeAction = Action<AppThemeState>;

const initialState: AppThemeState = {
  themeColor: Colors.Blue,
};

const actions = {
  setThemeColor:
    (color: Colors): AppThemeAction =>
    ({ setState }) => {
      setState({ themeColor: color });
    },
};

const AppThemeStore = createStore({
  initialState,
  actions,
  name: "app-theme",
});

export const useAppThemeStore = createHook(AppThemeStore);

/** Set theme color from outside React (e.g. store actions) */
export const setAppThemeColor = (color: Colors) => {
  const instance = defaultRegistry.getStore(AppThemeStore);
  instance.storeState.setState({ themeColor: color });
};
