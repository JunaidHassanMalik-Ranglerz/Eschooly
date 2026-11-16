import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const LibraryCategoryFilter = ({categories, selected, onSelect}) => {
  const icy = useStudentTone();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      nestedScrollEnabled
      contentContainerStyle={[styles.list, icy && styles.listStudent]}
      style={[styles.scroll, icy && styles.scrollStudent]}>
      {(categories || []).map(item => {
        const active = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={[
              styles.chip,
              icy && styles.chipStudent,
              active && (icy ? styles.chipActiveStudent : styles.chipActive),
            ]}
            onPress={() => onSelect(item.id)}>
            <Text
              style={[
                styles.chipText,
                icy && styles.chipTextStudent,
                active && styles.chipTextActive,
              ]}
              allowFontScaling={false}
              numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      {icy ? <View style={styles.tail} /> : null}
    </ScrollView>
  );
};

export default LibraryCategoryFilter;

const styles = StyleSheet.create({
  scroll: {
    marginBottom: hp(2),
  },
  scrollStudent: {
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(0.2),
    gap: wp(2),
  },
  listStudent: {
    justifyContent: 'flex-start',
    paddingVertical: hp(0.35),
    paddingRight: wp(10),
    gap: wp(1.8),
  },
  tail: {
    width: wp(8),
  },
  chip: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(5),
    minHeight: hp(4.6),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: Fontsize.sm,
  },
  chipTextActive: {
    color: Colors.white,
  },
  chipStudent: {
    backgroundColor: Colors.surface,
    borderColor: Colors.borderSubtle,
    borderRadius: radius.pill,
    minHeight: hp(4.05),
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(0.85),
    ...elevation.card,
  },
  chipActiveStudent: {
    backgroundColor: Colors.brandNavy,
    borderColor: Colors.brandNavy,
  },
  chipTextStudent: {
    color: Colors.textPrimary,
    fontSize: Fontsize.xs0,
  },
});
