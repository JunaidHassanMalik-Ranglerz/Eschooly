import React, {createContext, useContext, useMemo, useState} from 'react';

export const ROLES = {
  PARENT: 'parent',
  STUDENT: 'student',
};

const RoleContext = createContext(null);

export const RoleProvider = ({children}) => {
  const [role, setRole] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState('1');

  const value = useMemo(
    () => ({
      role,
      setRole,
      selectedChildId,
      setSelectedChildId,
      clearRole: () => {
        setRole(null);
        setSelectedChildId('1');
      },
      isParent: role === ROLES.PARENT,
      isStudent: role === ROLES.STUDENT,
    }),
    [role, selectedChildId],
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
