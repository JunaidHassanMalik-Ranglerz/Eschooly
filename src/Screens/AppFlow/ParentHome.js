import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NotificationBell from '../../Component/NotificationBell';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ParentStatCard from '../../Component/Parent/ParentStatCard';
import ScheduleItem from '../../Component/Parent/ScheduleItem';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {getGreeting} from '../../utils/getGreeting';
import {LIBRARY_CLASS_CATEGORIES} from '../../Constants/DigitalLibraryData';
import {setDarkStatusBar} from '../../Constants/MyStyling';
import {Images} from '../../Assets';

const ParentHome = () => {
  const navigation = useNavigation();
  const {
    profilePerson,
    activeStudent,
    schedule,
    unreadNotificationCount,
    childList,
    selectedChildId,
    setSelectedChildId,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const todayLesson =
    schedule.find(item => item.subject === 'English') || schedule[0];

  useLayoutEffect(() => {
    setDarkStatusBar();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setDarkStatusBar();
    }, []),
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.scroll}>
        <LinearGradient
          colors={[Colors.parentHeader, Colors.parentHeaderEnd]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.greeting} numberOfLines={1}>
                {getGreeting()}
              </Text>
              <Text style={styles.parentName} numberOfLines={1}>
                {profilePerson.label}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {Strings.whatsHappening}
              </Text>
            </View>

            <NotificationBell count={unreadNotificationCount} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <ParentChildCard
            child={activeStudent}
            chevron="chevron-down"
            onPress={() => setSwitchVisible(true)}
          />

          <View style={styles.statsGrid}>
            <ParentStatCard
              icon="calendar-outline"
              iconBg={Colors.greenSoft}
              iconColor={Colors.iconGreen}
              label={Strings.attendance}
              value={activeStudent.rateText}
              hint={Strings.thisMonthShort}
              onPress={() => navigation.navigate('ParentAttendance')}
            />
            <ParentStatCard
              icon="library-outline"
              iconBg={Colors.orangeSoft}
              iconColor={Colors.iconOrange}
              label={Strings.digitalLibrary}
              value={String(
                LIBRARY_CLASS_CATEGORIES.find(item => item.isCurrent)
                  ?.resourceCount || 0,
              )}
              hint={Strings.libraryBooksHint}
              onPress={() => navigation.navigate('DigitalLibrary')}
            />
            <ParentStatCard
              icon="clipboard-outline"
              iconBg={Colors.purpleSoft}
              iconColor={Colors.iconPurple}
              label={Strings.exams}
              value={activeStudent.examsUpcoming}
              hint={Strings.upcoming}
              onPress={() => navigation.navigate('ExamSchedule')}
            />
            <ParentStatCard
              iconSource={Images.announcementDay}
              iconBg={Colors.blueSoft}
              iconColor={Colors.iconBlue}
              label={Strings.announcements}
              value={activeStudent.announcementsNew}
              hint={Strings.newLabel}
              onPress={() => navigation.navigate('Announcements')}
            />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{Strings.todaySchedule}</Text>
          </View>

          <ScheduleItem
            item={{
              subject: Strings.timetable,
              time: Strings.viewFullWeek,
              icon: 'time-outline',
              iconBg: Colors.blueSoft,
              iconColor: Colors.iconBlue,
            }}
            onPress={() => navigation.navigate('Timetable')}
          />

          {todayLesson ? <ScheduleItem item={todayLesson} /> : null}
        </View>
      </ScrollView>

      <ChildSwitchModal
        visible={switchVisible}
        childrenList={childList}
        selectedId={selectedChildId}
        onSelect={setSelectedChildId}
        onClose={() => setSwitchVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ParentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    paddingBottom: hp(3),
    backgroundColor: Colors.parentBg,
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    paddingBottom: hp(7),
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    marginRight: wp(3),
  },
  greeting: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  parentName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginTop: hp(0.3),
  },
  subtitle: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.4),
  },
  body: {
    paddingHorizontal: wp(4),
    marginTop: -hp(4.5),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    marginBottom: hp(1.2),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
});
