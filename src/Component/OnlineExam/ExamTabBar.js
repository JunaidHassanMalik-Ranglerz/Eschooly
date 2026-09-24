import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AnimatedCard from '../AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {NAVY} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ExamTabBar = ({tabs, selected, onSelect, animationIndex = 0}) => {
  return (
    <AnimatedCard index={animationIndex} style={styles.wrap}>
      {tabs.map(tab => {
        const active = selected === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, active && styles.tabActive]}
            activeOpacity={0.85}
            onPress={() => onSelect(tab.id)}>
            <Text style={[styles.tabText, active && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </AnimatedCard>
  );
};

export default ExamTabBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCEBFD',
    borderRadius: wp(8),
    padding: wp(1.2),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(6.5),
  },
  tabActive: {
    backgroundColor: NAVY,
  },
  tabText: {
    color: '#5A6B82',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
  },
  tabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
});
