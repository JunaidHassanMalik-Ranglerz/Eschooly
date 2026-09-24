import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';

const UpcomingClassCard = ({
  item,
  animationIndex = 0,
  gradientIndex,
  entering,
  replayToken = 0,
}) => {
  const paletteIndex = gradientIndex ?? animationIndex;
  return (
  <ProfileGradientCard
    innerStyle={styles.inner}
    animationIndex={animationIndex}
    entering={entering}
    replayToken={replayToken}
    colors={getSubjectGradient(paletteIndex)}
    waveVariant={paletteIndex === 0 ? SCREEN_WAVES.onlineClass : null}>
    <View style={styles.topRow}>
      <View style={[styles.monthBadge, {backgroundColor: Colors.whiteOverlay22}]}>
        <Text style={styles.month} numberOfLines={1}>
          {item?.month}
        </Text>
      </View>

      <View style={[styles.badge, {backgroundColor: Colors.whiteOverlay18}]}>
        <Text style={styles.badgeText} numberOfLines={1}>
          {item?.badge}
        </Text>
      </View>
    </View>

    <Text style={styles.title} numberOfLines={2}>
      {item?.title}
    </Text>
    <Text style={styles.classInfo} numberOfLines={1}>
      {item?.classInfo}
    </Text>

    <View style={styles.infoRow}>
      <Icon name="time-outline" size={wp(3.5)} color={Colors.whiteMuted85} />
      <Text style={styles.infoText} numberOfLines={1}>
        {item?.time}
      </Text>
      <Icon
        name="hourglass-outline"
        size={wp(3.5)}
        color={Colors.whiteMuted85}
        style={styles.hourIcon}
      />
      <Text style={styles.infoText} numberOfLines={1}>
        {item?.duration}
      </Text>
    </View>

    {item?.showFooter ? (
      <View style={styles.footer}>
        <View style={styles.zoomRow}>
          <Icon name="link-outline" size={wp(3.5)} color={Colors.whiteMuted85} />
          <Text style={styles.zoomLink} numberOfLines={1}>
            {item?.zoomLink}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Text style={styles.reminderText} numberOfLines={1}>
            {Strings.setReminder}
          </Text>
        </TouchableOpacity>
      </View>
    ) : null}
  </ProfileGradientCard>
  );
};

export default UpcomingClassCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.3),
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
  },
  zoomLink: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  reminderText: {
    color: '#93C5FD',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
