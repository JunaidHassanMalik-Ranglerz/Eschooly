import React, {useCallback, useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnnouncementCard from '../../Component/AnnouncementCard';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {ATTENDANCE_STUDENTS} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const AnnouncementsScreen = () => {
  const scrollRef = useRef(null);
  const {
    isParent,
    activeStudent,
    announcements,
    childList,
    attendanceStudents,
    selectedChildId,
    setSelectedChildId,
    canSwitchChild,
    studentLabel,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const [contentReplay, setContentReplay] = useState(0);

  const childKey = String(selectedChildId ?? activeStudent?.value ?? '');

  const handleSelectChild = useCallback(
    nextId => {
      const nextKey = String(nextId);
      if (nextKey === childKey) {
        return;
      }
      setSelectedChildId(nextId);
      scrollRef.current?.scrollTo?.({y: 0, animated: false});
      setContentReplay(value => value + 1);
    },
    [childKey, setSelectedChildId],
  );

  const students = isParent ? childList : attendanceStudents;
  const dropdownReadOnly = isParent ? !canSwitchChild : students.length <= 1;
  const attendanceMeta =
    ATTENDANCE_STUDENTS.find(item => item.value === selectedChildId) ||
    ATTENDANCE_STUDENTS[0];
  const dropdownStudent = {...activeStudent, ...attendanceMeta};

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />

      <MainHeaderComponent
        title={Strings.announcements}
        notificationCount={1}
        navyBack
      />

      <AnimatedCard
        index={1}
        entering={getHomeScreenEnter(1)}
        replayToken={contentReplay}
        style={styles.profileCard}>
        {isParent ? (
          <SelectedChildBanner
            child={activeStudent}
            variant="large"
            disableEnterAnimation
            onSwitchPress={
              canSwitchChild
                ? () => {
                    setSwitchVisible(true);
                    setModalReplay(value => value + 1);
                  }
                : undefined
            }
            canSwitch={canSwitchChild}
          />
        ) : (
          <AttendanceStudentDropdown
            student={dropdownStudent}
            students={students}
            selectedId={selectedChildId}
            premium
            embedded
            onSelect={item => handleSelectChild(item.value)}
            readOnly={dropdownReadOnly}
            label={studentLabel}
          />
        )}
      </AnimatedCard>

      <ScrollEnterScrollView
        ref={scrollRef}
        style={styles.scrollArea}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        {announcements.length === 0 ? (
          <Text style={styles.empty}>{Strings.noAnnouncements}</Text>
        ) : (
          announcements.map((item, index) => {
            const slot = index + 2;
            return (
              <AnnouncementCard
                key={item.id}
                item={item}
                animationIndex={slot}
                entering={getHomeScreenEnter(slot)}
                replayToken={contentReplay}
              />
            );
          })
        )}
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
  );
};

export default withScreenEnter(AnnouncementsScreen, 'announcements');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  profileCard: {
    marginHorizontal: wp(4),
    marginBottom: hp(0.4),
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.4),
    paddingBottom: hp(3),
    flexGrow: 1,
    backgroundColor: Colors.parentBg,
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
});
