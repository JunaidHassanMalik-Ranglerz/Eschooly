import {useMemo} from 'react';
import {useRole} from '../context/RoleContext';
import {
  LOGGED_IN_STUDENT,
  PARENT_DATA,
  PARENT_PROFILE_MENU_LIST,
  PROFILE_MENU_LIST,
  STUDENT_NOTIFICATIONS,
  STUDENT_TIMETABLE,
} from '../Constants/dummydata';
import {LINKED_STUDENTS, Strings} from '../Constants/Strings';
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
  getChildRecords,
} from '../Constants/parentData';

export const useRoleData = () => {
  const {role, isParent, isStudent, selectedChildId, setSelectedChildId} =
    useRole();

  const activeChild =
    PARENT_CHILDREN.find(item => item.value === selectedChildId) ||
    PARENT_CHILDREN[0];

  const selectedStudent = isParent ? activeChild : LOGGED_IN_STUDENT;
  const classLabel =
    selectedStudent?.className && selectedStudent?.section
      ? `${selectedStudent.className}${selectedStudent.section}`
      : selectedStudent?.classBadge || '';
  const activeStudent = {
    ...selectedStudent,
    classLabel,
  };

  return useMemo(
    () => ({
      role,
      isParent,
      isStudent,
      activeStudent,
      classLabel,
      childList: isParent ? PARENT_CHILDREN : LINKED_STUDENTS,
      selectedChildId,
      setSelectedChildId,
      profilePerson: isParent ? PARENT_DATA : LOGGED_IN_STUDENT,
      profileMenuList: isParent ? PARENT_PROFILE_MENU_LIST : PROFILE_MENU_LIST,
      studentLabel: isParent ? Strings.child : Strings.student,
      parentChatUser: PARENT_CHAT_USER,
      unreadNotificationCount: isParent
        ? PARENT_NOTIFICATIONS.filter(
            item => item.unread && item.childIds.includes(selectedChildId),
          ).length
        : STUDENT_NOTIFICATIONS.filter(item => item.unread).length,
      schedule: isParent ? getChildRecords(PARENT_SCHEDULE, selectedChildId) : [],
      timetable: isParent
        ? getChildRecords(PARENT_TIMETABLE, selectedChildId)
        : STUDENT_TIMETABLE,
      examSchedule: isParent
        ? getChildRecords(PARENT_EXAM_SCHEDULE, selectedChildId)
        : [],
      diaryEntries: isParent
        ? getChildRecords(PARENT_DIARY, selectedChildId)
        : [],
      attendanceHistory: isParent
        ? getChildRecords(PARENT_ATTENDANCE_HISTORY, selectedChildId)
        : [],
      announcements: isParent
        ? PARENT_ANNOUNCEMENTS.filter(item =>
            item.childIds.includes(selectedChildId),
          )
        : [],
      notifications: isParent
        ? PARENT_NOTIFICATIONS.filter(item =>
            item.childIds.includes(selectedChildId),
          )
        : STUDENT_NOTIFICATIONS,
      feeDetails: isParent
        ? PARENT_FEES[selectedChildId] || PARENT_FEES['1']
        : null,
      transportDetails: isParent
        ? PARENT_TRANSPORT[selectedChildId] || PARENT_TRANSPORT['1']
        : null,
    }),
    [role, isParent, isStudent, activeStudent, classLabel, selectedChildId, setSelectedChildId],
  );
};
