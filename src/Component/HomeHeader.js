import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import {useRoleData} from '../hooks/useRoleData';

const HomeHeader = () => {
  const {profilePerson} = useRoleData();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profilePerson.initials}</Text>
        </View>
        <View>
          <Text style={styles.welcome} numberOfLines={1}>
            {Strings.welcome}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {profilePerson.label}
          </Text>
        </View>
      </View>

      <View style={styles.bellWrap}>
        <Image
          source={Images.notification}
          style={styles.notificationIcon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xx1,
  },
  welcome: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    letterSpacing: 0.5,
    width: wp(40),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(4.3),
    width: wp(40),
  },
  bellWrap: {
    position: 'relative',
    padding: wp(1),
  },
  notificationIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: Colors.primary,
  },
});
