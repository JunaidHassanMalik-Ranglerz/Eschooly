import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ExamProgressSection from '../../Component/MidtermExam/ExamProgressSection';
import ExamQuestionCard from '../../Component/MidtermExam/ExamQuestionCard';
import QuestionNavigator from '../../Component/MidtermExam/QuestionNavigator';
import ExamFooterBar from '../../Component/MidtermExam/ExamFooterBar';
import {
  MIDTERM_EXAM,
  EXAM_QUESTIONS,
  INITIAL_ANSWERS,
  INITIAL_FLAGGED,
  INITIAL_QUESTION_INDEX,
} from '../../Constants/MidtermExamData';
import {ACTIVE_EXAM} from '../../Constants/OnlineExamData';
import {Strings} from '../../Constants/Strings';
import {Colors} from '../../Constants/Colors';
import {wp, hp} from '../../Constants/Responsive';
import AnimatedCard from '../../Component/AnimatedCard';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';

const MidtermMathematics = () => {
  const route = useRoute();
  const startTime = route.params?.timeLeft ?? ACTIVE_EXAM.timeLeft;

  const [timeLeft, setTimeLeft] = useState(startTime);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_QUESTION_INDEX);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [flagged] = useState(INITIAL_FLAGGED);

  const total = MIDTERM_EXAM.totalQuestions;
  const question = EXAM_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const remainingCount = total - answeredCount - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = key => {
    setAnswers(prev => ({...prev, [currentIndex]: key}));
  };

  const handleJump = index => {
    setCurrentIndex(index);
  };

  return (
    <ScreenEnterProvider motion="midtermMath">
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={MIDTERM_EXAM.title}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <AnimatedCard index={0} style={styles.blockWrap}>
          <ExamProgressSection
            current={currentIndex + 1}
            total={total}
            answered={answeredCount}
            remaining={remainingCount}
            flagged={flagged.length}
          />
        </AnimatedCard>

        <AnimatedCard index={1} style={styles.blockWrap}>
          <ExamQuestionCard
            question={question}
            selected={answers[currentIndex]}
            onSelect={handleSelect}
          />
        </AnimatedCard>

        <AnimatedCard index={2} style={styles.blockWrap}>
          <QuestionNavigator
            total={total}
            currentIndex={currentIndex}
            answers={answers}
            flagged={flagged}
            onJump={handleJump}
          />
        </AnimatedCard>
      </ScrollEnterScrollView>

      <ExamFooterBar
        timeLeft={timeLeft}
        className={MIDTERM_EXAM.className}
        totalMarks={MIDTERM_EXAM.totalMarks}
        marksLabel={Strings.marksLabel}
      />
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default MidtermMathematics;

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
    paddingTop: hp(0.5),
    paddingBottom: hp(2),
  },
  blockWrap: {
    width: '100%',
  },
});
