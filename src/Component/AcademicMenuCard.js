import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from './DepthIcon';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import FeatureArtImage from './Glass/FeatureArtImage';
import {useStudentTone} from './Glass/StudentTone';
import {getAcademicsMenuEntering} from '../utils/cardAnimation';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {ACADEMICS_MENU_GRADIENT} from './Syllabus/SubjectTheme';
import {EducationIcons, getFeatureArt} from '../Assets/EducationIcons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';

const MENU_ART = {
  subjects: EducationIcons.syllabus,
  assignments: EducationIcons.assignments,
  teachers: EducationIcons.teachers,
  attendance: EducationIcons.attendance,
  timetable: EducationIcons.timetable,
  holidays: EducationIcons.holidays,
  exams: EducationIcons.exams,
  result: EducationIcons.results,
  fee: EducationIcons.fees,
  transportTrack: EducationIcons.transport,
};

const resolveMenuArt = waveKey =>
  MENU_ART[waveKey] || getFeatureArt(waveKey) || EducationIcons.subjects;

const AcademicMenuCard = ({
  icon,
  color,
  title,
  disabled,
  onPress,
  animationIndex = 0,
  waveKey,
}) => {
  const icy = useStudentTone();
  const art = resolveMenuArt(waveKey);

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        entering={getAcademicsMenuEntering(waveKey, animationIndex)}
        style={styles.wrapIcy}>
        <TouchableOpacity
          activeOpacity={0.88}
          delayPressIn={0}
          onPress={onPress}
          disabled={disabled}
          style={[styles.pressIcy, disabled && styles.wrapDisabled]}>
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
                color="rgba(91, 156, 255, 0.18)"
              />
            </View>
            <View style={styles.faceIcy}>
              <View style={styles.iconWrapIcy}>
                <FeatureArtImage source={art} size={wp(13.5)} />
              </View>
              <Text style={styles.titleIcy} numberOfLines={2}>
                {title}
              </Text>
              <View style={styles.chevronWrapIcy}>
                <Icon
                  name="chevron-forward"
                  size={wp(5)}
                  color={Colors.brandRoyal}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard
      index={animationIndex}
      entering={getAcademicsMenuEntering(waveKey, animationIndex)}
      style={styles.wrap}>
      <TouchableOpacity
        activeOpacity={0.88}
        delayPressIn={0}
        onPress={onPress}
        disabled={disabled}
        style={[styles.press, disabled && styles.wrapDisabled]}>
        <LinearGradient
          colors={ACADEMICS_MENU_GRADIENT}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.face}>
          <View style={styles.iconWrap}>
            <DepthIcon name={icon} size={wp(6)} color={color} />
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.chevronWrap}>
            <Icon name="chevron-forward" size={wp(5)} color={Colors.white} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

export default AcademicMenuCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.35),
  },
  press: {
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  wrapDisabled: {
    opacity: 0.55,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.7),
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    zIndex: 1,
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    zIndex: 1,
  },
  chevronWrap: {
    zIndex: 1,
  },
  chevronWrapIcy: {
    zIndex: 1,
    width: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapIcy: {
    marginBottom: hp(1.2),
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
    ...StyleSheet.absoluteFill,
  },
  waveIcy: {
    ...StyleSheet.absoluteFill,
  },
  faceIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: hp(9.2),
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.25),
  },
  iconWrapIcy: {
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.8),
  },
  titleIcy: {
    flex: 1,
    minWidth: 0,
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingRight: wp(2),
  },
});
