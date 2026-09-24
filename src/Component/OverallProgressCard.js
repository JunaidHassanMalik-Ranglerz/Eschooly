import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
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
import {wp, hp} from '../Constants/Responsive';

const OverallProgressCard = ({overview, subjectLabel, animationIndex = 0}) => {
  const theme = getSubjectTheme(subjectLabel);

  return (
    <AnimatedCard index={animationIndex} style={[styles.wrap, IDENTITY_CARD_SHADOW]}>
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

        <Text style={styles.subText} numberOfLines={1}>
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
  card: {
    borderRadius: CARD_RADIUS,
    padding: wp(4),
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
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
  completeText: {
    color: Colors.whiteMuted75,
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
  trackText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  progressBar: {
    width: '100%',
    marginBottom: hp(1.2),
    height: hp(1),
    borderRadius: hp(0.6),
    backgroundColor: Colors.whiteOverlay18,
  },
  subText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
});
