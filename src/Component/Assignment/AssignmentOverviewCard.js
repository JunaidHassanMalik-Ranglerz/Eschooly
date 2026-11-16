import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import FeatureOverviewCard from '../Glass/FeatureOverviewCard';
import {EducationIcons} from '../../Assets/EducationIcons';
import {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const AssignmentOverviewCard = ({
  overview,
  premium = false,
  animationIndex = 0,
  selectedKey = 'submitted',
  style,
}) => {
  const icy = useStudentTone();
  const navyPremium = premium && !icy;

  if (icy) {
    return (
      <FeatureOverviewCard
        animationIndex={animationIndex}
        label={Strings.assignmentsOverview}
        total={`${overview?.total ?? 0} ${Strings.totalAssignments}`}
        art={EducationIcons.assignments}
        waveVariant={SCREEN_WAVES.assignmentIce}
        stats={[
          {
            key: 'pending',
            value: overview?.pending ?? 0,
            label: Strings.pending,
            selected: selectedKey === 'pending',
          },
          {
            key: 'submitted',
            value: overview?.submitted ?? 0,
            label: Strings.submitted,
            selected: selectedKey === 'submitted',
          },
          {
            key: 'overdue',
            value: overview?.overdue ?? 0,
            label: Strings.overdue,
            selected: selectedKey === 'overdue',
          },
        ]}
        style={[styles.icyGap, style]}
      />
    );
  }

  const content = (
    <>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.label, navyPremium && styles.labelPremium]}>
            {Strings.assignmentsOverview}
          </Text>
          <Text
            style={[styles.totalText, navyPremium && styles.totalTextPremium]}
            numberOfLines={1}>
            {overview?.total} {Strings.totalAssignments}
          </Text>
        </View>
        <View style={styles.totalBadge}>
          <Icon
            name="document-text-outline"
            size={wp(6)}
            color={navyPremium ? Colors.iconSky : Colors.brandRoyal}
          />
        </View>
      </View>
      <View style={styles.statsRow}>
        <View
          style={[
            styles.statBox,
            navyPremium ? styles.statBoxBlue : styles.pendingBox,
          ]}>
          <Text
            style={[styles.statValue, navyPremium && styles.statValuePremium]}>
            {overview?.pending}
          </Text>
          <Text
            style={[
              styles.statLabel,
              navyPremium && styles.statLabelPremiumWhite,
            ]}>
            {Strings.pending}
          </Text>
        </View>
        <View
          style={[
            styles.statBox,
            navyPremium ? styles.statBoxBlue : styles.submittedBox,
          ]}>
          <Text
            style={[styles.statValue, navyPremium && styles.statValuePremium]}>
            {overview?.submitted}
          </Text>
          <Text
            style={[
              styles.statLabel,
              navyPremium && styles.statLabelPremiumWhite,
            ]}>
            {Strings.submitted}
          </Text>
        </View>
        <View
          style={[
            styles.statBox,
            navyPremium ? styles.statBoxBlue : styles.overdueBox,
          ]}>
          <Text
            style={[styles.statValue, navyPremium && styles.statValuePremium]}>
            {overview?.overdue}
          </Text>
          <Text
            style={[
              styles.statLabel,
              navyPremium && styles.statLabelPremiumWhite,
            ]}>
            {Strings.overdue}
          </Text>
        </View>
      </View>
    </>
  );

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        variant="navy"
        waveVariant={SCREEN_WAVES.assignment}>
        {content}
      </ProfileGradientCard>
    );
  }

  return (
    <AnimatedCard index={animationIndex} style={[styles.card, style]}>
      {content}
    </AnimatedCard>
  );
};

export default AssignmentOverviewCard;

const styles = StyleSheet.create({
  icyGap: {
    marginBottom: hp(1.8),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(2),
  },
  premiumInner: {
    paddingVertical: hp(1.6),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.8),
    zIndex: 1,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
  },
  labelPremium: {
    color: Colors.whiteMuted75,
  },
  totalText: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  totalTextPremium: {
    color: Colors.white,
  },
  totalBadge: {
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  statBox: {
    flex: 1,
    borderRadius: wp(4),
    overflow: 'hidden',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    marginHorizontal: wp(1),
  },
  statBoxBlue: {
    backgroundColor: Colors.primaryLight,
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
  statValuePremium: {
    color: Colors.white,
  },
  statLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  statLabelPremiumWhite: {
    color: Colors.white,
  },
});
