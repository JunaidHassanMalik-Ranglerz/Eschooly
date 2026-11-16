import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ART_SIZE = wp(12.5);

const getStartLabel = time => (time || '').split(' - ')[0] || time || '';

const getSubjectArt = subject => {
  const hay = String(subject || '').toLowerCase();
  if (/\bphysic/.test(hay)) {
    return EducationIcons.physicsAtom;
  }
  if (/\bbiolog|\blife\s?sci/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (/\bchem/.test(hay)) {
    return EducationIcons.syllabus;
  }
  if (/\benglish|\bliterature|\bgrammar/.test(hay)) {
    return EducationIcons.subjects;
  }
  if (/\bcomputer|\bict\b|\bcoding|\bprogram/.test(hay)) {
    return EducationIcons.onlineClasses;
  }
  if (/\bmath|\balgebra|\bgeometry|\bcalculus/.test(hay)) {
    return EducationIcons.digitalLibrary;
  }
  if (/\bscience/.test(hay)) {
    return EducationIcons.syllabus;
  }
  return EducationIcons.timetable;
};

const classInfoFor = (item, classLabel) => {
  const fromItem = String(item?.classLabel || '').trim();
  const fromStudent = String(classLabel || '').trim();
  if (!fromItem) {
    return fromStudent;
  }
  if (!fromStudent) {
    return fromItem;
  }
  const compactItem = fromItem.replace(/\s+/g, '').toLowerCase();
  const compactStudent = fromStudent.replace(/\s+/g, '').toLowerCase();
  if (compactItem.includes(compactStudent) || compactStudent.includes(compactItem)) {
    return fromItem;
  }
  return fromItem;
};

const TimetablePeriodCard = ({item, classLabel}) => {
  const start = getStartLabel(item?.time);
  const periodLabel = item?.period ? `Period ${item.period}` : '';
  const classInfo = classInfoFor(item, classLabel);

  return (
    <View style={styles.shell}>
      <View style={styles.clip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          <CardWave
            variant={SCREEN_WAVES.assignmentIce}
            color="rgba(91, 156, 255, 0.2)"
          />
          <View style={styles.row}>
            <View style={styles.timeCol}>
              <Icon
                name="time-outline"
                size={wp(4)}
                color={Colors.brandRoyal}
              />
              <Text style={styles.time} numberOfLines={2}>
                {start}
              </Text>
            </View>

            <View style={styles.copy}>
              <Text
                style={styles.subject}
                numberOfLines={2}
                ellipsizeMode="tail"
                textBreakStrategy="simple">
                {item?.subject}
              </Text>
              {periodLabel ? (
                <Text style={styles.period} numberOfLines={1}>
                  {periodLabel}
                </Text>
              ) : null}
              {item?.time ? (
                <Text style={styles.range} numberOfLines={1}>
                  {item.time}
                </Text>
              ) : null}
              {item?.teacher ? (
                <Text
                  style={styles.teacher}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  textBreakStrategy="simple">
                  {item.teacher}
                </Text>
              ) : null}
              {classInfo ? (
                <Text style={styles.classLine} numberOfLines={1}>
                  {classInfo}
                </Text>
              ) : null}
            </View>

            <View style={styles.art} pointerEvents="none">
              <FeatureArtImage
                source={getSubjectArt(item?.subject)}
                width={ART_SIZE}
                height={ART_SIZE}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TimetablePeriodCard;

const styles = StyleSheet.create({
  shell: {
    borderRadius: radius.banner,
    marginBottom: hp(1.25),
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    paddingVertical: hp(1.25),
    paddingLeft: wp(2.6),
    paddingRight: wp(2.2),
    minHeight: hp(10.4),
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  timeCol: {
    width: wp(13.5),
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    marginTop: hp(0.3),
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    textAlign: 'center',
    includeFontPadding: false,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(1.2),
    justifyContent: 'center',
  },
  subject: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: Fontsize.sm1 + 4,
    marginBottom: hp(0.2),
    includeFontPadding: false,
  },
  period: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    includeFontPadding: false,
  },
  range: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    marginTop: hp(0.12),
    includeFontPadding: false,
  },
  teacher: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    marginTop: hp(0.12),
    includeFontPadding: false,
  },
  classLine: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    lineHeight: Fontsize.xs1 + 2,
    marginTop: hp(0.08),
    includeFontPadding: false,
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(0.5),
  },
});
