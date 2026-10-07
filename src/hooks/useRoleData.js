import {useMemo} from 'react';

import {useRole} from '../context/RoleContext';

import {

  LOGGED_IN_STUDENT,

  PARENT_DATA,

  STUDENT_LIST,

  ATTENDANCE_STUDENTS,

  PARENT_PROFILE_MENU_LIST,

  PROFILE_MENU_LIST,

  getAssignmentOverviewForClass,

  getAssignmentSubjectsForClass,

  getExamStudentForChild,

  getStudentResultsForClass,

  getSyllabusListForClass,

  getTeachersForChild,

  getTimetableForClass,

  getUpcomingClassForClass,

  ALL_STUDENT_NOTIFICATIONS,
} from '../Constants/dummydata';

import {LINKED_STUDENTS, Strings, EXAM_STUDENTS} from '../Constants/Strings';

import {buildActiveStudent} from '../Constants/selectedChild';

import {

  PARENT_CHILDREN,

  PARENT_SCHEDULE,

  PARENT_TIMETABLE,

  PARENT_EXAM_SCHEDULE,

  PARENT_ANNOUNCEMENTS,

  PARENT_NOTIFICATIONS,

  PARENT_DIARY,

  PARENT_ATTENDANCE_HISTORY,

  PARENT_CHAT_USER,

  PARENT_FEES,

  PARENT_TRANSPORT,

  PARENT_CHILD_TRIPS,

  getChildRecords,
} from '../Constants/parentData';

import {getLibraryResourcesForClass} from '../Constants/DigitalLibraryData';

const filterNotificationsForStudent = (list, student) => {
  if (!student?.value) {
    return [];
  }
  return list.filter(item => {
    const childIds = item.childIds;
    const classNames = item.classNames;
    const hasChild = Array.isArray(childIds) && childIds.length > 0;
    const hasClass = Array.isArray(classNames) && classNames.length > 0;
    if (!hasChild && !hasClass) {
      return true;
    }
    if (hasChild && childIds.includes(student.value)) {
      return true;
    }
    if (hasClass && classNames.includes(student.className)) {
      return true;
    }
    return false;
  });
};

import {

  getOnlineClassesForClass,

  LIVE_CLASS,

} from '../Constants/OnlineClassData';



export const useRoleData = () => {

  const {
    role,
    isParent,
    isStudent,
    selectedChildId,
    setSelectedChildId,
    loggedInStudentId,
  } = useRole();



  const childList = isParent
    ? ATTENDANCE_STUDENTS.map(item => ({
        ...PARENT_CHILDREN[0],
        ...item,
      }))
    : LINKED_STUDENTS;

  const hasMultipleChildren = isParent && ATTENDANCE_STUDENTS.length > 1;

  const activeChild =
    childList.find(item => item.value === selectedChildId) || childList[0];

  const resolveStudentRecord = id => {
    const fromList = STUDENT_LIST.find(item => item.value === id);
    const fromAttendance = ATTENDANCE_STUDENTS.find(item => item.value === id);
    if (fromList || fromAttendance) {
      return {...fromList, ...fromAttendance};
    }
    return LOGGED_IN_STUDENT;
  };

  const loggedInStudent = resolveStudentRecord(
    loggedInStudentId || LOGGED_IN_STUDENT.value,
  );

  const selectedStudent = isParent ? activeChild : loggedInStudent;

  const activeStudent = buildActiveStudent(selectedStudent);

  const canSwitchStudent = false;



  return useMemo(

    () => ({

      role,

      isParent,

      isStudent,

      activeStudent,

      classLabel: activeStudent?.classLabel || '',

      childList,

      hasMultipleChildren,

      canSwitchChild: hasMultipleChildren,

      canSwitchStudent,

      selectedChildId: activeStudent?.value || selectedChildId,

      setSelectedChildId,

      profilePerson: isParent ? PARENT_DATA : activeStudent,

      attendanceStudents: isParent
        ? childList
        : ATTENDANCE_STUDENTS.filter(item => item.value === activeStudent?.value),

      profileMenuList: isParent ? PARENT_PROFILE_MENU_LIST : PROFILE_MENU_LIST,

      studentLabel: isParent ? Strings.child : Strings.student,

      parentChatUser: PARENT_CHAT_USER,

      subjects: activeStudent?.subjects || [],

      assignmentSubjects: getAssignmentSubjectsForClass(activeStudent?.className),

      assignmentOverview: getAssignmentOverviewForClass(activeStudent?.className),

      syllabusList: getSyllabusListForClass(activeStudent?.className),

      teachers: getTeachersForChild(activeStudent?.value),

      examStudent: getExamStudentForChild(activeStudent, EXAM_STUDENTS),

      getResultsForTerm: term =>

        getStudentResultsForClass(activeStudent?.className, term),

      libraryResources: getLibraryResourcesForClass(activeStudent?.className),

      onlineClasses: getOnlineClassesForClass(activeStudent?.className),

      liveClass: getOnlineClassesForClass(activeStudent?.className).live || LIVE_CLASS,

      unreadNotificationCount: filterNotificationsForStudent(
        isParent ? PARENT_NOTIFICATIONS : ALL_STUDENT_NOTIFICATIONS,
        activeStudent,
      ).filter(item => item.unread).length,

      schedule: isParent

        ? getChildRecords(PARENT_SCHEDULE, activeStudent?.value)

        : [],

      timetable: isParent

        ? getChildRecords(PARENT_TIMETABLE, activeStudent?.value)

        : getTimetableForClass(activeStudent?.className),

      studentUpcomingClass: getUpcomingClassForClass(activeStudent?.className),

      examSchedule: isParent

        ? getChildRecords(PARENT_EXAM_SCHEDULE, activeStudent?.value)

        : [],

      diaryEntries: isParent

        ? getChildRecords(PARENT_DIARY, activeStudent?.value)

        : [],

      attendanceHistory: isParent

        ? getChildRecords(PARENT_ATTENDANCE_HISTORY, activeStudent?.value)

        : [],

      announcements: isParent

        ? PARENT_ANNOUNCEMENTS.filter(item =>

            item.childIds.includes(activeStudent?.value),

          )

        : PARENT_ANNOUNCEMENTS.filter(item =>

            item.childIds.includes(activeStudent?.value),

          ),

      notifications: filterNotificationsForStudent(
        isParent ? PARENT_NOTIFICATIONS : ALL_STUDENT_NOTIFICATIONS,
        activeStudent,
      ),

      feeDetails: isParent

        ? PARENT_FEES[activeStudent?.value] || PARENT_FEES['1']

        : null,

      transportDetails: isParent

        ? PARENT_TRANSPORT[activeStudent?.value] || PARENT_TRANSPORT['1']

        : null,

      childTrip: isParent

        ? PARENT_CHILD_TRIPS[activeStudent?.value] || PARENT_CHILD_TRIPS['1']

        : null,

    }),

    [

      role,

      isParent,

      isStudent,

      activeStudent,

      childList,

      hasMultipleChildren,

      selectedChildId,

      setSelectedChildId,

      loggedInStudentId,

    ],

  );

};

