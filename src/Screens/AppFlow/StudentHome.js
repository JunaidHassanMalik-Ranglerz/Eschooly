import React, {useCallback, useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import NotificationBell from '../../Component/NotificationBell';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import DepthIcon from '../../Component/DepthIcon';
import StudentHubCard from '../../Component/Student/StudentHubCard';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {ATTENDANCE_STUDENTS} from '../../Constants/dummydata';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {getHubIconMeta} from '../../Constants/IconTheme';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {getGreeting} from '../../utils/getGreeting';
import {
  ACADEMICS_HEADER_ENTERING,
  ACADEMICS_PROFILE_ENTERING,
  getAcademicsMenuEntering,
} from '../../utils/cardAnimation';
import {setDarkStatusBar} from '../../Constants/MyStyling';

const HUB_ITEMS = [
  {key: 'online', label: Strings.onlineClasses, screen: 'OnlineClass'},
  {key: 'timetable', label: Strings.timetable, screen: 'Timetable'},
  {key: 'assignments', label: Strings.assignment, screen: 'Assignment'},
  {key: 'library', label: Strings.digitalLibrary, screen: 'DigitalLibrary'},
  {key: 'announcements', label: Strings.announcements, screen: 'Announcements'},
  {key: 'results', label: Strings.results, screen: 'StudentResults'},
];

const StudentHome = () => {
  const navigation = useNavigation();
  const {
    activeStudent,
    attendanceStudents,
    selectedChildId,
    setSelectedChildId,
    unreadNotificationCount,
    studentUpcomingClass,
    studentLabel,
  } = useRoleData();
  const attendanceMeta =
    ATTENDANCE_STUDENTS.find(item => item.value === selectedChildId) ||
    ATTENDANCE_STUDENTS[0];
  const dropdownStudent = {
    ...activeStudent,
    ...attendanceMeta,
    gender: activeStudent?.gender || attendanceMeta?.gender || 'Male',
    classInfo: activeStudent?.classLabel || attendanceMeta?.classInfo,
  };
  const canSwitchStudent = attendanceStudents.length > 1;
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);

  const openStudentSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

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
                  {getGreeting()},
                </Text>
                <Text style={styles.studentName} numberOfLines={1}>
                  {activeStudent?.label}
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
              <AttendanceStudentDropdown
                student={dropdownStudent}
                students={attendanceStudents}
                selectedId={selectedChildId}
                premium
                waveVariant={SCREEN_WAVES.parentHome}
                onSelect={item => setSelectedChildId(item.value)}
                readOnly={!canSwitchStudent}
                label={studentLabel}
                embedded
                externalPicker={canSwitchStudent}
                onPickerPress={openStudentSwitch}
              />
            </AnimatedCard>

            <View style={styles.hubGrid}>
              {HUB_ITEMS.map((item, index) => {
                const iconMeta = getHubIconMeta(index);
                const cardIndex = index + 2;
                return (
                  <StudentHubCard
                    key={item.key}
                    icon={iconMeta.icon}
                    iconColor={iconMeta.color}
                    label={item.label}
                    animationIndex={cardIndex}
                    hubIndex={index}
                    onPress={() => navigation.navigate(item.screen)}
                  />
                );
              })}
            </View>

            <AnimatedCard
              index={8}
              entering={getAcademicsMenuEntering(null, 8)}
              style={styles.sectionHeader}>
              <TouchableOpacity
                style={styles.sectionHeaderRow}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('OnlineClass')}>
                <Text style={styles.sectionTitle}>{Strings.upcomingClass}</Text>
                <Icon name="chevron-forward" size={wp(5)} color={Colors.grayText} />
              </TouchableOpacity>
            </AnimatedCard>

            <AnimatedCard
              index={9}
              entering={getAcademicsMenuEntering(null, 9)}
              style={styles.upcomingWrap}>
              <LinearGradient
                colors={CARD_GRADIENTS.sapphire}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.upcomingCard}>
                <CardWave variant={SCREEN_WAVES.studentHome} />
                <View style={styles.upcomingIcon}>
                  <DepthIcon name="videocam" size={wp(5.4)} color={Colors.iconSky} />
                </View>
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingTitle} numberOfLines={1}>
                    {studentUpcomingClass?.title}
                  </Text>
                  <Text style={styles.upcomingMeta} numberOfLines={1}>
                    {studentUpcomingClass?.classInfo}
                  </Text>
                  <View style={styles.upcomingFooter}>
                    <View style={styles.timeRow}>
                      <Icon name="time-outline" size={wp(3.6)} color={Colors.whiteMuted85} />
                      <Text style={styles.timeText}>{studentUpcomingClass?.time}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.joinBtn}
                      activeOpacity={0.85}
                      onPress={() => navigation.navigate('OnlineClass')}>
                      <Text style={styles.joinText}>{Strings.join}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </AnimatedCard>
          </View>
        </ScrollEnterScrollView>
        {canSwitchStudent ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={attendanceStudents}
            selectedId={selectedChildId}
            onSelect={setSelectedChildId}
            onClose={() => setSwitchVisible(false)}
            replayToken={modalReplay}
          />
        ) : null}
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default StudentHome;

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
    paddingTop: hp(1.8),
    paddingBottom: hp(7),
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
    backgroundColor: Colors.parentHeader,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  studentName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginTop: hp(0.1),
  },
  hubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(0.4),
    zIndex: 1,
    elevation: 1,
    overflow: 'visible',
  },
  sectionHeader: {
    marginTop: hp(0.8),
    marginBottom: hp(1.3),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  upcomingWrap: {
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: wp(5),
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.7),
    overflow: 'hidden',
  },
  upcomingIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    zIndex: 1,
  },
  upcomingInfo: {
    flex: 1,
    zIndex: 1,
  },
  upcomingTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  upcomingMeta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  upcomingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.1),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.2),
  },
  joinBtn: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.75),
  },
  joinText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
