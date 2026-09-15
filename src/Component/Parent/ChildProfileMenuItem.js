import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ChildProfileMenuItem = ({item, onPress}) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={onPress}>
    <View style={[styles.iconWrap, {backgroundColor: item.iconBg}]}>
      <Icon name={item.icon} size={wp(5)} color={item.iconColor} />
    </View>
    <Text style={styles.title} numberOfLines={1}>
      {item.title}
    </Text>
    <Icon name="chevron-forward" size={wp(4.5)} color={Colors.grayText} />
  </TouchableOpacity>
);

export default ChildProfileMenuItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
    marginBottom: hp(1.1),
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs5,
  },
});
