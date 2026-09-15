import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ExamOverviewCard from '../../Component/ExamOverviewCard';
import ExamNextExamCard from '../../Component/ExamNextExamCard';
import ExamHistoryItem from '../../Component/ExamHistoryItem';
import ExamDateRangeBox from '../../Component/ExamDateRangeBox';
import Btn from '../../Component/btn';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings, EXAM_STUDENTS, EXAM_HISTORY} from '../../Constants/Strings';
import {ATTENDANCE_STUDENTS} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const DEFAULT_START = new Date(2025, 10, 8);
const DEFAULT_END = new Date(2025, 10, 15);

const Exam = () => {
  const {studentLabel, isParent, selectedChildId, setSelectedChildId, activeStudent, childList} =
    useRoleData();
  const [showHistory, setShowHistory] = useState(false);
  const [startDate, setStartDate] = useState(DEFAULT_START);
  const [endDate, setEndDate] = useState(DEFAULT_END);
  const [student, setStudent] = useState(ATTENDANCE_STUDENTS[0]);
  const examStudent =
    EXAM_STUDENTS.find(item => item.value === selectedChildId) || EXAM_STUDENTS[0];
  const dropdownStudent = isParent ? activeStudent : student;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent title={isParent ? Strings.results : Strings.exam} notificationCount={1} />

      <View style={styles.dropdownWrap}>
        <AttendanceStudentDropdown
          student={dropdownStudent}
          students={isParent ? childList : ATTENDANCE_STUDENTS}
          selectedId={selectedChildId}
          onSelect={item => {
            setSelectedChildId(item.value);
            setStudent(item);
          }}
          readOnly={!isParent}
          label={studentLabel}
        />
      </View>

      <FlatList
        data={showHistory ? EXAM_HISTORY : []}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ExamHistoryItem item={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionTitle}>
              {isParent ? Strings.resultOverview : Strings.examOverview}
            </Text>

            <View style={styles.overviewGrid}>
              <ExamOverviewCard
                icon="document-text-outline"
                iconBg={Colors.duesCardBg}
                iconColor={Colors.primary}
                label={Strings.totalExams}
                value={examStudent.totalExams}
                trendIcon="pulse-outline"
              />
              <ExamOverviewCard
                icon="stats-chart-outline"
                iconBg={Colors.successBg}
                iconColor={Colors.success}
                label={Strings.averageScore}
                value={examStudent.averageScore}
                percent
                trendIcon="bar-chart-outline"
              />
              <ExamOverviewCard
                icon="trending-up-outline"
                iconBg={Colors.pendingBg}
                iconColor={Colors.warning}
                label={Strings.highestScore}
                value={examStudent.highestScore}
                percent
                trendIcon="arrow-up-outline"
              />
              <ExamOverviewCard
                icon="trending-down-outline"
                iconBg={Colors.overdueBg}
                iconColor={Colors.red}
                label={Strings.lowestScore}
                value={examStudent.lowestScore}
                percent
                trendIcon="arrow-down-outline"
              />
            </View>

            <ExamNextExamCard
              subject={examStudent.nextExamSubject}
              date={examStudent.nextExamDate}
              time={examStudent.nextExamTime}
            />

            <Btn
              title={showHistory ? Strings.hideHistory : Strings.examHistory}
              icon={showHistory ? 'eye-off-outline' : 'time-outline'}
              style={styles.historyBtn}
              onPress={() => setShowHistory(!showHistory)}
            />

            {showHistory ? (
              <View>
                <View style={styles.historyHeader}>
                  <View>
                    <Text style={styles.historyTitle} numberOfLines={1}>{Strings.examHistory}</Text>
                    <Text style={styles.historySub} numberOfLines={1}>
                      {Strings.recentAcademicResults}
                    </Text>
                  </View>
                  <Image
                    source={Images.recentCalendar}
                    style={styles.recentCalendarIcon}
                    resizeMode="contain"
                  />
                </View>

                <ExamDateRangeBox
                  startDate={startDate}
                  endDate={endDate}
                  onApply={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                />
              </View>
            ) : null}
          </View>
        }
        ListFooterComponent={
          showHistory ? (
            <Btn
              title={Strings.downloadPdf}
              icon="document-outline"
              style={styles.downloadBtn}
              onPress={() => {}}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Exam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    marginTop: -hp(0.6),
    zIndex: 20,
    elevation: 20,
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(1.5),
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  historyBtn: {
    marginTop: hp(0.5),
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
  },
  historyTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(4),
    marginBottom: hp(0.1),
    width:wp(35),
    
  },
  historySub: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    width:wp(53),
  },
  recentCalendarIcon: {
    width: wp(5),
    height: wp(5),
  },
  downloadBtn: {
    marginTop: hp(1),
  },
});
