import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const HomeSearchField = ({
  placeholder = Strings.searchClassesPlaceholder,
  onPress,
  style,
}) => (
  <TouchableOpacity
    activeOpacity={0.88}
    delayPressIn={0}
    onPress={onPress}
    style={[styles.field, style]}>
    <Icon name="search" size={wp(4.5)} color={Colors.textOnNavyMuted} />
    <Text style={styles.placeholder} numberOfLines={1}>
      {placeholder}
    </Text>
    <View style={styles.sliders}>
      <Icon name="options-outline" size={wp(4.8)} color={Colors.textOnNavyMuted} />
    </View>
  </TouchableOpacity>
);

export default HomeSearchField;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchOnNavy,
    borderRadius: radius.search,
    paddingHorizontal: spacing.md,
    paddingVertical: hp(1.05),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
  },
  placeholder: {
    ...Typography.body,
    color: Colors.textOnNavyMuted,
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  sliders: {
    marginLeft: spacing.xs,
  },
});
