import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import DepthIcon from '../../Component/DepthIcon';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {ATTENDANCE_STUDENTS, HOLIDAY_LIST} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {
  ACADEMICS_PROFILE_ENTERING,
  getHomeScreenEnter,
} from '../../utils/cardAnimation';

const TYPE_THEMES = {
  National: {
    gradient: ['#071A3D', '#12325A', '#1345A3'],
    icon: 'flag-outline',
    iconColor: '#93C5FD',
    badgeBg: 'rgba(56, 189, 248, 0.18)',
    badgeText: '#BFDBFE',
  },
  Religious: {
    gradient: ['#0A2F5C', '#0D5CA8', '#2563EB'],
    icon: 'moon-outline',
    iconColor: '#7DD3FC',
    badgeBg: 'rgba(99, 102, 241, 0.18)',
    badgeText: '#C7D2FE',
  },
  School: {
    gradient: ['#062653', '#07346B', '#1E40AF'],
    icon: 'sunny-outline',
    iconColor: '#60A5FA',
    badgeBg: 'rgba(37, 99, 235, 0.18)',
    badgeText: '#DBEAFE',
  },
};

const parseHolidayDate = date => {
  const parts = String(date || '').split(',');
  if (parts.length >= 2) {
    return {dayLine: parts[0].trim(), dateLine: parts.slice(1).join(',').trim()};
  }
  return {dayLine: '', dateLine: date};
};

const HolidayCard = ({item, animationIndex, showWave}) => {
  const theme = TYPE_THEMES[item.type] || TYPE_THEMES.School;
  const dateParts = parseHolidayDate(item.date);

  return (
    <ProfileGradientCard
      innerStyle={styles.cardInner}
      animationIndex={animationIndex}
      entering={getHomeScreenEnter(animationIndex)}
      colors={theme.gradient}
      waveVariant={showWave ? SCREEN_WAVES.holidays : null}>
      <View style={styles.topRow}>
        <DepthIcon name={theme.icon} size={wp(6)} color={theme.iconColor} />
        <View style={[styles.badge, {backgroundColor: theme.badgeBg}]}>
          <Text style={[styles.badgeText, {color: theme.badgeText}]}>{item.type}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{dateParts.dateLine || item.date}</Text>
      {dateParts.dayLine ? <Text style={styles.day}>{dateParts.dayLine}</Text> : null}
      <Text style={styles.duration}>{item.duration}</Text>
    </ProfileGradientCard>
  );
};

const Holidays = () => {
  const {
    isParent,
    studentLabel,
    selectedChildId,
    setSelectedChildId,
    activeStudent,
    childList,
    attendanceStudents,
    canSwitchChild,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const studentOptions = isParent ? childList : attendanceStudents;
  const attendanceMeta =
    ATTENDANCE_STUDENTS.find(item => item.value === selectedChildId) ||
    ATTENDANCE_STUDENTS[0];
  const dropdownStudent = {...activeStudent, ...attendanceMeta};

  return (
    <ScreenEnterProvider motion="holidays">
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
        <MainHeaderComponent
          title={Strings.holidays}
          notificationCount={1}
          navyBack
        />

        {isParent ? (
          <View style={styles.parentChildWrap}>
            <AnimatedCard
              index={1}
              entering={ACADEMICS_PROFILE_ENTERING}
              style={styles.childCard}>
              <ParentChildCard
                child={activeStudent}
                chevron={canSwitchChild ? 'chevron-down' : undefined}
                accented
                solid
                prominent
                showWave
                waveVariant={SCREEN_WAVES.academics}
                onPress={canSwitchChild ? () => setSwitchVisible(true) : undefined}
              />
            </AnimatedCard>
          </View>
        ) : (
          <View style={styles.dropdownWrap}>
            <AnimatedCard
              index={1}
              entering={ACADEMICS_PROFILE_ENTERING}
              style={styles.childCard}>
              <AttendanceStudentDropdown
                student={dropdownStudent}
                students={studentOptions}
                selectedId={selectedChildId}
                premium
                onSelect={item => setSelectedChildId(item.value)}
                readOnly={studentOptions.length <= 1}
                label={studentLabel}
              />
            </AnimatedCard>
          </View>
        )}

        <ScrollEnterScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled">
          <ProfileSectionTitle animationIndex={2}>
            {Strings.upcomingHolidays}
          </ProfileSectionTitle>

          {HOLIDAY_LIST.map((item, index) => {
            const slot = index + 3;
            return (
              <HolidayCard
                key={item.id}
                item={item}
                animationIndex={slot}
                showWave={index === 0}
              />
            );
          })}
        </ScrollEnterScrollView>

        {canSwitchChild ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={childList}
            selectedId={selectedChildId}
            onSelect={setSelectedChildId}
            onClose={() => setSwitchVisible(false)}
          />
        ) : null}
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default Holidays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  parentChildWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    zIndex: 20,
    elevation: 20,
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(0.4),
    zIndex: 30,
    elevation: 30,
  },
  childCard: {
    marginBottom: hp(1),
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.4),
    paddingBottom: hp(3),
  },
  cardInner: {
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.25)',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.7),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  badge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.4),
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  date: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.45),
  },
  day: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  duration: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.8),
  },
});
