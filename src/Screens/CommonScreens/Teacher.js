import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ClassTeacherCard from '../../Component/ClassTeacherCard';
import SubjectTeacherItem from '../../Component/SubjectTeacherItem';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {ATTENDANCE_STUDENTS, getTeachersForChild} from '../../Constants/dummydata';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {navigateToChat} from '../../Navigations/navigationHelpers';
import {showToast} from '../../utils/toast';
import {fetchStudentTeacher, fetchStudentTeachers} from '../../store/slices/studentHomeSlice';

const Teacher = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const homeStudent = useSelector(state => state.studentHome.student);
  const [pickedChildId, setPickedChildId] = useState(ATTENDANCE_STUDENTS[0]?.value);
  const [studentTeachers, setStudentTeachers] = useState({
    classTeacher: null,
    subjectTeachers: [],
  });
  const [loading, setLoading] = useState(!isParent);
  const dummyTeachers = isParent ? getTeachersForChild(pickedChildId) : {};
  const classTeacher = isParent ? dummyTeachers.classTeacher : studentTeachers.classTeacher;
  const subjectTeachers = isParent
    ? dummyTeachers.subjectTeachers || []
    : studentTeachers.subjectTeachers;
  const students = isParent ? ATTENDANCE_STUDENTS : [];
  const parentChild =
    ATTENDANCE_STUDENTS.find(item => item.value === pickedChildId) || ATTENDANCE_STUDENTS[0];
  const bannerStudent = isParent
    ? parentChild
    : {
        label: homeStudent?.label || '',
        classInfo: homeStudent?.className || homeStudent?.classLabel || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        photoUrl: homeStudent?.photoUrl || '',
      };
  const studentLabel = isParent ? Strings.child : Strings.student;
  const canSwitchChild = isParent && students.length > 1;

  useEffect(() => {
    if (isParent) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchStudentTeachers())
      .unwrap()
      .then(payload => {
        console.log('payload', payload);
        if (active) {
          setStudentTeachers(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentTeachers({classTeacher: null, subjectTeachers: []});
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load teachers.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [dispatch, isParent]);

  const mergeTeacher = detail => {
    if (!detail?.id && !detail?.name) {
      return;
    }
    setStudentTeachers(current => {
      if (current.classTeacher && current.classTeacher.id === detail.id) {
        return {
          ...current,
          classTeacher: {...current.classTeacher, ...detail},
        };
      }
      return {
        ...current,
        subjectTeachers: current.subjectTeachers.map(item =>
          item.id === detail.id ? {...item, ...detail} : item,
        ),
      };
    });
  };

  const openTeacherDetail = teacher => {
    if (isParent || !teacher?.id) {
      return;
    }
    dispatch(fetchStudentTeacher(teacher.id))
      .unwrap()
      .then(mergeTeacher)
      .catch(error => {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load teacher.',
        });
      });
  };

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
          data={loading ? [] : subjectTeachers}
          keyExtractor={item => `${isParent ? pickedChildId : 'student'}-${item.id}`}
          extraData={isParent ? pickedChildId : studentTeachers}
          renderItem={({item, index}) => (
            <SubjectTeacherItem
              item={item}
              onMessage={openTeacherChat}
              onPress={isParent ? undefined : () => openTeacherDetail(item)}
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
                student={bannerStudent}
                students={students}
                selectedId={isParent ? pickedChildId : undefined}
                premium
                animationIndex={1}
                onSelect={isParent ? item => setPickedChildId(item.value) : undefined}
                readOnly={!isParent || !canSwitchChild}
                label={studentLabel}
              />

              {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
              ) : null}

              {!loading && classTeacher ? (
                <ClassTeacherCard
                  key={`class-teacher-${classTeacher.id || pickedChildId}`}
                  teacher={classTeacher}
                  onMessage={openTeacherChat}
                  onPress={isParent ? undefined : () => openTeacherDetail(classTeacher)}
                  premium
                  animationIndex={2}
                />
              ) : null}

              {!loading ? (
                <ProfileSectionTitle style={styles.subjectHeaderPremium} animationIndex={3}>
                  {Strings.subjectTeachers}
                </ProfileSectionTitle>
              ) : null}

              {!loading && !classTeacher && subjectTeachers.length === 0 ? (
                <Text style={styles.empty}>No teachers yet.</Text>
              ) : null}
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
  loader: {
    marginVertical: hp(4),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginTop: hp(4),
  },
});
