import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ParentStatCard = ({icon, iconBg, iconColor, value, label, hint, onPress}) => (
  <TouchableOpacity style={styles.card} activeOpacity={1} onPress={onPress}>
    <View style={[styles.iconWrap, {backgroundColor: iconBg}]}>
      <Icon name={icon} size={wp(5)} color={iconColor} />
    </View>
    <View style={styles.textWrap}>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {hint ? (
        <Text style={styles.hint} numberOfLines={1}>
          {hint}
        </Text>
      ) : null}
    </View>
  </TouchableOpacity>
);

export default ParentStatCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    padding: wp(3.5),
    marginBottom: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  textWrap: {
    flex: 1,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    marginTop: hp(0.1),
  },
  hint: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.1),
  },
});
