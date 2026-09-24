import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import ParentSheetModal from './ParentSheetModal';
import PersonAvatar from '../Profile/PersonAvatar';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {PARENT_DATA} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const MORE_INFO_ROWS = [
  {key: 'father', icon: 'person-outline', color: Colors.iconSky, label: Strings.fatherName, value: PARENT_DATA.fatherName},
  {key: 'gender', icon: 'male-female-outline', color: Colors.iconPurple, label: Strings.gender, value: PARENT_DATA.gender},
  {key: 'occupation', icon: 'briefcase-outline', color: Colors.iconOrange, label: 'Occupation', value: 'Business Consultant'},
  {key: 'emergency', icon: 'call-outline', color: Colors.iconGreen, label: 'Emergency Contact', value: '+92 321 9876543'},
  {key: 'children', icon: 'people-outline', color: Colors.iconTeal, label: 'Linked Children', value: '3 students'},
  {key: 'since', icon: 'calendar-outline', color: Colors.iconPink, label: 'Account Since', value: 'Jan 2022'},
  {key: 'nationality', icon: 'earth-outline', color: Colors.iconCyan, label: 'Nationality', value: 'Pakistani'},
];

const ParentMoreInfoModal = ({
  visible,
  onClose,
  person = PARENT_DATA,
  replayToken = 0,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ParentSheetModal
      visible
      onClose={onClose}
      title={Strings.moreInfo}
      subtitle={person?.label}
      dismissOnBackdropPress={false}
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
          <View style={styles.profileRow}>
            <PersonAvatar person={person} size={wp(14)} />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{person?.label}</Text>
              <Text style={styles.profileRole}>{person?.classBadge}</Text>
            </View>
          </View>
        </AnimatedCard>

        {MORE_INFO_ROWS.map((row, index) => {
          const slot = index + 2;
          return (
            <AnimatedCard
              key={row.key}
              index={slot}
              entering={getHomeScreenEnter(slot)}
              replayToken={replayToken}
              style={styles.rowEnter}>
              <View style={styles.row}>
                <Icon name={row.icon} size={wp(5)} color={row.color} />
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  <Text style={styles.rowValue}>{row.value}</Text>
                </View>
              </View>
            </AnimatedCard>
          );
        })}
      </ScrollView>
    </ParentSheetModal>
  );
};

export default ParentMoreInfoModal;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(1.5),
  },
  profileEnter: {
    marginBottom: hp(1.2),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.4),
  },
  profileText: {
    flex: 1,
    marginLeft: wp(3),
  },
  profileName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  profileRole: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  rowEnter: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteOverlay18,
  },
  rowText: {
    flex: 1,
    marginLeft: wp(3),
  },
  rowLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.3,
  },
  rowValue: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.15),
  },
});
