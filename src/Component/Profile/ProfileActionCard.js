import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {useStudentTone} from '../Glass/StudentTone';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
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
  loading = false,
}) => {
  const icy = useStudentTone();
  const content = (
    <>
      <View style={[styles.iconWrap, icy && styles.iconWrapIcy]}>
        <Icon
          name={icon}
          size={wp(5)}
          color={icy ? Colors.brandRoyal : iconColor}
        />
      </View>
      <Text style={[styles.title, icy && styles.titleIcy]}>{title}</Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={icy ? Colors.brandRoyal : Colors.white}
        />
      ) : (
        <Icon
          name={arrowIcon}
          size={wp(5)}
          color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
        />
      )}
    </>
  );

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={[styles.wrap, icy ? styles.wrapIcy : IDENTITY_CARD_SHADOW, style]}>
      <Pressable
        onPress={loading ? undefined : onPress}
        disabled={loading}
        android_ripple={{color: icy ? Colors.tabActivePill : Colors.whiteOverlay18}}
        style={[styles.press, icy && styles.pressIcy]}>
        {icy ? (
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
            <View style={styles.cardIcyInner}>{content}</View>
          </View>
        ) : (
          <LinearGradient
            colors={PROFILE_GRADIENT}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.card}>
            {content}
          </LinearGradient>
        )}
      </Pressable>
    </AnimatedCard>
  );
};

export default ProfileActionCard;

const styles = StyleSheet.create({
  wrap: {
    marginTop: hp(1.4),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  wrapIcy: {
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  press: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
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
  iconWrapIcy: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.hubCard,
    marginRight: wp(3.2),
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm1,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  cardIcyInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.35),
    minHeight: hp(6.4),
    zIndex: 1,
  },
});
