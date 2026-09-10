import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

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
    <SafeAreaView style={MyStyling.container2} edges={['top', 'bottom']}>
      <MainHeaderComponent
        title={MIDTERM_EXAM.title}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ExamProgressSection
          current={currentIndex + 1}
          total={total}
          answered={answeredCount}
          remaining={remainingCount}
          flagged={flagged.length}
        />

        <ExamQuestionCard
          question={question}
          selected={answers[currentIndex]}
          onSelect={handleSelect}
        />

        <QuestionNavigator
          total={total}
          currentIndex={currentIndex}
          answers={answers}
          flagged={flagged}
          onJump={handleJump}
        />
      </ScrollView>

      <ExamFooterBar
        timeLeft={timeLeft}
        className={MIDTERM_EXAM.className}
        totalMarks={MIDTERM_EXAM.totalMarks}
        marksLabel={Strings.marksLabel}
      />
    </SafeAreaView>
  );
};

export default MidtermMathematics;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(2),
  },
});
