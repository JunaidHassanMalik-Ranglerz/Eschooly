import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ExamTabBar from '../../Component/OnlineExam/ExamTabBar';
import ActiveExamCard from '../../Component/OnlineExam/ActiveExamCard';
import UpcomingExamCard from '../../Component/OnlineExam/UpcomingExamCard';
import CompletedExamCard from '../../Component/OnlineExam/CompletedExamCard';
import {
  EXAM_TABS,
  ACTIVE_EXAM,
  UPCOMING_EXAMS,
  COMPLETED_EXAMS,
} from '../../Constants/OnlineExamData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import AnimatedCard from '../../Component/AnimatedCard';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';

const ExamSectionHeader = ({title, count, animationIndex = 0}) => (
  <AnimatedCard index={animationIndex} style={sectionStyles.row}>
    <Text style={sectionStyles.title}>{title}</Text>
    <Text style={sectionStyles.count}>{count}</Text>
  </AnimatedCard>
);

const OnlineExam = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState('active');

  const showActive = tab === 'active';
  const showUpcoming = tab === 'active' || tab === 'upcoming';
  const showCompleted = tab === 'active' || tab === 'completed';

  return (
    <ScreenEnterProvider motion="onlineExam">
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.onlineExams}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ExamTabBar tabs={EXAM_TABS} selected={tab} onSelect={setTab} animationIndex={0} />

        {showActive ? (
          <ActiveExamCard
            exam={ACTIVE_EXAM}
            animationIndex={0}
            onStart={timeLeft =>
              navigation.navigate('MidtermMathematics', {timeLeft})
            }
          />
        ) : null}

        {showUpcoming ? (
          <>
            <ExamSectionHeader
              title={Strings.upcomingExams}
              count={`${UPCOMING_EXAMS.length} ${Strings.scheduled}`}
              animationIndex={2}
            />
            {UPCOMING_EXAMS.map((item, index) => (
              <UpcomingExamCard
                key={item.id}
                item={item}
                animationIndex={index + 1}
                onPress={() => {}}
              />
            ))}
          </>
        ) : null}

        {showCompleted ? (
          <>
            <ExamSectionHeader
              title={Strings.completedExams}
              count={`${COMPLETED_EXAMS.length} ${Strings.results}`}
              animationIndex={15}
            />
            {COMPLETED_EXAMS.map((item, index) => (
              <CompletedExamCard
                key={item.id}
                item={item}
                animationIndex={index + 20}
                onPress={() => {}}
              />
            ))}
          </>
        ) : null}
      </ScrollEnterScrollView>
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default OnlineExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
});

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
    marginTop: hp(0.5),
  },
  title: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs2,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  count: {
    color: Colors.primaryLight,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
});
