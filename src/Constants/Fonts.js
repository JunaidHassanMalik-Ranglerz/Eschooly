import {Platform} from 'react-native';

export const Fonts = {
  bold: Platform.select({
    ios: 'Poppins-Bold',
    android: 'PoppinsBold',
  }),
  medium: Platform.select({
    ios: 'Poppins-Medium',
    android: 'PoppinsMedium',
  }),
  semibold: Platform.select({
    ios: 'Poppins-SemiBold',
    android: 'PoppinsSemiBold',
  }),
  regular: Platform.select({
    ios: 'Poppins-Regular',
    android: 'PoppinsRegular',
  }),

  robotoBold: 'Roboto-Bold',
  robotoMedium: 'Roboto-Medium',
  robotoSemibold: 'Roboto-SemiBold',
  robotoRegular: 'Roboto-Regular',
};
