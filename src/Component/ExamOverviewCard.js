import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
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
      {percent ? (
        <Text numberOfLines={1}>
          <Text style={[styles.value, premium && styles.valuePremium]}>{value}</Text>
          <Text style={[styles.percentSign, premium && styles.labelPremium]}>%</Text>
        </Text>
      ) : (
        <Text style={[styles.value, premium && styles.valuePremium]} numberOfLines={1}>
          {value}
        </Text>
      )}
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
});
