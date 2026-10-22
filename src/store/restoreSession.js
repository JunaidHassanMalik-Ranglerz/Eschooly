import {setAuthToken} from '../api/axiosInstance';
import {ROLES} from '../context/RoleContext';
import {setCredentials, setStudentSession} from './slices/authSlice';
import {storage, storageKeys} from '../utils/storage';

export const applySavedSession = (auth, {setRole, setLoggedInStudentId} = {}) => {
  if (auth?.isAuthenticated && auth.role === ROLES.PARENT && auth.token) {
    setAuthToken(auth.token, 'Bearer');
    setRole?.(ROLES.PARENT);
    return 'parent';
  }

  if (auth?.isAuthenticated && auth.role === ROLES.STUDENT) {
    if (auth.token) {
      setAuthToken(auth.token, 'Bearer');
    }
    setRole?.(ROLES.STUDENT);
    if (auth.user?.id) {
      setLoggedInStudentId?.(String(auth.user.id));
    }
    return 'student';
  }

  return null;
};

export const restoreParentSession = async (dispatch, setRole) => {
  const session = await storage.getSession();
  const token = session?.[storageKeys.token];
  const role = session?.[storageKeys.role];

  if (!token || (role !== ROLES.PARENT && role !== ROLES.STUDENT)) {
    return false;
  }

  if (role === ROLES.STUDENT) {
    let user = null;
    if (session?.[storageKeys.user]) {
      try {
        user = JSON.parse(session[storageKeys.user]);
      } catch (error) {
        user = null;
      }
    }

    dispatch(setStudentSession({token, user}));
    setAuthToken(token, 'Bearer');
    setRole?.(ROLES.STUDENT);
    return true;
  }

  let user = null;
  if (session?.[storageKeys.user]) {
    try {
      user = JSON.parse(session[storageKeys.user]);
    } catch (error) {
      user = null;
    }
  }

  dispatch(setCredentials({token, role: ROLES.PARENT, user}));
  setAuthToken(token, 'Bearer');
  setRole?.(ROLES.PARENT);
  return true;
};
