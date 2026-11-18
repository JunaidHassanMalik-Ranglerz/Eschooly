import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const ClassTabBar = props => {
  const icy = useStudentTone();
  return (
    <View style={[styles.wrap, icy && styles.wrapIcy]}>
      {props?.tabs?.map(tab => {
        const active = props?.selected === tab.id;
        const isEndedTab = tab.id === 'ended';

        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              icy && styles.tabIcy,
              active
                ? styles.tabActive
                : icy
                  ? styles.tabInactiveStudent
                  : styles.tabInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => props?.onSelect?.(tab.id)}>
            {tab.showDot && active ? (
              <View style={[styles.dot, icy && styles.dotIcy]} />
            ) : null}
            <Text
              style={[
                styles.tabText,
                icy && styles.tabTextIcy,
                icy && !active && styles.tabTextStudent,
                active && styles.tabTextActive,
                !active &&
                  isEndedTab &&
                  (icy ? styles.endedTextStudent : styles.endedText),
              ]}
              numberOfLines={1}>
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
  wrapIcy: {
    marginBottom: 0,
    gap: wp(1.2),
    alignItems: 'stretch',
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
  tabIcy: {
    borderRadius: radius.pill,
    minHeight: hp(4.4),
    paddingHorizontal: wp(1.2),
    paddingVertical: hp(0.95),
    alignSelf: 'stretch',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabInactive: {
    backgroundColor: '#DCEBFD',
  },
  tabInactiveStudent: {
    backgroundColor: Colors.hubCard,
  },
  dot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(1),
    backgroundColor: Colors.red,
  },
  dotIcy: {
    backgroundColor: '#FCA5A5',
  },
  tabText: {
    color: Colors.grayText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    includeFontPadding: false,
  },
  tabTextIcy: {
    flexShrink: 1,
  },
  tabTextActive: {
    color: Colors.white,
  },
  endedText: {
    color: Colors.mutedText,
  },
  tabTextStudent: {
    color: Colors.textSecondary,
  },
  endedTextStudent: {
    color: Colors.textSecondary,
  },
});
