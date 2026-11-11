import {Platform} from 'react-native';
import {Colors} from './Colors';
import {Fonts} from './Fonts';
import {Fontsize} from './Fontsize';
import {Typography} from './Typography';
import {wp, hp} from './Responsive';

export const spacing = {
  xs: wp(1.5),
  sm: wp(2.5),
  md: wp(4),
  lg: wp(5),
  xl: hp(2),
  screenX: wp(4),
  screenY: hp(1.5),
};

export const radius = {
  chip: wp(10),
  card: wp(5),
  banner: wp(6),
  iconTile: wp(4),
  search: wp(4),
  pill: wp(10),
  header: wp(8),
};

export const elevation = {
  none: Platform.select({
    ios: {shadowOpacity: 0, shadowRadius: 0, shadowOffset: {width: 0, height: 0}},
    android: {elevation: 0},
  }),
  card: Platform.select({
    ios: {
      shadowColor: Colors.shadowNavy,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },
    android: {elevation: 5},
  }),
  banner: Platform.select({
    ios: {
      shadowColor: Colors.shadowNavy,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.14,
      shadowRadius: 14,
    },
    android: {elevation: 6},
  }),
  header: Platform.select({
    ios: {shadowOpacity: 0, shadowRadius: 0, shadowOffset: {width: 0, height: 0}},
    android: {elevation: 0},
  }),
};

export const Theme = {
  Colors,
  Fonts,
  Fontsize,
  Typography,
  spacing,
  radius,
  elevation,
};

export default Theme;
