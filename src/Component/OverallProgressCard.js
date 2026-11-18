import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import FeatureArtImage from './Glass/FeatureArtImage';
import {EducationIcons} from '../Assets/EducationIcons';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from './Profile/ProfileTheme';
import {getSubjectTheme} from './Syllabus/SubjectTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import {useStudentTone} from './Glass/StudentTone';

const ART_SIZE = wp(16);

const OverallProgressCard = ({overview, subjectLabel, animationIndex = 0}) => {
  const theme = getSubjectTheme(subjectLabel);
  const icy = useStudentTone();
  const statusLabel = String(
    overview?.statusLabel || overview?.status || '',
  ).trim();
  const badgeLabel = statusLabel || Strings.onTrack;

  if (icy) {
    return (
      <AnimatedCard index={animationIndex} style={styles.wrapIcy}>
        <View style={styles.clip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardIcy}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.2)"
            />
            <View style={styles.foreground}>
              <View style={styles.topRowIcy}>
                <View style={styles.percentBlock}>
                  <View style={styles.percentRow}>
                    <Text style={styles.percentIcy} numberOfLines={1}>
                      {overview?.percentText}
                    </Text>
                    <Text style={styles.completeTextIcy}>{Strings.complete}</Text>
                  </View>
                  {badgeLabel ? (
                    <View style={styles.trackBadgeIcy}>
                      <Icon
                        name="checkmark-circle"
                        size={wp(4)}
                        color={Colors.brandRoyal}
                      />
                      <Text style={styles.trackTextIcy} numberOfLines={1}>
                        {badgeLabel}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.art} pointerEvents="none">
                  <FeatureArtImage
                    source={EducationIcons.syllabus}
                    width={ART_SIZE}
                    height={ART_SIZE}
                  />
                </View>
              </View>

              <ProgressBar
                progress={overview?.progress}
                fillColor={Colors.brandRoyal}
                style={styles.progressBarIcy}
              />

              <Text style={styles.subTextIcy} numberOfLines={2}>
                {overview?.completedTopics} {Strings.of} {overview?.totalTopics}{' '}
                {Strings.topicsCompleted}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard
      index={animationIndex}
      style={[styles.wrap, IDENTITY_CARD_SHADOW]}>
      <LinearGradient
        colors={theme.gradient}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <CardWave variant={SCREEN_WAVES.syllabus} />
        <View style={styles.topRow}>
          <View style={styles.percentRow}>
            <Text style={styles.percent} numberOfLines={1}>
              {overview?.percentText}
            </Text>
            <Text style={styles.completeText}>{Strings.complete}</Text>
          </View>

          <View style={styles.trackBadge}>
            <Icon name="checkmark-circle" size={wp(4)} color={Colors.iconSky} />
            <Text style={styles.trackText}>{Strings.onTrack}</Text>
          </View>
        </View>

        <ProgressBar progress={overview?.progress} style={styles.progressBar} />

        <Text style={styles.subText} numberOfLines={2}>
          {overview?.completedTopics} {Strings.of} {overview?.totalTopics}{' '}
          {Strings.topicsCompleted}
        </Text>
      </LinearGradient>
    </AnimatedCard>
  );
};

export default OverallProgressCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  wrapIcy: {
    marginBottom: hp(1.7),
    borderRadius: radius.banner,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  card: {
    borderRadius: CARD_RADIUS,
    padding: wp(4),
    overflow: 'hidden',
  },
  cardIcy: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    paddingVertical: hp(1.55),
    paddingHorizontal: wp(3.8),
    overflow: 'hidden',
  },
  foreground: {
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  topRowIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.35),
  },
  percentBlock: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  percent: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginRight: wp(2),
  },
  percentIcy: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginRight: wp(2),
  },
  completeText: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  completeTextIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  trackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay22,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: wp(5),
    gap: wp(1),
  },
  trackBadgeIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.hubCard,
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.5),
    borderRadius: radius.pill,
    marginTop: hp(0.7),
  },
  trackText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  trackTextIcy: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    marginBottom: hp(1.2),
    height: hp(1),
    borderRadius: hp(0.6),
    backgroundColor: Colors.whiteOverlay18,
  },
  progressBarIcy: {
    width: '100%',
    marginBottom: hp(1.15),
    height: hp(1.05),
    borderRadius: hp(0.6),
    backgroundColor: Colors.hubCard,
  },
  subText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  subTextIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
});
