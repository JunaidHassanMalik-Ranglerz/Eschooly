import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NotificationBell from './NotificationBell';
import PersonAvatar from './Profile/PersonAvatar';
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
        <PersonAvatar person={profilePerson} size={wp(12)} />
        <View style={styles.nameWrap}>
          <Text style={styles.welcome} numberOfLines={1}>
            {Strings.welcome}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {profilePerson.label}
          </Text>
        </View>
      </View>

      <NotificationBell count={1} />
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
    gap: wp(3),
  },
  nameWrap: {
    flexShrink: 1,
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
});
