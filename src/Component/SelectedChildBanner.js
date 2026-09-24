import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from './Profile/PersonAvatar';
import CardWave from './CardWave';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from './Profile/ProfileTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';

const NAVY = '#071A3D';

const SelectedChildBanner = ({
  child,
  onSwitchPress,
  variant = 'default',
  canSwitch = true,
  waveVariant,
  animationIndex = 0,
  disableEnterAnimation = false,
  compactMargin = false,
}) => {
  if (!child) {
    return null;
  }

  const isLarge = variant === 'large';
  const classText = child.classLabel || child.classBadge;
  const metaLine = child.rollNo
    ? `${classText} · Roll ${child.rollNo}`
    : child.meta || classText;

  const bannerContent = (
    <LinearGradient
      colors={PROFILE_GRADIENT}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={[styles.banner, isLarge && styles.bannerLarge]}>
      {waveVariant ? <CardWave variant={waveVariant} /> : null}
      <PersonAvatar
        person={child}
        size={isLarge ? wp(15) : wp(11)}
        style={isLarge ? styles.avatarGapLarge : styles.avatarGap}
      />
      <View style={styles.text}>
        <Text style={[styles.label, isLarge && styles.labelLarge]} numberOfLines={1}>
          {Strings.viewingFor}
        </Text>
        {isLarge ? (
          <>
            <Text style={[styles.name, styles.nameLarge]} numberOfLines={1}>
              {child.label}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {metaLine}
            </Text>
          </>
        ) : (
          <Text style={styles.name} numberOfLines={1}>
            {child.label} · {classText}
          </Text>
        )}
      </View>
      {onSwitchPress && canSwitch ? (
        <View style={[styles.switchBtn, isLarge && styles.switchBtnLarge]}>
          <Icon name="chevron-forward" size={isLarge ? wp(5.5) : wp(5)} color={Colors.white} />
        </View>
      ) : null}
    </LinearGradient>
  );

  const shell =
    onSwitchPress && canSwitch ? (
      <TouchableOpacity
        onPress={onSwitchPress}
        activeOpacity={0.92}
        style={[
          styles.pressWrap,
          IDENTITY_CARD_SHADOW,
          isLarge && styles.wrapLarge,
          compactMargin && styles.compactMargin,
        ]}>
        {bannerContent}
      </TouchableOpacity>
    ) : (
      <View
        style={[
          styles.pressWrap,
          IDENTITY_CARD_SHADOW,
          isLarge && styles.wrapLarge,
          compactMargin && styles.compactMargin,
        ]}>
        {bannerContent}
      </View>
    );

  if (disableEnterAnimation) {
    return shell;
  }

  return <AnimatedCard index={animationIndex}>{shell}</AnimatedCard>;
};

export default SelectedChildBanner;

const styles = StyleSheet.create({
  pressWrap: {
    marginBottom: hp(1.5),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  wrapLarge: {
    marginBottom: hp(2),
  },
  compactMargin: {
    marginBottom: hp(0.4),
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
    minHeight: hp(9.2),
    overflow: 'hidden',
  },
  bannerLarge: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.2),
    minHeight: hp(13.2),
  },
  avatarGap: {
    marginRight: wp(3),
  },
  avatarGapLarge: {
    marginRight: wp(3.8),
  },
  text: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
    justifyContent: 'center',
    zIndex: 1,
  },
  label: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
  },
  labelLarge: {
    fontSize: Fontsize.xs0,
    letterSpacing: 0.2,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.2),
  },
  nameLarge: {
    fontSize: Fontsize.sm,
    marginTop: hp(0.35),
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.45),
  },
  switchBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  switchBtnLarge: {
    width: wp(10.5),
    height: wp(10.5),
    borderRadius: wp(5.25),
  },
});
