import React, {useCallback, useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotificationBell from '../../Component/NotificationBell';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import ParentStatCard from '../../Component/Parent/ParentStatCard';
import ScheduleItem from '../../Component/Parent/ScheduleItem';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {getGreeting} from '../../utils/getGreeting';
import {LIBRARY_CLASS_CATEGORIES} from '../../Constants/DigitalLibraryData';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {setDarkStatusBar} from '../../Constants/MyStyling';
import {
  ACADEMICS_HEADER_ENTERING,
  ACADEMICS_PROFILE_ENTERING,
  getAcademicsMenuEntering,
} from '../../utils/cardAnimation';

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
    canSwitchChild,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);

  const openChildSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const handleSelectChild = useCallback(
    nextId => {
      if (nextId === selectedChildId) {
        return;
      }
      setSelectedChildId(nextId);
    },
    [selectedChildId, setSelectedChildId],
  );

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
    <ScreenEnterProvider motion={ACADEMICS_ENTER_MOTION}>
      <SafeAreaView style={styles.screen} edges={['top']}>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.parentBg}
          barStyle="dark-content"
        />

        <ScrollEnterScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          <AnimatedCard
            index={0}
            entering={ACADEMICS_HEADER_ENTERING}
            style={styles.headerShell}>
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
              <NotificationBell count={unreadNotificationCount} onDark />
            </View>
          </AnimatedCard>

          <View style={styles.body}>
            <AnimatedCard
              index={1}
              entering={ACADEMICS_PROFILE_ENTERING}
              style={styles.dropdownAnchor}>
              <SelectedChildBanner
                child={activeStudent}
                variant="large"
                waveVariant={SCREEN_WAVES.parentHome}
                disableEnterAnimation
                compactMargin
                canSwitch={canSwitchChild}
                onSwitchPress={canSwitchChild ? openChildSwitch : undefined}
              />
            </AnimatedCard>

            <View style={styles.statsGrid}>
              <ParentStatCard
                icon="calendar-outline"
                iconColor={Colors.iconGreen}
                label={Strings.attendance}
                value={activeStudent?.rateText}
                hint={Strings.thisMonthShort}
                entering={getAcademicsMenuEntering(null, 2)}
                animationIndex={2}
                onPress={() => navigation.navigate('ParentAttendance')}
              />
              <ParentStatCard
                icon="library-outline"
                iconColor={Colors.iconOrange}
                label={Strings.digitalLibrary}
                value={String(
                  LIBRARY_CLASS_CATEGORIES.find(item => item.isCurrent)
                    ?.resourceCount || 0,
                )}
                hint={Strings.libraryBooksHint}
                entering={getAcademicsMenuEntering(null, 3)}
                animationIndex={3}
                onPress={() => navigation.navigate('DigitalLibrary')}
              />
              <ParentStatCard
                icon="clipboard-outline"
                iconColor={Colors.iconPurple}
                label={Strings.exams}
                value={activeStudent?.examsUpcoming}
                hint={Strings.upcoming}
                entering={getAcademicsMenuEntering(null, 4)}
                animationIndex={4}
                onPress={() => navigation.navigate('ExamSchedule')}
              />
              <ParentStatCard
                icon="megaphone"
                iconColor={Colors.iconPink}
                label={Strings.announcements}
                value={activeStudent?.announcementsNew}
                hint={Strings.newLabel}
                entering={getAcademicsMenuEntering(null, 5)}
                animationIndex={5}
                onPress={() => navigation.navigate('Announcements')}
              />
            </View>

            <AnimatedCard
              index={6}
              entering={getAcademicsMenuEntering(null, 6)}
              style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{Strings.todaySchedule}</Text>
            </AnimatedCard>

            <ScheduleItem
              item={{
                subject: Strings.timetable,
                time: Strings.viewFullWeek,
                icon: 'time-outline',
                iconColor: Colors.iconCyan,
              }}
              gradientColors={CARD_GRADIENTS.notification}
              entering={getAcademicsMenuEntering(null, 7)}
              animationIndex={7}
              waveVariant="scheduleTimetable"
              onPress={() => navigation.navigate('Timetable')}
            />

            {todayLesson ? (
              <ScheduleItem
                item={todayLesson}
                gradientColors={CARD_GRADIENTS.notification}
                entering={getAcademicsMenuEntering(null, 8)}
                animationIndex={8}
                waveVariant="scheduleLesson"
              />
            ) : null}

            <ScheduleItem
              item={{
                subject: Strings.syllabus,
                time: Strings.syllabusUnits,
                icon: 'book-outline',
                iconColor: Colors.iconTeal,
              }}
              gradientColors={CARD_GRADIENTS.deep}
              entering={getAcademicsMenuEntering(null, 9)}
              animationIndex={9}
              waveVariant="scheduleTimetable"
              onPress={() => navigation.navigate('Syllabus')}
            />

            <ScheduleItem
              item={{
                subject: Strings.results,
                time: Strings.resultCardHint,
                icon: 'trophy-outline',
                iconColor: Colors.iconTeal,
              }}
              gradientColors={CARD_GRADIENTS.royal}
              entering={getAcademicsMenuEntering(null, 10)}
              animationIndex={10}
              waveVariant="scheduleTimetable"
              onPress={() => navigation.navigate('StudentResults')}
            />

            <ScheduleItem
              item={{
                subject: Strings.trackChild,
                time: Strings.trackChildHint,
                icon: 'bus',
                iconColor: Colors.iconAmber,
              }}
              gradientColors={CARD_GRADIENTS.sapphire}
              entering={getAcademicsMenuEntering(null, 11)}
              animationIndex={11}
              waveVariant="scheduleTimetable"
              onPress={() => navigation.navigate('ChildTrack')}
            />
          </View>
        </ScrollEnterScrollView>

        {canSwitchChild ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={childList}
            selectedId={selectedChildId}
            onSelect={handleSelectChild}
            onClose={() => setSwitchVisible(false)}
            replayToken={modalReplay}
          />
        ) : null}
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default ParentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  scroll: {
    paddingBottom: hp(3),
    backgroundColor: Colors.parentBg,
    flexGrow: 1,
  },
  headerShell: {
    width: '100%',
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    paddingBottom: hp(7),
    borderBottomLeftRadius: wp(8),
    borderBottomRightRadius: wp(8),
    backgroundColor: Colors.parentHeader,
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
  body: {
    paddingHorizontal: wp(4),
    marginTop: -hp(4.5),
    overflow: 'visible',
    zIndex: 2,
  },
  dropdownAnchor: {
    width: '100%',
    zIndex: 100,
    marginBottom: hp(0.4),
    overflow: 'visible',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(2),
    zIndex: 1,
    elevation: 1,
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
