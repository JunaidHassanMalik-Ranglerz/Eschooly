import React, {createContext, useContext, useMemo, useState} from 'react';
import {LOGGED_IN_STUDENT} from '../Constants/dummydata';

export const ROLES = {
  PARENT: 'parent',
  STUDENT: 'student',
};

const RoleContext = createContext(null);

export const RoleProvider = ({children}) => {
  const [role, setRole] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState('1');
  const [loggedInStudentId, setLoggedInStudentId] = useState(
    LOGGED_IN_STUDENT.value,
  );

  const value = useMemo(
    () => ({
      role,
      setRole,
      selectedChildId,
      setSelectedChildId,
      loggedInStudentId,
      setLoggedInStudentId,
      clearRole: () => {
        setRole(null);
        setSelectedChildId('1');
        setLoggedInStudentId(LOGGED_IN_STUDENT.value);
      },
      isParent: role === ROLES.PARENT,
      isStudent: role === ROLES.STUDENT,
    }),
    [role, selectedChildId, loggedInStudentId],
  );

  return (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};
