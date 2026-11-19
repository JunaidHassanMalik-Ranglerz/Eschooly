import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from './Profile/PersonAvatar';
import ChildIdentityFace from './ChildIdentityFace';
import CardWave, {SCREEN_WAVES} from './CardWave';
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
import {elevation} from '../Constants/Theme';
import {FLOAT_CARD_RADIUS} from './Glass/EschoolyScreenShell';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';

const NAVY = '#071A3D';
const ICE_WAVE = 'rgba(19, 69, 163, 0.14)';

const SelectedChildBanner = ({
  child,
  onSwitchPress,
  variant = 'default',
  canSwitch = true,
  waveVariant,
  animationIndex = 0,
  disableEnterAnimation = false,
  compactMargin = false,
  icy = false,
}) => {
  if (!child) {
    return null;
  }

  const isLarge = variant === 'large';
  const classText = child.classLabel || child.classBadge;
  const metaLine = child.rollNo
    ? `${classText} · Roll ${child.rollNo}`
    : child.meta || classText;
  const switchable = Boolean(onSwitchPress && canSwitch);

  const icyRow = (
    <ChildIdentityFace
      student={child}
      icy
      switchable={switchable}
      avatarSize={isLarge ? wp(14) : wp(12)}
    />
  );

  const row = (
    <>
      <PersonAvatar
        person={child}
        size={isLarge ? wp(15) : wp(11)}
        borderWidth={icy ? StyleSheet.hairlineWidth * 2 : 0}
        borderColor={icy ? Colors.borderSubtle : undefined}
        style={isLarge ? styles.avatarGapLarge : styles.avatarGap}
      />
      <View style={styles.text}>
        <Text
          style={[
            styles.label,
            isLarge && styles.labelLarge,
            icy && styles.labelIcy,
          ]}
          numberOfLines={1}>
          {Strings.viewingFor}
        </Text>
        {isLarge ? (
          <>
            <Text
              style={[
                styles.name,
                styles.nameLarge,
                icy && styles.nameIcy,
              ]}
              numberOfLines={1}>
              {child.label}
            </Text>
            <Text
              style={[styles.meta, icy && styles.metaIcy]}
              numberOfLines={1}>
              {metaLine}
            </Text>
          </>
        ) : (
          <Text
            style={[styles.name, icy && styles.nameIcy]}
            numberOfLines={1}>
            {child.label} · {classText}
          </Text>
        )}
      </View>
      {switchable ? (
        <View
          style={[
            styles.switchBtn,
            isLarge && styles.switchBtnLarge,
            icy && styles.switchBtnIcy,
          ]}>
          <Icon
            name="chevron-forward"
            size={isLarge ? wp(5.5) : wp(5)}
            color={icy ? Colors.brandRoyal : Colors.white}
          />
        </View>
      ) : null}
    </>
  );

  const bannerContent = icy ? (
    <View style={styles.iceClip}>
      <LinearGradient
        colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
        start={{x: 0, y: 0.08}}
        end={{x: 1, y: 1}}
        style={[styles.iceFill, isLarge && styles.iceFillLarge]}>
        <CardWave variant={SCREEN_WAVES.assignmentIce} color={ICE_WAVE} />
        {icyRow}
      </LinearGradient>
    </View>
  ) : (
    <LinearGradient
      colors={PROFILE_GRADIENT}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={[styles.banner, isLarge && styles.bannerLarge]}>
      {waveVariant ? <CardWave variant={waveVariant} /> : null}
      {row}
    </LinearGradient>
  );

  const wrapStyle = icy
    ? [
        styles.iceShell,
        isLarge && styles.iceShellLarge,
        compactMargin && styles.compactMargin,
      ]
    : [
        styles.pressWrap,
        IDENTITY_CARD_SHADOW,
        isLarge && styles.wrapLarge,
        compactMargin && styles.compactMargin,
      ];

  const iceEdge = icy ? (
    <View pointerEvents="none" style={styles.iceEdge} />
  ) : null;

  const shell = switchable ? (
    <TouchableOpacity
      onPress={onSwitchPress}
      activeOpacity={0.92}
      style={wrapStyle}>
      {bannerContent}
      {iceEdge}
    </TouchableOpacity>
  ) : (
    <View style={wrapStyle}>
      {bannerContent}
      {iceEdge}
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
  iceShell: {
    marginBottom: hp(1.5),
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    zIndex: 2,
    ...elevation.banner,
  },
  iceShellLarge: {
    marginBottom: hp(2),
  },
  iceClip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
  },
  iceEdge: {
    ...StyleSheet.absoluteFill,
    borderRadius: FLOAT_CARD_RADIUS,
    borderWidth: 1.4,
    borderColor: Colors.borderIcy,
  },
  iceFill: {
    justifyContent: 'center',
    borderRadius: FLOAT_CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'transparent',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.4),
    minHeight: hp(11.2),
  },
  iceFillLarge: {
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(1.8),
    minHeight: hp(12.4),
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
    zIndex: 1,
  },
  avatarGapLarge: {
    marginRight: wp(3.8),
    zIndex: 1,
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
  labelIcy: {
    color: Colors.textSecondary,
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
  nameIcy: {
    color: Colors.textPrimary,
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.45),
  },
  metaIcy: {
    color: Colors.textSecondary,
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
  switchBtnIcy: {
    backgroundColor: Colors.hubCard,
  },
});
