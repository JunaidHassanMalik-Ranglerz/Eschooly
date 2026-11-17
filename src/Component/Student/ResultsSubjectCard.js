import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ART_SIZE = wp(12.5);
const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

const getSubjectArt = name => {
  const hay = String(name || '').toLowerCase();
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
  if (/\burdu|\barabic|\bislam/.test(hay)) {
    return EducationIcons.subjects;
  }
  return EducationIcons.results;
};

const scoreLine = item => {
  if (item?.obtained && item?.total) {
    return item.score
      ? `${item.obtained}/${item.total} · ${item.score}%`
      : `${item.obtained}/${item.total}`;
  }
  if (item?.score) {
    return `${item.score}%`;
  }
  if (item?.obtained) {
    return String(item.obtained);
  }
  return '';
};

const ResultsSubjectCard = ({
  item,
  animationIndex = 0,
  entering,
  replayToken = 0,
  spaced = false,
}) => {
  const score = scoreLine(item);
  const rtlName = ARABIC_SCRIPT.test(String(item?.name || ''));

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={[styles.wrap, spaced && styles.spaced]}>
      <View style={styles.clip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.face}>
          <CardWave
            variant={SCREEN_WAVES.assignmentIce}
            color="rgba(91, 156, 255, 0.18)"
          />
          <View style={styles.row}>
            <View style={styles.art} pointerEvents="none">
              <FeatureArtImage
                source={getSubjectArt(item?.name)}
                width={ART_SIZE}
                height={ART_SIZE}
              />
            </View>
            <View style={styles.copy}>
              <Text
                style={[styles.name, rtlName && styles.nameRtl]}
                numberOfLines={2}
                textBreakStrategy="simple">
                {item?.name}
              </Text>
              {score ? (
                <Text
                  style={[styles.score, rtlName && styles.nameRtl]}
                  numberOfLines={2}>
                  {score}
                </Text>
              ) : null}
            </View>
            {item?.grade ? (
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText} numberOfLines={1}>
                  {item.grade}
                </Text>
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </View>
    </AnimatedCard>
  );
};

export default ResultsSubjectCard;

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.banner,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  spaced: {
    marginBottom: hp(1.2),
  },
  clip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  face: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.35),
    minHeight: hp(9.6),
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.4),
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(1.5),
  },
  name: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: Fontsize.sm1 + 5,
    writingDirection: 'auto',
    includeFontPadding: false,
  },
  nameRtl: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  score: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    marginTop: hp(0.2),
    includeFontPadding: false,
  },
  gradeBadge: {
    minWidth: wp(11),
    height: wp(11),
    borderRadius: wp(11),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1.6),
  },
  gradeText: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    includeFontPadding: false,
  },
});
