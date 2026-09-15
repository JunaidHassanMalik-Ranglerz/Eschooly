import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const ExamSectionHeader = ({title, count}) => (
  <View style={sectionStyles.row}>
    <Text style={sectionStyles.title}>{title}</Text>
    <Text style={sectionStyles.count}>{count}</Text>
  </View>
);

const OnlineExam = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState('active');

  const showActive = tab === 'active';
  const showUpcoming = tab === 'active' || tab === 'upcoming';
  const showCompleted = tab === 'active' || tab === 'completed';

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <MainHeaderComponent
        title={Strings.onlineExams}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ExamTabBar tabs={EXAM_TABS} selected={tab} onSelect={setTab} />

        {showActive ? (
          <ActiveExamCard
            exam={ACTIVE_EXAM}
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
            />
            {UPCOMING_EXAMS.map(item => (
              <UpcomingExamCard
                key={item.id}
                item={item}
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
            />
            {COMPLETED_EXAMS.map(item => (
              <CompletedExamCard
                key={item.id}
                item={item}
                onPress={() => {}}
              />
            ))}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineExam;

const styles = StyleSheet.create({
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
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs2,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  count: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
});
