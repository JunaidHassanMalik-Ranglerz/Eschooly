import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const AssignmentOverviewCard = props => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>{Strings.assignmentsOverview}</Text>
          <Text style={styles.totalText} numberOfLines={1}>
            {props?.overview?.total} {Strings.totalAssignments}
          </Text>
        </View>

        <View style={styles.totalBadge}>
          <Icon name="document-text-outline" size={wp(5)} color={Colors.primary} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, styles.pendingBox]}>
          <Text style={styles.statValue}>{props?.overview?.pending}</Text>
          <Text style={styles.statLabel}>{Strings.pending}</Text>
        </View>

        <View style={[styles.statBox, styles.submittedBox]}>
          <Text style={styles.statValue}>{props?.overview?.submitted}</Text>
          <Text style={styles.statLabel}>{Strings.submitted}</Text>
        </View>

        <View style={[styles.statBox, styles.overdueBox]}>
          <Text style={styles.statValue}>{props?.overview?.overdue}</Text>
          <Text style={styles.statLabel}>{Strings.overdue}</Text>
        </View>
      </View>
    </View>
  );
};

export default AssignmentOverviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.8),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
  },
  totalText: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  totalBadge: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.duesCardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(2.5),
  },
  statBox: {
    flex: 1,
    borderRadius: wp(3),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    alignItems: 'center',
  },
  pendingBox: {
    backgroundColor: Colors.pendingBg,
  },
  submittedBox: {
    backgroundColor: Colors.successBg,
  },
  overdueBox: {
    backgroundColor: Colors.overdueBg,
  },
  statValue: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    marginBottom: hp(0.2),
  },
  statLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
