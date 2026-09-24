import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from './DepthIcon';
import AnimatedCard from './AnimatedCard';
import {getAcademicsMenuEntering} from '../utils/cardAnimation';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {ACADEMICS_MENU_GRADIENT} from './Syllabus/SubjectTheme';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const AcademicMenuCard = ({
  icon,
  color,
  title,
  disabled,
  onPress,
  animationIndex = 0,
  waveKey,
}) => (
  <AnimatedCard
    index={animationIndex}
    entering={getAcademicsMenuEntering(waveKey, animationIndex)}
    style={styles.wrap}>
    <TouchableOpacity
      activeOpacity={0.88}
      delayPressIn={0}
      onPress={onPress}
      disabled={disabled}
      style={[styles.press, disabled && styles.wrapDisabled]}>
      <LinearGradient
        colors={ACADEMICS_MENU_GRADIENT}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.face}>
        <View style={styles.iconWrap}>
          <DepthIcon name={icon} size={wp(6)} color={color} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.chevronWrap}>
          <Icon name="chevron-forward" size={wp(5)} color={Colors.white} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </AnimatedCard>
);

export default AcademicMenuCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.35),
  },
  press: {
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  wrapDisabled: {
    opacity: 0.55,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.7),
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    zIndex: 1,
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    zIndex: 1,
  },
  chevronWrap: {
    zIndex: 1,
  },
});
