import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const ProfileDetailItem = props => {
  return (
    <View style={[styles.container, props?.isLast && styles.lastItem]}>
      <View style={styles.iconWrap}>
        <Image source={props?.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label} numberOfLines={1}>{props?.label}</Text>
        <Text style={styles.value} numberOfLines={1}>{props?.value}</Text>
      </View>
    </View>
  );
};

export default ProfileDetailItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs5,
  },
});
