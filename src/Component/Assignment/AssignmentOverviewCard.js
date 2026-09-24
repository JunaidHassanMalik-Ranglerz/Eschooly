import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import {SCREEN_WAVES} from '../CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const AssignmentOverviewCard = ({overview, premium = false, animationIndex = 0}) => {
  const content = (
    <>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.label, premium && styles.labelPremium]}>
            {Strings.assignmentsOverview}
          </Text>
          <Text
            style={[styles.totalText, premium && styles.totalTextPremium]}
            numberOfLines={1}>
            {overview?.total} {Strings.totalAssignments}
          </Text>
        </View>

        <View style={styles.totalBadge}>
          <Icon
            name="document-text-outline"
            size={wp(6)}
            color={premium ? Colors.iconSky : Colors.primary}
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[
            styles.statBox,
            premium ? styles.statBoxBlue : styles.pendingBox,
          ]}>
          <Text style={[styles.statValue, premium && styles.statValuePremium]}>
            {overview?.pending}
          </Text>
          <Text style={[styles.statLabel, premium && styles.statLabelPremiumWhite]}>
            {Strings.pending}
          </Text>
        </View>

        <View
          style={[
            styles.statBox,
            premium ? styles.statBoxBlue : styles.submittedBox,
          ]}>
          <Text style={[styles.statValue, premium && styles.statValuePremium]}>
            {overview?.submitted}
          </Text>
          <Text style={[styles.statLabel, premium && styles.statLabelPremiumWhite]}>
            {Strings.submitted}
          </Text>
        </View>

        <View
          style={[
            styles.statBox,
            premium ? styles.statBoxBlue : styles.overdueBox,
          ]}>
          <Text style={[styles.statValue, premium && styles.statValuePremium]}>
            {overview?.overdue}
          </Text>
          <Text style={[styles.statLabel, premium && styles.statLabelPremiumWhite]}>
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
        waveVariant={SCREEN_WAVES.assignment}>
        {content}
      </ProfileGradientCard>
    );
  }

  return <AnimatedCard index={animationIndex} style={styles.card}>{content}</AnimatedCard>;
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
  premiumInner: {
    paddingVertical: hp(1.6),
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
  totalBadgePremium: {
    opacity: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  statLabelPremium: {
    color: Colors.whiteMuted75,
  },
  statLabelPremiumWhite: {
    color: Colors.white,
  },
});
