import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiErrorMessage} from '../../utils/apiError';
import {
  getStudentAnnouncement,
  getStudentAnnouncements,
  getStudentAssignmentOverview,
  getStudentAssignments,
  getStudentHome,
  getStudentLibrary,
  getStudentTimetable,
  mapStudentAnnouncement,
  mapStudentAssignments,
  mapStudentHome,
  mapStudentTimetable,
  readAnnouncementPage,
  readAssignmentPage,
  readLibraryPage,
} from '../../services/studentService';

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

export const fetchStudentTimetable = createAsyncThunk(
  'studentHome/fetchStudentTimetable',
  async (day, {rejectWithValue}) => {
    try {
      const response = await getStudentTimetable(day);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load timetable.',
          status: response?.status ?? null,
        });
      }
      return mapStudentTimetable(body, day);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentAssignments = createAsyncThunk(
  'studentHome/fetchStudentAssignments',
  async (_, {rejectWithValue}) => {
    try {
      const [overviewResponse, listResponse] = await Promise.all([
        getStudentAssignmentOverview(),
        getStudentAssignments({per_page: 50}),
      ]);
      const overviewBody = overviewResponse?.data;
      const listBody = listResponse?.data;
      if (
        (overviewBody && overviewBody.success === false) ||
        (listBody && listBody.success === false)
      ) {
        return rejectWithValue({
          message:
            (typeof listBody?.message === 'string' && listBody.message) ||
            (typeof overviewBody?.message === 'string' && overviewBody.message) ||
            'Unable to load assignments.',
        });
      }

      const firstPage = readAssignmentPage(listBody);
      const pages = [firstPage];
      const lastPage = Math.min(firstPage.lastPage || 1, 10);
      for (let page = 2; page <= lastPage; page += 1) {
        const nextResponse = await getStudentAssignments({per_page: 50, page});
        const nextBody = nextResponse?.data;
        if (nextBody && nextBody.success === false) {
          break;
        }
        pages.push(readAssignmentPage(nextBody));
      }

      return mapStudentAssignments(pages, overviewBody);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentLibrary = createAsyncThunk(
  'studentHome/fetchStudentLibrary',
  async (query, {rejectWithValue}) => {
    try {
      const params = {per_page: 20};
      const search = typeof query === 'string' ? query.trim() : '';
      if (search) {
        params.q = search;
      }
      const response = await getStudentLibrary(params);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load library.',
          status: response?.status ?? null,
        });
      }
      const firstPage = readLibraryPage(body);
      const items = [...firstPage.items];
      const lastPage = Math.min(firstPage.lastPage || 1, 10);
      for (let page = 2; page <= lastPage; page += 1) {
        const nextResponse = await getStudentLibrary({...params, page});
        const nextBody = nextResponse?.data;
        if (nextBody && nextBody.success === false) {
          break;
        }
        items.push(...readLibraryPage(nextBody).items);
      }
      return items;
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentAnnouncements = createAsyncThunk(
  'studentHome/fetchStudentAnnouncements',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentAnnouncements({per_page: 20});
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load announcements.',
          status: response?.status ?? null,
        });
      }
      const firstPage = readAnnouncementPage(body);
      const items = [...firstPage.items];
      const lastPage = Math.min(firstPage.lastPage || 1, 10);
      for (let page = 2; page <= lastPage; page += 1) {
        const nextResponse = await getStudentAnnouncements({per_page: 20, page});
        const nextBody = nextResponse?.data;
        if (nextBody && nextBody.success === false) {
          break;
        }
        items.push(...readAnnouncementPage(nextBody).items);
      }
      return items;
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentAnnouncement = createAsyncThunk(
  'studentHome/fetchStudentAnnouncement',
  async (announcementId, {rejectWithValue}) => {
    try {
      const response = await getStudentAnnouncement(announcementId);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load announcement.',
          status: response?.status ?? null,
        });
      }
      return mapStudentAnnouncement(body);
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
