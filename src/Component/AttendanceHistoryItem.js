import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const STATUS_STYLES = {
  Present: {text: '#38BDF8'},
  Absent: {text: '#6366F1'},
  Late: {text: '#0EA5E9'},
  Leave: {text: '#60A5FA'},
  Unmarked: {text: Colors.whiteMuted75},
};

const AttendanceHistoryItem = props => {
  const statusStyle = STATUS_STYLES[props?.item?.status] || STATUS_STYLES.Unmarked;
  const premium = props?.premium;
  const animationIndex = props?.animationIndex ?? 0;
  const entering = props?.entering;
  const replayToken = props?.replayToken ?? 0;

  const content = (
    <>
      <View style={[styles.dateBox, premium && styles.dateBoxPremium]}>
        <Text style={[styles.dayNum, premium && styles.textPremium]} numberOfLines={1}>
          {props?.item?.day}
        </Text>
        <Text style={[styles.shortDay, premium && styles.metaPremium]} numberOfLines={1}>
          {props?.item?.shortDay}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.dateLabel, premium && styles.textPremium]} numberOfLines={1}>
          {props?.item?.dateLabel}
        </Text>
        <Text style={[styles.fullDay, premium && styles.metaPremium]} numberOfLines={1}>
          {props?.item?.fullDay}
        </Text>
      </View>

      <Text style={[styles.statusText, {color: statusStyle.text}]} numberOfLines={1}>
        {props?.item?.status}
      </Text>
    </>
  );

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        entering={entering}
        replayToken={replayToken}>
        <View style={styles.row}>{content}</View>
      </ProfileGradientCard>
    );
  }

  return (
    <AnimatedCard
      index={animationIndex}
      replayToken={replayToken}
      style={styles.card}>
      {content}
    </AnimatedCard>
  );
};

export default AttendanceHistoryItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(3.5),
    marginBottom: hp(1.2),
  },
  premiumInner: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  dateBoxPremium: {
    backgroundColor: Colors.whiteOverlay18,
  },
  dayNum: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.75),
  },
  shortDay: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    marginTop: hp(0.05),
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  dateLabel: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.1),
  },
  fullDay: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
  textPremium: {
    color: Colors.white,
  },
  metaPremium: {
    color: Colors.whiteMuted75,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs0,
    marginLeft: wp(2),
    flexShrink: 0,
  },
});