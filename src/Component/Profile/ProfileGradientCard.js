import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../AnimatedCard';
import CardWave from '../CardWave';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from './ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {elevation, radius as themeRadius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';

const ProfileGradientCard = ({
  children,
  style,
  innerStyle,
  onPress,
  noMargin = false,
  shadow = true,
  animationIndex = 0,
  entering,
  replayToken = 0,
  disableAnimation = false,
  revealOnScroll,
  waveVariant,
  colors,
  variant = 'navy',
}) => {
  const isLight = variant === 'light';
  const gradient = colors || PROFILE_GRADIENT;
  const shadowStyle = shadow
    ? isLight
      ? elevation.card
      : IDENTITY_CARD_SHADOW
    : null;

  const card = isLight ? (
    <View style={[styles.lightInner, shadowStyle, innerStyle]}>{children}</View>
  ) : (
    <LinearGradient
      colors={gradient}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={[styles.inner, shadowStyle, innerStyle]}>
      {waveVariant ? <CardWave variant={waveVariant} /> : null}
      {children}
    </LinearGradient>
  );

  const wrapStyle = [
    isLight ? styles.wrapLight : styles.wrap,
    !noMargin && styles.margin,
    style,
  ];

  const content = onPress ? (
    <Pressable
      onPress={onPress}
      android_ripple={{color: Colors.whiteOverlay18}}
      style={styles.press}>
      {card}
    </Pressable>
  ) : (
    card
  );

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      revealOnScroll={revealOnScroll}
      disabled={disableAnimation}
      style={wrapStyle}>
      {content}
    </AnimatedCard>
  );
};

export default ProfileGradientCard;

const styles = StyleSheet.create({
  wrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: Colors.transparent,
  },
  press: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  inner: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.6),
    overflow: 'hidden',
  },
  margin: {
    marginBottom: hp(1.2),
  },
  wrapLight: {
    borderRadius: themeRadius.card,
    overflow: 'visible',
    backgroundColor: Colors.transparent,
  },
  lightInner: {
    borderRadius: themeRadius.card,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.6),
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
});
