import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from '../DepthIcon';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';

const WAVE_COLOR = 'rgba(19, 69, 163, 0.14)';
const ART_SIZE = wp(12);
const CARD_RADIUS = wp(5);

const ParentStatCard = ({
  icon,
  iconSource,
  iconColor,
  art,
  value,
  label,
  hint,
  onPress,
  entering,
  animationIndex = 0,
}) => {
  const metric =
    value === undefined || value === null || value === ''
      ? '—'
      : String(value);

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      style={styles.cardWrap}>
      <TouchableOpacity
        activeOpacity={0.88}
        delayPressIn={0}
        onPress={onPress}
        style={styles.shell}>
        <View style={styles.clip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={{x: 0, y: 0.05}}
            end={{x: 1, y: 1}}
            style={styles.card}>
            <View pointerEvents="none" style={styles.wave}>
              <CardWave
                variant={SCREEN_WAVES.assignmentIce}
                color={WAVE_COLOR}
              />
            </View>

            <View style={styles.topRow}>
              <View style={styles.iconWrap} pointerEvents="none">
                {art ? (
                  <FeatureArtImage
                    source={art}
                    width={ART_SIZE}
                    height={ART_SIZE}
                  />
                ) : (
                  <DepthIcon
                    name={icon}
                    source={iconSource}
                    size={wp(7)}
                    color={iconColor || Colors.brandRoyal}
                  />
                )}
              </View>
              {onPress ? (
                <View style={styles.arrowBtn}>
                  <Icon
                    name="chevron-forward"
                    size={wp(3.8)}
                    color={Colors.brandRoyal}
                  />
                </View>
              ) : null}
            </View>

            <Text
              style={styles.value}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.2}>
              {metric}
            </Text>
            <Text
              style={styles.title}
              maxFontSizeMultiplier={1.15}
              textBreakStrategy="highQuality">
              {label}
            </Text>
            {hint ? (
              <Text
                style={styles.hint}
                numberOfLines={2}
                maxFontSizeMultiplier={1.15}
                textBreakStrategy="highQuality">
                {hint}
              </Text>
            ) : null}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

export default ParentStatCard;

const styles = StyleSheet.create({
  cardWrap: {
    width: '48%',
    marginBottom: hp(1.5),
  },
  shell: {
    width: '100%',
    borderRadius: CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.card,
  },
  clip: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  card: {
    minHeight: hp(17.6),
    borderRadius: CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: wp(3.4),
    paddingTop: hp(1.35),
    paddingBottom: hp(1.55),
  },
  wave: {
    ...StyleSheet.absoluteFillObject,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.05),
    zIndex: 1,
  },
  iconWrap: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBtn: {
    width: wp(7.2),
    height: wp(7.2),
    borderRadius: wp(3.6),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    lineHeight: Fontsize.md * 1.12,
    marginBottom: hp(0.4),
    includeFontPadding: false,
    zIndex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    lineHeight: Fontsize.sm * 1.28,
    zIndex: 1,
  },
  hint: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.35,
    marginTop: hp(0.3),
    zIndex: 1,
  },
});
