import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {STUDENT_DUES_FEES} from '../Constants/dummydata';
import {wp, hp} from '../Constants/Responsive';

const StudentDuesDropdown = props => {
  const [open, setOpen] = useState(false);
  const renderFeeItem = ({item}) => {
    const isOverdue = item?.status === Strings.overdue;

    return (
      <View style={styles.feeItem}>
        <View style={styles.feeIconBox}>
          {typeof item?.icon === 'string' ? (
            <Icon name={item?.icon} size={wp(5)} color={Colors.primary} />
          ) : (
            <Image source={item?.icon} style={styles.feeIcon} resizeMode="contain" />
          )}
        </View>

        <View style={styles.feeInfo}>
          <Text style={styles.feeTitle} numberOfLines={1}>{item?.title}</Text>
          <View style={styles.feeDateRow}>
            <Image source={Images.calendar} style={styles.feeCalendarIcon} />
            <Text style={styles.feeDate} numberOfLines={1}>{item?.month}</Text>
          </View>
        </View>

        <View style={styles.feeRight}>
          <Text style={styles.feeAmount} numberOfLines={1}>{item?.amount}</Text>
          <View style={[styles.badge, isOverdue ? styles.overdueBadge : styles.pendingBadge]}>
            <Text
              style={isOverdue ? styles.overdueText : styles.pendingText}
              numberOfLines={1}>
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText} numberOfLines={1}>
            {props?.student?.initials}
          </Text>
        </View>

        <View style={styles.headerCenter}>
          <Text style={styles.studentName} numberOfLines={1}>
            {props?.student?.label}
          </Text>
          <View style={styles.classBadge}>
            <Text style={styles.studentMeta} numberOfLines={1}>
              {props?.student?.classInfo}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.totalAmount} numberOfLines={1}>
            {props?.student?.totalAmount}
          </Text>
          <Icon
            name={open ? 'chevron-up' : 'chevron-down'}
            size={wp(4.5)}
            color={Colors.grayText}
          />
        </View>
      </TouchableOpacity>

      {open ? (
        <View style={styles.body}>
          <View style={styles.divider} />

          <View style={styles.breakdownHeader}>
            <Text style={styles.breakdownTitle} numberOfLines={1}>
              {Strings.feeBreakdown}
            </Text>
            <Text style={styles.breakdownCount} numberOfLines={1}>
              {STUDENT_DUES_FEES?.length} {Strings.items}
            </Text>
          </View>

          <FlatList
            data={STUDENT_DUES_FEES}
            keyExtractor={item => item?.id}
            renderItem={renderFeeItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      ) : null}
    </View>
  );
};

export default StudentDuesDropdown;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xx1,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
  },
  studentName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.1),
  },
  classBadge: {
    alignSelf: 'flex-start',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: wp(2.5),
    paddingVertical: hp(0.1),
    borderRadius: wp(2),
  },
  studentMeta: {
    fontSize: wp(3.2),
    color: Colors.mutedText,
    textAlign: 'left',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.4),
    width: wp(14.5),
  },
  body: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: hp(1.5),
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
  },
  breakdownTitle: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.6,
  },
  breakdownCount: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  feeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(3),
    padding: wp(3),
    marginBottom: hp(1.2),
  },
  feeIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.duesCardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  feeIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },
  feeInfo: {flex: 1},
  feeTitle: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
    marginBottom: hp(0.2),
  },
  feeDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeCalendarIcon: {
    width: wp(3.2),
    height: wp(3.2),
    tintColor: Colors.grayText,
    resizeMode: 'contain',
  },
  feeDate: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginLeft: wp(0.7),
    width:wp(35),
  },
  feeRight: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  feeAmount: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.5),
    textAlign: 'right',
    width:wp(19),
  },
  badge: {
    alignSelf: 'flex-end',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  overdueBadge: {backgroundColor: Colors.overdueBg,marginRight:wp(-1)},
  overdueText: {
    color: Colors.red,
    fontFamily: Fonts.semibold,
    fontSize: wp(2.67),
    textAlign: 'right',
  },
  pendingBadge: {backgroundColor: Colors.pendingBg,marginRight:wp(-1)},
  pendingText: {
    color: Colors.warning,
    fontFamily: Fonts.semibold,
    fontSize: wp(2.67),
    textAlign: 'right',
  },
});
