import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const AttendanceRateCard = ({rate, rateText}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>{Strings.attendanceRate}</Text>
        <Text style={styles.percent} numberOfLines={1}>{rateText}</Text>
      </View>

      <ProgressBar progress={rate} style={styles.progressBar} />

      <View style={styles.footer}>
        <Icon name="trending-up" size={wp(4)} color={Colors.grayText} />
        <Text style={styles.footerText} numberOfLines={1}>{Strings.greatConsistency}</Text>
      </View>
    </View>
  );
};

export default AttendanceRateCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.duesCardBg,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
    width:wp(43),
  },
  percent: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    width:wp(9.7),
  },
  progressBar: {
    width: wp(84),
    height: hp(1.2),
    borderRadius: hp(0.6),
    backgroundColor: Colors.badgeBg,
    marginBottom: hp(1.2),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginLeft: wp(1.5),
  },
});
