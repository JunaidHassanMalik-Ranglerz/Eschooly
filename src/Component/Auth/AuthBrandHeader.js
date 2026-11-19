import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Defs,
  LinearGradient as SvgGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {elevation} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

/** Width-based wave slot so curve amplitude stays stable across phone heights. */
export const AUTH_WAVE_HEIGHT = wp(30);
export const AUTH_WAVE_HEIGHT_DENSE = wp(16);
/** Shared floating-card tuck into the lower wave (not a per-screen pixel offset). */
export const AUTH_CARD_TUCK = wp(13);
export const AUTH_CARD_TUCK_DENSE = wp(8);

const AuthBrandWaves = ({height = AUTH_WAVE_HEIGHT}) => (
  <View
    pointerEvents="none"
    style={[styles.waveWrap, {height}]}
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants">
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 390 120"
      preserveAspectRatio="none">
      <Defs>
        <SvgGradient id="eschoolyAuthWaveFade" x1="0" y1="0" x2="0" y2="1">
          <Stop
            offset="0"
            stopColor={Colors.brandAccent}
            stopOpacity="0.38"
          />
          <Stop
            offset="0.42"
            stopColor={Colors.bannerIceEnd}
            stopOpacity="0.92"
          />
          <Stop offset="1" stopColor={Colors.canvas} stopOpacity="1" />
        </SvgGradient>
      </Defs>
      <Path
        fill="rgba(37,99,235,0.34)"
        d="M0,34 C72,6 122,70 196,36 C270,2 328,44 390,18 L390,120 L0,120 Z"
      />
      <Path
        fill="url(#eschoolyAuthWaveFade)"
        d="M0,54 C86,26 148,84 222,50 C296,16 340,62 390,44 L390,120 L0,120 Z"
      />
      <Path
        fill={Colors.canvas}
        d="M0,78 C94,56 164,102 238,76 C306,54 350,90 390,72 L390,120 L0,120 Z"
      />
      <Rect x="0" y="112" width="390" height="8" fill={Colors.canvas} />
    </Svg>
  </View>
);

const AuthBrandHeader = ({
  insets = {top: 0},
  compact = false,
  dense = false,
  showTagline = true,
  tagline = Strings.learnSmarter,
  children,
  style,
}) => {
  const logoSize = dense ? wp(11) : wp(18);
  const waveHeight = dense ? AUTH_WAVE_HEIGHT_DENSE : AUTH_WAVE_HEIGHT;

  return (
    <LinearGradient
      colors={[Colors.brandNavy, Colors.brandRoyal]}
      start={{x: 0.14, y: 0}}
      end={{x: 0.86, y: 1}}
      style={[
        styles.brand,
        {
          paddingTop: insets.top + hp(dense ? 0.6 : compact ? 1.4 : 2.4),
        },
        style,
      ]}>
      <View
        style={[
          styles.brandCopy,
          {paddingBottom: hp(dense ? 0.6 : compact ? 1.8 : 2.2)},
        ]}>
        <View
          style={[
            styles.logoBox,
            dense && {
              width: logoSize,
              height: logoSize,
              borderRadius: wp(3),
              marginBottom: hp(0.6),
            },
          ]}>
          <Icon
            name="school"
            size={dense ? wp(6) : wp(9)}
            color={Colors.brandRoyal}
          />
        </View>
        <Text
          style={[styles.wordmark, dense && styles.wordmarkDense]}
          numberOfLines={1}>
          {Strings.eschoolyWordmark}
        </Text>
        {showTagline && !dense ? (
          <Text style={styles.tagline} numberOfLines={1}>
            {tagline}
          </Text>
        ) : null}
        {children}
      </View>
      <AuthBrandWaves height={waveHeight} />
    </LinearGradient>
  );
};

export default AuthBrandHeader;

const styles = StyleSheet.create({
  brand: {
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  brandCopy: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoBox: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(5),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.6),
    ...elevation.card,
  },
  wordmark: {
    ...Typography.brand,
    color: Colors.white,
    fontSize: Fontsize.ml,
    letterSpacing: 1.6,
  },
  wordmarkDense: {
    fontSize: Fontsize.sm,
    letterSpacing: 1.2,
  },
  tagline: {
    marginTop: hp(0.7),
    color: Colors.textOnNavyMuted,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 2.2,
  },
  waveWrap: {
    width: '100%',
    height: AUTH_WAVE_HEIGHT,
    zIndex: 0,
  },
});
