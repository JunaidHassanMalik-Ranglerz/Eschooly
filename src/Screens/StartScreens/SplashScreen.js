import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Path} from 'react-native-svg';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {Images} from '../../Assets';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Strings} from '../../Constants/Strings';
import {elevation} from '../../Constants/Theme';
import {useRole} from '../../context/RoleContext';
import {store} from '../../store/store';
import {applySavedSession, restoreParentSession} from '../../store/restoreSession';

const BOOK_ASPECT = 1312 / 1199;
const WAVE_RATIO = 0.22;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const SplashTopArcs = ({height}) => (
  <View
    style={[styles.arcs, {height}]}
    pointerEvents="none"
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants">
    <Svg width="100%" height="100%" viewBox="0 0 390 420" preserveAspectRatio="xMinYMin slice">
      <Circle
        cx="28"
        cy="-8"
        r="268"
        fill="none"
        stroke={Colors.white}
        strokeOpacity="0.08"
        strokeWidth="34"
      />
      <Circle
        cx="28"
        cy="-8"
        r="196"
        fill="none"
        stroke={Colors.white}
        strokeOpacity="0.06"
        strokeWidth="26"
      />
      <Circle
        cx="372"
        cy="36"
        r="158"
        fill="none"
        stroke={Colors.brandAccent}
        strokeOpacity="0.16"
        strokeWidth="22"
      />
    </Svg>
  </View>
);

const BrandSwoosh = ({width, height}) => (
  <View style={[styles.swoosh, {width, height}]} pointerEvents="none">
    <Svg width="100%" height="100%" viewBox="0 0 148 14" preserveAspectRatio="none">
      <Path
        d="M4 9 C 38 2, 78 1, 118 7 C 132 9, 140 10, 144 9 C 128 13, 78 8, 36 10 C 18 11, 8 11, 4 9 Z"
        fill={Colors.brandAccent}
      />
    </Svg>
  </View>
);

const SplashIceWaves = ({height}) => (
  <View
    style={[styles.waveWrap, {height}]}
    pointerEvents="none"
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants">
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 390 220"
      preserveAspectRatio="none">
      <Path
        fill={Colors.academicsBlueMid}
        d="M0,58 C70,18 140,86 214,48 C286,14 338,40 390,22 L390,220 L0,220 Z"
      />
      <Path
        fill={Colors.academicsBlueEnd}
        d="M0,92 C76,52 148,118 226,84 C300,54 346,82 390,68 L390,220 L0,220 Z"
      />
      <Path
        fill={Colors.academicsCard}
        d="M0,124 C82,92 156,148 238,120 C310,96 352,122 390,110 L390,220 L0,220 Z"
      />
      <Path
        fill={Colors.bannerIceEnd}
        d="M0,156 C90,132 168,178 250,156 C318,140 358,160 390,150 L390,220 L0,220 Z"
      />
      <Path
        fill={Colors.bannerIceStart}
        d="M0,188 C96,172 176,204 268,188 C330,176 364,192 390,184 L390,220 L0,220 Z"
      />
    </Svg>
  </View>
);

const SplashScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const {setRole, setLoggedInStudentId} = useRole();

  const topInset = insets.top || 0;
  const bottomInset = insets.bottom || 0;
  const available = Math.max(height - topInset - bottomInset, 1);
  const shortScreen = available < 640;
  const compact = available < 560;
  const waveHeight = Math.round(height * WAVE_RATIO);
  const waveClearance = clamp(
    waveHeight * (shortScreen ? 0.4 : 0.48),
    52,
    waveHeight * 0.58,
  );
  const usable = Math.max(available - waveClearance, 1);

  const logoSize = clamp(
    Math.min(width * 0.21, usable * 0.155),
    compact ? 64 : 72,
    shortScreen ? 88 : 96,
  );
  const capSize = logoSize * 0.58;
  const wordmarkSize = clamp(width * 0.068, 21, 28);
  const taglineSize = clamp(width * 0.039, 14, 16);
  const swooshWidth = clamp(width * 0.16, 56, 78);
  const swooshHeight = compact ? 7 : 9;
  const logoGap = clamp(usable * 0.016, 10, 14);
  const wordmarkGap = clamp(usable * 0.005, 2, 5);
  const taglineGap = clamp(usable * 0.014, 8, 12);
  const booksGap = clamp(usable * 0.026, 16, 26);

  const brandBlock =
    logoSize +
    logoGap +
    wordmarkSize * 1.15 +
    wordmarkGap +
    swooshHeight +
    taglineGap +
    taglineSize * 1.3 +
    2 +
    taglineSize * 1.35;
  const maxArtHeight = Math.max(
    usable * 0.9 - brandBlock - booksGap,
    compact ? 96 : 118,
  );
  let artWidth = clamp(
    Math.min(width * (shortScreen ? 0.42 : 0.44), usable * 0.34 * BOOK_ASPECT),
    compact ? 112 : 132,
    shortScreen ? 168 : 196,
  );
  let artHeight = artWidth / BOOK_ASPECT;
  if (artHeight > maxArtHeight) {
    artHeight = maxArtHeight;
    artWidth = artHeight * BOOK_ASPECT;
  }

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        let auth = store.getState().auth;
        if (!auth?.isAuthenticated) {
          await restoreParentSession(dispatch, setRole);
          auth = store.getState().auth;
        }

        const session = applySavedSession(auth, {setRole, setLoggedInStudentId});
        if (active && session) {
          navigation.replace('BottomTab');
          return;
        }
      } catch (error) {
        // A saved session that cannot be read falls through to sign-in.
      }

      if (active) {
        navigation.replace('Role');
      }
    }, 5000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dispatch, navigation, setLoggedInStudentId, setRole]);

  return (
    <ScreenEnterProvider motion="generic">
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
          barStyle="light-content"
        />
        <LinearGradient
          colors={[Colors.brandNavy, Colors.brandRoyal, Colors.brandAccent]}
          locations={[0, 0.52, 1]}
          start={{x: 0.12, y: 0}}
          end={{x: 0.88, y: 1}}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <SplashTopArcs height={height * 0.42} />
        <SplashIceWaves height={waveHeight} />

        <View
          style={[
            styles.foreground,
            {
              paddingTop: topInset,
              paddingBottom: Math.max(bottomInset, waveClearance),
            },
          ]}>
          <View style={styles.hero}>
            <View
              style={[
                styles.logoTile,
                {
                  width: logoSize,
                  height: logoSize,
                  borderRadius: logoSize * 0.28,
                  marginBottom: logoGap,
                },
              ]}>
              <Image
                source={Images.cap}
                resizeMode="contain"
                style={{width: capSize, height: capSize}}
                accessibilityIgnoresInvertColors
              />
            </View>
            <Text
              style={[
                styles.wordmark,
                {
                  fontSize: wordmarkSize,
                  lineHeight: wordmarkSize * 1.15,
                  marginBottom: wordmarkGap,
                },
              ]}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}>
              {Strings.eschoolyWordmark}
            </Text>
            <BrandSwoosh width={swooshWidth} height={swooshHeight} />
            <Text
              style={[
                styles.taglinePrimary,
                {
                  fontSize: taglineSize,
                  lineHeight: taglineSize * 1.3,
                  marginTop: taglineGap,
                },
              ]}
              numberOfLines={1}
              maxFontSizeMultiplier={1.15}>
              {Strings.splashTaglineLine1}
            </Text>
            <Text
              style={[
                styles.taglineAccent,
                {
                  fontSize: taglineSize,
                  lineHeight: taglineSize * 1.35,
                },
              ]}
              numberOfLines={1}
              maxFontSizeMultiplier={1.15}>
              {Strings.splashTaglineLine2}
            </Text>
            <Image
              source={EducationIcons.digitalLibrary}
              resizeMode="contain"
              style={{
                width: artWidth,
                height: artHeight,
                marginTop: booksGap,
              }}
              accessibilityIgnoresInvertColors
            />
          </View>
        </View>
      </View>
    </ScreenEnterProvider>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashStart,
    overflow: 'hidden',
  },
  arcs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  foreground: {
    flex: 1,
    zIndex: 3,
  },
  hero: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 4,
  },
  logoTile: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.banner,
    shadowColor: Colors.shadowNavy,
  },
  wordmark: {
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
    letterSpacing: 1.2,
    textAlign: 'center',
    includeFontPadding: false,
  },
  swoosh: {
    alignSelf: 'center',
  },
  taglinePrimary: {
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
    textAlign: 'center',
    includeFontPadding: false,
  },
  taglineAccent: {
    color: Colors.iconSky,
    fontFamily: Fonts.semibold,
    textAlign: 'center',
    includeFontPadding: false,
    marginTop: 2,
  },
  waveWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
