import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from './Profile/PersonAvatar';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';
import {
  formatChildClassRollLine,
  formatChildStatus,
} from '../utils/childIdentity';

const ChildIdentityFace = ({
  student,
  icy = false,
  onNavy = false,
  switchable = false,
  avatarSize,
}) => {
  const classLine = formatChildClassRollLine(student);
  const statusLabel = formatChildStatus(student);
  const size = avatarSize || (icy ? wp(14) : wp(12));

  return (
    <View style={styles.row}>
      <PersonAvatar
        person={student}
        size={size}
        borderWidth={StyleSheet.hairlineWidth * 2}
        borderColor={
          onNavy
            ? Colors.borderGlass
            : icy
              ? Colors.borderSubtle
              : Colors.whiteOverlay22
        }
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            icy && !onNavy && styles.nameIcy,
            onNavy && styles.nameOnNavy,
          ]}
          numberOfLines={2}>
          {student?.label || student?.name}
        </Text>
        <View style={styles.badges}>
          {classLine ? (
            <View
              style={[
                styles.classBadge,
                icy && !onNavy && styles.classBadgeIcy,
                onNavy && styles.classBadgeOnNavy,
              ]}>
              <Text
                style={[
                  styles.classText,
                  icy && !onNavy && styles.classTextIcy,
                  onNavy && styles.classTextOnNavy,
                ]}
                numberOfLines={1}>
                {classLine}
              </Text>
            </View>
          ) : null}
          {statusLabel ? (
            <View
              style={[
                styles.activeBadge,
                icy && !onNavy && styles.activeBadgeIcy,
                onNavy && styles.activeBadgeOnNavy,
              ]}>
              <Text
                style={[
                  styles.activeText,
                  icy && !onNavy && styles.activeTextIcy,
                  onNavy && styles.activeTextOnNavy,
                ]}
                numberOfLines={1}>
                {statusLabel}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      {switchable ? (
        <View style={[styles.switchBtn, icy && !onNavy && styles.switchBtnIcy]}>
          <Icon
            name="chevron-forward"
            size={wp(5.5)}
            color={onNavy ? Colors.white : icy ? Colors.brandRoyal : Colors.white}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ChildIdentityFace;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    marginRight: wp(3),
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.8),
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  classBadge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  classText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  activeBadge: {
    backgroundColor: 'rgba(134, 239, 172, 0.18)',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  activeText: {
    color: '#86EFAC',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  nameIcy: {
    color: Colors.textPrimary,
  },
  classBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  classTextIcy: {
    color: Colors.textSecondary,
  },
  activeBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  activeTextIcy: {
    color: Colors.brandRoyal,
  },
  switchBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay18,
    marginLeft: wp(2),
  },
  switchBtnIcy: {
    backgroundColor: Colors.hubCard,
  },
  nameOnNavy: {
    color: Colors.white,
    fontSize: Fontsize.m,
    marginBottom: hp(0.7),
  },
  classBadgeOnNavy: {
    backgroundColor: Colors.whiteOverlay18,
  },
  classTextOnNavy: {
    color: Colors.whiteMuted85,
  },
  activeBadgeOnNavy: {
    backgroundColor: 'rgba(52, 199, 89, 0.22)',
  },
  activeTextOnNavy: {
    color: '#86EFAC',
  },
});
