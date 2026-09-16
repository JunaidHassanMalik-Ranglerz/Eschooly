import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import IdCardDetailRow from './IdCardDetailRow';

const AVATAR = wp(19);
const HEADER_H = hp(7.5);

const IdCardPreview = ({data, isBack}) => {
  if (isBack) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{Strings.idCardPreviewBack}</Text>
        <View style={styles.card}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.backHeader}>
            <Text style={styles.backSchool}>{data.schoolLine}</Text>
            <Text style={styles.backYear}>{data.academicYear}</Text>
          </LinearGradient>
          <View style={styles.backBody}>
            <Text style={styles.backTitle}>{Strings.cardDetails}</Text>
            <IdCardDetailRow label={Strings.studentName} value={data.name} />
            <IdCardDetailRow
              label={Strings.studentIdLabel}
              value={data.studentId}
            />
            <IdCardDetailRow
              label={Strings.classAndSection}
              value={`${data.class} - ${data.section}`}
            />
            <IdCardDetailRow label={Strings.rollNumber} value={data.rollNo} />
            <IdCardDetailRow
              label={Strings.dateOfIssue}
              value={data.dateOfIssue}
            />
            <IdCardDetailRow
              label={Strings.validUntil}
              value={data.validUntil}
              isLast
            />
            <Text style={styles.backNote}>{Strings.idCardBackNote}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{Strings.idCardPreviewFront}</Text>

      <View style={styles.card}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Image
                source={Images.cap}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.schoolName}>{data.schoolName}</Text>
              <Text style={styles.schoolTag}>{data.schoolTagline}</Text>
            </View>
          </View>
          <Text style={styles.year}>{data.academicYear}</Text>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{data.initials}</Text>
            </View>
            <View style={styles.nameCol}>
              <Text style={styles.studentName}>{data.name}</Text>
              <Text style={styles.role}>{data.role}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label={Strings.classShort} value={data.class} />
            <View style={styles.vLine} />
            <StatItem label={Strings.sectionShort} value={data.section} />
            <View style={styles.vLine} />
            <StatItem label={Strings.rollShort} value={data.rollNo} />
          </View>

          <View style={styles.detailBlock}>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>{data.studentId}</Text>
            </View>
            <Text style={styles.address}>{data.schoolLine}</Text>
            <Text style={styles.address}>{data.cityLine}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{Strings.authorizedSignature}</Text>
          <View style={styles.verifiedRow}>
            <Icon name="checkmark-circle" size={wp(4)} color={Colors.success} />
            <Text style={styles.verifiedText}>{Strings.verified}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const StatItem = ({label, value}) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export default IdCardPreview;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.8,
    marginBottom: hp(1.2),
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    height: HEADER_H,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  logoIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
  },
  schoolName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  schoolTag: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  year: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  body: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(1.8),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -(AVATAR / 6.5),
    marginBottom: hp(1.2),
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: Colors.lightGray,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    color: Colors.mutedText,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  nameCol: {
    flex: 1,
    paddingTop: hp(3.2),
    paddingLeft: wp(2),
  },
  studentName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  role: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: AVATAR + wp(3),
    marginTop: hp(0.45),
    gap: wp(2.5),
    marginBottom: hp(1.6),
  },
  statItem: {
    alignItems: 'center',
    minWidth: wp(12),
  },
  vLine: {
    width: 1,
    height: hp(2.4),
    backgroundColor: Colors.inputBorder,
  },
  statLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.4,
    marginBottom: hp(0.2),
  },
  statValue: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  detailBlock: {
    width: '100%',
    paddingTop: hp(0.2),
  },
  idBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGray,
    borderRadius: wp(6),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.55),
    marginBottom: hp(0.8),
  },
  idText: {
    color: Colors.mutedText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  address: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  footerText: {
    flex: 1,
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    fontStyle: 'italic',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: Colors.success,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.2),
  },
  backHeader: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backSchool: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    flex: 1,
  },
  backYear: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  backBody: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },
  backTitle: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.6,
    marginBottom: hp(0.5),
  },
  backNote: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginTop: hp(1.5),
    textAlign: 'center',
  },
});
