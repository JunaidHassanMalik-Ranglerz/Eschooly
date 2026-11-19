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
  View,
} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import EschoolyScreenShell from '../../Component/Glass/EschoolyScreenShell';
import AssignmentOverviewCard from '../../Component/Assignment/AssignmentOverviewCard';
import AssignmentSubjectCard from '../../Component/Assignment/AssignmentSubjectCard';
import AssignmentHeroBanner from '../../Component/Assignment/AssignmentHeroBanner';
import AssignmentStudentHeader from '../../Component/Assignment/AssignmentStudentHeader';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {showToast} from '../../utils/toast';
import {
  fetchStudentAssignmentDetail,
  fetchStudentAssignments,
  sendStudentAssignmentSubmission,
} from '../../store/slices/studentHomeSlice';
import {studentAssignmentAttachmentDownloadUrl} from '../../services/studentAssignmentDocument';
import {fetchChildDashboard} from '../../store/slices/parentHomeSlice';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';

const Assignment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const icy = true;
  const bottomPad = useStackBottomPad();
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const {
    activeStudent,
    assignmentSubjects,
    assignmentOverview,
    canSwitchChild: roleCanSwitch,
    childList,
    selectedChildId: roleChildId,
    setSelectedChildId,
  } = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(
    state => state.parentHome,
  );
  const activeChildId = homeChildId || children[0]?.value || roleChildId || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) ||
    childList.find(item => item.value === String(activeChildId)) ||
    children[0] ||
    childList[0] ||
    null;
  const shownChild = isParent ? parentChild || activeStudent : activeStudent;
  const canSwitchChild = isParent
    ? children.length > 1 || childList.length > 1
    : roleCanSwitch;
  const switchList = children.length ? children : childList;
  const [openSubjectId, setOpenSubjectId] = useState(null);
  const [openAssignmentId, setOpenAssignmentId] = useState(null);
  const [studentOverview, setStudentOverview] = useState(null);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [detailById, setDetailById] = useState({});
  const [notesById, setNotesById] = useState({});
  const [loadingAssignmentId, setLoadingAssignmentId] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [loading, setLoading] = useState(!isParent);
  const [refreshing, setRefreshing] = useState(false);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const listRef = useRef(null);
  const overview = isParent ? assignmentOverview : studentOverview;
  const subjects = isParent ? assignmentSubjects : studentSubjects;
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

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const handleSelectChild = useCallback(
    nextId => {
      if (!nextId || String(nextId) === String(activeChildId)) {
        return;
      }
      if (isParent) {
        dispatch(fetchChildDashboard(nextId));
      }
      setSelectedChildId(String(nextId));
    },
    [activeChildId, dispatch, isParent, setSelectedChildId],
  );

  const switchModal = canSwitchChild ? (
    <ChildSwitchModal
      visible={switchVisible}
      childrenList={switchList}
      selectedId={String(activeChildId || shownChild?.value || '')}
      onSelect={handleSelectChild}
      onClose={() => setSwitchVisible(false)}
      replayToken={modalReplay}
    />
  ) : null;

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
          item.id === assignmentId
            ? {
                ...item,
                ...extra,
                grade: extra.grade || item.grade,
                score: extra.score || item.score,
                obtained: extra.obtained || item.obtained,
                total: extra.total || item.total,
                feedback: extra.feedback || item.feedback,
                assignedAt: extra.assignedAt || item.assignedAt,
                instructions: extra.instructions || item.instructions,
              }
            : item,
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

  const handleAttachment = (assignment, file) => {
    if (!assignment?.id || !file?.id) {
      return;
    }
    navigation.navigate('PdfViewer', {
      pdfUrl: studentAssignmentAttachmentDownloadUrl(assignment.id, file.id),
      title: file.name || Strings.assignment,
    });
  };

  const handleSubmit = (assignment, notes, files = []) => {
    if (
      submittingId ||
      !assignment?.id ||
      assignment.status === 'submitted'
    ) {
      return;
    }
    const trimmed = String(notes || '').trim();
    const attachments = Array.isArray(files) ? files.filter(file => file?.uri || file?.fileCopyUri) : [];
    if (!trimmed && !attachments.length) {
      showToast({type: 'error', text1: Strings.assignmentSubmitRequired});
      return;
    }
    setSubmittingId(assignment.id);
    setNotesById(current => ({...current, [assignment.id]: trimmed}));
    dispatch(
      sendStudentAssignmentSubmission({
        assignmentId: assignment.id,
        notes: trimmed,
        files: attachments,
      }),
    )
      .unwrap()
      .then(payload => {
        mergeAssignment(assignment.id, payload);
        showToast({
          type: 'success',
          text1: Strings.submitted,
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

  const list = (
      <ScrollEnterFlatList
        ref={listRef}
        data={loading && !isParent ? [] : subjects}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        automaticallyAdjustKeyboardInsets
        bounces={!icy}
        overScrollMode={icy ? 'never' : 'auto'}
        removeClippedSubviews={false}
        contentContainerStyle={[
          icy ? styles.studentList : styles.content,
          {paddingBottom: keyboardInset ? keyboardInset + hp(2) : bottomPad},
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
          icy ? (
            <>
              <EschoolyScreenShell.Header>
                <AssignmentStudentHeader
                  student={isParent ? shownChild : homeStudent}
                  unreadCount={unreadNotifications}
                  roleLabel={isParent ? Strings.child : undefined}
                />
              </EschoolyScreenShell.Header>
              <EschoolyScreenShell.Body>
                <AssignmentHeroBanner />
                {isParent ? (
                  <SelectedChildBanner
                    child={shownChild}
                    variant="large"
                    icy
                    disableEnterAnimation
                    compactMargin
                    canSwitch={canSwitchChild}
                    onSwitchPress={canSwitchChild ? openSwitch : undefined}
                  />
                ) : null}
                {loading ? (
                  <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color={Colors.primary}
                  />
                ) : (
                  <AssignmentOverviewCard
                    overview={overview}
                    premium
                    animationIndex={1}
                  />
                )}
              </EschoolyScreenShell.Body>
            </>
          ) : (
            <>
              <SelectedChildBanner
                child={shownChild}
                canSwitch={canSwitchChild}
                onSwitchPress={canSwitchChild ? openSwitch : undefined}
                animationIndex={1}
              />
              <AssignmentOverviewCard
                overview={overview}
                premium
                animationIndex={2}
              />
            </>
          )
        }
        ListEmptyComponent={
          !isParent && !loading && subjects.length === 0 ? (
            <Text
              style={[
                styles.emptyText,
                icy && styles.emptyTextStudent,
                icy && styles.emptyPad,
              ]}>
              {Strings.noHomework}
            </Text>
          ) : null
        }
        renderItem={({item, index}) => (
          <View style={icy ? styles.studentItem : null}>
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
              onAssignmentPress={isParent ? undefined : openAssignment}
              onAttachmentPress={isParent ? undefined : handleAttachment}
              onSubmit={isParent ? undefined : handleSubmit}
              onNotesFocus={isParent ? undefined : scrollNotesIntoView}
              onToggle={() =>
                setOpenSubjectId(openSubjectId === item.id ? null : item.id)
              }
            />
          </View>
        )}
      />
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice" bottomInsetMode="stack">
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {list}
          </KeyboardAvoidingView>
          {switchModal}
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar
          backgroundColor={Colors.parentBg}
          barStyle="dark-content"
        />
        <MainHeaderComponent
          title={Strings.assignment}
          notificationCount={1}
          navyBack
        />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {list}
        </KeyboardAvoidingView>
        {switchModal}
      </SafeAreaView>
    </StudentToneProvider>
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
    paddingTop: hp(1.4),
    paddingBottom: hp(3),
  },
  studentList: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentItem: {
    paddingHorizontal: spacing.md,
  },
  emptyPad: {
    paddingHorizontal: spacing.md,
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
  emptyTextStudent: {
    color: Colors.textSecondary,
  },
});
