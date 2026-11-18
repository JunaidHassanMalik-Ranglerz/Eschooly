import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {hp} from '../../Constants/Responsive';

export const authFieldStyles = StyleSheet.create({
  fieldWrap: {
    marginBottom: hp(1.25),
    zIndex: 1,
  },
  fieldBox: {
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255,255,255,0.88)',
    borderRadius: radius.pill,
    paddingVertical: hp(1.35),
    ...elevation.card,
  },
  fieldText: {
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs3,
  },
  placeholder: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
  },
  label: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.7),
  },
  helper: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.7),
  },
});
