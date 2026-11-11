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
export const WELCOME_ART_OVERFLOW = hp(0.4);

const ART_W = wp(30);
const ART_H = hp(11);

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
      </LinearGradient>
      <View pointerEvents="none" style={styles.artWrap}>
        <FeatureArtImage
          source={art || EducationIcons.welcomeGraduationBooks}
          width={ART_W}
          height={ART_H}
        />
      </View>
    </View>
  );
};

export default WelcomeBanner;

const styles = StyleSheet.create({
  shell: {
    height: WELCOME_BANNER_HEIGHT,
    borderRadius: wp(7),
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.banner,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: wp(7),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    overflow: 'hidden',
  },
  copy: {
    width: '56%',
    paddingLeft: spacing.md,
    paddingRight: wp(1),
    paddingVertical: hp(1.55),
    justifyContent: 'center',
    zIndex: 2,
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
  artWrap: {
    position: 'absolute',
    right: wp(2.5),
    bottom: hp(1.1),
    width: ART_W,
    height: ART_H,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
