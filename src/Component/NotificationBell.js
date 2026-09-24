import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {wp} from '../Constants/Responsive';
import {navigateToNotification} from '../Navigations/navigationHelpers';
import {useRoleData} from '../hooks/useRoleData';

const NotificationBell = ({count, onPress, style, onDark = false}) => {
  const navigation = useNavigation();
  const {unreadNotificationCount} = useRoleData();
  const badgeCount = count == null ? unreadNotificationCount : count;

  return (
    <TouchableOpacity
      style={[styles.bellWrap, style]}
      activeOpacity={0.8}
      onPress={onPress || (() => navigateToNotification(navigation))}>
      <Image
        source={Images.notification}
        style={[
          styles.notificationIcon,
          {tintColor: onDark ? Colors.white : Colors.primary},
        ]}
        resizeMode="contain"
      />
      {badgeCount > 0 ? (
        <View style={[styles.badge, onDark && styles.badgeOnDark]} />
      ) : null}
    </TouchableOpacity>
  );
};

export default NotificationBell;

const styles = StyleSheet.create({
  bellWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  badge: {
    position: 'absolute',
    top: wp(1.4),
    right: wp(1.6),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.red,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  badgeOnDark: {
    borderColor: Colors.parentHeader,
  },
});
