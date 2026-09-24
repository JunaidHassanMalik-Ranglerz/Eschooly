import {Platform} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {wp} from '../../Constants/Responsive';

export const PROFILE_GRADIENT = ['#12325A', Colors.primary, Colors.primaryLight];
export const GRADIENT_START = {x: 0, y: 0};
export const GRADIENT_END = {x: 1, y: 1};
export const CARD_RADIUS = wp(5.5);

export const IDENTITY_CARD_SHADOW = Platform.select({
  ios: {
    shadowColor: '#12325A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  android: {
    elevation: 8,
  },
});

/** Six distinct elevation levels for grid cards (hub, menu, etc.). */
export const CARD_ELEVATIONS = [
  Platform.select({
    ios: {shadowColor: '#0F2D52', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.1, shadowRadius: 6},
    android: {elevation: 3},
  }),
  Platform.select({
    ios: {shadowColor: '#12325A', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.14, shadowRadius: 9},
    android: {elevation: 5},
  }),
  Platform.select({
    ios: {shadowColor: '#1A3FCE', shadowOffset: {width: 0, height: 7}, shadowOpacity: 0.16, shadowRadius: 11},
    android: {elevation: 7},
  }),
  Platform.select({
    ios: {shadowColor: '#0A4E8A', shadowOffset: {width: 0, height: 9}, shadowOpacity: 0.2, shadowRadius: 14},
    android: {elevation: 9},
  }),
  Platform.select({
    ios: {shadowColor: '#062653', shadowOffset: {width: 0, height: 11}, shadowOpacity: 0.22, shadowRadius: 16},
    android: {elevation: 11},
  }),
  Platform.select({
    ios: {shadowColor: '#051A33', shadowOffset: {width: 0, height: 13}, shadowOpacity: 0.26, shadowRadius: 18},
    android: {elevation: 13},
  }),
];

export const getCardElevation = (index = 0) =>
  CARD_ELEVATIONS[Math.abs(index) % CARD_ELEVATIONS.length];

export const ACTION_ICON_COLOR = {
  moreInfo: Colors.iconSky,
  updatePassword: Colors.iconPurple,
  logout: Colors.red,
};

export const DETAIL_ICON_COLOR = {
  cnic: Colors.iconSky,
  email: Colors.iconPink,
  phone: Colors.iconGreen,
  address: Colors.iconAmber,
  studentId: Colors.iconBlue,
  guardian: Colors.iconPurple,
  dob: Colors.iconOrange,
  class: Colors.iconTeal,
  section: Colors.iconCyan,
};
