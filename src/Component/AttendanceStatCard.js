import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const AttendanceStatCard = props => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, {backgroundColor: props?.iconBg}]}>
        {props?.image ? (
          <Image
            source={props?.image}
            style={styles.iconImage}
            resizeMode="contain"
          />
        ) : (
          <Icon name={props?.icon} size={wp(4.5)} color={props?.iconColor} />
        )}
      </View>
      <Text style={styles.label} numberOfLines={1}>{props?.label}</Text>
      <Text style={styles.count} numberOfLines={1}>{props?.count}</Text>
    </View>
  );
};

export default AttendanceStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(2),
    marginHorizontal: wp(1),
  },
  iconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  iconImage: {
    width: wp(4.5),
    height: wp(4.5),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginBottom: hp(0.5),
    maxWidth:wp(16),
  },
  count: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.mx,
  },
});
