import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const TYPE_ICONS = {
  homework: 'document-text-outline',
  project: 'folder-open-outline',
  quiz: 'help-circle-outline',
  lab: 'flask-outline',
};

const TYPE_LABELS = {
  homework: Strings.homework,
  project: Strings.project,
  quiz: Strings.quiz,
  lab: Strings.labWork,
};

const STATUS_STYLES = {
  pending: {
    bg: Colors.pendingBg,
    text: Colors.warning,
    label: Strings.pending,
  },
  submitted: {
    bg: Colors.successBg,
    text: Colors.success,
    label: Strings.submitted,
  },
  overdue: {
    bg: Colors.overdueBg,
    text: Colors.red,
    label: Strings.overdue,
  },
};

const AssignmentItem = props => {
  const assignment = props?.assignment;
  const premium = props?.premium;
  const type = assignment?.type || 'homework';
  const status = assignment?.status || 'pending';
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <View style={[styles.card, premium && styles.cardPremium]}>
      <View style={styles.iconSlot}>
        <Icon
          name={TYPE_ICONS[type] || TYPE_ICONS.homework}
          size={wp(5.5)}
          color={premium ? Colors.iconSky : Colors.primary}
        />
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, premium && styles.titlePremium]}
          numberOfLines={2}>
          {assignment?.title}
        </Text>

        <View style={styles.metaRow}>
          <Icon
            name="person-outline"
            size={wp(3.2)}
            color={premium ? Colors.whiteMuted75 : Colors.grayText}
          />
          <Text
            style={[styles.metaText, premium && styles.metaTextPremium]}
            numberOfLines={1}>
            {assignment?.teacher}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Icon
            name="calendar-outline"
            size={wp(3.2)}
            color={premium ? Colors.whiteMuted75 : Colors.grayText}
          />
          <Text
            style={[styles.metaText, premium && styles.metaTextPremium]}
            numberOfLines={1}>
            {Strings.dueDate}: {assignment?.dueDate}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          {type !== 'homework' ? (
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{TYPE_LABELS[type]}</Text>
            </View>
          ) : (
            <View />
          )}

          <View style={[styles.statusBadge, {backgroundColor: statusStyle.bg}]}>
            <Text style={[styles.statusText, {color: statusStyle.text}]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssignmentItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    overflow: 'hidden',
    padding: wp(3),
    marginBottom: hp(1),
  },
  cardPremium: {
    backgroundColor: Colors.whiteOverlay18,
  },
  iconSlot: {
    width: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  content: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginBottom: hp(0.6),
  },
  titlePremium: {
    color: Colors.white,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.3),
  },
  metaText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.2),
    flex: 1,
  },
  metaTextPremium: {
    color: Colors.whiteMuted75,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.6),
  },
  typeBadge: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  statusBadge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
  },
  statusText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
  },
});
