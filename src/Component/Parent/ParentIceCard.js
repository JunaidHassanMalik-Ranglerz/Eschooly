import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {elevation} from '../../Constants/Theme';
import {FLOAT_CARD_RADIUS} from '../Glass/EschoolyScreenShell';
import {hp, wp} from '../../Constants/Responsive';

const ICE_WAVE = 'rgba(37, 99, 235, 0.12)';

const ParentIceCard = ({
  children,
  style,
  contentStyle,
  onPress,
  waveVariant = SCREEN_WAVES.assignmentIce,
  padded = true,
}) => {
  const card = (
    <View style={[styles.shell, style]}>
      <View style={styles.clip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
          start={{x: 0, y: 0.08}}
          end={{x: 1, y: 1}}
          style={[styles.fill, padded && styles.padded, contentStyle]}>
          <CardWave variant={waveVariant} color={ICE_WAVE} />
          <View style={styles.foreground}>{children}</View>
        </LinearGradient>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        {card}
      </TouchableOpacity>
    );
  }

  return card;
};

export default ParentIceCard;

const styles = StyleSheet.create({
  shell: {
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    marginBottom: hp(1.35),
    ...elevation.banner,
  },
  clip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
  },
  fill: {
    overflow: 'hidden',
  },
  padded: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  foreground: {
    zIndex: 1,
  },
});
