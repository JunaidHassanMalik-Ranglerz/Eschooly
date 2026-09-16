import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ClassTabBar = props => {
  return (
    <View style={styles.wrap}>
      {props?.tabs?.map(tab => {
        const active = props?.selected === tab.id;
        const isEndedTab = tab.id === 'ended';

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, active ? styles.tabActive : styles.tabInactive]}
            activeOpacity={0.8}
            onPress={() => props?.onSelect?.(tab.id)}>
            {tab.showDot && active ? <View style={styles.dot} /> : null}
            <Text
              style={[
                styles.tabText,
                active && styles.tabTextActive,
                !active && isEndedTab && styles.endedText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ClassTabBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(2),
  },
  tab: {
    flex: 1,
    minHeight: hp(4.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(5),
    gap: wp(1.5),
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabInactive: {
    backgroundColor: Colors.cardBg,
  },
  dot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(1),
    backgroundColor: Colors.red,
  },
  tabText: {
    color: Colors.grayText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    includeFontPadding: false,
  },
  tabTextActive: {
    color: Colors.white,
  },
  endedText: {
    color: Colors.mutedText,
  },
});
