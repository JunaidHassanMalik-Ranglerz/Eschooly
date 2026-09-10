import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import StudentIdSummary from '../../Component/StudentIdCard/StudentIdSummary';
import IdCardPreview from '../../Component/StudentIdCard/IdCardPreview';
import IdCardFlipButton from '../../Component/StudentIdCard/IdCardFlipButton';
import IdCardDetailsSection from '../../Component/StudentIdCard/IdCardDetailsSection';
import IdCardActionButtons from '../../Component/StudentIdCard/IdCardActionButtons';
import {getIdCardData} from '../../Constants/StudentIdCardData';
import {useProfileStudent} from '../../hooks/useProfileStudent';
import {Strings} from '../../Constants/Strings';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';
import {downloadIdCardPdf, printIdCard} from '../../utils/idCardActions';

const StudentIdCard = () => {
  const {student} = useProfileStudent();
  const [isBack, setIsBack] = useState(false);
  const data = getIdCardData(student);

  const handleDownload = async () => {
    try {
      await downloadIdCardPdf(data);
      Alert.alert(Strings.downloadPdf, Strings.idCardDownloadSuccess);
    } catch (error) {
      Alert.alert(Strings.downloadPdf, Strings.idCardDownloadFailed);
    }
  };

  const handlePrint = async () => {
    try {
      await printIdCard(data);
    } catch (error) {
      Alert.alert(Strings.printIdCard, Strings.idCardPrintFailed);
    }
  };

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <MainHeaderComponent
        title={Strings.studentIdCard}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <StudentIdSummary data={data} />

        <IdCardPreview data={data} isBack={isBack} />

        <IdCardFlipButton
          isBack={isBack}
          onPress={() => setIsBack(prev => !prev)}
        />

        {!isBack ? <IdCardDetailsSection data={data} /> : null}

        <IdCardActionButtons
          onDownload={handleDownload}
          onPrint={handlePrint}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentIdCard;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(3),
  },
});
