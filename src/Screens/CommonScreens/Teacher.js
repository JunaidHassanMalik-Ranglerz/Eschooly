import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import ClassTeacherCard from '../../Component/ClassTeacherCard';
import SubjectTeacherItem from '../../Component/SubjectTeacherItem';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
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
  const icy = !isParent;
  const bottomPad = useStackBottomPad();
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
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

  const identityCard = (
    <AttendanceStudentDropdown
      student={bannerStudent}
      students={students}
      selectedId={isParent ? pickedChildId : undefined}
      premium
      embedded
      readOnly={!isParent || !canSwitchChild}
      look={icy ? 'float' : undefined}
      label={studentLabel}
      animationIndex={1}
      onSelect={isParent ? item => setPickedChildId(item.value) : undefined}
    />
  );

  const teacherBody = (
    <>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={icy ? Colors.brandRoyal : Colors.primary}
        />
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
        <ProfileSectionTitle
          style={icy ? styles.subjectHeaderIcy : styles.subjectHeaderPremium}
          animationIndex={3}>
          {Strings.subjectTeachers}
        </ProfileSectionTitle>
      ) : null}

      {!loading && !classTeacher && subjectTeachers.length === 0 ? (
        <Text style={[styles.empty, icy && styles.emptyIcy]}>No teachers yet.</Text>
      ) : null}

      {icy && !loading
        ? subjectTeachers.map((item, index) => (
            <SubjectTeacherItem
              key={`student-${item.id}`}
              item={item}
              onMessage={openTeacherChat}
              onPress={() => openTeacherDetail(item)}
              premium
              animationIndex={index + 4}
            />
          ))
        : null}
    </>
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled">
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <StudentBrandedHeader
                title={Strings.teachers}
                unreadCount={unreadNotifications}
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  {identityCard}
                  {teacherBody}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
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
              {identityCard}
              {teacherBody}
            </View>
          }
        />
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(Teacher, 'teacher');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
    overflow: 'visible',
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
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
  subjectHeaderIcy: {
    marginTop: hp(0.4),
    marginBottom: hp(0.6),
    color: Colors.brandNavy,
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
  emptyIcy: {
    color: Colors.textSecondary,
  },
});
