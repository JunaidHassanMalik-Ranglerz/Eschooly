import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ChatHeader = props => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.8}
        onPress={props?.onBack}>
        <Icon name="chevron-back" size={wp(5.5)} color={Colors.black} />
      </TouchableOpacity>

      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText} numberOfLines={1}>
            {props?.user?.initials}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {props?.user?.name}
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText} numberOfLines={1}>
              {props?.user?.role || Strings.schoolAdminOnline}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8}>
        <Image
          source={Images.threeDots}
          style={styles.menuIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    marginRight: wp(2),
  },
  userRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.2),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.success,
    marginRight: wp(1.5),
  },
  statusText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  menuBtn: {
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.black,
  },
});
