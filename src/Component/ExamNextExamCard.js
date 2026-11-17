import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import FeatureArtImage from './Glass/FeatureArtImage';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {EducationIcons} from '../Assets/EducationIcons';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import {CARD_GRADIENTS} from '../Constants/CardTheme';

const ExamNextExamCard = ({subject, date, time, animationIndex = 2}) => {
  const icy = useStudentTone();
  const subtitle = [date, time].filter(Boolean).join(' - ');

  if (icy) {
    return (
      <AnimatedCard index={animationIndex} style={styles.wrapIcy}>
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
          <View style={styles.rowIcy}>
            <View style={styles.artIcy}>
              <FeatureArtImage source={EducationIcons.exams} size={wp(14)} />
            </View>
            <View style={styles.info}>
              <Text style={styles.titleIcy} numberOfLines={2}>
                {subject ? `${Strings.nextExam}: ${subject}` : Strings.nextExam}
              </Text>
              {subtitle ? (
                <Text style={styles.subtitleIcy} numberOfLines={2}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      colors={CARD_GRADIENTS.sapphire}
      waveVariant={SCREEN_WAVES.fees}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Image source={Images.calendarClock} style={styles.icon} resizeMode="contain" />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {subject ? `${Strings.nextExam}: ${subject}` : Strings.nextExam}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </ProfileGradientCard>
  );
};

export default ExamNextExamCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.white,
  },
  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(3),
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  subtitle: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  wrapIcy: {
    overflow: 'visible',
    marginBottom: hp(1.2),
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  rowIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.4),
  },
  artIcy: {
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  subtitleIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
});
