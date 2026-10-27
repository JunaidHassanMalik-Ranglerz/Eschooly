import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
  const expanded = props?.expanded;
  const type = assignment?.type || 'homework';
  const status = assignment?.status || 'pending';
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <View style={[styles.card, premium && styles.cardPremium]}>
      <TouchableOpacity
        style={styles.mainRow}
        activeOpacity={props?.onPress ? 0.85 : 1}
        disabled={!props?.onPress}
        onPress={props?.onPress}>
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

          {assignment?.teacher ? (
            <View style={styles.metaRow}>
              <Icon
                name="person-outline"
                size={wp(3.2)}
                color={premium ? Colors.whiteMuted75 : Colors.grayText}
              />
              <Text
                style={[styles.metaText, premium && styles.metaTextPremium]}
                numberOfLines={1}>
                {assignment.teacher}
              </Text>
            </View>
          ) : null}

          {assignment?.dueDate ? (
            <View style={styles.metaRow}>
              <Icon
                name="calendar-outline"
                size={wp(3.2)}
                color={premium ? Colors.whiteMuted75 : Colors.grayText}
              />
              <Text
                style={[styles.metaText, premium && styles.metaTextPremium]}
                numberOfLines={1}>
                {Strings.dueDate}: {assignment.dueDate}
              </Text>
            </View>
          ) : null}

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
      </TouchableOpacity>

      {expanded ? (
        <View style={styles.detailWrap}>
          {props?.loading ? (
            <ActivityIndicator size="small" color={premium ? Colors.white : Colors.primary} />
          ) : null}
          {assignment?.description ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {assignment.description}
            </Text>
          ) : null}
          {assignment?.grade || assignment?.score ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.gradeLabel}
              {assignment.grade ? `: ${assignment.grade}` : ''}
              {assignment.score ? `  ${assignment.score}` : ''}
            </Text>
          ) : null}
          {assignment?.attachments?.map(file => (
            <TouchableOpacity
              key={file.id}
              style={styles.fileRow}
              activeOpacity={0.85}
              onPress={() => props?.onAttachmentPress?.(file)}>
              <Icon
                name="download-outline"
                size={wp(4)}
                color={premium ? Colors.white : Colors.primary}
              />
              <Text
                style={[styles.fileText, premium && styles.detailTextPremium]}
                numberOfLines={1}>
                {file.name}
              </Text>
            </TouchableOpacity>
          ))}
          {props?.canSubmit ? (
            <>
              <TextInput
                style={[styles.notesInput, premium && styles.notesInputPremium]}
                placeholder={Strings.assignmentNotes}
                placeholderTextColor={premium ? Colors.whiteMuted75 : Colors.grayText}
                value={props?.notes}
                onChangeText={props?.onNotesChange}
                multiline
              />
              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                disabled={props?.submitting}
                onPress={props?.onSubmit}>
                {props?.submitting ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.submitText}>
                    {assignment?.status === 'submitted'
                      ? Strings.updateSubmission
                      : Strings.submitAssignment}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default AssignmentItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    overflow: 'hidden',
    padding: wp(3),
    marginBottom: hp(1),
  },
  cardPremium: {
    backgroundColor: Colors.whiteOverlay18,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  detailWrap: {
    marginTop: hp(1.2),
  },
  detailText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.6),
  },
  detailTextPremium: {
    color: Colors.whiteMuted85,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  fileText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.5),
    flex: 1,
  },
  notesInput: {
    minHeight: hp(6),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.6),
    textAlignVertical: 'top',
  },
  notesInputPremium: {
    borderColor: Colors.whiteOverlay22,
    color: Colors.white,
  },
  submitBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    marginTop: hp(1),
  },
  submitText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
