import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {spacing} from '../../Constants/Theme';

const SectionHeader = ({title, onViewAll, viewAllLabel, style}) => (
  <View style={[styles.row, style]}>
    <Text style={styles.title}>{title}</Text>
    {onViewAll ? (
      <TouchableOpacity activeOpacity={0.8} onPress={onViewAll}>
        <Text style={styles.link}>{viewAllLabel || Strings.sectionViewAll}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  link: {
    ...Typography.link,
    color: Colors.brandAccent,
  },
});
