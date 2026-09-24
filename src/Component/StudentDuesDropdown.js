import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ParentSheetModal from './Parent/ParentSheetModal';
import PersonAvatar from './Profile/PersonAvatar';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {CARD_GRADIENTS} from '../Constants/CardTheme';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {STUDENT_DUES_FEES} from '../Constants/dummydata';
import {wp, hp} from '../Constants/Responsive';
import AnimatedCard from './AnimatedCard';
import {GRADIENT_END, GRADIENT_START, IDENTITY_CARD_SHADOW} from './Profile/ProfileTheme';

const StudentDuesDropdown = props => {
  const [open, setOpen] = useState(false);
  const renderFeeItem = ({item}) => {
    const isOverdue = item?.status === Strings.overdue;

    return (
      <View style={styles.feeItem}>
        <View style={styles.feeIconBox}>
          {typeof item?.icon === 'string' ? (
            <Icon name={item?.icon} size={wp(5)} color={Colors.iconSky} />
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
    <AnimatedCard index={props?.animationIndex ?? 1} style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
    <LinearGradient
      colors={CARD_GRADIENTS.royal}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}>
        <PersonAvatar person={props?.student} size={wp(12)} />

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
          <Icon name="chevron-down" size={wp(4.5)} color={Colors.whiteMuted85} />
        </View>
      </TouchableOpacity>
    </LinearGradient>

    <ParentSheetModal
      visible={open}
      onClose={() => setOpen(false)}
      title={Strings.feeBreakdown}
      subtitle={`${STUDENT_DUES_FEES?.length} ${Strings.items}`}
      dismissOnBackdropPress={false}
      tall>
      <FlatList
        data={STUDENT_DUES_FEES}
        keyExtractor={item => item?.id}
        renderItem={renderFeeItem}
        style={styles.feeList}
        contentContainerStyle={styles.feeListContent}
        nestedScrollEnabled
        showsVerticalScrollIndicator={STUDENT_DUES_FEES.length > 4}
        keyboardShouldPersistTaps="handled"
      />
    </ParentSheetModal>
    </AnimatedCard>
  );
};

export default StudentDuesDropdown;

const styles = StyleSheet.create({
  cardWrap: {
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  card: {
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
  },
  studentName: {
    color: Colors.white,
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
    color: Colors.whiteMuted75,
    textAlign: 'left',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    color: Colors.iconSky,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.4),
    width: wp(14.5),
  },
  feeList: {
    flexGrow: 1,
  },
  feeListContent: {
    paddingHorizontal: wp(1),
    paddingTop: hp(0.4),
    paddingBottom: hp(2.5),
    flexGrow: 1,
  },
  feeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(3),
    padding: wp(3),
    marginBottom: hp(1.2),
  },
  feeIconBox: {
    width: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  feeIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.iconSky,
  },
  feeInfo: {flex: 1},
  feeTitle: {
    color: Colors.white,
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
    tintColor: Colors.whiteMuted85,
    resizeMode: 'contain',
  },
  feeDate: {
    color: Colors.whiteMuted75,
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
    color: Colors.white,
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
