import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {useStudentTone} from '../Glass/StudentTone';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';

const GRADE_CHARTS = {
  'A+': {
    bars: [0.58, 0.74, 0.9, 1],
    opacities: [0.7, 0.82, 0.92, 1],
  },
  A: {
    bars: [0.42, 0.58, 0.78, 0.92],
    opacities: [0.55, 0.7, 0.85, 1],
  },
  'A-': {
    bars: [0.3, 0.44, 0.58, 0.72],
    opacities: [0.45, 0.58, 0.72, 0.88],
  },
  'B+': {
    bars: [0.24, 0.36, 0.48, 0.6],
    opacities: [0.4, 0.52, 0.66, 0.8],
  },
};

const OverallGradeCard = ({grade, hint}) => {
  const icy = useStudentTone();
  const chart = GRADE_CHARTS[grade] || GRADE_CHARTS.A;

  return (
    <LinearGradient
      colors={
        icy
          ? [Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]
          : ['#0A2F5C', '#0D5CA8', '#2563EB']
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.card, icy && styles.cardIcy]}>
      <CardWave
        variant={icy ? SCREEN_WAVES.assignmentIce : SCREEN_WAVES.results}
        {...(icy ? {color: 'rgba(91, 156, 255, 0.18)'} : {})}
      />
      <View style={styles.copy}>
        <Text style={[styles.label, icy && styles.labelIcy]}>
          {Strings.overallGrade}
        </Text>
        <Text style={[styles.grade, icy && styles.gradeIcy]}>{grade}</Text>
        {hint ? (
          <Text style={[styles.hint, icy && styles.hintIcy]}>{hint}</Text>
        ) : null}
      </View>

      <View style={styles.chart}>
        {chart.bars.map((height, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              icy && styles.barIcy,
              {
                height: hp(8.8) * height,
                opacity: chart.opacities[index],
              },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

export default OverallGradeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(5.5),
    borderWidth: 1,
    borderColor: '#65C4FF',
    paddingLeft: wp(6),
    paddingRight: wp(5.5),
    paddingVertical: hp(2.4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#0A4E8A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.22,
    shadowRadius: 10,
  },
  cardIcy: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    ...elevation.card,
  },
  copy: {
    flex: 1,
    marginRight: wp(4),
    zIndex: 1,
  },
  label: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  labelIcy: {
    color: Colors.textSecondary,
  },
  grade: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: wp(13),
    lineHeight: wp(14.2),
    marginTop: hp(-0.2),
  },
  gradeIcy: {
    color: Colors.textPrimary,
  },
  hint: {
    color: '#BFDBFE',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(-0.15),
  },
  hintIcy: {
    color: Colors.brandRoyal,
  },
  chart: {
    width: wp(26),
    height: hp(8.8),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  bar: {
    width: wp(4.4),
    borderRadius: wp(2.4),
    backgroundColor: 'rgba(191, 219, 254, 0.85)',
  },
  barIcy: {
    backgroundColor: Colors.brandRoyal,
  },
});
