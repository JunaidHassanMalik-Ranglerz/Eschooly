import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import PersonAvatar from '../Profile/PersonAvatar';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {FLOAT_CARD_RADIUS} from '../Glass/EschoolyScreenShell';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const escapeRegExp = value =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const classIncludesSection = (className, section) => {
  const cls = String(className || '').trim();
  const sec = String(section || '').trim();
  if (!cls || !sec) {
    return false;
  }
  const trailingToken = new RegExp(`(?:^|[\\s\\-_./])${escapeRegExp(sec)}$`, 'i');
  if (trailingToken.test(cls)) {
    return true;
  }
  const compact = cls.replace(/\s+/g, '').toLowerCase();
  const compactSec = sec.replace(/\s+/g, '').toLowerCase();
  return compact.endsWith(compactSec) && compact.length > compactSec.length;
};

const formatClassLabel = student => {
  const className = String(
    student?.classLabel || student?.className || student?.classBadge || '',
  ).trim();
  const section = String(student?.sectionName || '').trim();
  if (!className) {
    return section;
  }
  if (!section || classIncludesSection(className, section)) {
    return className;
  }
  return `${className} ${section}`;
};

const LibraryProfileCard = ({
  student,
  animationIndex = 0,
  look,
  canSwitch = false,
  onSwitchPress,
}) => {
  const icy = useStudentTone();
  const onNavy = icy && look === 'onNavy';
  const floating = icy && look === 'float';
  const classLabel = formatClassLabel(student);
  const statusLabel = String(student?.status || '').trim();
  const switchable = Boolean(onSwitchPress && canSwitch);

  const row = (
    <View style={styles.row}>
      <PersonAvatar
        person={student}
        size={onNavy || floating ? wp(14) : wp(12)}
        borderWidth={StyleSheet.hairlineWidth * 2}
        borderColor={
          onNavy
            ? Colors.borderGlass
            : icy
              ? Colors.borderSubtle
              : Colors.whiteOverlay22
        }
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text
          style={[styles.name, icy && !onNavy && styles.nameIcy, onNavy && styles.nameOnNavy]}
          numberOfLines={2}>
          {student?.label}
        </Text>
        <View style={styles.badges}>
          {classLabel ? (
            <View
              style={[
                styles.classBadge,
                icy && !onNavy && styles.classBadgeIcy,
                onNavy && styles.classBadgeOnNavy,
              ]}>
              <Text
                style={[
                  styles.classText,
                  icy && !onNavy && styles.classTextIcy,
                  onNavy && styles.classTextOnNavy,
                ]}
                numberOfLines={1}>
                {classLabel}
              </Text>
            </View>
          ) : null}
          {statusLabel ? (
            <View
              style={[
                styles.activeBadge,
                icy && !onNavy && styles.activeBadgeIcy,
                onNavy && styles.activeBadgeOnNavy,
              ]}>
              <Text
                style={[
                  styles.activeText,
                  icy && !onNavy && styles.activeTextIcy,
                  onNavy && styles.activeTextOnNavy,
                ]}
                numberOfLines={1}>
                {statusLabel}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      {switchable ? (
        <View style={[styles.switchBtn, icy && !onNavy && styles.switchBtnIcy]}>
          <Icon
            name="chevron-forward"
            size={wp(5.5)}
            color={onNavy ? Colors.white : Colors.brandRoyal}
          />
        </View>
      ) : null}
    </View>
  );

  if (floating) {
    const card = (
      <View style={styles.floatShell}>
        <View style={styles.floatClip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={{x: 0, y: 0.08}}
            end={{x: 1, y: 1}}
            style={styles.floatGradient}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.18)"
            />
            {row}
          </LinearGradient>
        </View>
      </View>
    );
    if (switchable) {
      return (
        <TouchableOpacity activeOpacity={0.92} onPress={onSwitchPress}>
          {card}
        </TouchableOpacity>
      );
    }
    return card;
  }

  if (onNavy) {
    const card = (
      <View style={styles.onNavyShell}>
        <View style={styles.onNavyClip}>
          <LinearGradient
            colors={CARD_GRADIENTS.notification}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.onNavyGradient}>
            <CardWave variant={SCREEN_WAVES.library} color="rgba(255,255,255,0.12)" />
            {row}
          </LinearGradient>
        </View>
      </View>
    );
    if (switchable) {
      return (
        <TouchableOpacity activeOpacity={0.92} onPress={onSwitchPress}>
          {card}
        </TouchableOpacity>
      );
    }
    return card;
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      disableAnimation={false}
      variant={icy ? 'light' : 'navy'}
      colors={icy ? undefined : CARD_GRADIENTS.notification}
      waveVariant={icy ? undefined : SCREEN_WAVES.library}
      onPress={switchable ? onSwitchPress : undefined}>
      {row}
    </ProfileGradientCard>
  );
};

export default LibraryProfileCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    marginRight: wp(3),
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.8),
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  classBadge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  classText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  activeBadge: {
    backgroundColor: 'rgba(134, 239, 172, 0.18)',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  activeText: {
    color: '#86EFAC',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  nameIcy: {
    color: Colors.textPrimary,
  },
  classBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  classTextIcy: {
    color: Colors.textSecondary,
  },
  activeBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  activeTextIcy: {
    color: Colors.brandRoyal,
  },
  floatShell: {
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    marginBottom: hp(1.5),
    zIndex: 2,
    overflow: 'visible',
    ...elevation.banner,
  },
  floatClip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
  },
  floatGradient: {
    borderRadius: FLOAT_CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.4),
    minHeight: hp(11.2),
    justifyContent: 'center',
  },
  onNavyShell: {
    borderRadius: radius.pill,
    marginBottom: hp(1.2),
    ...elevation.banner,
  },
  onNavyClip: {
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  onNavyGradient: {
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(101, 196, 255, 0.42)',
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.35),
    minHeight: hp(8.6),
    justifyContent: 'center',
  },
  switchBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay18,
    marginLeft: wp(2),
  },
  switchBtnIcy: {
    backgroundColor: Colors.hubCard,
  },
  nameOnNavy: {
    color: Colors.white,
    fontSize: Fontsize.m,
    marginBottom: hp(0.7),
  },
  classBadgeOnNavy: {
    backgroundColor: Colors.whiteOverlay18,
  },
  classTextOnNavy: {
    color: Colors.whiteMuted85,
  },
  activeBadgeOnNavy: {
    backgroundColor: 'rgba(52, 199, 89, 0.22)',
  },
  activeTextOnNavy: {
    color: '#86EFAC',
  },
});
