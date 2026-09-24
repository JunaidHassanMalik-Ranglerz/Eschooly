import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedCard from '../../Component/AnimatedCard';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import StudentIdSummary from '../../Component/StudentIdCard/StudentIdSummary';
import IdCardPreview from '../../Component/StudentIdCard/IdCardPreview';
import IdCardFlipButton from '../../Component/StudentIdCard/IdCardFlipButton';
import IdCardDetailsSection from '../../Component/StudentIdCard/IdCardDetailsSection';
import IdCardActionButtons from '../../Component/StudentIdCard/IdCardActionButtons';
import {getIdCardData} from '../../Constants/StudentIdCardData';
import {useProfileStudent} from '../../hooks/useProfileStudent';
import {Strings} from '../../Constants/Strings';
import {Colors} from '../../Constants/Colors';
import {wp, hp} from '../../Constants/Responsive';
import {downloadIdCardPdf, printIdCard} from '../../utils/idCardActions';

const StudentIdCard = () => {
  const {student} = useProfileStudent();
  const [isBack, setIsBack] = useState(false);
  const data = getIdCardData(student);

  const handleDownload = async () => {
    try {
      await downloadIdCardPdf(data);
    } catch (error) {}
  };

  const handlePrint = async () => {
    try {
      await printIdCard(data);
    } catch (error) {}
  };

  return (
    <ScreenEnterProvider motion="studentIdCard">
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.studentIdCard}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <AnimatedCard index={0} style={styles.blockWrap}>
          <StudentIdSummary data={data} />
        </AnimatedCard>

        <AnimatedCard index={1} style={styles.blockWrap}>
          <IdCardPreview data={data} isBack={isBack} />
        </AnimatedCard>

        <IdCardFlipButton
          isBack={isBack}
          onPress={() => setIsBack(prev => !prev)}
        />

        {!isBack ? (
          <AnimatedCard index={2} style={styles.blockWrap}>
            <IdCardDetailsSection data={data} />
          </AnimatedCard>
        ) : null}

        <AnimatedCard index={3} style={styles.blockWrap}>
          <IdCardActionButtons
            onDownload={handleDownload}
            onPrint={handlePrint}
          />
        </AnimatedCard>
      </ScrollEnterScrollView>
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default StudentIdCard;

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
    paddingBottom: hp(3),
  },
  blockWrap: {
    width: '100%',
  },
});
