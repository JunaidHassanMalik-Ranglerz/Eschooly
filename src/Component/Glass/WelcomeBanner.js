import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatureArtImage from './FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

export const WELCOME_BANNER_HEIGHT = hp(16.8);

const ART_SIZE = wp(32);

const WelcomeBanner = ({firstName, title, subtitle, art, style}) => {
  const headline = title
    ? title
    : firstName
      ? `${Strings.welcomeBack},\n${firstName}!`
      : `${Strings.welcomeBack}!`;

  return (
    <View style={[styles.shell, style]}>
      <LinearGradient
        colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
        start={{x: 0, y: 0.08}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={2}>
            {headline}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle || Strings.keepLearning}
          </Text>
          <View style={styles.underline} />
        </View>
        <View pointerEvents="none" style={styles.art}>
          <FeatureArtImage
            source={art || EducationIcons.welcomeGraduationBooks}
            width={ART_SIZE}
            height={ART_SIZE}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default WelcomeBanner;

const styles = StyleSheet.create({
  shell: {
    minHeight: WELCOME_BANNER_HEIGHT,
    borderRadius: wp(7),
    backgroundColor: Colors.bannerIceStart,
    overflow: 'hidden',
    ...elevation.banner,
  },
  gradient: {
    flexGrow: 1,
    minHeight: WELCOME_BANNER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(7),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingLeft: spacing.md,
    paddingRight: wp(1.5),
    paddingVertical: hp(1.2),
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
    justifyContent: 'center',
  },
  title: {
    ...Typography.bannerTitle,
    fontSize: Fontsize.m,
    lineHeight: Fontsize.m * 1.28,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.bannerSubtitle,
    color: Colors.textSecondary,
    marginTop: hp(0.45),
  },
  underline: {
    width: wp(8),
    height: hp(0.42),
    borderRadius: wp(1),
    backgroundColor: Colors.brandRoyal,
    marginTop: hp(1.05),
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
