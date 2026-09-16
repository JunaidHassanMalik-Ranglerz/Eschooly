import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ZoomInfoBanner = () => {
  return (
    <View style={styles.banner}>
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
    </View>
  );
};

export default ZoomInfoBanner;

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.duesCardBg,
    borderRadius: wp(5),
    padding: wp(4),
    marginTop: hp(1),
  },
  disclaimerIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(3),
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.35),
  },
  desc: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
});
