import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const CHART_BARS = [
  {height: 0.42, opacity: 0.55},
  {height: 0.58, opacity: 0.7},
  {height: 0.78, opacity: 0.85},
  {height: 1, opacity: 1},
];

const OverallGradeCard = ({grade, hint}) => (
  <LinearGradient
    colors={['#E7F0FF', '#C9DCFB']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.card}>
    <View style={styles.copy}>
      <Text style={styles.label}>{Strings.overallGrade}</Text>
      <Text style={styles.grade}>{grade}</Text>
      <Text style={styles.hint}>{hint || Strings.greatProgress}</Text>
    </View>

    <View style={styles.chart}>
      {CHART_BARS.map((bar, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              height: hp(8.8) * bar.height,
              opacity: bar.opacity,
            },
          ]}
        />
      ))}
    </View>
  </LinearGradient>
);

export default OverallGradeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(7),
    paddingLeft: wp(6),
    paddingRight: wp(5.5),
    paddingVertical: hp(2.4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#7BA3E3',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.22,
    shadowRadius: 14,
  },
  copy: {
    flex: 1,
    marginRight: wp(4),
  },
  label: {
    color: '#7B93B8',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  grade: {
    color: '#3D7EDB',
    fontFamily: Fonts.bold,
    fontSize: wp(13),
    lineHeight: wp(14.2),
    marginTop: hp(-0.2),
  },
  hint: {
    color: '#22C55E',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(-0.15),
  },
  chart: {
    width: wp(26),
    height: hp(8.8),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bar: {
    width: wp(4.4),
    borderRadius: wp(2.4),
    backgroundColor: '#5B9AE8',
  },
});
