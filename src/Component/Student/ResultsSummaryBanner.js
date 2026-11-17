import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ART_SIZE = wp(16);

const ResultsSummaryBanner = ({
  childName,
  classLine,
  term,
  grade,
  loading,
  downloading,
  downloaded,
  onDownload,
  animationIndex = 1,
  entering,
  replayToken = 0,
}) => (
  <AnimatedCard
    index={animationIndex}
    entering={entering}
    replayToken={replayToken}
    style={styles.wrap}>
    <View style={styles.clip}>
      <LinearGradient
        colors={[Colors.bannerIceStart, '#E8F2FF', Colors.hubCard]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.face}>
        <CardWave
          variant={SCREEN_WAVES.assignmentIce}
          color="rgba(91, 156, 255, 0.2)"
        />
        <Text style={styles.kicker}>{Strings.resultCard}</Text>
        <View style={styles.top}>
          <View style={styles.identity}>
            <Text style={styles.name} numberOfLines={2}>
              {childName}
            </Text>
            {classLine ? (
              <Text style={styles.meta} numberOfLines={2}>
                {classLine}
              </Text>
            ) : null}
            {term ? (
              <Text style={styles.term} numberOfLines={1}>
                {term}
              </Text>
            ) : null}
          </View>
          <View style={styles.gradeCol}>
            <Text style={styles.gradeLabel}>{Strings.overallGrade}</Text>
            <Text style={styles.grade} numberOfLines={1}>
              {loading ? '—' : grade}
            </Text>
            <FeatureArtImage
              source={EducationIcons.resultBadge}
              width={ART_SIZE}
              height={ART_SIZE}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={0.85}
          disabled={downloading}
          onPress={onDownload}>
          {downloading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Icon
              name={downloaded ? 'checkmark-circle' : 'download-outline'}
              size={wp(4.6)}
              color={Colors.white}
            />
          )}
          <Text style={styles.downloadText}>
            {downloaded ? Strings.resultDownloaded : Strings.downloadResult}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </AnimatedCard>
);

export default ResultsSummaryBanner;

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.banner,
    marginBottom: hp(1.45),
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
  },
  face: {
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    paddingHorizontal: wp(4),
    paddingTop: hp(1.55),
    paddingBottom: hp(1.45),
  },
  kicker: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    zIndex: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.7),
    zIndex: 1,
  },
  identity: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2.4),
  },
  name: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: Fontsize.sm1 + 4,
    includeFontPadding: false,
  },
  meta: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.25),
  },
  term: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.35),
  },
  gradeCol: {
    alignItems: 'center',
    minWidth: wp(18),
  },
  gradeLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  grade: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    lineHeight: Fontsize.ml + 3,
    marginTop: hp(0.08),
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.45),
    backgroundColor: Colors.brandNavy,
    borderRadius: radius.pill,
    paddingVertical: hp(1.15),
    minHeight: hp(5.2),
    zIndex: 1,
  },
  downloadText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.6),
  },
});
