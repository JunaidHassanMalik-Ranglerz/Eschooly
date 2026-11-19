import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StudentLoginView from '../../Component/Auth/StudentLoginView';
import ParentLoginView from '../../Component/Auth/ParentLoginView';
import {STUDENT_LIST} from '../../Constants/dummydata';
import {ROLES, useRole} from '../../context/RoleContext';
import {loginParent, loginStudent} from '../../store/slices/authSlice';
import {showToast} from '../../utils/toast';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';

const RegisterContent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const signingIn = useSelector(state => state.auth.loading);
  const submitLock = useRef(false);
  const {clearRole, isParent, setLoggedInStudentId, setRole} = useRole();
  const [familyId, setFamilyId] = useState('FAM-049');
  const [studentId, setStudentId] = useState('QA-STU-0001');
  const [password, setPassword] = useState(
    isParent ? '12345678' : 'Admin@098'
  );
  const [showPassword, setShowPassword] = useState(false);

  const signInParent = async () => {
    if (signingIn || submitLock.current) {
      return;
    }

    const trimmedFamilyId = familyId.trim();
    if (!trimmedFamilyId) {
      showToast({type: 'error', text1: 'Family ID is required.'});
      return;
    }
    if (!password.trim()) {
      showToast({type: 'error', text1: 'Password is required.'});
      return;
    }

    submitLock.current = true;
    try {
      const result = await dispatch(
        loginParent({familyId: trimmedFamilyId, password}),
      ).unwrap();
      setRole(ROLES.PARENT);
      if (result?.message) {
        showToast({type: 'success', text1: result.message});
      }
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to sign in.',
      });
    } finally {
      submitLock.current = false;
    }
  };

  const signInStudent = async () => {
    if (signingIn || submitLock.current) {
      return;
    }

    const trimmedStudentId = studentId.trim();
    if (!trimmedStudentId) {
      showToast({type: 'error', text1: 'Student ID is required.'});
      return;
    }
    if (!password.trim()) {
      showToast({type: 'error', text1: 'Password is required.'});
      return;
    }

    submitLock.current = true;
    try {
      const result = await dispatch(
        loginStudent({studentId: trimmedStudentId, password}),
      ).unwrap();
      const matched = STUDENT_LIST.find(
        item =>
          item.studentId.toLowerCase() === trimmedStudentId.toLowerCase() ||
          String(item.value) === String(result?.user?.id),
      );
      if (matched) {
        setLoggedInStudentId(matched.value);
      } else if (result?.user?.id != null) {
        setLoggedInStudentId(String(result.user.id));
      }
      setRole(ROLES.STUDENT);
      if (result?.message) {
        showToast({type: 'success', text1: result.message});
      }
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to sign in.',
      });
    } finally {
      submitLock.current = false;
    }
  };

  const goToHome = () => {
    if (isParent) {
      signInParent();
      return;
    }

    signInStudent();
  };

  const goToRole = useCallback(() => {
    clearRole();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{name: 'Role'}],
    });
  }, [clearRole, navigation]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          goToRole();
          return true;
        },
      );

      return () => subscription.remove();
    }, [goToRole]),
  );

  if (!isParent) {
    return (
      <StudentLoginView
        insets={insets}
        studentId={studentId}
        onStudentIdChange={setStudentId}
        password={password}
        onPasswordChange={setPassword}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(prev => !prev)}
        signingIn={signingIn}
        onSignIn={goToHome}
      />
    );
  }

  return (
    <ParentLoginView
      insets={insets}
      familyId={familyId}
      onFamilyIdChange={setFamilyId}
      password={password}
      onPasswordChange={setPassword}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(prev => !prev)}
      signingIn={signingIn}
      onSignIn={goToHome}
    />
  );
};

const Register = () => <RegisterContent />;

export default withScreenEnter(Register, 'register');
