import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const SegmentTabs = ({tabs, activeTab, onChange, outlined = false}) => (
  <View style={styles.row}>
    {tabs.map(tab => {
      const active = tab === activeTab;
      return (
        <TouchableOpacity
          key={tab}
          activeOpacity={0.85}
          onPress={() => onChange(tab)}
          style={[
            styles.tab,
            outlined && styles.tabOutlined,
            active && styles.tabActive,
          ]}>
          <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
            {tab}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default SegmentTabs;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  tab: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(0.8),
    borderRadius: wp(6),
    marginRight: wp(2),
  },
  tabOutlined: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  labelActive: {
    color: Colors.white,
  },
});
