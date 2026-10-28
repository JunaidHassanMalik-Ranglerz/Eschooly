import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AssignmentOverviewCard from '../../Component/Assignment/AssignmentOverviewCard';
import AssignmentSubjectCard from '../../Component/Assignment/AssignmentSubjectCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {showToast} from '../../utils/toast';
import {
  fetchStudentAssignmentDetail,
  fetchStudentAssignments,
  sendStudentAssignmentSubmission,
} from '../../store/slices/studentHomeSlice';
import {downloadStudentAssignmentAttachment} from '../../services/studentService';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';

const Assignment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const homeStudent = useSelector(state => state.studentHome.student);
  const {
    activeStudent,
    assignmentSubjects,
    assignmentOverview,
    canSwitchChild,
    studentLabel,
  } = useRoleData();
  const [openSubjectId, setOpenSubjectId] = useState(null);
  const [openAssignmentId, setOpenAssignmentId] = useState(null);
  const [studentOverview, setStudentOverview] = useState(null);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [detailById, setDetailById] = useState({});
  const [notesById, setNotesById] = useState({});
  const [loadingAssignmentId, setLoadingAssignmentId] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [downloadingFileId, setDownloadingFileId] = useState(null);
  const [loading, setLoading] = useState(!isParent);
  const [refreshing, setRefreshing] = useState(false);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const listRef = useRef(null);
  const overview = isParent ? assignmentOverview : studentOverview;
  const subjects = isParent ? assignmentSubjects : studentSubjects;
  const bannerChild = {
    label: homeStudent?.label || '',
    classInfo: homeStudent?.className || homeStudent?.classLabel || '',
    classLabel: homeStudent?.classLabel || homeStudent?.className || '',
    className: homeStudent?.className || '',
    photoUrl: homeStudent?.photoUrl || '',
    rollNo: homeStudent?.rollNo || '',
  };

  const loadAssignments = useCallback(
    (isRefresh = false) => {
      if (isParent) {
        return undefined;
      }

      let active = true;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      dispatch(fetchStudentAssignments())
        .unwrap()
        .then(result => {
          if (!active) {
            return;
          }
          setStudentOverview(result.overview);
          setStudentSubjects(result.subjects);
          if (isRefresh) {
            setDetailById({});
            setOpenAssignmentId(null);
          }
        })
        .catch(error => {
          if (!active) {
            return;
          }
          if (!isRefresh) {
            setStudentOverview({total: 0, pending: 0, submitted: 0, overdue: 0});
            setStudentSubjects([]);
          }
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load assignments.',
          });
        })
        .finally(() => {
          if (!active) {
            return;
          }
          setLoading(false);
          setRefreshing(false);
        });

      return () => {
        active = false;
      };
    },
    [dispatch, isParent],
  );

  useEffect(() => loadAssignments(false), [loadAssignments]);

  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      event => setKeyboardInset(event.endCoordinates.height),
    );
    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardInset(0),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const scrollNotesIntoView = useCallback(() => {
    const subjectIndex = subjects.findIndex(
      item =>
        item.id === openSubjectId ||
        (item.assignments || []).some(row => row.id === openAssignmentId),
    );
    if (subjectIndex < 0) {
      return;
    }
    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: subjectIndex,
        animated: true,
        viewPosition: 0,
      });
    }, Platform.OS === 'ios' ? 80 : 220);
  }, [openAssignmentId, openSubjectId, subjects]);

  const mergeAssignment = (assignmentId, extra) => {
    setStudentSubjects(current =>
      current.map(subject => ({
        ...subject,
        assignments: (subject.assignments || []).map(item =>
          item.id === assignmentId ? {...item, ...extra} : item,
        ),
        pendingCount: (subject.assignments || []).filter(item =>
          item.id === assignmentId
            ? (extra.status || item.status) === 'pending'
            : item.status === 'pending',
        ).length,
      })),
    );
    setDetailById(current => ({
      ...current,
      [assignmentId]: {...(current[assignmentId] || {}), ...extra},
    }));
  };

  const openAssignment = assignment => {
    if (isParent || !assignment?.id) {
      return;
    }
    if (openAssignmentId === assignment.id) {
      setOpenAssignmentId(null);
      return;
    }
    setOpenAssignmentId(assignment.id);
    if (detailById[assignment.id]) {
      return;
    }
    setLoadingAssignmentId(assignment.id);
    dispatch(fetchStudentAssignmentDetail(assignment.id))
      .unwrap()
      .then(detail => {
        mergeAssignment(assignment.id, detail);
        if (detail.notes) {
          setNotesById(current => ({...current, [assignment.id]: detail.notes}));
        }
      })
      .catch(error => {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load assignment.',
        });
      })
      .finally(() => {
        setLoadingAssignmentId(null);
      });
  };

  const handleAttachment = async (assignment, file) => {
    if (downloadingFileId || !file?.id) {
      return;
    }
    setDownloadingFileId(file.id);
    try {
      const downloaded = await downloadStudentAssignmentAttachment(
        assignment.id,
        file.id,
        file.name,
      );
      if (downloaded.savedToDevice) {
        showToast({
          type: 'success',
          text1: Strings.libraryDownloadSuccess,
        });
      }
      navigation.navigate('PdfViewer', {
        pdfUrl: downloaded.uri,
        title: file.name || Strings.assignment,
      });
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to download this file.',
      });
    } finally {
      setDownloadingFileId(null);
    }
  };

  const handleSubmit = (assignment, notes) => {
    if (submittingId) {
      return;
    }
    setSubmittingId(assignment.id);
    setNotesById(current => ({...current, [assignment.id]: notes || ''}));
    dispatch(
      sendStudentAssignmentSubmission({
        assignmentId: assignment.id,
        notes: notes || '',
        update: assignment.status === 'submitted',
      }),
    )
      .unwrap()
      .then(payload => {
        mergeAssignment(assignment.id, payload);
        showToast({
          type: 'success',
          text1:
            assignment.status === 'submitted'
              ? Strings.updateSubmission
              : Strings.submitted,
        });
      })
      .catch(error => {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to submit assignment.',
        });
      })
      .finally(() => {
        setSubmittingId(null);
      });
  };

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.assignment}
        notificationCount={1}
        navyBack
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollEnterFlatList
        ref={listRef}
        data={loading && !isParent ? [] : subjects}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        automaticallyAdjustKeyboardInsets
        bounces
        overScrollMode="auto"
        removeClippedSubviews={false}
        contentContainerStyle={[
          styles.content,
          keyboardInset ? {paddingBottom: keyboardInset + hp(2)} : null,
        ]}
        onScrollToIndexFailed={({index}) => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0,
            });
          }, 250);
        }}
        refreshControl={
          isParent ? undefined : (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadAssignments(true)}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          )
        }
        ListHeaderComponent={
          <>
            {isParent ? (
              <SelectedChildBanner
                child={activeStudent}
                canSwitch={canSwitchChild}
                animationIndex={1}
              />
            ) : (
              <AttendanceStudentDropdown
                student={bannerChild}
                premium
                embedded
                readOnly
                label={studentLabel}
              />
            )}
            {!isParent && loading ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.primary}
              />
            ) : (
              <AssignmentOverviewCard
                overview={overview}
                premium
                animationIndex={isParent ? 2 : 1}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !isParent && !loading && subjects.length === 0 ? (
            <Text style={styles.emptyText}>{Strings.noHomework}</Text>
          ) : null
        }
        renderItem={({item, index}) => (
          <AssignmentSubjectCard
            subject={item}
            open={openSubjectId === item.id}
            premium
            animationIndex={index + (isParent ? 3 : 2)}
            openAssignmentId={openAssignmentId}
            loadingAssignmentId={loadingAssignmentId}
            canSubmit={!isParent}
            notesById={notesById}
            submittingId={submittingId}
            downloadingFileId={downloadingFileId}
            onAssignmentPress={isParent ? undefined : openAssignment}
            onAttachmentPress={isParent ? undefined : handleAttachment}
            onSubmit={isParent ? undefined : handleSubmit}
            onNotesFocus={isParent ? undefined : scrollNotesIntoView}
            onToggle={() =>
              setOpenSubjectId(openSubjectId === item.id ? null : item.id)
            }
          />
        )}
      />
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default withScreenEnter(Assignment, 'assignment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  loader: {
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginTop: hp(2),
  },
});
