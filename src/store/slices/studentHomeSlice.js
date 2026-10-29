import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApiErrorMessage} from '../../utils/apiError';
import {
  getStudentAnnouncement,
  getStudentAnnouncements,
  getStudentAssignment,
  getStudentAssignmentOverview,
  getStudentAssignments,
  getStudentAssignmentsGraded,
  getStudentAssignmentSubmission,
  submitStudentAssignment,
  combineStudentResults,
  combineStudentExams,
  getStudentAttendance,
  getStudentExam,
  getStudentExams,
  getStudentExamsHistory,
  getStudentExamsOverview,
  getStudentHolidays,
  getStudentHome,
  getStudentNotifications,
  getStudentUnreadCount,
  readAllStudentNotifications,
  readStudentNotification,
  downloadStudentIdCardFile,
  getStudentLibrary,
  getStudentResultCard,
  getStudentResults,
  getStudentResultsSummary,
  getStudentSyllabus,
  getStudentTeacher,
  getStudentTeachers,
  getStudentTimetable,
  mapStudentAnnouncement,
  mapStudentAssignmentDetail,
  mapStudentAssignments,
  mapStudentAssignmentSubmission,
  mergeStudentAssignmentDetail,
  mapStudentAttendance,
  mapStudentExam,
  mapStudentExamsOverview,
  mapStudentHolidays,
  mapStudentHome,
  mapStudentUnreadCount,
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
  readNotificationPage,
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

const loadAssignmentPages = async request => {
  const response = await request({per_page: 50});
  const body = response?.data;
  if (body && body.success === false) {
    throw {message: body.message || 'Unable to load assignments.'};
  }
  const firstPage = readAssignmentPage(body);
  const pages = [firstPage];
  const lastPage = Math.min(firstPage.lastPage || 1, 10);
  for (let page = 2; page <= lastPage; page += 1) {
    const nextResponse = await request({per_page: 50, page});
    const nextBody = nextResponse?.data;
    if (nextBody && nextBody.success === false) {
      break;
    }
    pages.push(readAssignmentPage(nextBody));
  }
  return pages;
};

export const fetchStudentAssignments = createAsyncThunk(
  'studentHome/fetchStudentAssignments',
  async (_, {rejectWithValue}) => {
    try {
      const [overviewSettled, listSettled, gradedSettled] = await Promise.allSettled([
        getStudentAssignmentOverview(),
        loadAssignmentPages(getStudentAssignments),
        loadAssignmentPages(getStudentAssignmentsGraded),
      ]);
      const overviewBody =
        overviewSettled.status === 'fulfilled' ? overviewSettled.value?.data : null;
      const pages = listSettled.status === 'fulfilled' ? listSettled.value : [];
      const gradedPages = gradedSettled.status === 'fulfilled' ? gradedSettled.value : [];
      if (
        (overviewBody && overviewBody.success === false) &&
        !pages.length &&
        !gradedPages.length
      ) {
        return rejectWithValue({
          message: overviewBody.message || 'Unable to load assignments.',
        });
      }
      if (listSettled.status === 'rejected' && gradedSettled.status === 'rejected') {
        return rejectWithValue({
          message:
            listSettled.reason?.message ||
            getApiErrorMessage(listSettled.reason) ||
            'Unable to load assignments.',
        });
      }
      return mapStudentAssignments(pages, overviewBody, gradedPages);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const fetchStudentAssignmentDetail = createAsyncThunk(
  'studentHome/fetchStudentAssignmentDetail',
  async (assignmentId, {rejectWithValue}) => {
    try {
      const [detailSettled, submissionSettled] = await Promise.allSettled([
        getStudentAssignment(assignmentId),
        getStudentAssignmentSubmission(assignmentId),
      ]);
      const detailBody =
        detailSettled.status === 'fulfilled' ? detailSettled.value?.data : null;
      const submissionBody =
        submissionSettled.status === 'fulfilled' ? submissionSettled.value?.data : null;
      if (detailBody && detailBody.success === false && !submissionBody) {
        return rejectWithValue({
          message: detailBody.message || 'Unable to load assignment.',
        });
      }
      if (detailSettled.status === 'rejected' && submissionSettled.status === 'rejected') {
        return rejectWithValue({
          message:
            detailSettled.reason?.message ||
            getApiErrorMessage(detailSettled.reason) ||
            'Unable to load assignment.',
        });
      }
      const detail =
        detailBody && detailBody.success !== false
          ? mapStudentAssignmentDetail(detailBody)
          : null;
      const submission =
        submissionBody && submissionBody.success !== false
          ? mapStudentAssignmentSubmission(submissionBody)
          : null;
      return {
        id: String(assignmentId),
        ...mergeStudentAssignmentDetail(detail, submission),
      };
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const sendStudentAssignmentSubmission = createAsyncThunk(
  'studentHome/sendStudentAssignmentSubmission',
  async ({assignmentId, notes, files}, {rejectWithValue}) => {
    try {
      const response = await submitStudentAssignment(assignmentId, {notes, files});
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message: body.message || 'Unable to submit assignment.',
        });
      }
      return {
        id: String(assignmentId),
        ...mapStudentAssignmentSubmission(body),
        notes: notes || mapStudentAssignmentSubmission(body).notes,
        status: 'submitted',
      };
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
        () => getStudentResultCard({result_mode: 'monthly'}),
        body => mapStudentResultCard(body, 'monthly'),
        'Unable to load results.',
      ),
      loadMappedResult(
        () => getStudentResultCard({result_mode: 'final'}),
        body => mapStudentResultCard(body, 'final'),
        'Unable to load results.',
      ),
      loadMappedResult(
        getStudentResultsSummary,
        mapStudentResultsSummary,
        'Unable to load results.',
      ),
      loadStudentResultList(),
    ]);
    const monthlyCard = settled[0].status === 'fulfilled' ? settled[0].value : null;
    const yearCard = settled[1].status === 'fulfilled' ? settled[1].value : null;
    const summary = settled[2].status === 'fulfilled' ? settled[2].value : null;
    const list = settled[3].status === 'fulfilled' ? settled[3].value : [];
    const card = {
      child: monthlyCard?.child || yearCard?.child || null,
      monthly: monthlyCard?.monthly,
      year: yearCard?.year,
    };
    if (!monthlyCard && !yearCard && !summary && !list.length) {
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

export const fetchStudentNotifications = createAsyncThunk(
  'studentHome/fetchStudentNotifications',
  async (unreadOnly, {rejectWithValue}) => {
    try {
      const params = {per_page: 50};
      if (unreadOnly) {
        params.unread_only = 1;
      }
      const response = await getStudentNotifications(params);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load notifications.',
          status: response?.status ?? null,
        });
      }
      const firstPage = readNotificationPage(body);
      const items = [...firstPage.items];
      const lastPage = Math.min(firstPage.lastPage || 1, 10);
      for (let page = 2; page <= lastPage; page += 1) {
        const nextResponse = await getStudentNotifications({...params, page});
        const nextBody = nextResponse?.data;
        if (nextBody && nextBody.success === false) {
          break;
        }
        items.push(...readNotificationPage(nextBody).items);
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

export const fetchStudentUnreadCount = createAsyncThunk(
  'studentHome/fetchStudentUnreadCount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getStudentUnreadCount();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to load notifications.',
          status: response?.status ?? null,
        });
      }
      return mapStudentUnreadCount(body);
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const markStudentNotificationRead = createAsyncThunk(
  'studentHome/markStudentNotificationRead',
  async (notificationId, {dispatch, rejectWithValue}) => {
    try {
      const response = await readStudentNotification(notificationId);
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to mark notification as read.',
          status: response?.status ?? null,
        });
      }
      dispatch(fetchStudentUnreadCount());
      return {id: String(notificationId)};
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const markStudentNotificationsReadAll = createAsyncThunk(
  'studentHome/markStudentNotificationsReadAll',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const response = await readAllStudentNotifications();
      const body = response?.data;
      if (body && body.success === false) {
        return rejectWithValue({
          message:
            typeof body.message === 'string' && body.message
              ? body.message
              : 'Unable to mark notifications as read.',
          status: response?.status ?? null,
        });
      }
      dispatch(fetchStudentUnreadCount());
      return true;
    } catch (error) {
      return rejectWithValue({
        message: getApiErrorMessage(error),
        status: error?.response?.status ?? null,
      });
    }
  },
);

export const downloadStudentIdCard = createAsyncThunk(
  'studentHome/downloadStudentIdCard',
  async (_, {getState, rejectWithValue}) => {
    if (getState()?.auth?.role !== 'student') {
      return rejectWithValue({
        message: 'Could not save ID card PDF.',
        status: null,
      });
    }
    try {
      return await downloadStudentIdCardFile();
    } catch (error) {
      return rejectWithValue({
        message:
          (typeof error?.message === 'string' && error.message) ||
          getApiErrorMessage(error) ||
          'Could not save ID card PDF.',
        status: error?.status ?? error?.response?.status ?? null,
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
      })
      .addCase(fetchStudentUnreadCount.fulfilled, (state, action) => {
        state.unreadNotifications = action.payload;
      })
      .addCase(markStudentNotificationsReadAll.fulfilled, state => {
        state.unreadNotifications = 0;
      });
  },
});

export const {resetStudentHome} = studentHomeSlice.actions;
export default studentHomeSlice.reducer;
