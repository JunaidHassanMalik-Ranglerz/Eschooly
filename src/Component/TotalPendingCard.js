import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const TotalPendingCard = () => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryLight]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <Text style={styles.totalLabel} numberOfLines={1}>{Strings.totalPending}</Text>
          <Text style={styles.amount} numberOfLines={1}>
            {Strings.pendingDuesAmount}
            <Text style={styles.amountDecimal}>{Strings.pendingDuesDecimal}</Text>
          </Text>
          <Text style={styles.summary} numberOfLines={1}>{Strings.pendingDuesSummary}</Text>
        </View>

        <View style={styles.iconBox}>
          <Image source={Images.pendingDues} style={styles.walletIcon} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.dueRow}>
          <Image source={Images.calendarClock} style={styles.calendarIcon} />
          <Text style={styles.dueText} numberOfLines={1}>{Strings.dueBy}</Text>
        </View>
        <View style={styles.overdueBadge}>
          <Text style={styles.overdueText} numberOfLines={1}>{Strings.overdue}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TotalPendingCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(5),
    padding: wp(5),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    flex: 1,
    paddingRight: wp(3),
  },
  totalLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.8,
    marginBottom: hp(0.8),
    width:wp(30),
  },
  amount: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.mm1,
    lineHeight: Fontsize.xl,
  },
  amountDecimal: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  summary: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginTop: hp(0.6),
  },
  iconBox: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(3.5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIcon: {
    width: wp(7),
    height: wp(7),
    tintColor: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.whiteOverlay20,
    marginVertical: hp(2),
    marginHorizontal: -wp(4.7),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  dueText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginLeft: wp(2),
    width:wp(35),
  },
  overdueBadge: {
    backgroundColor: Colors.whiteOverlay22,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    borderRadius: wp(5),
  },
  overdueText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: wp(3.2),
    width:wp(14.5),
    marginLeft:wp(0.6),
  },
});
