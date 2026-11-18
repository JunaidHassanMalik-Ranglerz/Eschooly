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
import {elevation} from '../../Constants/Theme';
import IdCardDetailRow from './IdCardDetailRow';
import PersonAvatar from '../Profile/PersonAvatar';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {FLOAT_CARD_RADIUS} from '../Glass/EschoolyScreenShell';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  PROFILE_GRADIENT,
} from '../Profile/ProfileTheme';

const OFFICIAL_GRADIENT = [Colors.brandNavy, '#0B2A5C', Colors.brandRoyal];
const ICE_STRIP = [Colors.brandNavy, Colors.brandRoyal];
const ICE_AVATAR = wp(15.5);

const AVATAR = wp(19);
const HEADER_H = hp(7.5);

const textValue = value => (value == null ? '' : String(value).trim());

const IceIdCardFront = ({data}) => (
  <View style={styles.iceWrap}>
    <View style={styles.iceShell}>
      <View style={styles.iceClip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
          start={{x: 0, y: 0.08}}
          end={{x: 1, y: 1}}
          style={styles.iceFill}
        />
        <View pointerEvents="none" style={styles.iceWave}>
          <CardWave
            variant={SCREEN_WAVES.assignmentIce}
            color="rgba(91, 156, 255, 0.16)"
          />
        </View>
        <View style={styles.iceFace}>
          <LinearGradient
            colors={ICE_STRIP}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.iceStrip}>
            <View style={styles.headerLeft}>
              <View style={styles.logoBox}>
                <Image
                  source={Images.cap}
                  style={styles.logoIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.schoolCopy}>
                <Text style={styles.schoolName}>{data.schoolName}</Text>
                {textValue(data.schoolTagline) ? (
                  <Text style={styles.schoolTag}>{data.schoolTagline}</Text>
                ) : null}
              </View>
            </View>
            {textValue(data.academicYear) ? (
              <Text style={styles.year}>{data.academicYear}</Text>
            ) : null}
          </LinearGradient>

          <Text style={styles.iceCaption}>{Strings.idCardPreviewFront}</Text>

          <View style={styles.iceIdentity}>
            <PersonAvatar
              person={{
                value: data.value,
                label: data.name,
                name: data.name,
                initials: data.initials,
                gender: data.gender,
                photo: data.photo,
                photoUrl: data.photoUrl,
                className: data.class,
                classBadge: data.classBadge,
                classInfo: data.classInfo,
              }}
              size={ICE_AVATAR}
              borderColor={Colors.borderSubtle}
              borderWidth={StyleSheet.hairlineWidth * 2}
              style={styles.iceAvatar}
            />
            <View style={styles.iceNameCol}>
              <Text style={styles.iceName}>{data.name}</Text>
              {textValue(data.role) ? (
                <Text style={styles.iceRole}>{data.role}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.iceStats}>
            <IceStat label={Strings.classShort} value={data.class} />
            <View style={styles.iceStatRule} />
            <IceStat label={Strings.sectionShort} value={data.section} />
            <View style={styles.iceStatRule} />
            <IceStat label={Strings.rollShort} value={data.rollNo} />
          </View>

          <View style={styles.iceDetails}>
            {textValue(data.studentId) ? (
              <View style={styles.iceIdBadge}>
                <Text style={styles.iceIdText}>{data.studentId}</Text>
              </View>
            ) : null}
            {textValue(data.schoolLine) ? (
              <Text style={styles.iceMeta}>{data.schoolLine}</Text>
            ) : null}
            {textValue(data.cityLine) ? (
              <Text style={styles.iceMeta}>{data.cityLine}</Text>
            ) : null}
            <IceField
              icon="call-outline"
              label={Strings.phone}
              value={data.phone}
            />
            <IceField
              icon="location-outline"
              label={Strings.address}
              value={data.address}
            />
            <IceField
              icon="calendar-outline"
              label={Strings.validUntil}
              value={data.validUntil}
            />
          </View>

          <View style={styles.iceFooter}>
            <Text style={styles.iceFooterText}>
              {Strings.authorizedSignature}
            </Text>
            <View style={styles.verifiedRow}>
              <Icon
                name="checkmark-circle"
                size={wp(4)}
                color={Colors.brandRoyal}
              />
              <Text style={styles.iceVerified}>{Strings.verified}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const IceStat = ({label, value}) => (
  <View style={styles.iceStat}>
    <Text style={styles.iceStatLabel}>{label}</Text>
    <Text style={styles.iceStatValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const IceField = ({icon, label, value}) =>
  !textValue(value) ? null : (
    <View style={styles.iceField}>
      <Icon name={icon} size={wp(3.6)} color={Colors.brandRoyal} />
      <View style={styles.fieldText}>
        <Text style={styles.iceFieldLabel}>{label}</Text>
        <Text style={styles.iceFieldValue}>{value}</Text>
      </View>
    </View>
  );

const OfficialCardShell = ({children}) => (
  <View style={styles.cardNavyWrap}>
    <LinearGradient
      colors={OFFICIAL_GRADIENT}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={[styles.card, styles.cardNavy]}>
      <View pointerEvents="none" style={styles.waveNavy}>
        <CardWave
          variant={SCREEN_WAVES.assignmentIce}
          color="rgba(255,255,255,0.12)"
        />
      </View>
      {children}
    </LinearGradient>
  </View>
);

const IdCardPreview = ({data, isBack, navy = false, variant = 'default'}) => {
  if (variant === 'ice' && !isBack) {
    return <IceIdCardFront data={data} />;
  }

  const CardShell = navy ? OfficialCardShell : View;
  const shellStyle = navy ? undefined : styles.card;

  if (isBack) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{Strings.idCardPreviewBack}</Text>
        <CardShell style={shellStyle}>
          <LinearGradient
            colors={navy ? PROFILE_GRADIENT : [Colors.primary, Colors.primaryLight]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.backHeader}>
            <Text style={styles.backSchool}>{data.schoolLine}</Text>
            <Text style={styles.backYear}>{data.academicYear}</Text>
          </LinearGradient>
          <View style={styles.backBody}>
            <Text style={[styles.backTitle, navy && styles.textMutedNavy]}>
              {Strings.cardDetails}
            </Text>
            <IdCardDetailRow
              label={Strings.studentName}
              value={data.name}
              navy={navy}
            />
            <IdCardDetailRow
              label={Strings.studentIdLabel}
              value={data.studentId}
              navy={navy}
            />
            <IdCardDetailRow
              label={Strings.classAndSection}
              value={`${data.class} - ${data.section}`}
              navy={navy}
            />
            <IdCardDetailRow
              label={Strings.rollNumber}
              value={data.rollNo}
              navy={navy}
            />
            <IdCardDetailRow
              label={Strings.dateOfIssue}
              value={data.dateOfIssue}
              navy={navy}
            />
            <IdCardDetailRow
              label={Strings.validUntil}
              value={data.validUntil}
              isLast
              navy={navy}
            />
            <Text style={[styles.backNote, navy && styles.textMutedNavy]}>
              {Strings.idCardBackNote}
            </Text>
          </View>
        </CardShell>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, navy && styles.labelNavy]}>
        {Strings.idCardPreviewFront}
      </Text>

      <CardShell style={shellStyle}>
        <LinearGradient
          colors={navy ? OFFICIAL_GRADIENT : [Colors.primary, Colors.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.header, navy && styles.headerNavy]}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Image
                source={Images.cap}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.schoolCopy}>
              <Text style={styles.schoolName}>{data.schoolName}</Text>
              {textValue(data.schoolTagline) ? (
                <Text style={styles.schoolTag}>{data.schoolTagline}</Text>
              ) : null}
            </View>
          </View>
          {textValue(data.academicYear) ? (
            <Text style={styles.year}>{data.academicYear}</Text>
          ) : null}
        </LinearGradient>

        <View style={styles.body}>
          <View style={[styles.profileRow, navy && styles.profileRowNavy]}>
            <PersonAvatar
              person={{
                value: data.value,
                label: data.name,
                name: data.name,
                initials: data.initials,
                gender: data.gender,
                photo: data.photo,
                photoUrl: data.photoUrl,
                className: data.class,
                classBadge: data.classBadge,
                classInfo: data.classInfo,
              }}
              size={AVATAR}
              borderColor={navy ? 'rgba(255,255,255,0.45)' : Colors.white}
              borderWidth={4}
              style={styles.avatar}
            />
            <View style={[styles.nameCol, navy && styles.nameColNavy]}>
              <Text style={[styles.studentName, navy && styles.textOnNavy]}>
                {data.name}
              </Text>
              {textValue(data.role) ? (
                <Text style={[styles.role, navy && styles.textMutedNavy]}>
                  {data.role}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={[styles.statsRow, navy && styles.statsRowNavy]}>
            <StatItem label={Strings.classShort} value={data.class} navy={navy} />
            <View style={[styles.vLine, navy && styles.vLineNavy]} />
            <StatItem
              label={Strings.sectionShort}
              value={data.section}
              navy={navy}
            />
            <View style={[styles.vLine, navy && styles.vLineNavy]} />
            <StatItem
              label={Strings.rollShort}
              value={data.rollNo}
              navy={navy}
            />
          </View>

          <View style={styles.detailBlock}>
            {textValue(data.studentId) ? (
              <View style={[styles.idBadge, navy && styles.idBadgeNavy]}>
                <Text style={[styles.idText, navy && styles.textOnNavy]}>
                  {data.studentId}
                </Text>
              </View>
            ) : null}
            {textValue(data.schoolLine) ? (
              <Text style={[styles.address, navy && styles.textMutedNavy]}>
                {data.schoolLine}
              </Text>
            ) : null}
            {textValue(data.cityLine) ? (
              <Text style={[styles.address, navy && styles.textMutedNavy]}>
                {data.cityLine}
              </Text>
            ) : null}
            <PreviewField
              icon="call-outline"
              label={Strings.phone}
              value={data.phone}
              navy={navy}
            />
            <PreviewField
              icon="location-outline"
              label={Strings.address}
              value={data.address}
              navy={navy}
            />
            <PreviewField
              icon="calendar-outline"
              label={Strings.validUntil}
              value={data.validUntil}
              navy={navy}
            />
          </View>
        </View>

        <View style={[styles.footer, navy && styles.footerNavy]}>
          <Text style={[styles.footerText, navy && styles.textMutedNavy]}>
            {Strings.authorizedSignature}
          </Text>
          <View style={styles.verifiedRow}>
            <Icon
              name="checkmark-circle"
              size={wp(4)}
              color={navy ? '#93C5FD' : Colors.success}
            />
            <Text style={[styles.verifiedText, navy && styles.verifiedTextNavy]}>
              {Strings.verified}
            </Text>
          </View>
        </View>
      </CardShell>
    </View>
  );
};

const PreviewField = ({icon, label, value, navy}) => (
  !textValue(value) ? null : (
  <View style={styles.fieldRow}>
    <Icon
      name={icon}
      size={wp(3.8)}
      color={navy ? Colors.whiteMuted85 : Colors.grayText}
    />
    <View style={styles.fieldText}>
      <Text style={[styles.fieldLabel, navy && styles.textMutedNavy]}>{label}</Text>
      <Text style={[styles.fieldValue, navy && styles.textOnNavy]}>{value}</Text>
    </View>
  </View>
  )
);

const StatItem = ({label, value, navy}) => (
  <View style={[styles.statItem, navy && styles.statItemNavy]}>
    <Text style={[styles.statLabel, navy && styles.textMutedNavy]}>{label}</Text>
    <Text
      style={[styles.statValue, navy && styles.textOnNavy]}
      numberOfLines={2}>
      {value}
    </Text>
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
  labelNavy: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    letterSpacing: 1.1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardNavyWrap: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'visible',
    ...elevation.banner,
  },
  cardNavy: {
    backgroundColor: 'transparent',
    borderRadius: FLOAT_CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(147, 197, 253, 0.35)',
    overflow: 'hidden',
  },
  waveNavy: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: HEADER_H,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerNavy: {
    height: undefined,
    minHeight: HEADER_H,
    paddingBottom: hp(1.15),
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
  },
  schoolCopy: {
    flex: 1,
    minWidth: 0,
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
    flexShrink: 1,
  },
  schoolTag: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
    flexShrink: 1,
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
  profileRowNavy: {
    alignItems: 'flex-start',
    marginBottom: hp(1.35),
  },
  avatar: {
    marginRight: wp(3),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  nameCol: {
    flex: 1,
    minWidth: 0,
    paddingTop: hp(3.2),
    paddingLeft: wp(2),
  },
  nameColNavy: {
    paddingTop: hp(2.4),
    justifyContent: 'center',
  },
  studentName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    flexShrink: 1,
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
  statsRowNavy: {
    width: '100%',
    alignSelf: 'stretch',
    marginLeft: 0,
    marginTop: hp(0.2),
    gap: 0,
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    minWidth: wp(12),
  },
  statItemNavy: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: wp(1),
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
    borderRadius: wp(3.2),
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
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp(0.9),
  },
  fieldText: {
    flex: 1,
    marginLeft: wp(2),
  },
  fieldLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  fieldValue: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.1),
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
    minWidth: 0,
    marginRight: wp(2),
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
  verifiedTextNavy: {
    color: '#93C5FD',
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
  textOnNavy: {
    color: Colors.white,
  },
  textMutedNavy: {
    color: Colors.whiteMuted85,
  },
  vLineNavy: {
    backgroundColor: Colors.whiteOverlay18,
  },
  idBadgeNavy: {
    backgroundColor: Colors.whiteOverlay18,
  },
  footerNavy: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderTopColor: Colors.whiteOverlay18,
  },
  iceWrap: {
    width: '100%',
  },
  iceShell: {
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.banner,
  },
  iceClip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  iceFill: {
    ...StyleSheet.absoluteFillObject,
  },
  iceWave: {
    ...StyleSheet.absoluteFillObject,
  },
  iceFace: {
    zIndex: 1,
  },
  iceStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.05),
  },
  iceCaption: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    paddingHorizontal: wp(3.8),
    paddingTop: hp(1.15),
    paddingBottom: hp(0.85),
  },
  iceIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.8),
    marginBottom: hp(1.15),
  },
  iceAvatar: {
    marginRight: wp(3),
  },
  iceNameCol: {
    flex: 1,
    minWidth: 0,
  },
  iceName: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    flexShrink: 1,
  },
  iceRole: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  iceStats: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: wp(3.8),
    marginBottom: hp(1.15),
    backgroundColor: Colors.hubCard,
    borderRadius: wp(3.2),
    paddingVertical: hp(0.9),
    paddingHorizontal: wp(1.2),
  },
  iceStat: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1),
  },
  iceStatRule: {
    width: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.borderSubtle,
    marginVertical: hp(0.2),
  },
  iceStatLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.4,
    marginBottom: hp(0.2),
  },
  iceStatValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    textAlign: 'center',
  },
  iceDetails: {
    paddingHorizontal: wp(3.8),
    paddingBottom: hp(0.4),
  },
  iceIdBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.hubCard,
    borderRadius: wp(3.2),
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(0.45),
    marginBottom: hp(0.55),
  },
  iceIdText: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  iceMeta: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
  },
  iceField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp(0.7),
  },
  iceFieldLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  iceFieldValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.08),
  },
  iceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.hubCard,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: Colors.borderSubtle,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.15),
    marginTop: hp(0.85),
  },
  iceFooterText: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    fontStyle: 'italic',
  },
  iceVerified: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.2),
  },
});
