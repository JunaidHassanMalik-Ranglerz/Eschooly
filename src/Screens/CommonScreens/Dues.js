import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import TotalPendingCard from '../../Component/TotalPendingCard';
import StudentDuesDropdown from '../../Component/StudentDuesDropdown';
import Btn from '../../Component/btn';
import SecurePayments from '../../Component/SecurePayments';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {STUDENT_DUES} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';

const Dues = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent
        title={Strings.pendingDuesTitle}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TotalPendingCard />

        <Text style={styles.sectionTitle} numberOfLines={1}>{Strings.studentDues}</Text>
        <StudentDuesDropdown student={STUDENT_DUES} />
        <Btn
          image={Images.payAfn}
          textStyle={styles.payBtnText}
        />
        <SecurePayments />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
    width:wp(30),
  },
  payBtnText: {
    marginLeft: wp(0.8),
  },
});
