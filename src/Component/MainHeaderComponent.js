import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from './NotificationBell';
import {hp, wp} from '../Constants/Responsive';
import {Colors} from '../Constants/Colors';
import {Fontsize} from '../Constants/Fontsize';
import {Fonts} from '../Constants/Fonts';

const MainHeaderComponent = props => {
  const navigation = useNavigation();
  const showRightImage = !!props?.rightImage;
  const showRightIcon = !showRightImage && !!props?.rightIcon;
  const showNotification = !showRightImage && !showRightIcon && !props?.hideNotification;
  const showBack = !props?.hideBack;

  return (
    <View style={[styles.header, props.style]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={props?.onBackPress || (() => navigation.goBack())}>
          <Icon name="chevron-back" size={wp(5.5)} color={Colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={2}>
        {props?.title}
      </Text>

      {showRightImage ? (
        <TouchableOpacity
          style={styles.menuBtn}
          activeOpacity={0.8}
          onPress={props?.onRightPress}>
          <Image
            source={props.rightImage}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : showRightIcon ? (
        <TouchableOpacity
          style={styles.bellWrap}
          activeOpacity={0.8}
          onPress={props?.onRightPress}>
          <Icon name={props.rightIcon} size={wp(5.5)} color={Colors.black} />
        </TouchableOpacity>
      ) : showNotification ? (
        <NotificationBell count={props.notificationCount} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingHorizontal: wp(2),
  },
  bellWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: wp(9),
  },
  menuBtn: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.black,
  },
});

export default MainHeaderComponent;
