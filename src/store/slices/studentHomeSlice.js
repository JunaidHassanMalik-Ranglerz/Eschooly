import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiErrorMessage} from '../../utils/apiError';
import {
  getStudentAnnouncement,
  getStudentAnnouncements,
  getStudentAssignmentOverview,
  getStudentAssignments,
  combineStudentResults,
  combineStudentExams,
  getStudentAttendance,
  getStudentExam,
  getStudentExams,
  getStudentExamsHistory,
  getStudentExamsOverview,
  getStudentHolidays,
  getStudentHome,
  getStudentLibrary,
  getStudentResultCard,
  getStudentResults,
  getStudentResultsSummary,
  getStudentSyllabus,
  getStudentTeacher,
  getStudentTeachers,
  getStudentTimetable,
  mapStudentAnnouncement,
  mapStudentAssignments,
  mapStudentAttendance,
  mapStudentExam,
  mapStudentExamsOverview,
  mapStudentHolidays,
  mapStudentHome,
  mapStudentResultCard,
  mapStudentResultsSummary,
  mapStudentSyllabus,
  mapStudentTeacher,
  mapStudentTeachers,
  mapStudentTimetable,
  readAnnouncementPage,
  readAssignmentPage,
  readExamHistoryPage,
  readExamPage,
  readLibraryPage,
  readResultsPage,
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
      console.log('response', response);
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

const loadStudentResultList = async () => {
  const response = await getStudentResults({per_page: 20});
  const body = response?.data;
  if (body && body.success === false) {
    throw {message: body.message || 'Unable to load results.', status: response?.status ?? null};
  }
  const firstPage = readResultsPage(body);
  const items = [...firstPage.items];
  const lastPage = Math.min(firstPage.lastPage || 1, 10);
  for (let page = 2; page <= lastPage; page += 1) {
    const nextResponse = await getStudentResults({per_page: 20, page});
    const nextBody = nextResponse?.data;
    if (nextBody && nextBody.success === false) {
      break;
    }
    items.push(...readResultsPage(nextBody).items);
  }
  return items;
};

const loadMappedResult = async (request, mapFn, fallbackMessage) => {
  const response = await request();
  const body = response?.data;
  if (body && body.success === false) {
    throw {
      message:
        typeof body.message === 'string' && body.message ? body.message : fallbackMessage,
      status: response?.status ?? null,
    };
  }
  return mapFn(body);
};

export const fetchStudentResults = createAsyncThunk(
  'studentHome/fetchStudentResults',
  async (_, {rejectWithValue}) => {
    const settled = await Promise.allSettled([
      loadMappedResult(
        () => getStudentResultCard({result_mode: 'final'}),
        mapStudentResultCard,
        'Unable to load results.',
      ),
      loadMappedResult(
        getStudentResultsSummary,
        mapStudentResultsSummary,
        'Unable to load results.',
      ),
      loadStudentResultList(),
    ]);
    const card = settled[0].status === 'fulfilled' ? settled[0].value : null;
    const summary = settled[1].status === 'fulfilled' ? settled[1].value : null;
    const list = settled[2].status === 'fulfilled' ? settled[2].value : [];
    if (!card && !summary && !list.length) {
      const failed = settled.find(item => item.status === 'rejected');
      return rejectWithValue({
        message:
          failed?.reason?.message ||
          getApiErrorMessage(failed?.reason) ||
          'Unable to load results.',
        status: failed?.reason?.status ?? failed?.reason?.response?.status ?? null,
      });
    }
    return combineStudentResults({card, summary, list});
  },
);

export const fetchStudentTeachers = createAsyncThunk(
  'studentHome/fetchStudentTeachers',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentTeachers();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load teachers.',
          status: response?.status ?? null,
        });
      }
      return mapStudentTeachers(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentTeacher = createAsyncThunk(
  'studentHome/fetchStudentTeacher',
  async (teacherId, {rejectWithValue}) => {
    try {
      const response = await getStudentTeacher(teacherId);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load teacher.',
          status: response?.status ?? null,
        });
      }
      return mapStudentTeacher(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentAttendance = createAsyncThunk(
  'studentHome/fetchStudentAttendance',
  async (month, {rejectWithValue}) => {
    try {
      const response = await getStudentAttendance(month ? {month} : {});
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load attendance.',
          status: response?.status ?? null,
        });
      }
      return mapStudentAttendance(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

const loadExamSchedule = async () => {
  const response = await getStudentExams({per_page: 20});
  const body = response?.data;
  if (body && body.success === false) {
    throw {message: body.message || 'Unable to load exams.', status: response?.status ?? null};
  }
  const firstPage = readExamPage(body);
  const items = [...firstPage.items];
  const lastPage = Math.min(firstPage.lastPage || 1, 10);
  for (let page = 2; page <= lastPage; page += 1) {
    const nextResponse = await getStudentExams({per_page: 20, page});
    const nextBody = nextResponse?.data;
    if (nextBody && nextBody.success === false) {
      break;
    }
    items.push(...readExamPage(nextBody).items);
  }
  return items;
};

const loadExamHistory = async range => {
  const params = {};
  if (range?.from) {
    params.from = range.from;
  }
  if (range?.to) {
    params.to = range.to;
  }
  const response = await getStudentExamsHistory(params);
  const body = response?.data;
  if (body && body.success === false) {
    throw {message: body.message || 'Unable to load exams.', status: response?.status ?? null};
  }
  const firstPage = readExamHistoryPage(body);
  const items = [...firstPage.items];
  const lastPage = Math.min(firstPage.lastPage || 1, 10);
  for (let page = 2; page <= lastPage; page += 1) {
    const nextResponse = await getStudentExamsHistory({...params, page});
    const nextBody = nextResponse?.data;
    if (nextBody && nextBody.success === false) {
      break;
    }
    items.push(...readExamHistoryPage(nextBody).items);
  }
  return items;
};

export const fetchStudentExams = createAsyncThunk(
  'studentHome/fetchStudentExams',
  async (range, {rejectWithValue}) => {
    const settled = await Promise.allSettled([
      (async () => {
        const response = await getStudentExamsOverview();
        const body = response?.data;
        if (body && body.success === false) {
          throw {
            message: body.message || 'Unable to load exams.',
            status: response?.status ?? null,
          };
        }
        return mapStudentExamsOverview(body);
      })(),
      loadExamSchedule(),
      loadExamHistory(range),
    ]);
    const overview = settled[0].status === 'fulfilled' ? settled[0].value : null;
    const schedule = settled[1].status === 'fulfilled' ? settled[1].value : [];
    const history = settled[2].status === 'fulfilled' ? settled[2].value : [];
    if (!overview && !schedule.length && !history.length) {
      const failed = settled.find(item => item.status === 'rejected');
      return rejectWithValue({
        message:
          failed?.reason?.message ||
          getApiErrorMessage(failed?.reason) ||
          'Unable to load exams.',
        status: failed?.reason?.status ?? failed?.reason?.response?.status ?? null,
      });
    }
    return combineStudentExams({overview, schedule, history});
  },
);

export const fetchStudentExam = createAsyncThunk(
  'studentHome/fetchStudentExam',
  async (examId, {rejectWithValue}) => {
    try {
      const response = await getStudentExam(examId);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load exam.',
          status: response?.status ?? null,
        });
      }
      return mapStudentExam(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentHolidays = createAsyncThunk(
  'studentHome/fetchStudentHolidays',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentHolidays();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load holidays.',
          status: response?.status ?? null,
        });
      }
      return mapStudentHolidays(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentSyllabus = createAsyncThunk(
  'studentHome/fetchStudentSyllabus',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentSyllabus();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load syllabus.',
          status: response?.status ?? null,
        });
      }
      return mapStudentSyllabus(body);
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
