import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';

const UpcomingClassCard = ({
  item,
  animationIndex = 0,
  gradientIndex,
  entering,
  replayToken = 0,
  reminding = false,
  onReminder,
}) => {
  const paletteIndex = gradientIndex ?? animationIndex;
  const icy = useStudentTone();
  const body = (
    <>
      <View style={styles.topRow}>
        {item?.month ? (
          <View
            style={[
              styles.monthBadge,
              {backgroundColor: icy ? Colors.hubCard : Colors.whiteOverlay22},
            ]}>
            <Text
              style={[styles.month, icy && styles.textIcy]}
              numberOfLines={1}>
              {item.month}
            </Text>
          </View>
        ) : (
          <View />
        )}

        {item?.badge ? (
          <View
            style={[
              styles.badge,
              {backgroundColor: icy ? Colors.hubCard : Colors.whiteOverlay18},
            ]}>
            <Text
              style={[styles.badgeText, icy && styles.metaIcy]}
              numberOfLines={1}>
              {item.badge}
            </Text>
          </View>
        ) : null}
      </View>

      {item?.title ? (
        <Text
          style={[styles.title, icy && styles.textIcy]}
          numberOfLines={2}>
          {item.title}
        </Text>
      ) : null}
      {item?.classInfo ? (
        <Text
          style={[styles.classInfo, icy && styles.metaIcy]}
          numberOfLines={2}>
          {item.classInfo}
        </Text>
      ) : null}

      {item?.time || item?.duration ? (
        <View style={styles.infoRow}>
          {item?.time ? (
            <>
              <Icon
                name="time-outline"
                size={wp(3.5)}
                color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
              />
              <Text
                style={[styles.infoText, icy && styles.metaIcy]}
                numberOfLines={1}>
                {item.time}
              </Text>
            </>
          ) : null}
          {item?.duration ? (
            <>
              <Icon
                name="hourglass-outline"
                size={wp(3.5)}
                color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
                style={styles.hourIcon}
              />
              <Text
                style={[styles.infoText, icy && styles.metaIcy]}
                numberOfLines={1}>
                {item.duration}
              </Text>
            </>
          ) : null}
        </View>
      ) : null}

      {item?.showFooter ? (
        <View style={[styles.footer, icy && styles.footerIcy]}>
          {icy ? (
            item?.providerLabel ? (
              <View style={styles.zoomRow}>
                <Icon
                  name="videocam-outline"
                  size={wp(3.5)}
                  color={Colors.brandRoyal}
                />
                <Text style={[styles.zoomLink, styles.metaIcy]} numberOfLines={1}>
                  {item.providerLabel}
                </Text>
              </View>
            ) : (
              <View style={styles.zoomRow} />
            )
          ) : item?.zoomLink ? (
            <View style={styles.zoomRow}>
              <Icon
                name="link-outline"
                size={wp(3.5)}
                color={Colors.whiteMuted85}
              />
              <Text style={styles.zoomLink} numberOfLines={1}>
                {item.zoomLink}
              </Text>
            </View>
          ) : (
            <View style={styles.zoomRow} />
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={reminding || item?.reminderSet || (icy && !onReminder)}
            onPress={() => onReminder?.(item)}
            style={styles.reminderBtn}>
            {reminding ? (
              <ActivityIndicator
                size="small"
                color={icy ? Colors.brandRoyal : '#93C5FD'}
              />
            ) : (
              <Text
                style={[
                  styles.reminderText,
                  icy && styles.reminderIcy,
                  item?.reminderSet && styles.reminderSet,
                ]}
                numberOfLines={1}>
                {item?.reminderSet ? Strings.reminderSet : Strings.setReminder}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        entering={entering}
        replayToken={replayToken}
        style={styles.wrapIcy}>
        <View style={styles.pressIcy}>
          <View style={styles.clipIcy}>
            <LinearGradient
              colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.fillIcy}
            />
            <View pointerEvents="none" style={styles.waveIcy}>
              <CardWave
                variant={SCREEN_WAVES.assignmentIce}
                color="rgba(91, 156, 255, 0.14)"
              />
            </View>
            <View style={styles.innerIcy}>{body}</View>
          </View>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      entering={entering}
      replayToken={replayToken}
      colors={getSubjectGradient(paletteIndex)}
      waveVariant={paletteIndex === 0 ? SCREEN_WAVES.onlineClass : null}>
      {body}
    </ProfileGradientCard>
  );
};

export default UpcomingClassCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.3),
  },
  wrapIcy: {
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  innerIcy: {
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.3),
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1),
    zIndex: 1,
  },
  monthBadge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  month: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    includeFontPadding: false,
  },
  badge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
  },
  badgeText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    includeFontPadding: false,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.3),
    zIndex: 1,
  },
  classInfo: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginBottom: hp(1),
    zIndex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  hourIcon: {
    marginLeft: wp(3),
  },
  infoText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.5),
    includeFontPadding: false,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
    marginTop: hp(1),
    paddingTop: hp(1),
    zIndex: 1,
  },
  zoomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
  },
  zoomLink: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    flex: 1,
  },
  reminderBtn: {
    minHeight: hp(3.2),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  reminderText: {
    color: '#93C5FD',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  reminderSet: {
    opacity: 0.85,
  },
  textIcy: {
    color: Colors.brandNavy,
  },
  metaIcy: {
    color: Colors.textSecondary,
  },
  reminderIcy: {
    color: Colors.brandRoyal,
  },
  footerIcy: {
    borderTopColor: Colors.borderSubtle,
  },
});
