import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {radius, spacing} from '../../Constants/Theme';
import {hp} from '../../Constants/Responsive';

const NavyHeaderBand = ({children, style, contentStyle}) => (
  <View style={[styles.band, style]}>
    <View style={[styles.content, contentStyle]}>{children}</View>
  </View>
);

export default NavyHeaderBand;

const styles = StyleSheet.create({
  band: {
    backgroundColor: Colors.brandNavy,
    borderBottomLeftRadius: radius.header,
    borderBottomRightRadius: radius.header,
    paddingBottom: hp(1.35),
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: 0,
  },
});
