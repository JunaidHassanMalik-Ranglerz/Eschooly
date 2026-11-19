import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from '../NotificationBell';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {Fontsize} from '../../Constants/Fontsize';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';
import HeaderSubtitle from '../Student/HeaderSubtitle';

const AttendanceStudentHeader = ({unreadCount, subtitle}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.brandRow}>
        <View style={styles.brandLeft}>
          <Icon name="school" size={wp(5.2)} color={Colors.white} />
          <View style={styles.brandRule} />
          <Text style={styles.wordmark}>{Strings.eschoolyWordmark}</Text>
        </View>
        <NotificationBell count={unreadCount} onDark numeric />
      </View>

      <View style={styles.titleRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          hitSlop={8}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back">
          <Icon name="chevron-back" size={wp(6.6)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {Strings.attendance}
        </Text>
      </View>
      <HeaderSubtitle text={subtitle} />
    </>
  );
};

export default AttendanceStudentHeader;

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  brandRule: {
    width: StyleSheet.hairlineWidth * 2,
    height: hp(2),
    backgroundColor: Colors.borderGlass,
    marginHorizontal: spacing.sm,
  },
  wordmark: {
    ...Typography.brand,
    color: Colors.white,
    letterSpacing: 0.8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  backBtn: {
    width: wp(8.5),
    height: wp(8.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  title: {
    ...Typography.displayName,
    fontSize: Fontsize.md,
    color: Colors.white,
    flex: 1,
  },
});
