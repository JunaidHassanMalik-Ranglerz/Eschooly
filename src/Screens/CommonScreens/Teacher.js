import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ClassTeacherCard from '../../Component/ClassTeacherCard';
import SubjectTeacherItem from '../../Component/SubjectTeacherItem';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {navigateToChat} from '../../Navigations/navigationHelpers';

const Teacher = () => {
  const navigation = useNavigation();
  const {
    studentLabel,
    isParent,
    selectedChildId,
    setSelectedChildId,
    activeStudent,
    childList,
    attendanceStudents,
    teachers,
    canSwitchChild,
  } = useRoleData();

  const {classTeacher, subjectTeachers} = teachers || {};
  const students = isParent ? childList : attendanceStudents;
  const dropdownReadOnly = isParent ? !canSwitchChild : students.length <= 1;

  const openTeacherChat = teacher => {
    if (!teacher) {
      return;
    }

    navigateToChat(navigation, {
      chatUser: {
        id: teacher.id,
        name: teacher.name,
        initials: teacher.initials,
        role: teacher.subject
          ? `${teacher.subject} Teacher`
          : Strings.classTeacher,
      },
    });
  };

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
        <MainHeaderComponent
          title={Strings.teachers}
          notificationCount={1}
          navyBack
        />

        <ScrollEnterFlatList
          data={subjectTeachers || []}
          keyExtractor={item => `${selectedChildId}-${item.id}`}
          extraData={selectedChildId}
          renderItem={({item, index}) => (
            <SubjectTeacherItem
              item={item}
              onMessage={openTeacherChat}
              premium
              animationIndex={index + 4}
            />
          )}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View>
              <AttendanceStudentDropdown
                student={activeStudent}
                students={students}
                selectedId={selectedChildId}
                premium
                animationIndex={1}
                onSelect={item => setSelectedChildId(item.value)}
                readOnly={dropdownReadOnly}
                label={studentLabel}
              />

              <ClassTeacherCard
                key={`class-teacher-${selectedChildId}`}
                teacher={classTeacher}
                onMessage={openTeacherChat}
                premium
                animationIndex={2}
              />

              <ProfileSectionTitle style={styles.subjectHeaderPremium} animationIndex={3}>
                {Strings.subjectTeachers}
              </ProfileSectionTitle>
            </View>
          }
        />
      </SafeAreaView>
  );
};

export default withScreenEnter(Teacher, 'teacher');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  subjectHeaderPremium: {
    marginTop: hp(1),
    marginBottom: hp(0.4),
  },
});
