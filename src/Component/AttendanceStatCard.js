import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const ICON_COLORS = {
  present: '#38BDF8',
  absent: '#6366F1',
  late: '#0EA5E9',
  leave: '#60A5FA',
};

const AttendanceStatCard = props => {
  const premium = props?.premium;
  const labelKey = String(props?.label || '').toLowerCase();
  const iconColor =
    props?.iconColor ||
    ICON_COLORS[labelKey] ||
    (props?.image ? ICON_COLORS.present : Colors.iconSky);

  return (
    <View style={[styles.card, premium && styles.cardPremium]}>
      <View style={styles.iconSlot}>
        {props?.image ? (
          <Image
            source={props?.image}
            style={[styles.iconImage, {tintColor: iconColor}]}
            resizeMode="contain"
          />
        ) : (
          <Icon name={props?.icon} size={wp(5.2)} color={iconColor} />
        )}
      </View>
      <Text
        style={[styles.label, premium && styles.labelPremium]}
        numberOfLines={1}>
        {props?.label}
      </Text>
      <Text
        style={[styles.count, premium && styles.countPremium]}
        numberOfLines={1}>
        {props?.count}
      </Text>
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
  cardPremium: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
  },
  iconSlot: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.8),
  },
  iconImage: {
    width: wp(5),
    height: wp(5),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginBottom: hp(0.5),
    maxWidth: wp(16),
  },
  labelPremium: {
    color: Colors.whiteMuted75,
  },
  count: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.mx,
  },
  countPremium: {
    color: Colors.white,
  },
});
