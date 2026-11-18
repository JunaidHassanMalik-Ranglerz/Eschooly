import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';
import {useStudentTone} from '../Glass/StudentTone';
import CardWave, {SCREEN_WAVES} from '../CardWave';

const ZoomInfoBanner = () => {
  const icy = useStudentTone();

  if (icy) {
    return (
      <View style={styles.shellIcy}>
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
              color="rgba(91, 156, 255, 0.14)"
            />
          </View>
          <View style={styles.rowIcy}>
            <View style={styles.iconWell}>
              <Image
                source={Images.disclaimer}
                style={styles.disclaimerIcy}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textWrapIcy}>
              <Text style={styles.titleIcy}>{Strings.zoomAppRequired}</Text>
              <Text style={styles.descIcy}>{Strings.zoomAppDesc}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={CARD_GRADIENTS.deep}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.banner}>
      <Image
        source={Images.disclaimer}
        style={styles.disclaimerIcon}
        resizeMode="contain"
      />
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {Strings.zoomAppRequired}
        </Text>
        <Text style={styles.desc} numberOfLines={3}>
          {Strings.zoomAppDesc}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default ZoomInfoBanner;

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5),
    padding: wp(4),
    marginTop: hp(1),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  shellIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.banner,
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
  rowIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.45),
    zIndex: 1,
  },
  iconWell: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    flexShrink: 0,
  },
  disclaimerIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(3),
    tintColor: Colors.white,
  },
  disclaimerIcy: {
    width: wp(5.8),
    height: wp(5.8),
    tintColor: Colors.brandRoyal,
  },
  textWrap: {
    flex: 1,
  },
  textWrapIcy: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.transparent,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.35),
  },
  desc: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.45),
    backgroundColor: Colors.transparent,
  },
  descIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    backgroundColor: Colors.transparent,
  },
});
