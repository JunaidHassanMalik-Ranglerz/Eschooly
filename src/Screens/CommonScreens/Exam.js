import React, {useState} from 'react';

import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';

import {SafeAreaView} from 'react-native-safe-area-context';

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

import {Strings, EXAM_HISTORY} from '../../Constants/Strings';

import {EXAM_STAT_GRADIENTS} from '../../Constants/CardTheme';

import {wp, hp} from '../../Constants/Responsive';

import {useRoleData} from '../../hooks/useRoleData';

import {withScreenEnter} from '../../hooks/useScreenEnterGate';



const DEFAULT_START = new Date(2025, 10, 13);

const DEFAULT_END = new Date(2025, 10, 21);



const EXAM_WAVES = [SCREEN_WAVES.results, null, null, null];



const toDateKey = date => {

  const y = date.getFullYear();

  const m = String(date.getMonth() + 1).padStart(2, '0');

  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;

};



const Exam = () => {

  const {studentLabel, isParent, selectedChildId, setSelectedChildId, activeStudent, childList, attendanceStudents, examStudent, canSwitchChild} =
    useRoleData();

  const [showHistory, setShowHistory] = useState(false);

  const [startDate, setStartDate] = useState(DEFAULT_START);

  const [endDate, setEndDate] = useState(DEFAULT_END);

  const students = isParent ? childList : attendanceStudents;

  const dropdownReadOnly = isParent ? !canSwitchChild : students.length <= 1;



  const filteredHistory = React.useMemo(() => {

    if (!startDate || !endDate) {

      return EXAM_HISTORY;

    }

    const startKey = toDateKey(startDate);

    const endKey = toDateKey(endDate);

    return EXAM_HISTORY.filter(

      item => item.dateISO >= startKey && item.dateISO <= endKey,

    );

  }, [startDate, endDate]);



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
            student={activeStudent}

            students={students}

            selectedId={selectedChildId}

            premium

            onSelect={item => setSelectedChildId(item.value)}

            readOnly={dropdownReadOnly}

            label={studentLabel}

          />

        </View>



        <ScrollEnterFlatList

          data={showHistory ? filteredHistory : []}

          keyExtractor={item => item.id}

          renderItem={({item, index}) => (

            <ExamHistoryItem item={item} animationIndex={index + 2} />

          )}

          showsVerticalScrollIndicator={false}

          keyboardShouldPersistTaps="handled"

          bounces={false}

          overScrollMode="never"

          removeClippedSubviews={false}

          contentContainerStyle={styles.content}

          ListHeaderComponent={

            <View>

              <ProfileSectionTitle animationIndex={2}>

                {isParent ? Strings.resultOverview : Strings.examOverview}

              </ProfileSectionTitle>



              <View style={styles.overviewGrid}>

                <ExamOverviewCard

                  icon="document-text-outline"

                  iconBg={Colors.whiteOverlay22}

                  iconColor={Colors.white}

                  label={Strings.totalExams}

                  value={examStudent.totalExams}

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

                  value={examStudent.averageScore}

                  percent

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

                  value={examStudent.highestScore}

                  percent

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

                  value={examStudent.lowestScore}

                  percent

                  trendIcon="arrow-down-outline"

                  premium

                  animationIndex={6}

                  colors={EXAM_STAT_GRADIENTS[3]}

                />

              </View>



              <ExamNextExamCard

                subject={examStudent.nextExamSubject}

                date={examStudent.nextExamDate}

                time={examStudent.nextExamTime}

                animationIndex={7}

              />



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

            showHistory ? (

              <Text style={styles.empty}>{Strings.noResultsInRange}</Text>

            ) : null

          }

          ListFooterComponent={

            showHistory ? (

              <Btn

                title={Strings.downloadPdf}

                icon="document-outline"

                style={styles.downloadBtn}

                animationIndex={filteredHistory.length + 2}

                onPress={() => {}}

              />

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

    paddingBottom: hp(3),

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

    marginTop: hp(0.5),

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

  downloadBtn: {

    marginTop: hp(1),

  },

  empty: {

    color: Colors.grayText,

    fontFamily: Fonts.regular,

    fontSize: Fontsize.s,

    textAlign: 'center',

    marginTop: hp(2),

    marginBottom: hp(1),

  },

});


