import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';

const ZoomInfoBanner = () => {
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
  disclaimerIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(3),
    tintColor: Colors.white,
  },
  textWrap: {
    flex: 1,
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
});
