import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {wp, hp} from '../Constants/Responsive';

const ExamOverviewCard = props => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, {backgroundColor: props?.iconBg}]}>
          <Icon name={props?.icon} size={wp(4)} color={props?.iconColor} />
        </View>
        <Icon name={props?.trendIcon} size={wp(3.5)} color={Colors.grayText} />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {props?.label}
      </Text>
      {props?.percent ? (
        <Text numberOfLines={1}>
          <Text style={styles.value}>{props?.value}</Text>
          <Text style={styles.percentSign}>%</Text>
        </Text>
      ) : (
        <Text style={styles.value} numberOfLines={1}>
          {props?.value}
        </Text>
      )}
    </View>
  );
};

export default ExamOverviewCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(3.5),
    marginBottom: hp(1.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  iconCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginBottom: hp(0.4),
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(6.4),
  },
  percentSign: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
});
