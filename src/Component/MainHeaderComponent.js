import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../Assets';
import {hp, wp} from '../Constants/Responsive';
import {Colors} from '../Constants/Colors';
import {Fontsize} from '../Constants/Fontsize';
import {Fonts} from '../Constants/Fonts';
import {navigateToNotification} from '../Navigations/navigationHelpers';

const MainHeaderComponent = props => {
  const navigation = useNavigation();
  const hasNotification = (props.notificationCount || 0) > 0;
  const showNotification = props.notificationCount != null;

  return (
    <View style={[styles.header, props.style]}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={wp(5.5)} color={Colors.black} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {props?.title}
      </Text>

      {showNotification ? (
        <TouchableOpacity
          style={styles.bellWrap}
          activeOpacity={0.8}
          onPress={() => navigateToNotification(navigation)}>
          <Image
            source={Images.notification}
            style={styles.notificationIcon}
            resizeMode="contain"
          />
          {hasNotification && <View style={styles.badge} />}
        </TouchableOpacity>
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
    fontFamily: Fonts.regular,
    fontSize: Fontsize.mm,
    maxWidth: wp(35),
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
  badge: {
    position: 'absolute',
    top: wp(1.2),
    right: wp(1.2),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.red,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  placeholder: {
    width: wp(9),
  },
});

export default MainHeaderComponent;
