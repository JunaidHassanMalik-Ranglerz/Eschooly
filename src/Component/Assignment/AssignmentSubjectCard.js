import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AssignmentItem from './AssignmentItem';
import DepthIcon from '../DepthIcon';
import {getSubjectIconTheme, getSubjectTheme} from '../Syllabus/SubjectTheme';
import {SCREEN_WAVES} from '../CardWave';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const AssignmentSubjectCard = props => {
  const subject = props?.subject;
  const count = subject?.assignments?.length || 0;
  const premium = props?.premium;
  const animationIndex = props?.animationIndex ?? 0;

  const subjectIcon = getSubjectIconTheme(subject?.name);
  const mathTheme = getSubjectTheme('Mathematics');

  const header = (
    <TouchableOpacity
      style={styles.header}
      activeOpacity={0.85}
      onPress={() => props?.onToggle?.()}>
      <View style={styles.iconSlot}>
        <DepthIcon
          name={subjectIcon.icon || subject?.icon || 'book'}
          size={wp(6)}
          color={
            premium
              ? mathTheme.iconColor
              : subject?.iconColor || subjectIcon.color || Colors.primary
          }
        />
      </View>

      <View style={styles.headerCenter}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, premium && styles.titlePremium]}
            numberOfLines={1}>
            {subject?.name}
          </Text>
          <Icon
            name={props?.open ? 'chevron-up' : 'chevron-down'}
            size={wp(4.5)}
            color={premium ? Colors.whiteMuted85 : Colors.grayText}
          />
        </View>

        <Text
          style={[styles.meta, premium && styles.metaPremium]}
          numberOfLines={1}>
          {count} {Strings.assignmentsCount}
        </Text>
      </View>

      {subject?.pendingCount > 0 ? (
        <View style={[styles.pendingBadge, premium && styles.pendingBadgePremium]}>
          <Text style={styles.pendingText}>{subject?.pendingCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  const list =
    props?.open && count > 0 ? (
      <FlatList
        data={subject?.assignments}
        keyExtractor={item => item?.id}
        renderItem={({item}) => <AssignmentItem assignment={item} premium={premium} />}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={[styles.list, premium && styles.listPremium]}
      />
    ) : null;

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        colors={mathTheme.gradient}
        waveVariant={animationIndex === 2 || animationIndex === 3 ? SCREEN_WAVES.assignment : null}>
        {header}
        {list}
      </ProfileGradientCard>
    );
  }

  return (
    <AnimatedCard index={animationIndex} style={styles.card}>
      {header}
      {list}
    </AnimatedCard>
  );
};

export default AssignmentSubjectCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  premiumInner: {
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSlot: {
    width: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  headerCenter: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginRight: wp(2),
  },
  titlePremium: {
    color: Colors.white,
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.3),
  },
  metaPremium: {
    color: Colors.whiteMuted75,
  },
  pendingBadge: {
    minWidth: wp(6.5),
    height: wp(6.5),
    borderRadius: wp(4),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(2),
    paddingHorizontal: wp(1.5),
  },
  pendingBadgePremium: {
    backgroundColor: Colors.whiteOverlay22,
  },
  pendingText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  list: {
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  listPremium: {
    borderTopColor: Colors.whiteOverlay18,
  },
});
