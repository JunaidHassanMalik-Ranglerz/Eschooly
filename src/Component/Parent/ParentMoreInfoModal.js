import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import ParentSheetModal from './ParentSheetModal';
import PersonAvatar from '../Profile/PersonAvatar';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {PARENT_DATA} from '../../Constants/dummydata';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const DETAIL_ICONS = {
  cnic: 'card-outline',
  email: 'mail-outline',
  phone: 'call-outline',
  mobile: 'call-outline',
  address: 'location-outline',
  father_name: 'person-outline',
  gender: 'male-female-outline',
  occupation: 'briefcase-outline',
  emergency_contact: 'call-outline',
  emergency_phone: 'call-outline',
  children: 'people-outline',
  created_at: 'calendar-outline',
  last_login_at: 'time-outline',
  nationality: 'earth-outline',
  family_id: 'id-card-outline',
  status: 'checkmark-circle-outline',
  school: 'school-outline',
  date_of_issue: 'calendar-outline',
  valid_until: 'calendar-outline',
};

const ParentMoreInfoModal = ({
  visible,
  onClose,
  person = PARENT_DATA,
  replayToken = 0,
}) => {
  if (!visible) {
    return null;
  }

  const rows = (person?.details || []).filter(
    item => item?.value && item.key !== 'name' && item.key !== 'full_name',
  );

  return (
    <ParentSheetModal
      visible
      variant="ice"
      onClose={onClose}
      title={Strings.moreInfo}
      subtitle={person?.label}
      dismissOnBackdropPress
      dismissOnBackPress
      tall>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        bounces
        keyboardShouldPersistTaps="handled">
        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          replayToken={replayToken}
          style={styles.profileEnter}>
          <View style={styles.profileShell}>
            <LinearGradient
              colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
              start={{x: 0, y: 0.08}}
              end={{x: 1, y: 1}}
              style={styles.profileFill}
            />
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(19, 69, 163, 0.14)"
            />
            <View style={styles.profileRow}>
              <PersonAvatar
                person={person}
                size={wp(14)}
                borderWidth={StyleSheet.hairlineWidth * 2}
                borderColor={Colors.borderSubtle}
              />
              <View style={styles.profileText}>
                <Text style={styles.profileName} numberOfLines={2}>
                  {person?.label}
                </Text>
                <Text style={styles.profileRole} numberOfLines={1}>
                  {person?.status || person?.classBadge || Strings.parentAccount}
                </Text>
              </View>
            </View>
          </View>
        </AnimatedCard>

        <View style={styles.listCard}>
          {rows.map((row, index) => {
            const icon = DETAIL_ICONS[row.key] || 'information-circle-outline';
            const last = index === rows.length - 1;
            return (
              <View
                key={row.key}
                style={[styles.row, last && styles.rowLast]}>
                <View style={styles.iconWrap}>
                  <Icon name={icon} size={wp(4.6)} color={Colors.brandRoyal} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel} numberOfLines={1}>
                    {row.label}
                  </Text>
                  <Text style={styles.rowValue}>{row.value}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ParentSheetModal>
  );
};

export default ParentMoreInfoModal;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(2.2),
    paddingBottom: hp(1.5),
  },
  profileEnter: {
    marginBottom: hp(1.2),
    overflow: 'visible',
    ...elevation.card,
  },
  profileShell: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    backgroundColor: Colors.bannerIceStart,
  },
  profileFill: {
    ...StyleSheet.absoluteFillObject,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.35),
    zIndex: 1,
  },
  profileText: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(3),
  },
  profileName: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  profileRole: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  listCard: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    backgroundColor: Colors.bannerIceStart,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.28)',
    paddingHorizontal: wp(2.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1.25),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.borderSubtle,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.6),
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    paddingTop: hp(0.15),
  },
  rowLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.3,
  },
  rowValue: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.18),
  },
});
