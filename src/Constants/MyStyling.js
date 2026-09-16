import {Platform, StatusBar} from 'react-native';
import {Colors} from './Colors';

const BLUE_STATUS_SCREENS = ['Role'];
const SPLASH_STATUS_SCREENS = ['SplashScreen', 'Register', 'AuthNavigation'];

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
  StatusBar.setBarStyle('dark-content', false);
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor(Colors.white, false);
  }
};

export const setBlueStatusBar = () => {
  StatusBar.setBarStyle('light-content', false);
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor(Colors.BlueBackground, false);
  }
};

export const setSplashStatusBar = () => {
  StatusBar.setBarStyle('light-content', false);
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(Colors.transparent, false);
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

let appliedStatusBar = null;

const getStatusBarAppearance = routeName => {
  if (SPLASH_STATUS_SCREENS.includes(routeName)) {
    return 'splash';
  }

  if (BLUE_STATUS_SCREENS.includes(routeName)) {
    return 'blue';
  }

  return 'dark';
};

export const applyStatusBarForRoute = (routeName, force = false) => {
  if (!routeName) {
    return;
  }

  const nextAppearance = getStatusBarAppearance(routeName);
  if (!force && appliedStatusBar === nextAppearance) {
    return;
  }

  appliedStatusBar = nextAppearance;

  if (nextAppearance === 'splash') {
    setSplashStatusBar();
    return;
  }

  if (nextAppearance === 'blue') {
    setBlueStatusBar();
    return;
  }

  setDarkStatusBar();
};
