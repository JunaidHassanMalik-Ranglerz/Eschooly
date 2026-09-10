import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const StudentIdSummary = ({data}) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{data.initials}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>{data.status}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{data.summaryLine}</Text>
      </View>
    </View>
  );
};

export default StudentIdSummary;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.8),
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  initials: {
    color: Colors.mutedText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.35),
    gap: wp(2),
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm2,
  },
  activeBadge: {
    backgroundColor: Colors.successBg,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  activeText: {
    color: Colors.success,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
});
