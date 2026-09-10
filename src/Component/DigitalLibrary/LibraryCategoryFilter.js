import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const LibraryCategoryFilter = ({categories, selected, onSelect}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      style={styles.scroll}>
      {categories.map(item => {
        const active = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(item.id)}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default LibraryCategoryFilter;

const styles = StyleSheet.create({
  scroll: {
    marginBottom: hp(2),
  },
  list: {
    paddingRight: wp(2),
    gap: wp(2),
  },
  chip: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
  chipTextActive: {
    color: Colors.white,
  },
});
