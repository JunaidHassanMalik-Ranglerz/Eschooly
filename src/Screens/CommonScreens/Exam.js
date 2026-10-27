import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ExamOverviewCard from '../../Component/ExamOverviewCard';
import ExamNextExamCard from '../../Component/ExamNextExamCard';
import ExamHistoryItem from '../../Component/ExamHistoryItem';
import ExamDateRangeBox from '../../Component/ExamDateRangeBox';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import AnimatedCard from '../../Component/AnimatedCard';
import Btn from '../../Component/btn';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings, EXAM_HISTORY, EXAM_STUDENTS} from '../../Constants/Strings';
import {ATTENDANCE_STUDENTS, getExamStudentForChild} from '../../Constants/dummydata';
import {EXAM_STAT_GRADIENTS} from '../../Constants/CardTheme';
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
  const homeStudent = useSelector(state => state.studentHome.student);
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={isParent ? Strings.results : Strings.exam}
        notificationCount={1}
        navyBack
      />

      <View style={styles.dropdownWrap}>
        <AttendanceStudentDropdown
          animationIndex={1}
          student={bannerStudent}
          students={students}
          selectedId={isParent ? pickedChildId : undefined}
          premium
          embedded
          onSelect={isParent ? item => setPickedChildId(item.value) : undefined}
          readOnly={!isParent || students.length <= 1}
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
            onPress={isParent ? undefined : () => openExamDetail(item)}
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
              {isParent ? Strings.resultOverview : Strings.examOverview}
            </ProfileSectionTitle>

            {loading && !isParent ? (
              <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
            ) : (
              <>
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

            {isParent || examStudent.nextExamSubject ? (
            <ExamNextExamCard
              subject={examStudent.nextExamSubject}
              date={examStudent.nextExamDate}
              time={examStudent.nextExamTime}
              animationIndex={7}
            />
            ) : null}
              </>
            )}

            <Btn
              title={showHistory ? Strings.hideHistory : Strings.examHistory}
              icon={showHistory ? 'eye-off-outline' : 'time-outline'}
              style={styles.historyBtn}
              animationIndex={8}
              onPress={() => setShowHistory(!showHistory)}
            />

            {showHistory ? (
              <View>
                <AnimatedCard index={0} style={styles.historyHeader}>
                  <View style={styles.historyHeaderText}>
                    <Text style={styles.historyTitle} numberOfLines={1}>
                      {Strings.examHistory}
                    </Text>
                    <Text style={styles.historySub} numberOfLines={2}>
                      {Strings.recentAcademicResults}
                    </Text>
                  </View>
                  <Image
                    source={Images.recentCalendar}
                    style={styles.recentCalendarIcon}
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
            ) : null}
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
});
