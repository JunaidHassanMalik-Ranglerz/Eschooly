import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import ExamOverviewCard from '../../Component/ExamOverviewCard';
import ExamNextExamCard from '../../Component/ExamNextExamCard';
import ExamHistoryItem from '../../Component/ExamHistoryItem';
import ExamDateRangeBox from '../../Component/ExamDateRangeBox';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import AnimatedCard from '../../Component/AnimatedCard';
import Btn from '../../Component/btn';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings, EXAM_HISTORY, EXAM_STUDENTS} from '../../Constants/Strings';
import {ATTENDANCE_STUDENTS, getExamStudentForChild} from '../../Constants/dummydata';
import {EXAM_STAT_GRADIENTS} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {showToast} from '../../utils/toast';
import {fetchStudentExam, fetchStudentExams} from '../../store/slices/studentHomeSlice';

const DEFAULT_START = new Date(2025, 10, 13);
const DEFAULT_END = new Date(2025, 10, 21);
const EXAM_WAVES = [SCREEN_WAVES.results, null, null, null];
const EMPTY_OVERVIEW = {
  totalExams: '',
  averageScore: '',
  highestScore: '',
  lowestScore: '',
};

const toDateKey = date => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const Exam = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const icy = true;
  const bottomPad = useStackBottomPad();
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [pickedChildId, setPickedChildId] = useState(ATTENDANCE_STUDENTS[0]?.value);
  const [studentExams, setStudentExams] = useState({
    overview: EMPTY_OVERVIEW,
    nextExam: null,
    history: [],
  });
  const [loading, setLoading] = useState(!isParent);
  const [showHistory, setShowHistory] = useState(false);
  const [startDate, setStartDate] = useState(isParent ? DEFAULT_START : null);
  const [endDate, setEndDate] = useState(isParent ? DEFAULT_END : null);

  const parentChild =
    ATTENDANCE_STUDENTS.find(item => item.value === pickedChildId) || ATTENDANCE_STUDENTS[0];
  const examStudent = isParent
    ? getExamStudentForChild(parentChild, EXAM_STUDENTS)
    : {
        ...EMPTY_OVERVIEW,
        ...studentExams.overview,
        nextExamSubject: studentExams.nextExam?.subject || '',
        nextExamDate: studentExams.nextExam?.date || '',
        nextExamTime: studentExams.nextExam?.time || '',
      };
  const bannerStudent = isParent
    ? parentChild
    : {
        label: homeStudent?.label || '',
        classInfo: homeStudent?.className || homeStudent?.classLabel || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        photoUrl: homeStudent?.photoUrl || '',
      };
  const students = isParent ? ATTENDANCE_STUDENTS : [];
  const studentLabel = isParent ? Strings.child : Strings.student;
  const range = useMemo(() => {
    if (isParent || !startDate || !endDate) {
      return null;
    }
    return {from: toDateKey(startDate), to: toDateKey(endDate)};
  }, [endDate, isParent, startDate]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchStudentExams(range))
      .unwrap()
      .then(payload => {
        if (active) {
          setStudentExams(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentExams({overview: EMPTY_OVERVIEW, nextExam: null, history: []});
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load exams.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [dispatch, isParent, range]);

  const filteredHistory = useMemo(() => {
    if (!isParent) {
      return studentExams.history;
    }
    if (!startDate || !endDate) {
      return EXAM_HISTORY;
    }
    const startKey = toDateKey(startDate);
    const endKey = toDateKey(endDate);
    return EXAM_HISTORY.filter(
      item => item.dateISO >= startKey && item.dateISO <= endKey,
    );
  }, [endDate, isParent, startDate, studentExams.history]);

  const openExamDetail = item => {
    if (isParent || !item?.id) {
      return;
    }
    dispatch(fetchStudentExam(item.id))
      .unwrap()
      .then(detail => {
        setStudentExams(current => ({
          ...current,
          history: current.history.map(row =>
            row.id === detail.id ? {...row, ...detail} : row,
          ),
        }));
      })
      .catch(error => {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load exam.',
        });
      });
  };

  const overviewValue = (value, loadingValue = '—') =>
    loading && !isParent ? loadingValue : value || (isParent ? value : '');

  const overviewGrid = (
    <View style={styles.overviewGrid}>
      <ExamOverviewCard
        icon="document-text-outline"
        iconBg={Colors.whiteOverlay22}
        iconColor={Colors.white}
        label={Strings.totalExams}
        value={overviewValue(examStudent.totalExams)}
        trendIcon="pulse-outline"
        premium
        animationIndex={3}
        colors={EXAM_STAT_GRADIENTS[0]}
        waveVariant={EXAM_WAVES[0]}
      />
      <ExamOverviewCard
        icon="stats-chart-outline"
        iconBg={Colors.whiteOverlay22}
        iconColor="#86EFAC"
        label={Strings.averageScore}
        value={overviewValue(examStudent.averageScore)}
        percent={Boolean(overviewValue(examStudent.averageScore))}
        trendIcon="bar-chart-outline"
        premium
        animationIndex={4}
        colors={EXAM_STAT_GRADIENTS[1]}
      />
      <ExamOverviewCard
        icon="trending-up-outline"
        iconBg={Colors.whiteOverlay22}
        iconColor="#FCD34D"
        label={Strings.highestScore}
        value={overviewValue(examStudent.highestScore)}
        percent={Boolean(overviewValue(examStudent.highestScore))}
        trendIcon="arrow-up-outline"
        premium
        animationIndex={5}
        colors={EXAM_STAT_GRADIENTS[2]}
      />
      <ExamOverviewCard
        icon="trending-down-outline"
        iconBg={Colors.whiteOverlay22}
        iconColor="#FCA5A5"
        label={Strings.lowestScore}
        value={overviewValue(examStudent.lowestScore)}
        percent={Boolean(overviewValue(examStudent.lowestScore))}
        trendIcon="arrow-down-outline"
        premium
        animationIndex={6}
        colors={EXAM_STAT_GRADIENTS[3]}
      />
    </View>
  );

  const nextExamCard =
    isParent || examStudent.nextExamSubject ? (
      <ExamNextExamCard
        subject={examStudent.nextExamSubject}
        date={examStudent.nextExamDate}
        time={examStudent.nextExamTime}
        animationIndex={7}
      />
    ) : null;

  const historyPanel = showHistory ? (
    <View>
      <AnimatedCard
        index={0}
        style={[styles.historyHeader, icy && styles.historyHeaderIcy]}>
        <View style={styles.historyHeaderText}>
          <Text
            style={[styles.historyTitle, icy && styles.historyTitleIcy]}
            numberOfLines={1}>
            {Strings.examHistory}
          </Text>
          <Text
            style={[styles.historySub, icy && styles.historySubIcy]}
            numberOfLines={2}>
            {Strings.recentAcademicResults}
          </Text>
        </View>
        <Image
          source={Images.recentCalendar}
          style={[styles.recentCalendarIcon, icy && styles.recentCalendarIconIcy]}
          resizeMode="contain"
        />
      </AnimatedCard>
      <ExamDateRangeBox
        startDate={startDate}
        endDate={endDate}
        animationIndex={1}
        onApply={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
    </View>
  ) : null;

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={false}>
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <StudentBrandedHeader
                title={Strings.exam}
                unreadCount={unreadNotifications}
                subtitle={
                  isParent
                    ? Strings.examsSubtitleParent
                    : Strings.examsSubtitleStudent
                }
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  <AttendanceStudentDropdown
                    animationIndex={1}
                    student={bannerStudent}
                    students={students}
                    selectedId={isParent ? pickedChildId : undefined}
                    premium
                    embedded
                    readOnly={!isParent || students.length <= 1}
                    look="float"
                    label={studentLabel}
                    onSelect={isParent ? item => setPickedChildId(item.value) : undefined}
                  />
                  <ProfileSectionTitle animationIndex={2} style={styles.sectionIcy}>
                    {Strings.examOverview}
                  </ProfileSectionTitle>
                  {loading ? (
                    <ActivityIndicator
                      style={styles.loader}
                      size="large"
                      color={Colors.brandRoyal}
                    />
                  ) : (
                    <>
                      {overviewGrid}
                      {nextExamCard}
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.historyCta}
                    activeOpacity={0.85}
                    onPress={() => setShowHistory(!showHistory)}>
                    <Icon
                      name={showHistory ? 'eye-off-outline' : 'time-outline'}
                      size={wp(4.6)}
                      color={Colors.white}
                    />
                    <Text style={styles.historyCtaText}>
                      {showHistory ? Strings.hideHistory : Strings.examHistory}
                    </Text>
                  </TouchableOpacity>
                  {historyPanel}
                  {showHistory && loading ? (
                    <ActivityIndicator
                      style={styles.loader}
                      size="large"
                      color={Colors.brandRoyal}
                    />
                  ) : null}
                  {showHistory && !loading
                    ? filteredHistory.map((item, index) => (
                        <ExamHistoryItem
                          key={item.id}
                          item={item}
                          animationIndex={index + 2}
                          onPress={() => openExamDetail(item)}
                        />
                      ))
                    : null}
                  {showHistory && !loading && filteredHistory.length === 0 ? (
                    <Text style={[styles.empty, styles.emptyIcy]}>
                      {Strings.noResultsInRange}
                    </Text>
                  ) : null}
                  {showHistory ? (
                    <TouchableOpacity
                      style={[styles.historyCta, styles.downloadCtaIcy]}
                      activeOpacity={0.85}
                      onPress={() => {}}>
                      <Icon
                        name="document-outline"
                        size={wp(4.6)}
                        color={Colors.white}
                      />
                      <Text style={styles.historyCtaText}>
                        {Strings.downloadPdf}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.results}
        notificationCount={1}
        navyBack
      />

      <View style={styles.dropdownWrap}>
        <AttendanceStudentDropdown
          animationIndex={1}
          student={bannerStudent}
          students={students}
          selectedId={pickedChildId}
          premium
          embedded
          onSelect={item => setPickedChildId(item.value)}
          readOnly={students.length <= 1}
          label={studentLabel}
        />
      </View>

      <ScrollEnterFlatList
        data={showHistory && !loading ? filteredHistory : []}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ExamHistoryItem
            item={item}
            animationIndex={index + 2}
            onPress={undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: hp(5) + Math.max(insets.bottom, hp(1.5))},
        ]}
        ListHeaderComponent={
          <View>
            <ProfileSectionTitle animationIndex={2}>
              {Strings.resultOverview}
            </ProfileSectionTitle>
            {overviewGrid}
            {nextExamCard}
            <Btn
              title={showHistory ? Strings.hideHistory : Strings.examHistory}
              icon={showHistory ? 'eye-off-outline' : 'time-outline'}
              style={styles.historyBtn}
              animationIndex={8}
              onPress={() => setShowHistory(!showHistory)}
            />
            {historyPanel}
          </View>
        }
        ListEmptyComponent={
          showHistory && !loading ? (
            <Text style={styles.empty}>{Strings.noResultsInRange}</Text>
          ) : null
        }
        ListFooterComponent={
          showHistory ? (
            <View style={styles.footerWrap}>
              <Btn
                title={Strings.downloadPdf}
                icon="document-outline"
                style={styles.downloadBtn}
                animationIndex={filteredHistory.length + 2}
                onPress={() => {}}
              />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(Exam, 'exam');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(5),
    flexGrow: 1,
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    marginTop: -hp(0.6),
    zIndex: 20,
    elevation: 20,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  historyBtn: {
    marginTop: hp(1.6),
    marginBottom: hp(0.8),
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
  },
  historyHeaderText: {
    flex: 1,
    marginRight: wp(2),
  },
  historyTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(4),
    marginBottom: hp(0.1),
  },
  historySub: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
  recentCalendarIcon: {
    width: wp(5),
    height: wp(5),
  },
  footerWrap: {
    marginTop: hp(1.2),
    paddingBottom: hp(1.2),
  },
  downloadBtn: {
    marginTop: 0,
  },
  empty: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.s,
    textAlign: 'center',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  loader: {
    marginVertical: hp(3),
  },
  scrollArea: {
    flex: 1,
    overflow: 'visible',
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    borderBottomRightRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  sectionIcy: {
    color: Colors.brandNavy,
  },
  historyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandNavy,
    borderRadius: radius.pill,
    paddingVertical: hp(1.15),
    paddingHorizontal: wp(4),
    minHeight: hp(5.2),
    marginTop: hp(0.4),
    marginBottom: hp(1.45),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.brandRoyal,
    ...elevation.banner,
  },
  downloadCtaIcy: {
    marginTop: hp(0.6),
    marginBottom: hp(0.4),
  },
  historyCtaText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.6),
  },
  historyHeaderIcy: {
    marginTop: hp(0.2),
    marginBottom: hp(1.2),
    alignItems: 'center',
  },
  historyTitleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  historySubIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
  },
  recentCalendarIconIcy: {
    tintColor: Colors.brandRoyal,
    width: wp(6),
    height: wp(6),
  },
  emptyIcy: {
    color: Colors.textSecondary,
  },
});
