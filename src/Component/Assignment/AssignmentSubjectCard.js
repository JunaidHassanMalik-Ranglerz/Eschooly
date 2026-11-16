import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AssignmentItem from './AssignmentItem';
import DepthIcon from '../DepthIcon';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {getSubjectIconTheme, getSubjectTheme} from '../Syllabus/SubjectTheme';
import {SCREEN_WAVES} from '../CardWave';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import {elevation, radius} from '../../Constants/Theme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const AssignmentSubjectCard = props => {
  const subject = props?.subject;
  const count = subject?.assignments?.length || 0;
  const icy = useStudentTone();
  const premium = props?.premium && !icy;
  const animationIndex = props?.animationIndex ?? 0;

  const subjectIcon = getSubjectIconTheme(subject?.name);
  const mathTheme = getSubjectTheme('Mathematics');

  const header = (
    <TouchableOpacity
      style={[styles.header, icy && styles.headerIcy]}
      activeOpacity={0.85}
      onPress={() => props?.onToggle?.()}>
      <View style={[styles.iconSlot, icy && styles.iconSlotIcy]}>
        {icy ? (
          <FeatureArtImage source={EducationIcons.digitalLibrary} size={wp(14)} />
        ) : (
          <DepthIcon
            name={subjectIcon.icon || subject?.icon || 'book'}
            size={wp(6)}
            color={
              premium
                ? mathTheme.iconColor
                : subject?.iconColor || subjectIcon.color || Colors.primary
            }
          />
        )}
      </View>

      <View style={styles.headerCenter}>
        {icy ? (
          <>
            <Text style={[styles.title, styles.titleIcy]} numberOfLines={2}>
              {subject?.name}
            </Text>
            <Text style={[styles.meta, styles.metaIcy]} numberOfLines={1}>
              {count} {Strings.assignmentsCount}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.titleRow}>
              <Text
                style={[styles.title, premium && styles.titlePremium]}
                numberOfLines={2}>
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
          </>
        )}
      </View>

      {subject?.pendingCount > 0 ? (
        <View
          style={[
            styles.pendingBadge,
            premium && styles.pendingBadgePremium,
            icy && styles.pendingBadgeIcy,
          ]}>
          <Text style={[styles.pendingText, icy && styles.pendingTextIcy]}>
            {subject?.pendingCount}
          </Text>
        </View>
      ) : null}

      {icy ? (
        <Icon
          name={props?.open ? 'chevron-up' : 'chevron-down'}
          size={wp(5)}
          color={Colors.textSecondary}
        />
      ) : null}
    </TouchableOpacity>
  );

  const list =
    props?.open && count > 0 ? (
      <FlatList
        data={subject?.assignments}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <AssignmentItem
            assignment={item}
            premium={premium}
            expanded={props?.openAssignmentId === item.id}
            loading={props?.loadingAssignmentId === item.id}
            canSubmit={
              props?.canSubmit && item.status !== 'submitted'
            }
            notes={props?.notesById?.[item.id] || ''}
            submitting={props?.submittingId === item.id}
            downloadingFileId={props?.downloadingFileId}
            onPress={props?.onAssignmentPress ? () => props.onAssignmentPress(item) : undefined}
            onAttachmentPress={file => props?.onAttachmentPress?.(item, file)}
            onSubmit={(value, files) => props?.onSubmit?.(item, value, files)}
            onNotesFocus={props?.onNotesFocus}
          />
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        style={[styles.list, premium && styles.listPremium, icy && styles.listIcy]}
      />
    ) : null;

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        disabled={(subject?.assignments || []).some(
          item => item.id === props?.openAssignmentId,
        )}
        style={styles.icyCard}>
        {header}
        {list}
      </AnimatedCard>
    );
  }

  if (props?.premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        disableAnimation={(subject?.assignments || []).some(
          item => item.id === props?.openAssignmentId,
        )}
        variant="navy"
        colors={mathTheme.gradient}
        waveVariant={
          animationIndex === 2 || animationIndex === 3
            ? SCREEN_WAVES.assignment
            : null
        }>
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
  icyCard: {
    backgroundColor: Colors.surface,
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.45),
    marginBottom: hp(1.5),
    ...elevation.card,
  },
  headerIcy: {
    alignItems: 'center',
    minHeight: hp(6.4),
  },
  iconSlotIcy: {
    width: wp(15),
    height: wp(15),
    marginRight: wp(2.2),
  },
  titleIcy: {
    color: Colors.textPrimary,
    fontSize: Fontsize.sm1,
  },
  metaIcy: {
    color: Colors.textSecondary,
    marginTop: hp(0.2),
  },
  pendingBadgeIcy: {
    backgroundColor: Colors.hubCard,
    marginRight: wp(1.5),
  },
  pendingTextIcy: {
    color: Colors.brandNavy,
  },
  listIcy: {
    marginTop: hp(1.2),
    paddingTop: hp(1.2),
    borderTopColor: Colors.borderSubtle,
  },
});
