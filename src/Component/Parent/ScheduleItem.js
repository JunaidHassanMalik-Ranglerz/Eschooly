import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ScheduleItem = ({item, onPress}) => (
    <Pressable
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      android_ripple={
        onPress ? {color: 'transparent', foreground: false} : undefined
      }>
    <View style={[styles.iconWrap, {backgroundColor: item.iconBg}]}>
      <Icon name={item.icon} size={wp(5)} color={item.iconColor} />
    </View>
    <View style={styles.info}>
      <Text style={styles.subject} numberOfLines={1}>
        {item.subject}
      </Text>
      <Text style={styles.time} numberOfLines={1}>
        {item.time}
      </Text>
    </View>
  </Pressable>
);

export default ScheduleItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5),
    marginBottom: hp(1.2),
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  info: {
    flex: 1,
  },
  subject: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.3),
  },
  time: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
