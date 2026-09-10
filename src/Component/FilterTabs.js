import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp} from '../Constants/Responsive';

const TabButton = props => (
  <TouchableOpacity
    style={styles.tab}
    activeOpacity={0.8}
    onPress={props?.onPress}>
    <View style={styles.tabBox}>
      {props?.isActive ? <View style={styles.activeBg} /> : null}
      <Text
        numberOfLines={1}
        style={[styles.tabText, props?.isActive && styles.activeTabText]}>
        {props?.label}
      </Text>
    </View>
  </TouchableOpacity>
);

const FilterTabs = props => {
  return (
    <View style={styles.container}>
      <TabButton
        label={Strings.tabAll}
        isActive={props?.activeTab === Strings.tabAll}
        onPress={() => props?.onTabChange(Strings.tabAll)}
      />
      <TabButton
        label={Strings.tabDiary}
        isActive={props?.activeTab === Strings.tabDiary}
        onPress={() => props?.onTabChange(Strings.tabDiary)}
      />
      <TabButton
        label={Strings.tabAnnouncement}
        isActive={props?.activeTab === Strings.tabAnnouncement}
        onPress={() => props?.onTabChange(Strings.tabAnnouncement)}
      />
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: wp(12),
    backgroundColor: Colors.lightGray,
    marginHorizontal: wp(4),
    marginTop: wp(1),
    marginBottom: wp(3),
    padding: wp(1.2),
    borderRadius: wp(10),
  },
  tab: {
    flex: 1,
  },
  tabBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  activeBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    borderRadius: wp(8),
  },
  tabText: {
    zIndex: 1,
    textAlign: 'center',
    includeFontPadding: false,
    color: Colors.tabInactiveText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  activeTabText: {
    color: Colors.white,
  },
});
