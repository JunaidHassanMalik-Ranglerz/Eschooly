import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PersonAvatar from './Profile/PersonAvatar';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const ChatListItem = props => {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8}>
      <PersonAvatar
        person={{label: props?.item?.name, name: props?.item?.name, gender: props?.item?.gender}}
        size={wp(12)}
      />

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {props?.item?.name}
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            {props?.item?.time}
          </Text>
        </View>

        <Text style={styles.role} numberOfLines={1}>
          {props?.item?.role}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.message} numberOfLines={1}>
            {props?.item?.lastMessage}
          </Text>
          {props?.item?.unread > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText} numberOfLines={1}>
                {props?.item?.unread}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: wp(3),
  },
  info: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
  },
  name: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    paddingRight: wp(2),
  },
  time: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  role: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    paddingRight: wp(2),
  },
  unreadBadge: {
    minWidth: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1.5),
  },
  unreadText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xxs0,
  },
});
