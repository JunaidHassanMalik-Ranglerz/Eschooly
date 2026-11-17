import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DepthIcon from './DepthIcon';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import FeatureArtImage from './Glass/FeatureArtImage';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {getSubjectIconTheme} from './Syllabus/SubjectTheme';
import {EducationIcons} from '../Assets/EducationIcons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {getSubjectGradient} from '../Constants/CardTheme';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';

const ART_SIZE = wp(12.5);

const getHistoryArt = item => {
  const hay = `${item?.subject || ''} ${item?.title || ''}`.toLowerCase();
  if (/\bphysic/.test(hay)) {
    return EducationIcons.physicsAtom;
  }
  if (/\bbiolog|\blife\s?sci/.test(hay)) {
    return EducationIcons.subjects;
  }
  if (/\bchem/.test(hay)) {
    return EducationIcons.exams;
  }
  if (/\bmath|\balgebra|\bgeometry|\bcalculus/.test(hay)) {
    return EducationIcons.results;
  }
  if (/\bcomputer|\bict\b|\bcoding|\bprogram/.test(hay)) {
    return EducationIcons.onlineClasses;
  }
  if (/\benglish|\bliterature|\bgrammar/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (/\burdu|\barabic|\bislam/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (/\bscience/.test(hay)) {
    return EducationIcons.physicsAtom;
  }
  return EducationIcons.exams;
};

const ExamHistoryItem = ({item, animationIndex = 0, onPress}) => {
  const icy = useStudentTone();
  const isPassed = item.status === 'PASSED';
  const isFailed = item.status === 'FAILED';
  const badgeBg = isPassed ? Colors.whiteOverlay22 : 'rgba(239, 68, 68, 0.22)';
  const badgeColor = isPassed ? '#86EFAC' : '#FCA5A5';
  const statusText = isPassed ? Strings.passed : Strings.failed;
  const hasResult = Boolean(item.marks || item.score);
  const gradientIndex = Number(String(item?.id || '0').replace(/\D/g, '')) || animationIndex;
  const subjectIcon = getSubjectIconTheme(item.subject);
  const art = getHistoryArt(item);

  const content = (
    <>
      <View style={styles.topRow}>
        <View style={styles.subjectRow}>
          <View style={[styles.iconWrap, icy && styles.iconWrapIcy]}>
            {icy ? (
              <FeatureArtImage source={art} size={ART_SIZE} />
            ) : (
              <DepthIcon
                name={subjectIcon.icon}
                size={wp(4.5)}
                color={subjectIcon.color}
              />
            )}
          </View>
          <View style={styles.subjectInfo}>
            <Text style={[styles.subject, icy && styles.subjectIcy]}>
              {item.title || item.subject}
            </Text>
            <Text style={[styles.date, icy && styles.dateIcy]} numberOfLines={1}>
              {item.date}
            </Text>
          </View>
        </View>
        {isPassed || isFailed ? (
          <View
            style={[
              styles.badge,
              {backgroundColor: badgeBg},
              icy && styles.badgeIcy,
            ]}>
            <Text
              style={[
                styles.badgeText,
                {color: badgeColor},
                icy && styles.badgeTextIcy,
              ]}>
              {statusText}
            </Text>
          </View>
        ) : null}
      </View>

      {hasResult ? (
        <View style={[styles.bottomRow, icy && styles.bottomRowIcy]}>
          <View style={styles.statCol}>
            <Text style={[styles.statLabel, icy && styles.statLabelIcy]}>
              {Strings.marks}
            </Text>
            <Text
              style={[styles.statValue, icy && styles.statValueIcy]}
              numberOfLines={1}>
              {item.marks}
            </Text>
          </View>
          {icy ? <View style={styles.statSplitIcy} /> : null}
          <View style={[styles.statCol, icy && styles.statColRight]}>
            <Text style={[styles.statLabel, icy && styles.statLabelIcy]}>
              {Strings.score}
            </Text>
            <Text
              style={[styles.statValue, icy && styles.scoreValueIcy]}
              numberOfLines={1}>
              {item.score}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );

  if (icy) {
    return (
      <AnimatedCard index={animationIndex} style={styles.wrapIcy}>
        <TouchableOpacity
          activeOpacity={onPress ? 0.88 : 1}
          disabled={!onPress}
          onPress={onPress}
          style={styles.pressIcy}>
          <View style={styles.clipIcy}>
            <LinearGradient
              colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.fillIcy}
            />
            <View pointerEvents="none" style={styles.waveIcy}>
              <CardWave
                variant={SCREEN_WAVES.assignmentIce}
                color="rgba(91, 156, 255, 0.16)"
              />
            </View>
            <View style={styles.innerIcy}>{content}</View>
          </View>
        </TouchableOpacity>
      </AnimatedCard>
    );
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      colors={getSubjectGradient(gradientIndex)}
      waveVariant={animationIndex === 8 ? 'results' : null}
      onPress={onPress}>
      {content}
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
    minWidth: 0,
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
  iconWrapIcy: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(3.5),
    backgroundColor: Colors.hubCard,
    marginRight: wp(2.8),
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
  subjectIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: Fontsize.sm1 + 5,
    flexShrink: 1,
  },
  date: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  dateIcy: {
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(3),
    marginLeft: wp(2),
    flexShrink: 0,
  },
  badgeIcy: {
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs,
  },
  badgeTextIcy: {
    color: Colors.brandRoyal,
  },
  bottomRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
    paddingTop: hp(1),
    zIndex: 1,
  },
  bottomRowIcy: {
    borderTopColor: Colors.borderSubtle,
    paddingTop: hp(1.05),
  },
  statCol: {
    flex: 1,
    minWidth: 0,
  },
  statColRight: {
    paddingLeft: wp(3.2),
  },
  statSplitIcy: {
    width: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.borderSubtle,
    marginHorizontal: wp(1.2),
    alignSelf: 'stretch',
  },
  statLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    marginBottom: hp(0.3),
  },
  statLabelIcy: {
    color: Colors.textSecondary,
  },
  statValue: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  statValueIcy: {
    color: Colors.brandNavy,
  },
  scoreValueIcy: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  wrapIcy: {
    marginBottom: hp(1.15),
    overflow: 'visible',
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  innerIcy: {
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.35),
  },
});
