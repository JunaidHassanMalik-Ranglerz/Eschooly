import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const ProfileMenuItem = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={props?.onPress}>
      <View style={styles.iconWrap}>
        <Image source={props?.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs5,
    textDecorationLine: 'none',
  },
});
