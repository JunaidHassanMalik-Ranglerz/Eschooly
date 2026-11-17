import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';

const ExamOverviewCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  percent,
  trendIcon,
  premium = false,
  animationIndex = 0,
  colors,
  waveVariant,
}) => {
  const icy = useStudentTone();

  const valueRow = (
    percent ? (
      <Text numberOfLines={1}>
        <Text
          style={[
            styles.value,
            premium && styles.valuePremium,
            icy && styles.valueIcy,
          ]}>
          {value}
        </Text>
        <Text
          style={[
            styles.percentSign,
            premium && styles.labelPremium,
            icy && styles.percentIcy,
          ]}>
          %
        </Text>
      </Text>
    ) : (
      <Text
        style={[
          styles.value,
          premium && styles.valuePremium,
          icy && styles.valueIcy,
        ]}
        numberOfLines={1}>
        {value}
      </Text>
    )
  );

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
              color="rgba(91, 156, 255, 0.16)"
            />
          </View>
          <View style={styles.bodyIcy}>
            <View style={styles.topRow}>
              <View style={styles.iconCircleIcy}>
                <Icon name={icon} size={wp(4)} color={Colors.brandRoyal} />
              </View>
              {trendIcon ? (
                <Icon name={trendIcon} size={wp(3.5)} color={Colors.brandRoyal} />
              ) : null}
            </View>
            <Text style={styles.labelIcy} numberOfLines={1}>
              {label}
            </Text>
            {valueRow}
          </View>
        </View>
      </AnimatedCard>
    );
  }

  const body = (
    <>
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, {backgroundColor: iconBg}]}>
          <Icon name={icon} size={wp(4)} color={iconColor} />
        </View>
        <Icon
          name={trendIcon}
          size={wp(3.5)}
          color={premium ? Colors.whiteMuted75 : Colors.grayText}
        />
      </View>
      <Text style={[styles.label, premium && styles.labelPremium]} numberOfLines={1}>
        {label}
      </Text>
      {valueRow}
    </>
  );

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        style={styles.cardWrap}
        animationIndex={animationIndex}
        colors={colors}
        waveVariant={waveVariant}>
        {body}
      </ProfileGradientCard>
    );
  }

  return (
    <AnimatedCard index={animationIndex} style={styles.card}>
      {body}
    </AnimatedCard>
  );
};

export default ExamOverviewCard;

const styles = StyleSheet.create({
  cardWrap: {
    width: '48%',
  },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(3.5),
    marginBottom: hp(1.5),
  },
  premiumInner: {
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3.5),
    minHeight: hp(12),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  iconCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.4),
  },
  labelPremium: {
    color: Colors.whiteMuted75,
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
  },
  valuePremium: {
    color: Colors.white,
  },
  percentSign: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  wrapIcy: {
    width: '48%',
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  clipIcy: {
    borderRadius: radius.card,
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
  bodyIcy: {
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3.4),
    minHeight: hp(12),
  },
  iconCircleIcy: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.4),
  },
  valueIcy: {
    color: Colors.brandNavy,
  },
  percentIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
  },
});
