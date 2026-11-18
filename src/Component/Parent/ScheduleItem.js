import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from '../DepthIcon';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';

const WAVE_COLOR = 'rgba(19, 69, 163, 0.14)';
const ART_SIZE = wp(12);
const CARD_RADIUS = wp(5);

const ScheduleItem = ({
  item,
  onPress,
  art,
  animationIndex = 0,
  entering,
  waveVariant = SCREEN_WAVES.assignmentIce,
}) => {
  const content = (
    <>
      <View style={styles.iconWrap} pointerEvents="none">
        {art ? (
          <FeatureArtImage source={art} width={ART_SIZE} height={ART_SIZE} />
        ) : (
          <DepthIcon
            name={item.icon}
            size={wp(6.5)}
            color={item.iconColor || Colors.brandRoyal}
          />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.subject} numberOfLines={1}>
          {item.subject}
        </Text>
        {item.time ? (
          <Text style={styles.time} numberOfLines={1}>
            {item.time}
          </Text>
        ) : null}
      </View>
      {onPress ? (
        <Icon
          name="chevron-forward"
          size={wp(4.6)}
          color={Colors.brandRoyal}
        />
      ) : null}
    </>
  );

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.88}
        delayPressIn={0}
        onPress={onPress}
        disabled={!onPress}
        style={styles.shell}>
        <View style={styles.clip}>
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={{x: 0, y: 0.05}}
            end={{x: 1, y: 1}}
            style={styles.rowInner}>
            <View pointerEvents="none" style={styles.wave}>
              <CardWave variant={waveVariant} color={WAVE_COLOR} />
            </View>
            {content}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({
  row: {
    borderRadius: CARD_RADIUS,
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  shell: {
    borderRadius: CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.card,
  },
  clip: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.45),
    minHeight: hp(9.2),
    borderRadius: CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
  },
  wave: {
    ...StyleSheet.absoluteFillObject,
  },
  iconWrap: {
    width: ART_SIZE,
    height: ART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    zIndex: 1,
  },
  info: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
    zIndex: 1,
  },
  subject: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.3),
  },
  time: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
