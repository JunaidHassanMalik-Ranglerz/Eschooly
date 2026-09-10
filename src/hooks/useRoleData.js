import {useRole} from '../context/RoleContext';
import {
  LOGGED_IN_STUDENT,
  PARENT_DATA,
  STUDENT_LIST,
  PARENT_PROFILE_MENU_LIST,
  PROFILE_MENU_LIST,
} from '../Constants/dummydata';
import {LINKED_STUDENTS, Strings} from '../Constants/Strings';

export const useRoleData = () => {
  const {role, isParent, isStudent, selectedChildId, setSelectedChildId} =
    useRole();

  const activeStudent = isParent
    ? STUDENT_LIST.find(item => item.value === selectedChildId) ||
      STUDENT_LIST[0]
    : LOGGED_IN_STUDENT;

  return {
    role,
    isParent,
    isStudent,
    activeStudent,
    childList: LINKED_STUDENTS,
    selectedChildId,
    setSelectedChildId,
    profilePerson: isParent ? PARENT_DATA : LOGGED_IN_STUDENT,
    profileMenuList: isParent ? PARENT_PROFILE_MENU_LIST : PROFILE_MENU_LIST,
    studentLabel: isParent ? Strings.child : Strings.student,
  };
};
