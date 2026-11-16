import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatureArtImage from './FeatureArtImage';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

export const FEATURE_HERO_MIN_H = hp(16.2);
const ART_SIZE = wp(32);
const OVERLAY_SIZE = wp(16);
const CORNER = radius.banner;

const FeatureHeroBanner = ({
  title,
  subtitle,
  art,
  overlayArt,
  waveVariant = SCREEN_WAVES.assignmentIce,
  waveColor = 'rgba(19, 69, 163, 0.16)',
  underline = true,
  colors = [Colors.bannerIceStart, Colors.bannerIceEnd],
  style,
}) => (
  <View style={[styles.shell, style]}>
    <View style={styles.clip}>
      <LinearGradient
        colors={colors}
        start={{x: 0, y: 0.08}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        {waveVariant ? (
          <CardWave variant={waveVariant} color={waveColor} />
        ) : null}
        <View style={styles.copy}>
          {title ? (
            <Text
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
              maxFontSizeMultiplier={1.15}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={styles.subtitle}
              numberOfLines={2}
              maxFontSizeMultiplier={1.15}>
              {subtitle}
            </Text>
          ) : null}
          {underline ? <View style={styles.underline} /> : null}
        </View>
        <View pointerEvents="none" style={styles.art}>
          <FeatureArtImage
            source={art || EducationIcons.assignments}
            width={ART_SIZE}
            height={ART_SIZE}
          />
          {overlayArt ? (
            <FeatureArtImage
              source={overlayArt}
              width={OVERLAY_SIZE}
              height={OVERLAY_SIZE}
              style={styles.overlay}
            />
          ) : null}
        </View>
      </LinearGradient>
    </View>
  </View>
);

export default FeatureHeroBanner;

const styles = StyleSheet.create({
  shell: {
    borderRadius: CORNER,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.banner,
  },
  clip: {
    borderRadius: CORNER,
    overflow: 'hidden',
  },
  gradient: {
    minHeight: FEATURE_HERO_MIN_H,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CORNER,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingVertical: hp(1.2),
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    ...Typography.bannerTitle,
    fontSize: Fontsize.m,
    lineHeight: Fontsize.m * 1.22,
    color: Colors.textPrimary,
    flexShrink: 1,
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
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
