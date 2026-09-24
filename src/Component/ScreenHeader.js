import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from './NotificationBell';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';
import {EnterView} from './AnimatedCard';
import {enterFromTop} from '../utils/cardAnimation';

const ScreenHeader = props => {
  return (
    <EnterView motion={enterFromTop(0)} style={styles.container}>
      {props?.showBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={props?.onBackPress}>
          <Icon name="chevron-back" size={wp(5.5)} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text style={styles.title}>{props?.title}</Text>

      <NotificationBell count={props?.notificationCount ?? 1} />
    </EnterView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.parentHeader,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: wp(9),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
});
