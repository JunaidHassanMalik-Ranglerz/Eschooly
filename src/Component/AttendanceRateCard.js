import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import {useStudentTone} from './Glass/StudentTone';

const AttendanceRateCard = ({rate, rateText, premium = false}) => {
  const icy = useStudentTone();
  const clampedRate = Math.min(Math.max(Number(rate) || 0, 0), 1);

  return (
    <View style={[styles.card, premium && styles.cardPremium, icy && styles.cardIcy]}>
      <View style={styles.topRow}>
        <Text
          style={[
            styles.title,
            premium && styles.titlePremium,
            icy && styles.titleIcy,
          ]}
          numberOfLines={1}>
          {Strings.attendanceRate}
        </Text>
        <Text
          style={[
            styles.percent,
            premium && styles.percentPremium,
            icy && styles.percentIcy,
          ]}
          numberOfLines={1}>
          {rateText}
        </Text>
      </View>

      <View style={styles.progressTrackWrap}>
        <ProgressBar
          progress={clampedRate}
          fillColor={icy ? Colors.brandRoyal : undefined}
          style={[
            styles.progressBar,
            premium && styles.progressBarPremium,
            icy && styles.progressBarIcy,
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Icon
          name="trending-up"
          size={wp(4)}
          color={
            icy
              ? Colors.brandRoyal
              : premium
                ? Colors.whiteMuted75
                : Colors.iconSky
          }
        />
        <Text
          style={[
            styles.footerText,
            premium && styles.footerTextPremium,
            icy && styles.footerTextIcy,
          ]}
          numberOfLines={1}>
          {Strings.greatConsistency}
        </Text>
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
    width: '100%',
  },
  cardPremium: {
    backgroundColor: Colors.transparent,
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
  },
  titlePremium: {
    color: Colors.whiteMuted85,
  },
  percent: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    flexShrink: 0,
  },
  percentPremium: {
    color: Colors.white,
  },
  progressTrackWrap: {
    width: '100%',
    marginBottom: hp(1.2),
  },
  progressBar: {
    width: '100%',
    height: hp(1.2),
    borderRadius: hp(0.6),
    backgroundColor: Colors.badgeBg,
  },
  progressBarPremium: {
    backgroundColor: Colors.whiteOverlay18,
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
    flex: 1,
  },
  footerTextPremium: {
    color: Colors.whiteMuted75,
  },
  cardIcy: {
    backgroundColor: Colors.transparent,
  },
  titleIcy: {
    color: Colors.textSecondary,
  },
  percentIcy: {
    color: Colors.textPrimary,
  },
  progressBarIcy: {
    backgroundColor: Colors.hubCard,
  },
  footerTextIcy: {
    color: Colors.textSecondary,
  },
});
