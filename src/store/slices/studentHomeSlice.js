import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiErrorMessage} from '../../utils/apiError';
import {getStudentHome, mapStudentHome} from '../../services/studentService';

const initialState = {
  student: null,
  modules: null,
  upcomingClass: null,
  unreadNotifications: 0,
  error: null,
};

export const fetchStudentHome = createAsyncThunk(
  'studentHome/fetchStudentHome',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentHome();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load home.',
          status: response?.status ?? null,
        });
      }
      return mapStudentHome(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

const studentHomeSlice = createSlice({
  name: 'studentHome',
  initialState,
  reducers: {
    resetStudentHome: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStudentHome.fulfilled, (state, action) => {
        state.student = action.payload.student;
        state.modules = action.payload.modules;
        state.upcomingClass = action.payload.upcomingClass;
        state.unreadNotifications = action.payload.unreadNotifications;
        state.error = null;
      })
      .addCase(fetchStudentHome.rejected, (state, action) => {
        state.student = null;
        state.modules = null;
        state.upcomingClass = null;
        state.unreadNotifications = 0;
        state.error = action.payload?.message || 'Unable to load home.';
      });
  },
});

export const {resetStudentHome} = studentHomeSlice.actions;
export default studentHomeSlice.reducer;
