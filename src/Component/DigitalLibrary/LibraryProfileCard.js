import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import ChildIdentityFace from '../ChildIdentityFace';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {FLOAT_CARD_RADIUS} from '../Glass/EschoolyScreenShell';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const LibraryProfileCard = ({
  student,
  animationIndex = 0,
  look,
  canSwitch = false,
  onSwitchPress,
}) => {
  const icy = useStudentTone();
  const onNavy = icy && look === 'onNavy';
  const floating = icy && look === 'float';
  const switchable = Boolean(onSwitchPress && canSwitch);
  const face = (
    <ChildIdentityFace
      student={student}
      icy={icy}
      onNavy={onNavy}
      switchable={switchable}
      avatarSize={onNavy || floating ? wp(14) : wp(12)}
    />
  );

  if (floating) {
    const card = (
      <View style={styles.floatShell}>
        <View style={styles.floatClip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={{x: 0, y: 0.08}}
            end={{x: 1, y: 1}}
            style={styles.floatGradient}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.18)"
            />
            {face}
          </LinearGradient>
        </View>
      </View>
    );
    if (switchable) {
      return (
        <TouchableOpacity activeOpacity={0.92} onPress={onSwitchPress}>
          {card}
        </TouchableOpacity>
      );
    }
    return card;
  }

  if (onNavy) {
    const card = (
      <View style={styles.onNavyShell}>
        <View style={styles.onNavyClip}>
          <LinearGradient
            colors={CARD_GRADIENTS.notification}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.onNavyGradient}>
            <CardWave variant={SCREEN_WAVES.library} color="rgba(255,255,255,0.12)" />
            {face}
          </LinearGradient>
        </View>
      </View>
    );
    if (switchable) {
      return (
        <TouchableOpacity activeOpacity={0.92} onPress={onSwitchPress}>
          {card}
        </TouchableOpacity>
      );
    }
    return card;
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      disableAnimation={false}
      variant={icy ? 'light' : 'navy'}
      colors={icy ? undefined : CARD_GRADIENTS.notification}
      waveVariant={icy ? undefined : SCREEN_WAVES.library}
      onPress={switchable ? onSwitchPress : undefined}>
      {face}
    </ProfileGradientCard>
  );
};

export default LibraryProfileCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.4),
  },
  floatShell: {
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    marginBottom: hp(1.5),
    zIndex: 2,
    overflow: 'visible',
    ...elevation.banner,
  },
  floatClip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
  },
  floatGradient: {
    borderRadius: FLOAT_CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.4),
    minHeight: hp(11.2),
    justifyContent: 'center',
  },
  onNavyShell: {
    borderRadius: radius.pill,
    marginBottom: hp(1.2),
    ...elevation.banner,
  },
  onNavyClip: {
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  onNavyGradient: {
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(101, 196, 255, 0.42)',
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.35),
    minHeight: hp(8.6),
    justifyContent: 'center',
  },
});
