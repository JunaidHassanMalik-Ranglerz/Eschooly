import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const StudentChip = ({label, onPress, style}) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.85 : 1}
    disabled={!onPress}
    onPress={onPress}
    style={[styles.chip, style]}>
    <Icon name="school" size={wp(3.8)} color={Colors.white} />
    <Text style={styles.label} numberOfLines={1}>
      {label}
    </Text>
    {onPress ? (
      <Icon name="chevron-down" size={wp(3.6)} color={Colors.white} />
    ) : null}
  </TouchableOpacity>
);

export default StudentChip;

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.chipOnNavy,
    borderRadius: radius.chip,
    paddingHorizontal: spacing.sm,
    paddingVertical: hp(0.55),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    maxWidth: '92%',
  },
  label: {
    ...Typography.chip,
    color: Colors.white,
    marginHorizontal: spacing.xs,
    flexShrink: 1,
  },
});
