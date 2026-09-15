import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const STATUS_STYLES = {
  Present: {bg: Colors.successBg, text: Colors.success},
  Absent: {bg: Colors.overdueBg, text: Colors.red},
  Late: {bg: Colors.pendingBg, text: Colors.warning},
  Leave: {bg: Colors.lightGray, text: Colors.grayText},
  Unmarked: {bg: Colors.cardBg, text: Colors.grayText},
};

const AttendanceHistoryItem = props => {
  const statusStyle = STATUS_STYLES[props?.item?.status] || STATUS_STYLES.Unmarked;

  return (
    <View style={styles.card}>
      <View style={styles.dateBox}>
        <Text style={styles.dayNum} numberOfLines={1}>{props?.item?.day}</Text>
        <Text style={styles.shortDay} numberOfLines={1}>{props?.item?.shortDay}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.dateLabel} numberOfLines={1}>
          {props?.item?.dateLabel}
        </Text>
        <Text style={styles.fullDay} numberOfLines={1}>
          {props?.item?.fullDay}
        </Text>
      </View>

      <View style={[styles.badge, {backgroundColor: statusStyle.bg}]}>
        <Text style={[styles.badgeText, {color: statusStyle.text}]} numberOfLines={1}>
          {props?.item?.status}
        </Text>
      </View>
    </View>
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
  dateBox: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
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
  },
  dateLabel: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.1),
    width: wp(35),
  },
  fullDay: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    width: wp(25),
  },
  badge: {
    minWidth: wp(18),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
    marginLeft: wp(2),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: wp(3.1),
    color: Colors.grayText,
  },
});
