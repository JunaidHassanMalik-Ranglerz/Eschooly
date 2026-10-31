import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAuthToken} from '../../api/axiosInstance';
import {
  changeParentPassword,
  changeStudentPassword,
  mapParentLogin,
  mapParentProfile,
  mapStudentLogin,
  parentLogin,
  parentLogout,
  parentProfile,
  studentLogin,
  studentLogout,
} from '../../services/authService';
import {getStudentProfile, mapStudentProfile} from '../../services/studentService';
import {getApiErrorMessage} from '../../utils/apiError';
import {storage, storageKeys} from '../../utils/storage';
import {resetParentHome} from './parentHomeSlice';
import {resetStudentHome} from './studentHomeSlice';

const initialState = {
  loading: false,
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  error: null,
  profile: null,
  profileLoading: false,
  logoutLoading: false,
};

const rejectMessage = error => ({
  message: getApiErrorMessage(error),
  status: error?.response?.status ?? null,
});

export const loginParent = createAsyncThunk(
  'auth/loginParent',
  async ({familyId, password}, {rejectWithValue}) => {
    try {
      const response = await parentLogin({familyId, password});
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to sign in.',
          status: response?.status ?? null,
        });
      }

      const session = mapParentLogin(body);
      if (session.token) {
        setAuthToken(session.token, session.tokenType);
        try {
          await storage.setItem(storageKeys.token, String(session.token));
          await storage.setItem(storageKeys.role, 'parent');
          if (session.user) {
            await storage.setItem(storageKeys.user, JSON.stringify(session.user));
          }
        } catch (storageError) {
          // Keep the in-memory token even if the device save fails.
        }
      }
      return session;
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

export const loginStudent = createAsyncThunk(
  'auth/loginStudent',
  async ({studentId, password}, {rejectWithValue}) => {
    try {
      const response = await studentLogin({studentId, password});
      console.log('response', response);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to sign in.',
          status: response?.status ?? null,
        });
      }

      const session = mapStudentLogin(body);
      if (!session.token) {
        return rejectWithValue({
          message: 'Unable to sign in.',
          status: response?.status ?? null,
        });
      }

      const user = session.user || {student_id: studentId};
      if (!user.student_id) {
        user.student_id = studentId;
      }

      setAuthToken(session.token, session.tokenType);
      try {
        await storage.setItem(storageKeys.token, String(session.token));
        await storage.setItem(storageKeys.role, 'student');
        await storage.setItem(storageKeys.user, JSON.stringify(user));
      } catch (storageError) {
        // Keep the in-memory token even if the device save fails.
      }

      return {...session, user};
    } catch (error) {
      console.log('error', error?.response?.data);
      return rejectWithValue(rejectMessage(error));
    }
  },
);

const readToken = async getState => {
  let token = getState().auth.token;
  if (!token) {
    try {
      const session = await storage.getSession();
      token = session?.[storageKeys.token] || null;
    } catch (storageError) {
      token = null;
    }
  }
  if (token) {
    setAuthToken(token, 'Bearer');
  }
  return token;
};

export const fetchStudentProfile = createAsyncThunk(
  'auth/fetchStudentProfile',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = await readToken(getState);
      if (!token) {
        return rejectWithValue({
          message: 'Please sign in again.',
          status: 401,
        });
      }

      const response = await getStudentProfile();
      console.log('response', response);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load profile.',
          status: response?.status ?? null,
        });
      }

      return mapStudentProfile(body);
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

export const fetchParentProfile = createAsyncThunk(
  'auth/fetchParentProfile',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = await readToken(getState);
      if (!token) {
        return rejectWithValue({
          message: 'Please sign in again.',
          status: 401,
        });
      }

      const response = await parentProfile();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load profile.',
          status: response?.status ?? null,
        });
      }

      return mapParentProfile(body);
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

const logoutMessage = rawMessage => {
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
  if (
    !message ||
    message === 'parent.api.logged_out' ||
    message === 'student.api.logged_out'
  ) {
    return 'Logged out successfully.';
  }
  return message;
};

const clearLocalSession = async dispatch => {
  try {
    await storage.clearSession();
  } catch (storageError) {
    // Navigation still returns the parent to the login screen.
  }
  setAuthToken(null);
  dispatch(resetParentHome());
  dispatch(resetStudentHome());
};

export const logoutParent = createAsyncThunk(
  'auth/logoutParent',
  async (_, {dispatch, getState, rejectWithValue}) => {
    let message = 'Logged out successfully.';
    try {
      const token = await readToken(getState);
      if (token) {
        const response = await parentLogout();
        const body = response?.data;
        if (body && body.success === false) {
          await clearLocalSession(dispatch);
          return rejectWithValue({
            message:
              typeof body.message === 'string' && body.message.trim()
                ? body.message.trim()
                : 'Unable to log out.',
            status: response?.status ?? null,
          });
        }
        message = logoutMessage(body?.message);
      }
    } catch (error) {
      await clearLocalSession(dispatch);
      return rejectWithValue(rejectMessage(error));
    }

    await clearLocalSession(dispatch);
    return {message};
  },
);
export const logoutStudent = createAsyncThunk(
  'auth/logoutStudent',
  async (_, {dispatch, getState, rejectWithValue}) => {
    let message = 'Logged out successfully.';
    try {
      const token = await readToken(getState);
      if (token) {
        const response = await studentLogout();
        const body = response?.data;
        if (body && body.success === false) {
          await clearLocalSession(dispatch);
          return rejectWithValue({
            message:
              typeof body.message === 'string' && body.message.trim()
                ? body.message.trim()
                : 'Unable to log out.',
            status: response?.status ?? null,
          });
        }
        message = logoutMessage(body?.message);
      }
    } catch (error) {
      await clearLocalSession(dispatch);
      return rejectWithValue(rejectMessage(error));
    }

    await clearLocalSession(dispatch);
    return {message};
  },
);

export const updateStudentPassword = createAsyncThunk(
  'auth/updateStudentPassword',
  async (fields, {dispatch, getState, rejectWithValue}) => {
    try {
      const token = await readToken(getState);
      if (!token) {
        return rejectWithValue({
          message: 'Please sign in again.',
          status: 401,
        });
      }

      const response = await changeStudentPassword(fields);
      const rawMessage = response?.data?.message;
      const message =
        typeof rawMessage === 'string' &&
        rawMessage.trim() &&
        !rawMessage.includes('.api.')
          ? rawMessage.trim()
          : 'Password updated successfully.';
      try {
        await storage.clearSession();
      } catch (storageError) {
        // Session clear must still continue so the student logs in again.
      }
      setAuthToken(null);
      dispatch(resetParentHome());
  dispatch(resetStudentHome());
      return {message};
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(rejectMessage(error));
    }
  },
);

export const updateParentPassword = createAsyncThunk(
  'auth/updateParentPassword',
  async (fields, {dispatch, getState, rejectWithValue}) => {
    try {
      const token = await readToken(getState);
      if (!token) {
        return rejectWithValue({
          message: 'Please sign in again.',
          status: 401,
        });
      }

      const response = await changeParentPassword(fields);
      const rawMessage = response?.data?.message;
      const message =
        typeof rawMessage === 'string' && rawMessage.trim()
          ? rawMessage.trim()
          : 'Password updated successfully.';
      try {
        await storage.clearSession();
      } catch (storageError) {
        // Session clear must still continue so the parent logs in again.
      }
      setAuthToken(null);
      dispatch(resetParentHome());
  dispatch(resetStudentHome());
      return {message};
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.role = action.payload?.role ?? null;
      state.user = action.payload?.user ?? null;
      state.isAuthenticated = Boolean(state.token) && state.role === 'parent';
      state.loading = false;
      state.error = null;
    },
    clearCredentials: () => initialState,
    setStudentSession: (state, action) => {
      const payload = action.payload ?? null;
      const user =
        payload && Object.prototype.hasOwnProperty.call(payload, 'user')
          ? payload.user
          : payload;
      state.loading = false;
      state.token = payload?.token ?? null;
      state.role = 'student';
      state.user = user;
      state.profile = null;
      state.isAuthenticated = Boolean(payload?.token);
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginParent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginParent.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = 'parent';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginParent.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.role = null;
        state.error = action.payload?.message || 'Unable to sign in.';
      })
      .addCase(loginStudent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = 'student';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.role = null;
        state.error = action.payload?.message || 'Unable to sign in.';
      })
      .addCase(updateParentPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentPassword.fulfilled, () => initialState)
      .addCase(updateParentPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unable to update password.';
      })
      .addCase(updateStudentPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentPassword.fulfilled, () => initialState)
      .addCase(updateStudentPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unable to update password.';
      })
      .addCase(fetchStudentProfile.pending, state => {
        state.profileLoading = true;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profile = null;
        state.error = action.payload?.message || 'Unable to load profile.';
      })
      .addCase(fetchParentProfile.pending, state => {
        state.profileLoading = true;
      })
      .addCase(fetchParentProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchParentProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload?.message || 'Unable to load profile.';
      })
      .addCase(logoutParent.pending, state => {
        state.logoutLoading = true;
      })
      .addCase(logoutParent.fulfilled, () => initialState)
      .addCase(logoutParent.rejected, state => initialState)
      .addCase(logoutStudent.pending, state => {
        state.logoutLoading = true;
      })
      .addCase(logoutStudent.fulfilled, () => initialState)
      .addCase(logoutStudent.rejected, state => initialState);
  },
});

export const {setCredentials, clearCredentials, setStudentSession} = authSlice.actions;
export default authSlice.reducer;
