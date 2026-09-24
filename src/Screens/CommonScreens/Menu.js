import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AcademicMenuCard from '../../Component/AcademicMenuCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import AnimatedCard from '../../Component/AnimatedCard';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {MENU_LIST, ATTENDANCE_STUDENTS} from '../../Constants/dummydata';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {FEATURE_ICON_META} from '../../Constants/IconTheme';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {ACADEMICS_PROFILE_ENTERING} from '../../utils/cardAnimation';

const Menu = () => {
  const navigation = useNavigation();
  const {
    isParent,
    activeStudent,
    childList,
    attendanceStudents,
    selectedChildId,
    setSelectedChildId,
    canSwitchChild,
    studentLabel,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const studentOptions = isParent ? childList : attendanceStudents;
  const attendanceMeta =
    ATTENDANCE_STUDENTS.find(item => item.value === selectedChildId) ||
    ATTENDANCE_STUDENTS[0];
  const dropdownStudent = {...activeStudent, ...attendanceMeta};

  const handlePress = item => {
    const target = isParent && item.parentScreen ? item.parentScreen : item.screen;
    if (!target) {
      return;
    }

    if (!isParent && item.tab) {
      navigation.navigate(target);
      return;
    }

    navigation.navigate(target);
  };

  return (
    <ScreenEnterProvider motion={ACADEMICS_ENTER_MOTION}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <MainHeaderComponent
          title={Strings.academics}
          notificationCount={1}
          onBackPress={() => navigation.navigate('Home')}
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
                readOnly={false}
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
          {MENU_LIST.filter(item => isParent || item.value !== 'fee').map((item, index) => {
            const meta = FEATURE_ICON_META[item.value] || FEATURE_ICON_META.subjects;
            const disabled = !item.screen && !item.parentScreen;
            return (
              <AcademicMenuCard
                key={item.value}
                icon={meta.icon}
                color={meta.color}
                title={item.label}
                disabled={disabled}
                animationIndex={index + 2}
                waveKey={item.value}
                onPress={() => handlePress(item)}
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

export default Menu;

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
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.4),
    paddingBottom: hp(3),
  },
  childCard: {
    marginBottom: hp(1),
  },
});
