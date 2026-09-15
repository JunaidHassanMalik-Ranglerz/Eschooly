import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ClassTeacherCard from '../../Component/ClassTeacherCard';
import SubjectTeacherItem from '../../Component/SubjectTeacherItem';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {
  TEACHER_STUDENTS,
  TEACHERS_BY_STUDENT,
} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {useRoleData} from '../../hooks/useRoleData';

const Teacher = () => {
  const navigation = useNavigation();
  const {activeStudent, studentLabel, isParent, selectedChildId, setSelectedChildId, childList} =
    useRoleData();

  const teacherStudent = useMemo(
    () =>
      TEACHER_STUDENTS.find(item => item.value === activeStudent.value) ||
      TEACHER_STUDENTS[0],
    [activeStudent.value],
  );

  const {classTeacher, subjectTeachers} =
    TEACHERS_BY_STUDENT[activeStudent.value] || TEACHERS_BY_STUDENT['1'];

  const openTeacherChat = teacher => {
    if (!teacher) {
      return;
    }

    const chatUser = {
      name: teacher.name,
      initials: teacher.initials,
      role: teacher.subject
        ? `${teacher.subject} Teacher`
        : Strings.classTeacher,
    };

    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate({
        name: 'BottomTab',
        params: {
          screen: 'Chat',
          params: {chatUser},
          merge: true,
        },
        merge: true,
      });
      return;
    }

    navigation.navigate('Chat', {chatUser});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent title={Strings.teachers} notificationCount={1} />

      <FlatList
        data={subjectTeachers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SubjectTeacherItem item={item} onMessage={openTeacherChat} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <AttendanceStudentDropdown
              student={isParent ? activeStudent : teacherStudent}
              students={isParent ? childList : [teacherStudent]}
              selectedId={isParent ? selectedChildId : teacherStudent.value}
              onSelect={item => setSelectedChildId(item.value)}
              readOnly={!isParent}
              label={studentLabel}
            />

            <ClassTeacherCard teacher={classTeacher} onMessage={openTeacherChat} />

            <View style={styles.subjectHeader}>
              <Text style={styles.subjectTitle} numberOfLines={1}>
                {Strings.subjectTeachers}
              </Text>
              <Text style={styles.teacherCount} numberOfLines={1}>
                {subjectTeachers.length} teachers
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Teacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(1.5),
  },
  subjectTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    width: wp(40),
  },
  teacherCount: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    width: wp(25),
  },
});
