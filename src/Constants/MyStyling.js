import {Platform, StatusBar} from 'react-native';
import {Colors} from './Colors';

const BLUE_STATUS_SCREENS = ['SplashScreen', 'Role', 'Register'];

export const MyStyling = {
  container1: {
    flex: 1,
    backgroundColor: Colors.BlueBackground,
  },
  container2: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
};

export const setDarkStatusBar = () => {
  StatusBar.setBarStyle('dark-content', true);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Colors.white, true);
  }
};

export const setBlueStatusBar = () => {
  StatusBar.setBarStyle('light-content', true);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Colors.BlueBackground, true);
  }
};

export const getActiveRouteName = state => {
  if (!state) {
    return null;
  }

  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export const applyStatusBarForRoute = routeName => {
  if (BLUE_STATUS_SCREENS.includes(routeName)) {
    setBlueStatusBar();
    return;
  }

  setDarkStatusBar();
};
