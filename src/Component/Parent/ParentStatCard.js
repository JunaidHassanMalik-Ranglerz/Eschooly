import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DepthIcon from '../DepthIcon';
import AnimatedCard from '../AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ParentStatCard = ({
  icon,
  iconSource,
  iconColor,
  value,
  label,
  hint,
  onPress,
  entering,
  animationIndex = 0,
}) => (
  <AnimatedCard
    index={animationIndex}
    entering={entering}
    style={styles.cardWrap}>
    <TouchableOpacity
      activeOpacity={0.88}
      delayPressIn={0}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.iconWrap}>
        <DepthIcon
          name={icon}
          source={iconSource}
          size={wp(7)}
          color={iconColor}
        />
      </View>
      <View style={styles.textWrap}>
        <Text
          style={styles.label}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
          ellipsizeMode="clip">
          {label}
        </Text>
        {value ? (
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        ) : null}
        {hint ? (
          <Text style={styles.hint} numberOfLines={1}>
            {hint}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  </AnimatedCard>
);

export default ParentStatCard;

const styles = StyleSheet.create({
  cardWrap: {
    width: '48%',
    marginBottom: hp(1.5),
  },
  card: {
    width: '100%',
    backgroundColor: Colors.parentHeader,
    borderRadius: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3.5),
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
    backgroundColor: Colors.transparent,
    overflow: 'visible',
  },
  textWrap: {
    flex: 1,
  },
  label: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    flexShrink: 1,
  },
  value: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    marginTop: hp(0.1),
  },
  hint: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.1),
  },
});
