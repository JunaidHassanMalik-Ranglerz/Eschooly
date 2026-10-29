import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
  errorCodes,
  isErrorWithCode,
  keepLocalCopy,
  pick,
  types,
} from '@react-native-documents/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {showToast} from '../../utils/toast';
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

const MetaLine = ({icon, value, premium}) => {
  if (!value) {
    return null;
  }
  return (
    <View style={styles.metaRow}>
      <Icon
        name={icon}
        size={wp(3.2)}
        color={premium ? Colors.whiteMuted75 : Colors.grayText}
      />
      <Text style={[styles.metaText, premium && styles.metaTextPremium]}>
        {value}
      </Text>
    </View>
  );
};

const AssignmentItem = props => {
  const assignment = props?.assignment;
  const premium = props?.premium;
  const expanded = props?.expanded;
  const [notes, setNotes] = useState(props?.notes || '');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setNotes(props?.notes || '');
  }, [props?.notes]);

  const pickFiles = async () => {
    try {
      const picked = await pick({
        allowMultiSelection: true,
        type: [types.allFiles],
      });
      const copies = await keepLocalCopy({
        destination: 'cachesDirectory',
        files: picked.map(file => ({
          uri: file.uri,
          fileName: file.name || 'attachment',
        })),
      });
      const bySource = new Map(
        copies.map(copy => [copy.sourceUri, copy]),
      );
      const next = picked
        .map(file => {
          const copy = bySource.get(file.uri);
          const uri =
            copy?.status === 'success' ? copy.localUri : file.uri;
          if (!uri) {
            return null;
          }
          return {
            uri,
            name: file.name || 'attachment',
            type: file.type || 'application/octet-stream',
          };
        })
        .filter(Boolean);
      if (next.length) {
        setFiles(current => [...current, ...next]);
      }
    } catch (error) {
      if (
        isErrorWithCode(error) &&
        error.code === errorCodes.OPERATION_CANCELED
      ) {
        return;
      }
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to attach this file.',
      });
    }
  };
  const type = assignment?.type || 'homework';
  const status = assignment?.status || 'pending';
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const obtained = assignment?.obtained;
  const total = assignment?.total;
  const marksPreview =
    obtained && total
      ? `${obtained}/${total}`
      : obtained || total || assignment?.score || '';
  const marksHeading =
    obtained && total
      ? Strings.marksLabel
      : obtained
        ? Strings.obtainedMarks
        : total
          ? Strings.totalMarks
          : Strings.marksLabel;
  const classLine = assignment?.className
    ? assignment?.sectionName
      ? `${Strings.classLabel}: ${assignment.className}  ${Strings.section}: ${assignment.sectionName}`
      : `${Strings.classLabel}: ${assignment.className}`
    : assignment?.sectionName
      ? `${Strings.section}: ${assignment.sectionName}`
      : '';
  const hasResult = Boolean(assignment?.grade || marksPreview);
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

          <MetaLine
            icon="person-outline"
            value={assignment?.teacher}
            premium={premium}
          />
          <MetaLine
            icon="calendar-outline"
            value={
              assignment?.dueDate
                ? `${Strings.dueDate}: ${assignment.dueDate}`
                : ''
            }
            premium={premium}
          />
          {hasResult ? (
            <MetaLine
              icon="ribbon-outline"
              value={`${marksPreview ? `${marksHeading}: ${marksPreview}` : ''}${
                assignment?.grade
                  ? `${marksPreview ? '  ' : ''}${Strings.gradeLabel}: ${assignment.grade}`
                  : ''
              }`}
              premium={premium}
            />
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
          {assignment?.instructions ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {assignment.instructions}
            </Text>
          ) : null}
          <MetaLine
            icon="time-outline"
            value={
              assignment?.assignedAt
                ? `${Strings.assignedDate}: ${assignment.assignedAt}`
                : ''
            }
            premium={premium}
          />
          <MetaLine
            icon="school-outline"
            value={classLine}
            premium={premium}
          />
          {obtained ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.obtainedMarks}: {obtained}
            </Text>
          ) : null}
          {total ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.totalMarks}: {total}
            </Text>
          ) : null}
          {assignment?.grade ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.gradeLabel}: {assignment.grade}
            </Text>
          ) : null}
          {assignment?.feedback ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.feedbackLabel}: {assignment.feedback}
            </Text>
          ) : null}
          {assignment?.attachments?.map(file => {
            const downloading = props?.downloadingFileId === file.id;
            return (
              <TouchableOpacity
                key={file.id}
                style={styles.fileRow}
                activeOpacity={0.85}
                disabled={Boolean(props?.downloadingFileId)}
                onPress={() => props?.onAttachmentPress?.(file)}>
                {downloading ? (
                  <ActivityIndicator
                    size="small"
                    color={premium ? Colors.white : Colors.primary}
                  />
                ) : (
                  <Icon
                    name="download-outline"
                    size={wp(4)}
                    color={premium ? Colors.white : Colors.primary}
                  />
                )}
                <Text
                  style={[styles.fileText, premium && styles.detailTextPremium]}
                  numberOfLines={1}>
                  {file.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          {status === 'submitted' && (assignment?.notes || notes) ? (
            <Text style={[styles.detailText, premium && styles.detailTextPremium]}>
              {Strings.assignmentNotes}: {assignment?.notes || notes}
            </Text>
          ) : null}
          {props?.canSubmit && status !== 'submitted' ? (
            <>
              <TextInput
                style={[styles.notesInput, premium && styles.notesInputPremium]}
                placeholder={Strings.assignmentNotes}
                placeholderTextColor={premium ? Colors.whiteMuted75 : Colors.grayText}
                value={notes}
                onChangeText={setNotes}
                multiline
                blurOnSubmit={false}
                onFocus={props?.onNotesFocus}
              />
              {files.map((file, index) => (
                <View
                  key={`${file.uri || file.fileCopyUri || file.name}-${index}`}
                  style={styles.fileRow}>
                  <Icon
                    name="document-attach-outline"
                    size={wp(4)}
                    color={premium ? Colors.white : Colors.primary}
                  />
                  <Text
                    style={[styles.fileText, premium && styles.detailTextPremium]}
                    numberOfLines={1}>
                    {file.name || Strings.attachFile}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      setFiles(current => current.filter((_, itemIndex) => itemIndex !== index))
                    }>
                    <Icon
                      name="close"
                      size={wp(4.2)}
                      color={premium ? Colors.whiteMuted75 : Colors.grayText}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.fileRow}
                activeOpacity={0.85}
                disabled={props?.submitting}
                onPress={pickFiles}>
                <Icon
                  name="attach-outline"
                  size={wp(4)}
                  color={premium ? Colors.white : Colors.primary}
                />
                <Text
                  style={[styles.fileText, premium && styles.detailTextPremium]}>
                  {Strings.attachFile}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                disabled={props?.submitting}
                onPress={() => props?.onSubmit?.(notes, files)}>
                {props?.submitting ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.submitText}>{Strings.submitAssignment}</Text>
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
    zIndex: 1,
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
