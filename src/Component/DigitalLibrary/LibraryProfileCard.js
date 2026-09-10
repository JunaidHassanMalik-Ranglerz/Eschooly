import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const LibraryProfileCard = ({student}) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{student?.initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{student?.label}</Text>
        <View style={styles.badges}>
          <View style={styles.classBadge}>
            <Text style={styles.classText}>{student?.classBadge}</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>{student?.status || 'Active'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LibraryProfileCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  initials: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.8),
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  classBadge: {
    backgroundColor: Colors.badgeBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  classText: {
    color: Colors.badgeText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs2,
  },
  activeBadge: {
    backgroundColor: Colors.successBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  activeText: {
    color: Colors.success,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs2,
  },
});
