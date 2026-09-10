import {useMemo} from 'react';
import {Images} from '../Assets';
import {Strings} from '../Constants/Strings';
import {PARENT_DATA} from '../Constants/dummydata';
import {useRoleData} from './useRoleData';

export const useProfileStudent = () => {
  const {activeStudent, profilePerson, profileMenuList, isParent} = useRoleData();

  const student = activeStudent;

  const profileDetails = useMemo(() => {
    if (isParent) {
      return [
        {
          key: 'cnic',
          icon: Images.idCard,
          label: Strings.cnic,
          value: PARENT_DATA.cnic,
        },
        {
          key: 'email',
          icon: Images.guardian,
          label: Strings.email,
          value: PARENT_DATA.email,
        },
        {
          key: 'phone',
          icon: Images.messageIcon,
          label: Strings.phone,
          value: PARENT_DATA.phone,
        },
        {
          key: 'address',
          icon: Images.cap,
          label: Strings.address,
          value: PARENT_DATA.address,
        },
      ];
    }

    return [
      {
        key: 'studentId',
        icon: Images.idCard,
        label: Strings.studentId,
        value: student?.studentId,
      },
      {
        key: 'guardian',
        icon: Images.guardian,
        label: Strings.guardian,
        value: student?.guardian,
      },
      {
        key: 'dob',
        icon: Images.birth,
        label: Strings.dateOfBirth,
        value: student?.dob,
      },
      {
        key: 'class',
        icon: Images.cap,
        label: Strings.classLabel,
        value: student?.className,
      },
      {
        key: 'section',
        icon: Images.multiplePerson,
        label: Strings.section,
        value: `Section ${student?.section}`,
      },
    ];
  }, [isParent, student]);

  return {
    student,
    profilePerson,
    menuList: profileMenuList,
    profileDetails,
    isParent,
  };
};
