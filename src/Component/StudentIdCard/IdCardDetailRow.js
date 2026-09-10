import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const IdCardDetailRow = ({label, value, isLast}) => {
  return (
    <View style={[styles.row, !isLast && styles.border]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default IdCardDetailRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.4),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    flex: 1,
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
    textAlign: 'right',
    flex: 1,
  },
});
