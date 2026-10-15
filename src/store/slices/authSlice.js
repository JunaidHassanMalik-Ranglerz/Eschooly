import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAuthToken} from '../../api/axiosInstance';
import {
  changeParentPassword,
  mapParentLogin,
  mapParentProfile,
  parentLogin,
  parentLogout,
  parentProfile,
} from '../../services/authService';
import {getApiErrorMessage} from '../../utils/apiError';
import {storage, storageKeys} from '../../utils/storage';
import {resetParentHome} from './parentHomeSlice';

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
  if (!message || message === 'parent.api.logged_out') {
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
      state.loading = false;
      state.token = null;
      state.role = 'student';
      state.user = action.payload ?? null;
      state.profile = null;
      state.isAuthenticated = true;
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
      .addCase(updateParentPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentPassword.fulfilled, () => initialState)
      .addCase(updateParentPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unable to update password.';
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
      .addCase(logoutParent.rejected, state => initialState);
  },
});

export const {setCredentials, clearCredentials, setStudentSession} = authSlice.actions;
export default authSlice.reducer;
