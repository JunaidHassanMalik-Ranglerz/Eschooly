import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from './ProfileTheme';

const ProfileActionCard = ({
  icon,
  iconColor,
  title,
  onPress,
  arrowIcon = 'chevron-forward',
  style,
  animationIndex = 0,
  entering,
  replayToken = 0,
}) => (
  <AnimatedCard
    index={animationIndex}
    entering={entering}
    replayToken={replayToken}
    style={[styles.wrap, IDENTITY_CARD_SHADOW, style]}>
    <Pressable
      onPress={onPress}
      android_ripple={{color: Colors.whiteOverlay18}}
      style={styles.press}>
      <LinearGradient
        colors={PROFILE_GRADIENT}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <View style={styles.iconWrap}>
          <Icon name={icon} size={wp(5)} color={iconColor} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Icon name={arrowIcon} size={wp(5)} color={Colors.whiteMuted85} />
      </LinearGradient>
    </Pressable>
  </AnimatedCard>
);

export default ProfileActionCard;

const styles = StyleSheet.create({
  wrap: {
    marginTop: hp(1.4),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  press: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.7),
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
