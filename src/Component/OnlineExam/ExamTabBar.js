import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ExamTabBar = ({tabs, selected, onSelect}) => {
  return (
    <View style={styles.wrap}>
      {tabs.map(tab => {
        const active = selected === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            activeOpacity={0.8}
            onPress={() => onSelect(tab.id)}>
            <Text style={[styles.tabText, active && styles.tabTextActive]}>
              {tab.label}
            </Text>
            {active ? <View style={styles.line} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ExamTabBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: hp(2),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: hp(1.2),
  },
  tabText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
  tabTextActive: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    width: '70%',
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
