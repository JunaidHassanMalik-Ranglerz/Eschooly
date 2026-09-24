import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const SegmentTabs = ({
  tabs,
  activeTab,
  onChange,
  outlined = false,
  dark = false,
  navy = false,
  style,
  variant = 'default',
}) => {
  if (variant === 'fee') {
    return (
      <View style={[styles.feeWrap, style]}>
        {tabs.map(tab => {
          const active = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.85}
              onPress={() => onChange(tab)}
              style={[styles.feeTabBtn, active && styles.feeTabBtnActive]}>
              <Text
                style={[styles.feeTabText, active && styles.feeTabTextActive]}
                numberOfLines={1}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.row, style]}>
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
              outlined && dark && styles.tabOutlinedDark,
              outlined && navy && styles.tabOutlinedNavy,
              active && styles.tabActive,
              active && dark && styles.tabActiveDark,
            ]}>
            <Text
              style={[
                styles.label,
                dark && styles.labelDark,
                navy && styles.labelNavy,
                active && styles.labelActive,
                active && dark && styles.labelActiveDark,
              ]}
              numberOfLines={1}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
  tabOutlinedDark: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.whiteOverlay22,
  },
  tabOutlinedNavy: {
    borderColor: Colors.parentHeader,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabActiveDark: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  labelDark: {
    color: Colors.whiteMuted85,
  },
  labelNavy: {
    color: Colors.parentHeader,
  },
  labelActive: {
    color: Colors.white,
  },
  labelActiveDark: {
    color: Colors.parentHeader,
  },
  feeWrap: {
    flexDirection: 'row',
    backgroundColor: '#DCEBFD',
    borderRadius: wp(8),
    padding: wp(1.2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },
  feeTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(7),
  },
  feeTabBtnActive: {
    backgroundColor: '#071A3D',
  },
  feeTabText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  feeTabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
});
