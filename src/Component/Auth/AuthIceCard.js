import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {elevation} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const WAVE_COLOR = 'rgba(19, 69, 163, 0.14)';
const CARD_RADIUS = wp(8);

const AuthIceCard = ({children, style, contentStyle}) => (
  <View style={[styles.cardShell, style]}>
    <View style={styles.cardClip}>
      <LinearGradient
        colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
        start={{x: 0, y: 0.05}}
        end={{x: 1, y: 1}}
        style={[styles.cardFill, contentStyle]}>
        <View pointerEvents="none" style={styles.cardWave}>
          <CardWave variant={SCREEN_WAVES.assignmentIce} color={WAVE_COLOR} />
        </View>
        {children}
      </LinearGradient>
    </View>
  </View>
);

export default AuthIceCard;

const styles = StyleSheet.create({
  cardShell: {
    borderRadius: CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.banner,
  },
  cardClip: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  cardFill: {
    borderRadius: CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: wp(4),
    paddingTop: hp(2.2),
    paddingBottom: hp(2.4),
  },
  cardWave: {
    ...StyleSheet.absoluteFillObject,
  },
});
