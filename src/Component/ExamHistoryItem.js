import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const ExamHistoryItem = ({item}) => {
  const isPassed = item.status === 'PASSED';
  const badgeBg = isPassed ? Colors.successBg : Colors.overdueBg;
  const badgeColor = isPassed ? Colors.success : Colors.red;
  const statusText = isPassed ? Strings.passed : Strings.failed;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.subjectRow}>
          <View style={styles.iconWrap}>
            <Icon name={item.icon} size={wp(4.5)} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
        <View style={[styles.badge, {backgroundColor: badgeBg}]}>
          <Text style={[styles.badgeText, {color: badgeColor}]}>{statusText}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>{Strings.marks}</Text>
          <Text style={styles.statValue}>{item.marks}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>{Strings.score}</Text>
          <Text style={styles.statValue}>{item.score}</Text>
        </View>
      </View>
    </View>
  );
};

export default ExamHistoryItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.duesCardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  subject: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.2),
  },
  date: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  badge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(3),
    marginLeft: wp(2),
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: hp(1.2),
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    marginBottom: hp(0.3),
  },
  statValue: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
});
