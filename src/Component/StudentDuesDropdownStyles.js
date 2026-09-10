import {StyleSheet} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

export default StyleSheet.create({
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
  headerCenter: {flex: 1},
  studentName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.3),
  },
  studentMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: wp(2),
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
    fontSize: Fontsize.small,
    letterSpacing: 0.6,
  },
  breakdownCount: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
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
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  feeInfo: {flex: 1},
  feeTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.4),
  },
  feeDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeDate: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    marginLeft: wp(1.5),
  },
  feeRight: {
    alignItems: 'flex-end',
    marginLeft: wp(2),
  },
  feeAmount: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.5),
  },
  badge: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  overdueBadge: {backgroundColor: Colors.overdueBg},
  overdueText: {
    color: Colors.red,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
  },
  pendingBadge: {backgroundColor: Colors.pendingBg},
  pendingText: {
    color: Colors.warning,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
  },
});
