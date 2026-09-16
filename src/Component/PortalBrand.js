import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SplashWaves = () => (
  <View style={styles.splashWaveWrap} pointerEvents="none">
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 390 320"
      preserveAspectRatio="none">
      <Path
        fill="rgba(255,255,255,0.16)"
        d="M0,128 C48,86 92,64 138,102 C184,140 228,78 286,48 C332,26 364,58 390,86 L390,320 L0,320 Z"
      />
      <Path
        fill="rgba(255,255,255,0.28)"
        d="M0,158 C56,118 102,108 148,142 C198,178 242,108 298,82 C340,64 368,92 390,118 L390,320 L0,320 Z"
      />
      <Path
        fill="rgba(255,255,255,0.45)"
        d="M0,198 C58,162 108,178 162,196 C218,216 262,150 318,138 C354,130 376,152 390,168 L390,320 L0,320 Z"
      />
      <Path
        fill="rgba(255,255,255,0.82)"
        d="M0,236 C62,208 112,228 168,238 C226,248 274,204 324,198 C356,194 376,210 390,222 L390,320 L0,320 Z"
      />
    </Svg>
  </View>
);

const CompactWaves = () => (
  <View style={styles.waveCompact} pointerEvents="none">
    <Svg width={wp(100)} height={hp(8)} viewBox="0 0 390 80" preserveAspectRatio="none">
      <Path
        fill="rgba(255,255,255,0.22)"
        d="M0,28 C70,8 130,48 200,28 C270,8 330,18 390,12 L390,80 L0,80 Z"
      />
      <Path
        fill={Colors.white}
        d="M0,48 C80,32 140,62 210,48 C280,34 340,38 390,44 L390,80 L0,80 Z"
      />
    </Svg>
  </View>
);

const PortalBrand = ({
  portalLabel,
  showPortalLabel = false,
  showWave = false,
  compact = false,
  topInset = 0,
}) => {
  const isSplash = !compact;

  return (
    <LinearGradient
      colors={
        isSplash
          ? [Colors.primary, Colors.primaryLight, Colors.splashEnd]
          : [Colors.splashStart, Colors.primaryLight, Colors.splashEnd]
      }
      locations={isSplash ? [0, 0.38, 1] : [0, 0.5, 1]}
      start={{x: 0.1, y: 0}}
      end={{x: 0.85, y: 1}}
      style={[
        styles.gradient,
        compact && styles.compact,
        compact && {paddingTop: topInset, height: hp(34) + topInset},
        isSplash && styles.splashGradient,
        isSplash && {paddingTop: topInset},
      ]}>
      <View style={[styles.center, compact ? styles.centerCompact : styles.centerSplash]}>
        <View style={[styles.logoBox, compact && styles.logoBoxCompact]}>
          <Icon
            name="school"
            size={compact ? wp(9) : wp(14)}
            color={Colors.primary}
          />
        </View>
        <Text
          style={[styles.brand, compact && styles.brandCompact]}
          numberOfLines={1}>
          {Strings.eschool}
        </Text>
        {showPortalLabel ? (
          <Text style={styles.portal} numberOfLines={1}>
            {portalLabel}
          </Text>
        ) : (
          <View style={styles.taglineWrap}>
            <Text style={styles.tagline}>{Strings.splashTaglineLine1}</Text>
            <Text style={styles.tagline}>{Strings.splashTaglineLine2}</Text>
          </View>
        )}
      </View>

      {compact ? showWave ? <CompactWaves /> : null : <SplashWaves />}
      {compact ? <View style={styles.seamCover} /> : null}
    </LinearGradient>
  );
};

export default PortalBrand;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  splashGradient: {
    justifyContent: 'flex-start',
  },
  compact: {
    flex: 0,
    height: hp(34),
    width: wp(100),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSplash: {
    width: '100%',
    paddingTop: hp(18),
  },
  centerCompact: {
    marginBottom: hp(3),
  },
  logoBox: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(7.5),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2.4),
  },
  logoBoxCompact: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(4.5),
    marginBottom: hp(1.6),
  },
  brand: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
  },
  brandCompact: {
    fontSize: Fontsize.ml,
  },
  portal: {
    marginTop: hp(0.8),
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 2.4,
  },
  taglineWrap: {
    marginTop: hp(1.4),
    alignItems: 'center',
  },
  tagline: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.sm,
    lineHeight: Fontsize.m,
    textAlign: 'center',
  },
  splashWaveWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(42),
  },
  waveCompact: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -2,
    height: hp(8),
  },
  seamCover: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: Colors.white,
  },
});
