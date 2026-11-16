import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from './FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const CORNER = radius.banner;
const STAT_CORNER = radius.card;
const ART_SIZE = wp(22);

const StatTile = ({value, label, selected}) => (
  <View style={[styles.stat, selected && styles.statSelected]}>
    <Text
      style={[styles.statValue, selected && styles.statValueSelected]}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.7}
      maxFontSizeMultiplier={1.15}>
      {value}
    </Text>
    <Text
      style={[styles.statLabel, selected && styles.statLabelSelected]}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.75}
      maxFontSizeMultiplier={1.1}>
      {label}
    </Text>
  </View>
);

const FeatureOverviewCard = ({
  label,
  total,
  art,
  stats = [],
  waveVariant = SCREEN_WAVES.assignmentIce,
  waveColor = 'rgba(19, 69, 163, 0.14)',
  colors = [Colors.bannerIceStart, Colors.hubCard],
  animationIndex = 0,
  style,
}) => {
  const card = (
    <View style={styles.shell}>
      <View style={styles.clip}>
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          {waveVariant ? (
            <CardWave variant={waveVariant} color={waveColor} />
          ) : null}
          <View style={styles.topRow}>
            <View style={styles.copy}>
              {label ? (
                <Text style={styles.label} numberOfLines={1}>
                  {label}
                </Text>
              ) : null}
              {total ? (
                <Text
                  style={styles.total}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.15}>
                  {total}
                </Text>
              ) : null}
            </View>
            <View pointerEvents="none" style={styles.art}>
              <FeatureArtImage
                source={art || EducationIcons.assignments}
                width={ART_SIZE}
                height={ART_SIZE}
              />
            </View>
          </View>
          {stats.length ? (
            <View style={styles.statsRow}>
              {stats.map(item => (
                <StatTile
                  key={item.key || item.label}
                  value={item.value}
                  label={item.label}
                  selected={item.selected}
                />
              ))}
            </View>
          ) : null}
        </LinearGradient>
      </View>
    </View>
  );

  if (animationIndex == null) {
    return <View style={style}>{card}</View>;
  }

  return (
    <AnimatedCard index={animationIndex} style={style}>
      {card}
    </AnimatedCard>
  );
};

export default FeatureOverviewCard;

const styles = StyleSheet.create({
  shell: {
    borderRadius: CORNER,
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clip: {
    borderRadius: CORNER,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: CORNER,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: spacing.md,
    paddingTop: hp(1.6),
    paddingBottom: hp(1.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  label: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
  },
  total: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
  },
  art: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: wp(2),
    marginTop: hp(1.4),
    zIndex: 1,
  },
  stat: {
    flex: 1,
    minWidth: 0,
    minHeight: hp(8.2),
    borderRadius: STAT_CORNER,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    paddingVertical: hp(1.25),
    paddingHorizontal: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statSelected: {
    backgroundColor: Colors.hubCard,
    borderColor: Colors.borderSelected,
  },
  statValue: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    marginBottom: hp(0.2),
  },
  statValueSelected: {
    color: Colors.brandRoyal,
  },
  statLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
  },
  statLabelSelected: {
    color: Colors.textPrimary,
  },
});
