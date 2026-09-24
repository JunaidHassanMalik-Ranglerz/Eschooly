import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DepthIcon from '../DepthIcon';
import {getAcademicsMenuEntering} from '../../utils/cardAnimation';
import AnimatedCard from '../AnimatedCard';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const StudentHubCard = ({
  icon,
  iconColor,
  label,
  iconText,
  onPress,
  animationIndex = 0,
  hubIndex = 0,
  colors,
}) => {
  const gradient = colors || [Colors.parentHeader, Colors.parentHeader];

  return (
    <AnimatedCard
      index={animationIndex}
      entering={getAcademicsMenuEntering(null, animationIndex)}
      style={styles.cardWrap}>
      <TouchableOpacity
        activeOpacity={0.88}
        delayPressIn={0}
        onPress={onPress}
        style={styles.press}>
        <LinearGradient
          colors={gradient}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.card}>
          <View style={styles.iconWrap}>
            <DepthIcon
              name={icon}
              text={iconText}
              size={wp(7)}
              color={iconColor}
            />
          </View>
          <Text style={styles.label} numberOfLines={2}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

export default StudentHubCard;

const styles = StyleSheet.create({
  cardWrap: {
    width: '47.5%',
    marginBottom: hp(1.6),
  },
  press: {
    width: '100%',
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    borderRadius: wp(5),
    paddingTop: hp(2.2),
    paddingBottom: hp(1.8),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: hp(14),
  },
  iconWrap: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(4),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.1),
    zIndex: 1,
  },
  label: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    zIndex: 1,
  },
});
