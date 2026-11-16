import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from '../NotificationBell';
import HomeSearchField from '../Glass/HomeSearchField';
import StudentChip from '../Student/StudentChip';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';
import {useGreeting} from '../../utils/getGreeting';

const escapeRegExp = value =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const classIncludesSection = (className, section) => {
  const cls = String(className || '').trim();
  const sec = String(section || '').trim();
  if (!cls || !sec) {
    return false;
  }
  const trailingToken = new RegExp(`(?:^|[\\s\\-_./])${escapeRegExp(sec)}$`, 'i');
  if (trailingToken.test(cls)) {
    return true;
  }
  const compact = cls.replace(/\s+/g, '').toLowerCase();
  const compactSec = sec.replace(/\s+/g, '').toLowerCase();
  return compact.endsWith(compactSec) && compact.length > compactSec.length;
};

const chipLabelFor = student => {
  const className = String(
    student?.className || student?.classLabel || student?.classInfo || '',
  ).trim();
  const section = String(student?.sectionName || '').trim();
  if (!className && !section) {
    return Strings.student;
  }
  if (!section) {
    return `${Strings.student} · ${className}`;
  }
  if (!className || classIncludesSection(className, section)) {
    return `${Strings.student} · ${className || section}`;
  }
  return `${Strings.student} · ${className} ${section}`;
};

const AssignmentStudentHeader = ({student, unreadCount}) => {
  const navigation = useNavigation();
  const greeting = useGreeting();

  return (
    <>
      <View style={styles.brandRow}>
        <View style={styles.brandLeft}>
          <Icon name="school" size={wp(4.8)} color={Colors.white} />
          <View style={styles.brandRule} />
          <Text style={styles.wordmark}>{Strings.eschoolyWordmark}</Text>
        </View>
        <NotificationBell count={unreadCount} onDark numeric />
      </View>

      <View style={styles.greetRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          hitSlop={8}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back">
          <Icon name="chevron-back" size={wp(6.4)} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.greetCopy}>
          <Text style={styles.greeting} numberOfLines={1}>
            {greeting},
          </Text>
          <Text style={styles.studentName} numberOfLines={1}>
            {student?.label || ' '}
          </Text>
        </View>
      </View>

      {student ? (
        <StudentChip label={chipLabelFor(student)} style={styles.chip} />
      ) : null}
    </>
  );
};

export default AssignmentStudentHeader;

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
  greetRow: {
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
  greetCopy: {
    flex: 1,
  },
  greeting: {
    ...Typography.greeting,
    color: Colors.textOnNavyMuted,
  },
  studentName: {
    ...Typography.displayName,
    color: Colors.white,
    marginTop: hp(0.02),
  },
  chip: {
    marginTop: hp(0.55),
  },
  search: {
    marginTop: hp(0.8),
  },
});
