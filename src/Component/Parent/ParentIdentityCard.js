import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const ParentIdentityCard = ({person}) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>{Strings.identityCard}</Text>
        <View style={styles.liveBadge}>
          <Icon name="shield-checkmark" size={wp(3.6)} color={Colors.iconGreen} />
          <Text style={styles.liveText}>{Strings.verifiedParent}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={['#12325A', Colors.primary, Colors.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.header}>
          <View style={styles.watermark} />
          <View style={styles.watermarkSmall} />

          <View style={styles.headerTop}>
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Icon name="school" size={wp(5)} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.schoolName}>{Strings.eschool}</Text>
                <Text style={styles.cardType}>{Strings.parentIdCard}</Text>
              </View>
            </View>
            <View style={styles.chip}>
              <Icon name="hardware-chip-outline" size={wp(5.5)} color="#F5D76E" />
            </View>
          </View>

          <View style={styles.profileRow}>
            <View style={styles.photoFrame}>
              <Text style={styles.avatarText}>{person?.initials}</Text>
            </View>
            <View style={styles.nameCol}>
              <Text style={styles.name}>{person?.label}</Text>
              <Text style={styles.role}>{Strings.guardianRole}</Text>
              <View style={styles.metaLine}>
                <Text style={styles.metaKey}>{Strings.fatherName}</Text>
                <Text style={styles.metaVal}>{person?.fatherName}</Text>
              </View>
              <View style={styles.metaLine}>
                <Text style={styles.metaKey}>{Strings.gender}</Text>
                <Text style={styles.metaVal}>{person?.gender}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.cnicLabel}>{Strings.identityNumber}</Text>
          <Text style={styles.cnicValue}>{person?.cnic}</Text>
          <View style={styles.datesRow}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>{Strings.dateOfIssue}</Text>
              <Text style={styles.dateValue}>{person?.dateOfIssue}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>{Strings.validUntil}</Text>
              <Text style={styles.dateValue}>{person?.validUntil}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerNote}>{person?.address}</Text>
          <View style={styles.verifiedRow}>
            <Icon name="checkmark-circle" size={wp(4)} color={Colors.success} />
            <Text style={styles.verifiedText}>{Strings.verified}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ParentIdentityCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2.4),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.3),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.greenSoft,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.45),
  },
  liveText: {
    color: Colors.iconGreen,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    marginLeft: wp(1.2),
  },
  card: {
    borderRadius: wp(5.5),
    overflow: 'hidden',
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: '#12325A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  header: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.8),
    paddingBottom: hp(2.1),
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    width: wp(42),
    height: wp(42),
    borderRadius: wp(21),
    borderWidth: 18,
    borderColor: 'rgba(255,255,255,0.07)',
    right: -wp(10),
    top: -wp(14),
  },
  watermarkSmall: {
    position: 'absolute',
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    backgroundColor: 'rgba(255,255,255,0.06)',
    left: wp(28),
    bottom: -wp(6),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  schoolName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  cardType: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.15),
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  chip: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: 'rgba(245, 215, 110, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoFrame: {
    width: wp(18),
    height: wp(22),
    borderRadius: wp(3),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.2),
    borderWidth: 2,
    borderColor: 'rgba(245, 215, 110, 0.7)',
  },
  avatarText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
  },
  nameCol: {
    flex: 1,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  role: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
    marginBottom: hp(0.9),
  },
  metaLine: {
    marginBottom: hp(0.35),
  },
  metaKey: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.4,
  },
  metaVal: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.08),
  },
  body: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.7),
    paddingBottom: hp(1.4),
    backgroundColor: Colors.white,
  },
  cnicLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: hp(0.35),
  },
  cnicValue: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    letterSpacing: 0.6,
    marginBottom: hp(1.3),
  },
  datesRow: {
    flexDirection: 'row',
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginBottom: hp(0.2),
  },
  dateValue: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4.5),
    paddingBottom: hp(1.5),
    paddingTop: hp(0.2),
  },
  footerNote: {
    flex: 1,
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    paddingRight: wp(2),
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: Colors.success,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
  },
});
