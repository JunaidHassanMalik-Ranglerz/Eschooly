import {Platform, StatusBar} from 'react-native';
import {Colors} from './Colors';

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
