import React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AnimatedCard from '../../Component/AnimatedCard';
import TotalPendingCard from '../../Component/TotalPendingCard';
import StudentDuesDropdown from '../../Component/StudentDuesDropdown';
import Btn from '../../Component/btn';
import SecurePayments from '../../Component/SecurePayments';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {STUDENT_DUES} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';

const Dues = () => {
  return (
    <ScreenEnterProvider motion="dues">
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.pendingDuesTitle}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TotalPendingCard animationIndex={0} />

        <Text style={styles.sectionTitle} numberOfLines={1}>{Strings.studentDues}</Text>
        <StudentDuesDropdown student={STUDENT_DUES} animationIndex={1} />
        <AnimatedCard index={3} style={styles.payWrap}>
        <Btn
          image={Images.payAfn}
          textStyle={styles.payBtnText}
        />
        </AnimatedCard>
        <AnimatedCard index={2} style={styles.secureWrap}>
          <SecurePayments />
        </AnimatedCard>
      </ScrollEnterScrollView>
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default Dues;

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
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  sectionTitle: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
    width:wp(30),
  },
  payWrap: {
    width: '100%',
    borderRadius: wp(10),
    overflow: 'hidden',
  },
  payBtnText: {
    marginLeft: wp(0.8),
  },
  secureWrap: {
    width: '100%',
  },
});
