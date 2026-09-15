import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const StudentHubCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  iconText,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.88} onPress={onPress}>
    <View style={[styles.iconWrap, {backgroundColor: iconBg}]}>
      {iconText ? (
        <Text style={[styles.iconText, {color: iconColor}]}>{iconText}</Text>
      ) : (
        <Icon name={icon} size={wp(7)} color={iconColor} />
      )}
    </View>
    <Text style={styles.label} numberOfLines={2}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default StudentHubCard;

const styles = StyleSheet.create({
  card: {
    width: '47.5%',
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingTop: hp(2.2),
    paddingBottom: hp(1.8),
    paddingHorizontal: wp(2),
    marginBottom: hp(1.6),
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  iconWrap: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.1),
  },
  iconText: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
  },
  label: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
  },
});
