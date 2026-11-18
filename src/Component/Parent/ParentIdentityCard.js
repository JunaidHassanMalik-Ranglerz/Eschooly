import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonAvatar from '../Profile/PersonAvatar';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {FLOAT_CARD_RADIUS} from '../Glass/EschoolyScreenShell';

const ICE_STRIP = [Colors.brandNavy, Colors.brandRoyal];
const ICE_WAVE = 'rgba(19, 69, 163, 0.16)';
const AVATAR = wp(15.5);

const textValue = value => (value == null ? '' : String(value).trim());

const isVerifiedPerson = person => {
  if (person?.verified === true || person?.verified === 1) {
    return true;
  }
  const raw = String(person?.verified ?? person?.status ?? '').trim().toLowerCase();
  if (!raw) {
    return true;
  }
  return ['verified', 'active', '1', 'true', 'parent account'].includes(raw);
};

const ParentIdentityCard = ({
  person,
  animationIndex = 0,
  entering,
  replayToken = 0,
}) => {
  const verified = isVerifiedPerson(person);
  const fatherName = textValue(person?.fatherName);
  const gender = textValue(person?.gender);
  const cnic = textValue(person?.cnic);
  const issued = textValue(person?.dateOfIssue);
  const validUntil = textValue(person?.validUntil);
  const address = textValue(person?.address);

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={styles.wrap}>
      <View style={styles.shell}>
        <View style={styles.clip}>
          <LinearGradient
            colors={ICE_STRIP}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.strip}>
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Image
                  source={Images.cap}
                  style={styles.logoIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.brandCopy}>
                <Text style={styles.schoolName} numberOfLines={1}>
                  {Strings.eschool}
                </Text>
                <Text style={styles.cardType} numberOfLines={1}>
                  {Strings.parentIdCard}
                </Text>
              </View>
            </View>
            <View style={styles.chip}>
              <Icon
                name="hardware-chip-outline"
                size={wp(5)}
                color={Colors.white}
              />
            </View>
          </LinearGradient>

          <View style={styles.body}>
            <LinearGradient
              colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
              start={{x: 0, y: 0.08}}
              end={{x: 1, y: 1}}
              style={styles.bodyFill}
            />
            <CardWave variant={SCREEN_WAVES.assignmentIce} color={ICE_WAVE} />
            <View style={styles.bodyContent}>
              <View style={styles.captionRow}>
                <Text style={styles.caption} numberOfLines={1}>
                  {Strings.identityCard}
                </Text>
                {verified ? (
                  <View style={styles.liveBadge}>
                    <Icon
                      name="shield-checkmark"
                      size={wp(3.4)}
                      color={Colors.iconGreen}
                    />
                    <Text style={styles.liveText} numberOfLines={1}>
                      {Strings.verifiedParent}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.identityRow}>
                <PersonAvatar
                  person={person}
                  size={AVATAR}
                  variant="identity"
                  borderWidth={StyleSheet.hairlineWidth * 2}
                  borderColor={Colors.borderSubtle}
                  style={styles.photo}
                />
                <View style={styles.nameCol}>
                  <Text style={styles.name} numberOfLines={2}>
                    {person?.label}
                  </Text>
                  <Text style={styles.role} numberOfLines={1}>
                    {Strings.guardianRole}
                  </Text>
                </View>
              </View>

              {fatherName || gender ? (
                <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Text style={styles.statLabel} numberOfLines={1}>
                      {Strings.fatherName}
                    </Text>
                    <Text style={styles.statValue} numberOfLines={2}>
                      {fatherName}
                    </Text>
                  </View>
                  <View style={styles.statRule} />
                  <View style={styles.stat}>
                    <Text style={styles.statLabel} numberOfLines={1}>
                      {Strings.gender}
                    </Text>
                    <Text style={styles.statValue} numberOfLines={1}>
                      {gender}
                    </Text>
                  </View>
                </View>
              ) : null}

              {cnic ? (
                <View style={styles.cnicPanel}>
                  <Text style={styles.fieldLabel}>{Strings.identityNumber}</Text>
                  <Text style={styles.cnicValue}>{cnic}</Text>
                </View>
              ) : null}

              {issued || validUntil ? (
                <View style={styles.datesRow}>
                  <View style={styles.dateBox}>
                    <Text style={styles.fieldLabel}>{Strings.dateOfIssue}</Text>
                    <Text style={styles.fieldValue}>{issued}</Text>
                  </View>
                  <View style={styles.dateBox}>
                    <Text style={styles.fieldLabel}>{Strings.validUntil}</Text>
                    <Text style={styles.fieldValue}>{validUntil}</Text>
                  </View>
                </View>
              ) : null}

              <View style={styles.footer}>
                <Icon
                  name="location-outline"
                  size={wp(3.8)}
                  color={Colors.brandRoyal}
                />
                <Text style={styles.footerNote} numberOfLines={2}>
                  {address}
                </Text>
                {verified ? (
                  <View style={styles.verifiedRow}>
                    <Icon
                      name="checkmark-circle"
                      size={wp(4)}
                      color={Colors.iconGreen}
                    />
                    <Text style={styles.verifiedText}>{Strings.verified}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </AnimatedCard>
  );
};

export default ParentIdentityCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.35),
    zIndex: 2,
    overflow: 'visible',
  },
  shell: {
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.banner,
  },
  clip: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    backgroundColor: Colors.bannerIceStart,
  },
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.05),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
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
  },
  brandCopy: {
    flex: 1,
    minWidth: 0,
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
    marginTop: hp(0.12),
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  chip: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'relative',
    overflow: 'hidden',
  },
  bodyFill: {
    ...StyleSheet.absoluteFillObject,
  },
  bodyContent: {
    zIndex: 1,
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3.8),
    paddingTop: hp(1.15),
    paddingBottom: hp(0.9),
    gap: wp(2),
  },
  caption: {
    flex: 1,
    minWidth: 0,
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.greenSoft,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.35),
    maxWidth: wp(42),
  },
  liveText: {
    color: Colors.iconGreen,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    marginLeft: wp(1),
    flexShrink: 1,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.8),
    marginBottom: hp(1.15),
  },
  photo: {
    marginRight: wp(3),
  },
  nameCol: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  role: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: wp(3.8),
    marginBottom: hp(1.1),
    backgroundColor: Colors.hubCard,
    borderRadius: wp(3.2),
    paddingVertical: hp(0.95),
    paddingHorizontal: wp(1.2),
  },
  stat: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1.4),
  },
  statRule: {
    width: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.borderSubtle,
    marginVertical: hp(0.2),
  },
  statLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.4,
    marginBottom: hp(0.2),
  },
  statValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
  },
  cnicPanel: {
    marginHorizontal: wp(3.8),
    marginBottom: hp(1),
    backgroundColor: Colors.hubCard,
    borderRadius: wp(3.2),
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1),
  },
  fieldLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.3,
  },
  cnicValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    letterSpacing: 0.4,
    marginTop: hp(0.28),
  },
  datesRow: {
    flexDirection: 'row',
    marginHorizontal: wp(3.8),
    gap: wp(2),
    marginBottom: hp(0.4),
  },
  dateBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.hubCard,
    borderRadius: wp(3.2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  fieldValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.2),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.hubCard,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: Colors.borderSubtle,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.15),
    marginTop: hp(0.85),
  },
  footerNote: {
    flex: 1,
    minWidth: 0,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginHorizontal: wp(2),
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: Colors.iconGreen,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
  },
});
