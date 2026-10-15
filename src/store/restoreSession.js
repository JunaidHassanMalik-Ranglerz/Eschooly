import {setAuthToken} from '../api/axiosInstance';
import {ROLES} from '../context/RoleContext';
import {setCredentials} from './slices/authSlice';
import {storage, storageKeys} from '../utils/storage';

export const applySavedSession = (auth, {setRole, setLoggedInStudentId} = {}) => {
  if (auth?.isAuthenticated && auth.role === ROLES.PARENT && auth.token) {
    setAuthToken(auth.token, 'Bearer');
    setRole?.(ROLES.PARENT);
    return 'parent';
  }

  if (auth?.isAuthenticated && auth.role === ROLES.STUDENT) {
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

  if (!token || role !== ROLES.PARENT) {
    return false;
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
