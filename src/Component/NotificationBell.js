import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {wp} from '../Constants/Responsive';
import {useSelector} from 'react-redux';
import {navigateToNotification} from '../Navigations/navigationHelpers';

const NotificationBell = ({
  count,
  onPress,
  style,
  onDark = false,
  numeric = false,
}) => {
  const navigation = useNavigation();
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const badgeCount = count == null ? unreadNotifications : count;

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
        numeric ? (
          <View style={styles.countBadge}>
            <Text style={styles.countText} numberOfLines={1}>
              {badgeCount > 99 ? '99+' : String(badgeCount)}
            </Text>
          </View>
        ) : (
          <View style={[styles.badge, onDark && styles.badgeOnDark]} />
        )
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
  countBadge: {
    position: 'absolute',
    top: wp(0.4),
    right: wp(0.2),
    minWidth: wp(4.2),
    height: wp(4.2),
    paddingHorizontal: wp(0.7),
    borderRadius: wp(2.1),
    backgroundColor: Colors.red,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: wp(2.2),
    includeFontPadding: false,
  },
});
