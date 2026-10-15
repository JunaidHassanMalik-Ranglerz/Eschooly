import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAuthToken} from '../../api/axiosInstance';
import {
  changeParentPassword,
  mapParentLogin,
  parentLogin,
} from '../../services/authService';
import {getApiErrorMessage} from '../../utils/apiError';
import {storage, storageKeys} from '../../utils/storage';

const initialState = {
  loading: false,
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  error: null,
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
      }
      try {
        await storage.saveSession({
          token: session.token,
          role: session.role,
          user: session.user,
        });
      } catch (storageError) {
        // A failed save must not turn a successful login into a network error.
      }
      return session;
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  },
);

export const updateParentPassword = createAsyncThunk(
  'auth/updateParentPassword',
  async (fields, {getState, rejectWithValue}) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        try {
          const session = await storage.getSession();
          token = session?.[storageKeys.token] || null;
        } catch (storageError) {
          token = null;
        }
      }

      if (!token) {
        return rejectWithValue({
          message: 'Please sign in again.',
          status: 401,
        });
      }

      setAuthToken(token, 'Bearer');
      const response = await changeParentPassword(fields, token);
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
      });
  },
});

export const {setCredentials, clearCredentials} = authSlice.actions;
export default authSlice.reducer;
