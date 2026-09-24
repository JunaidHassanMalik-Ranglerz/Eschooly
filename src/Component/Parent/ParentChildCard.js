import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from '../Profile/PersonAvatar';
import AnimatedCard from '../AnimatedCard';
import CardWave from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const HOME_GRADIENT = [Colors.parentHeader, Colors.parentHeaderEnd];

const ParentChildCard = ({
  child,
  onPress,
  showRoll = false,
  chevron = 'chevron-forward',
  accented = false,
  prominent = false,
  solid = false,
  roomy = false,
  animationIndex,
  waveVariant,
  showWave = false,
}) => {
  if (!child) {
    return null;
  }

  const classText =
    child.classLabel ||
    (child.className && child.section
      ? `${child.className} ${child.section}`
      : child.classBadge);

  const padded = prominent || roomy;
  const useGradient = accented && !solid;

  const content = (
    <View
      style={[
        styles.inner,
        roomy && styles.innerRoamy,
        prominent && styles.innerProminent,
      ]}
      pointerEvents="none">
      <View style={styles.iconWrap}>
        <PersonAvatar person={child} size={wp(11)} />
      </View>
      <View style={styles.info}>
        <Text
          style={[styles.name, accented && styles.nameAccented]}
          numberOfLines={1}>
          {child.label}
        </Text>
        <Text
          style={[styles.meta, accented && styles.metaAccented]}
          numberOfLines={1}>
          {classText}
        </Text>
        {showRoll ? (
          <Text
            style={[styles.roll, accented && styles.metaAccented]}
            numberOfLines={1}>
            {Strings.rollNo} {child.rollNo}
          </Text>
        ) : null}
      </View>
      {chevron && onPress ? (
        <Icon
          name={chevron}
          size={wp(5)}
          color={accented ? Colors.whiteMuted85 : Colors.grayText}
        />
      ) : null}
    </View>
  );

  const wrapStyle = [
    styles.wrap,
    accented && styles.wrapAccented,
    padded && styles.wrapPadded,
  ];

  const cardBody = (
    <Pressable
      style={[styles.press, padded && styles.pressPadded]}
      onPress={onPress}
      disabled={!onPress}
      android_ripple={{color: 'transparent', foreground: false}}>
        {useGradient ? (
          <LinearGradient
            colors={HOME_GRADIENT}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.card}>
            {showWave && waveVariant ? (
              <CardWave variant={waveVariant} />
            ) : null}
            {content}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.card,
              accented ? styles.cardSolid : styles.cardPlain,
            ]}>
            {showWave && waveVariant && accented ? (
              <CardWave variant={waveVariant} />
            ) : null}
            {content}
          </View>
        )}
    </Pressable>
  );

  if (typeof animationIndex === 'number') {
    return (
      <AnimatedCard index={animationIndex} style={wrapStyle}>
        {cardBody}
      </AnimatedCard>
    );
  }

  return <View style={wrapStyle}>{cardBody}</View>;
};

export default ParentChildCard;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: wp(4),
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  wrapAccented: {
    backgroundColor: Colors.parentHeader,
  },
  wrapPadded: {
    borderRadius: wp(4),
    elevation: 7,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  press: {
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  pressPadded: {
    borderRadius: wp(4),
  },
  card: {
    width: '100%',
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  cardPlain: {
    backgroundColor: Colors.white,
  },
  cardSolid: {
    backgroundColor: Colors.parentHeader,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.7),
    minHeight: hp(9.4),
  },
  innerRoamy: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.6),
    minHeight: hp(11.4),
  },
  innerProminent: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(3.5),
    minHeight: hp(13.6),
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    backgroundColor: Colors.transparent,
    zIndex: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginRight: wp(2),
    zIndex: 1,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.2),
  },
  nameAccented: {
    color: Colors.white,
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs5,
  },
  metaAccented: {
    color: Colors.whiteMuted75,
  },
  roll: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
});
