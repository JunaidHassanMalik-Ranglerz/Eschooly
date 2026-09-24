import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DepthIcon from './DepthIcon';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import {getSubjectIconTheme} from './Syllabus/SubjectTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {getSubjectGradient} from '../Constants/CardTheme';
import {wp, hp} from '../Constants/Responsive';

const ExamHistoryItem = ({item, animationIndex = 0}) => {
  const isPassed = item.status === 'PASSED';
  const badgeBg = isPassed ? Colors.whiteOverlay22 : 'rgba(239, 68, 68, 0.22)';
  const badgeColor = isPassed ? '#86EFAC' : '#FCA5A5';
  const statusText = isPassed ? Strings.passed : Strings.failed;
  const gradientIndex = Number(String(item?.id || '0').replace(/\D/g, '')) || animationIndex;

  const subjectIcon = getSubjectIconTheme(item.subject);

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      colors={getSubjectGradient(gradientIndex)}
      waveVariant={animationIndex === 8 ? 'results' : null}>
      <View style={styles.topRow}>
        <View style={styles.subjectRow}>
          <View style={styles.iconWrap}>
            <DepthIcon name={subjectIcon.icon} size={wp(4.5)} color={subjectIcon.color} />
          </View>
          <View style={styles.subjectInfo}>
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
    </ProfileGradientCard>
  );
};

export default ExamHistoryItem;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.3),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
    zIndex: 1,
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
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  subjectInfo: {
    flex: 1,
    minWidth: 0,
  },
  subject: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.2),
  },
  date: {
    color: Colors.whiteMuted75,
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
    borderTopColor: Colors.whiteOverlay18,
    paddingTop: hp(1),
    zIndex: 1,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    marginBottom: hp(0.3),
  },
  statValue: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
});
