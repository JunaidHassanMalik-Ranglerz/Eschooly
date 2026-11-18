import React, {createContext, useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../Constants/Colors';
import {hp} from '../../Constants/Responsive';

const StudentToneContext = createContext(false);

export const StudentToneProvider = ({active = false, children}) => (
  <StudentToneContext.Provider value={Boolean(active)}>
    {children}
  </StudentToneContext.Provider>
);

export const useStudentTone = () => useContext(StudentToneContext);

export const useStackBottomPad = (extraHp = 3) => {
  const insets = useSafeAreaInsets();
  return hp(extraHp) + (insets.bottom || 0);
};

export const studentCanvas = Colors.canvas;
