import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const HeaderSubtitle = ({text}) => {
  if (!text) {
    return null;
  }

  return (
    <Text
      style={styles.subtitle}
      numberOfLines={2}
      maxFontSizeMultiplier={1.2}>
      {text}
    </Text>
  );
};

export default HeaderSubtitle;

const styles = StyleSheet.create({
  subtitle: {
    ...Typography.bannerSubtitle,
    color: Colors.textOnNavyMuted,
    marginTop: hp(0.35),
    marginLeft: wp(8.5) + spacing.xs,
    paddingRight: wp(2),
    lineHeight: Typography.bannerSubtitle.fontSize * 1.35,
  },
});
