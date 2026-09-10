import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ExamProgressSection = ({
  current,
  total,
  answered,
  remaining,
  flagged,
}) => {
  const percent = Math.round((current / total) * 100);

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Text style={styles.progressText}>
          {Strings.question} {current} {Strings.of} {total}
        </Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>

      <View style={styles.barBg}>
        <View style={[styles.barFill, {width: `${percent}%`}]} />
      </View>

      <View style={styles.legend}>
        <LegendItem color={Colors.primary} label={`${answered} ${Strings.answered}`} />
        <LegendItem color={Colors.inputBorder} label={`${remaining} ${Strings.remaining}`} />
        <LegendItem color={Colors.warning} label={`${flagged} ${Strings.flagged}`} square />
      </View>
    </View>
  );
};

const LegendItem = ({color, label, square}) => (
  <View style={styles.legendItem}>
    <View style={[styles.dot, square && styles.square, {backgroundColor: color}]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

export default ExamProgressSection;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  progressText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
  percent: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
  barBg: {
    height: hp(0.7),
    backgroundColor: Colors.lightGray,
    borderRadius: wp(2),
    overflow: 'hidden',
    marginBottom: hp(1.2),
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: wp(2),
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    marginRight: wp(1.5),
  },
  square: {
    borderRadius: wp(0.5),
  },
  legendText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
});
