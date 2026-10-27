import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axiosInstance, {API_BASE_URL, getAuthToken} from '../api/axiosInstance';
import {storage, storageKeys} from '../utils/storage';
import {Strings} from '../Constants/Strings';

const asObject = value =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : null;

const text = value => {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  return String(value);
};

const initialsFromName = name =>
  text(name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');

const clockFromIso = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${suffix}`;
};

const MODULE_FIELDS = {
  online: 'online_classes',
  timetable: 'timetable',
  assignments: 'assignments',
  library: 'digital_library',
  announcements: 'announcements',
  results: 'results',
  syllabus: 'syllabus',
};

export const mapStudentHome = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || {};
  const student = asObject(data.student) || {};
  const modules = asObject(data.modules) || {};
  const upcoming = asObject(data.upcoming_class);
  const name = text(student.name);
  const className = text(student.class_name);
  const subject = text(upcoming?.subject);
  const classInfo = [className, subject].filter(Boolean).join(' · ');

  return {
    student: name
      ? {
          id: student.id,
          label: name,
          name,
          className,
          classInfo: className,
          classLabel: className,
          photoUrl: text(student.profile_image),
          rollNo: text(student.roll_no),
          sectionName: text(student.section_name),
          initials: initialsFromName(name),
        }
      : null,
    modules: Object.fromEntries(
      Object.entries(MODULE_FIELDS).map(([key, field]) => [key, modules[field] === true]),
    ),
    upcomingClass: upcoming
      ? {
          id: upcoming.id,
          title: text(upcoming.title),
          classInfo,
          time: clockFromIso(upcoming.scheduled_at),
        }
      : null,
    unreadNotifications: Number(data.unread_notifications) || 0,
  };
};

export const getStudentHome = () => axiosInstance.get('/student/home');

const clockLabel = value => {
  const raw = text(value);
  const match = raw.match(/^(\d{1,2}):(\d{2})/);
  if (!match) {
    return raw;
  }
  let hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${suffix}`;
};

const named = value => {
  const record = asObject(value);
  if (record) {
    return text(record.name);
  }
  return text(value);
};

export const mapStudentTimetable = (body, day) => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || {};
  const wanted = text(day).toLowerCase();
  const entries = Array.isArray(data.entries) ? data.entries : [];

  return entries
    .filter(item => {
      const entryDay = text(asObject(item)?.day).toLowerCase();
      return !wanted || !entryDay || entryDay === wanted;
    })
    .map((item, index) => {
      const slot = asObject(item) || {};
      const start = clockLabel(slot.starts_at);
      const end = clockLabel(slot.ends_at);
      const className = named(slot.class);
      const sectionName = named(slot.section);
      return {
        id: text(slot.id) || String(index),
        period: text(slot.period_number),
        subject: named(slot.subject),
        time: start && end ? `${start} - ${end}` : start || end,
        classLabel: [className, sectionName].filter(Boolean).join(' · '),
        teacher: named(slot.teacher),
      };
    })
    .filter(item => item.subject);
};

export const getStudentTimetable = day =>
  axiosInstance.get('/student/timetable', {
    params: day ? {day} : undefined,
  });

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDob = value => {
  const match = text(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    return text(value);
  }
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) {
    return text(value);
  }
  return `${Number(match[3])} ${month} ${match[1]}`;
};

const titled = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const pushDetail = (details, key, label, value) => {
  const rowValue = text(value);
  if (!rowValue) {
    return;
  }
  details.push({key, label, value: rowValue});
};

export const mapStudentProfile = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || {};
  const student = asObject(data.student) || {};
  const school = asObject(student.school) || {};
  const branch = asObject(student.branch) || {};
  const classRecord = asObject(student.class) || {};
  const section = asObject(student.section) || {};
  const name = text(student.name);
  const className = text(classRecord.name);
  const sectionName = text(section.name);
  const details = [];

  pushDetail(details, 'studentId', Strings.studentId, student.login_id);
  pushDetail(details, 'guardian', Strings.guardian, student.guardian_name);
  pushDetail(details, 'dob', Strings.dateOfBirth, formatDob(student.date_of_birth));
  pushDetail(details, 'class', Strings.classLabel, className);
  pushDetail(details, 'section', Strings.section, sectionName);

  return {
    card: {
      name,
      initials: initialsFromName(name),
      gender: titled(student.gender),
      photoUrl: text(student.photo_url),
      role: Strings.student,
      class: className,
      section: sectionName,
      rollNo: text(student.roll_no),
      studentId: text(student.login_id),
      schoolName: text(school.name),
      schoolTagline: text(branch.name),
      schoolLine: text(school.name),
      cityLine: text(branch.city || student.branch_name),
      phone: text(student.guardian_phone),
      address: text(student.address),
      academicYear: '',
      dateOfIssue: '',
      validUntil: '',
    },
    details,
  };
};

export const getStudentProfile = () => axiosInstance.get('/student/profile');

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const namedRecord = value => {
  const record = asObject(value);
  if (record) {
    return text(record.name);
  }
  return text(value);
};

const formatDue = value => {
  const raw = text(value);
  const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) {
    const month = SHORT_MONTHS[Number(dateOnly[2]) - 1];
    return month ? `${Number(dateOnly[3])} ${month} ${dateOnly[1]}` : raw;
  }
  if (raw.includes('T')) {
    const date = new Date(raw);
    if (!Number.isNaN(date.getTime())) {
      return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    }
  }
  return raw;
};

const countFrom = (source, keys) => {
  const record = asObject(source);
  if (!record) {
    return null;
  }
  for (let index = 0; index < keys.length; index += 1) {
    const value = record[keys[index]];
    if (value === undefined || value === null || value === '') {
      continue;
    }
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return null;
};

const overviewSource = data => {
  const record = asObject(data) || {};
  const candidates = [record, record.overview, record.stats, record.summary, record.counts];
  return (
    candidates.find(item =>
      countFrom(item, ['total', 'total_assignments', 'pending', 'submitted', 'overdue']) !==
      null,
    ) || record
  );
};

const assignmentAttachments = record => {
  const source = asObject(record) || {};
  const list = Array.isArray(source.attachments)
    ? source.attachments
    : Array.isArray(source.files)
      ? source.files
      : Array.isArray(source.documents)
        ? source.documents
        : [];
  return list
    .map((item, index) => {
      const slot = asObject(item) || {};
      return {
        id: text(slot.id || slot.file_id) || String(index),
        name: text(slot.name || slot.file_name || slot.original_name || slot.title) || 'Attachment',
      };
    })
    .filter(item => item.id);
};

const assignmentStatus = slot => {
  const raw = text(slot.status || slot.submission_status || slot.state).toLowerCase();
  if (raw.includes('overdue') || raw.includes('late')) {
    return 'overdue';
  }
  if (
    raw.includes('submit') ||
    raw.includes('graded') ||
    raw.includes('complete') ||
    slot.submitted === true ||
    slot.is_submitted === true ||
    slot.has_submission === true ||
    text(slot.grade || slot.obtained_marks)
  ) {
    return 'submitted';
  }
  return 'pending';
};

const assignmentScore = slot => {
  const grade = text(slot.grade || slot.grade_name);
  const percentage = slot.percentage ?? slot.percent ?? slot.score;
  if (percentage !== undefined && percentage !== null && percentage !== '') {
    return {grade, score: text(percentage).replace('%', '')};
  }
  const obtained = text(slot.obtained_marks ?? slot.obtained ?? slot.marks);
  const total = text(slot.total_marks ?? slot.total ?? slot.max_marks);
  if (obtained && total) {
    return {grade, score: `${obtained}/${total}`};
  }
  return {grade, score: obtained};
};

const mapAssignment = (item, index) => {
  const slot = asObject(item) || {};
  const submission = asObject(slot.submission) || {};
  const type = text(slot.type || slot.assignment_type).toLowerCase();
  const marks = assignmentScore({...submission, ...slot});
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title || slot.name),
    teacher: namedRecord(slot.teacher) || text(slot.teacher_name),
    dueDate: formatDue(
      slot.due_at || slot.due_date || slot.deadline || slot.due_on || slot.due || slot.dueDate,
    ),
    status: assignmentStatus({...slot, ...submission}),
    type: ['homework', 'project', 'quiz', 'lab'].includes(type) ? type : 'homework',
    subjectId: text(asObject(slot.subject)?.id ?? slot.subject_id),
    subjectName: namedRecord(slot.subject) || text(slot.subject_name),
    description: text(
      slot.description || slot.instructions || slot.details || slot.body || slot.message,
    ),
    attachments: assignmentAttachments(slot),
    grade: marks.grade,
    score: marks.score,
    notes: text(slot.notes || submission.notes || slot.submission_notes),
    submittedAt: formatDue(
      slot.submitted_at || submission.submitted_at || slot.submitted_on,
    ),
  };
};

const mapSubjectGroup = (subject, index) => {
  const record = asObject(subject) || {};
  const assignments = (Array.isArray(record.assignments) ? record.assignments : [])
    .map(mapAssignment)
    .filter(item => item.title);
  const name = text(record.name || record.subject_name) || namedRecord(record.subject);
  return {
    id: text(record.id ?? record.subject_id) || name || String(index),
    name,
    pendingCount: assignments.filter(item => item.status === 'pending').length,
    assignments,
  };
};

export const readAssignmentPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || root;
  if (Array.isArray(data)) {
    const grouped = asObject(data[0])?.assignments;
    return {
      grouped: Array.isArray(grouped),
      items: data,
      lastPage: Number(root?.meta?.last_page) || 1,
    };
  }
  if (Array.isArray(page.subjects)) {
    return {
      grouped: true,
      items: page.subjects,
      lastPage: Number(page.meta?.last_page || page.last_page) || 1,
    };
  }
  const list = Array.isArray(page.data)
    ? page.data
    : Array.isArray(page.assignments)
      ? page.assignments
      : [];
  const grouped = Array.isArray(asObject(list[0])?.assignments);
  return {
    grouped,
    items: list,
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

const collectAssignmentPages = pages =>
  pages.reduce(
    (result, page) => {
      if (page.grouped) {
        result.grouped.push(...page.items);
      } else {
        result.flat.push(...page.items);
      }
      return result;
    },
    {grouped: [], flat: []},
  );

const flattenAssignmentSubjects = subjects =>
  subjects.flatMap(item => item.assignments || []);

const mergeAssignmentRows = (left, right) => {
  const rows = new Map();
  [...left, ...right].forEach(item => {
    if (!item?.id && !item?.title) {
      return;
    }
    const key = text(item.id || item.title);
    const prev = rows.get(key) || {};
    rows.set(key, {
      ...prev,
      ...item,
      title: item.title || prev.title,
      teacher: item.teacher || prev.teacher,
      dueDate: item.dueDate || prev.dueDate,
      description: item.description || prev.description,
      grade: item.grade || prev.grade,
      score: item.score || prev.score,
      notes: item.notes || prev.notes,
      submittedAt: item.submittedAt || prev.submittedAt,
      attachments: item.attachments?.length ? item.attachments : prev.attachments || [],
      status:
        item.status === 'overdue' || prev.status === 'overdue'
          ? 'overdue'
          : item.status === 'submitted' || prev.status === 'submitted'
            ? 'submitted'
            : item.status || prev.status || 'pending',
    });
  });
  return [...rows.values()];
};

export const mapStudentAssignments = (pages, overviewBody, gradedPages = []) => {
  const collected = collectAssignmentPages(pages);
  const listSubjects = collected.grouped.length
    ? collected.grouped.map(mapSubjectGroup).filter(item => item.name)
    : groupFlatAssignments(collected.flat);
  const gradedCollected = collectAssignmentPages(gradedPages);
  const gradedSubjects = gradedCollected.grouped.length
    ? gradedCollected.grouped.map(mapSubjectGroup).filter(item => item.name)
    : groupFlatAssignments(gradedCollected.flat);
  const subjects = groupFlatAssignments(
    mergeAssignmentRows(
      flattenAssignmentSubjects(listSubjects),
      flattenAssignmentSubjects(gradedSubjects),
    ),
  );

  const overviewData = overviewSource(asObject(overviewBody)?.data);
  const derived = {
    total: subjects.reduce((sum, item) => sum + item.assignments.length, 0),
    pending: subjects.reduce((sum, item) => sum + item.pendingCount, 0),
    submitted: subjects.reduce(
      (sum, item) => sum + item.assignments.filter(row => row.status === 'submitted').length,
      0,
    ),
    overdue: subjects.reduce(
      (sum, item) => sum + item.assignments.filter(row => row.status === 'overdue').length,
      0,
    ),
  };
  const total = countFrom(overviewData, ['total', 'total_assignments']);
  const pending = countFrom(overviewData, ['pending', 'pending_count']);
  const submitted = countFrom(overviewData, ['submitted', 'submitted_count']);
  const overdue = countFrom(overviewData, ['overdue', 'overdue_count']);

  return {
    overview: {
      total: total ?? derived.total,
      pending: pending ?? derived.pending,
      submitted: submitted ?? derived.submitted,
      overdue: overdue ?? derived.overdue,
    },
    subjects,
  };
};

const groupFlatAssignments = items => {
  const groups = new Map();
  items.map(mapAssignment).filter(item => item.title).forEach(item => {
    const key = item.subjectId || item.subjectName || 'assignments';
    const current = groups.get(key) || {
      id: key,
      name: item.subjectName || 'Assignments',
      pendingCount: 0,
      assignments: [],
    };
    current.assignments.push(item);
    if (item.status === 'pending') {
      current.pendingCount += 1;
    }
    groups.set(key, current);
  });
  return Array.from(groups.values()).filter(item => item.name);
};

export const getStudentAssignmentOverview = () =>
  axiosInstance.get('/student/assignments/overview');

export const getStudentAssignments = (params = {}) =>
  axiosInstance.get('/student/assignments', {
    params: {per_page: 50, ...params},
  });

export const getStudentAssignmentsGraded = (params = {}) =>
  axiosInstance.get('/student/assignments/graded', {
    params: {per_page: 50, ...params},
  });

export const getStudentAssignment = assignmentId =>
  axiosInstance.get(`/student/assignments/${assignmentId}`);

export const getStudentAssignmentSubmission = assignmentId =>
  axiosInstance.get(`/student/assignments/${assignmentId}/submission`);

export const getStudentAssignmentAttachment = (assignmentId, fileId) =>
  axiosInstance.get(`/student/assignments/${assignmentId}/attachments/${fileId}`);

const assignmentNotesForm = notes => {
  const form = new FormData();
  if (notes) {
    form.append('notes', notes);
  }
  return form;
};

export const submitStudentAssignment = (assignmentId, notes) =>
  axiosInstance.post(`/student/assignments/${assignmentId}/submit`, assignmentNotesForm(notes));

export const updateStudentAssignmentSubmission = (assignmentId, notes) =>
  axiosInstance.put(
    `/student/assignments/${assignmentId}/submission`,
    assignmentNotesForm(notes),
  );

export const mapStudentAssignmentDetail = body => {
  const root = asObject(body) || {};
  return mapAssignment(asObject(root.data) || root);
};

export const mapStudentAssignmentSubmission = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const marks = assignmentScore(data);
  return {
    notes: text(data.notes || data.submission_notes || data.remark),
    grade: marks.grade,
    score: marks.score,
    status: assignmentStatus(data),
    submittedAt: formatDue(data.submitted_at || data.submitted_on || data.updated_at),
    attachments: assignmentAttachments(data),
  };
};

export const mergeStudentAssignmentDetail = (detail, submission) => {
  const card = detail || mapAssignment({});
  const extra = submission || {};
  return {
    ...card,
    description: card.description,
    notes: extra.notes || card.notes,
    grade: extra.grade || card.grade,
    score: extra.score || card.score,
    submittedAt: extra.submittedAt || card.submittedAt,
    attachments: card.attachments?.length ? card.attachments : extra.attachments || [],
    status:
      extra.status === 'submitted' || card.status === 'submitted'
        ? extra.status === 'overdue' || card.status === 'overdue'
          ? 'overdue'
          : 'submitted'
        : extra.status || card.status,
  };
};

const assignmentAuthHeaders = async () => {
  let token = getAuthToken();
  if (!token) {
    try {
      token = await storage.getItem(storageKeys.token);
    } catch (error) {
      token = null;
    }
  }
  return {
    Accept: 'application/pdf, application/json',
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  };
};

export const downloadStudentAssignmentAttachment = async (assignmentId, fileId, title) => {
  const headers = await assignmentAuthHeaders();
  const fileName = `${text(title || `assignment-${fileId}`)
    .replace(/[^\w.-]+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 60) || `assignment-${fileId}`}.pdf`.replace(/\.pdf\.pdf$/i, '.pdf');
  const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
  const url = `${API_BASE_URL}/student/assignments/${assignmentId}/attachments/${fileId}/download`;
  const response = await ReactNativeBlobUtil.config({
    fileCache: true,
    path,
  }).fetch('GET', url, headers);
  const info = response.info();
  const type = String(info.headers?.['Content-Type'] || info.headers?.['content-type'] || '');

  if (info.status >= 400) {
    throw new Error('Unable to download this file.');
  }

  let savedPath = response.path();
  if (type.includes('json')) {
    const body = await response.json();
    if (body?.success === false) {
      throw new Error(body?.message || 'Unable to download this file.');
    }
    const data = asObject(body?.data) || body || {};
    const fileUrl = text(data.url || data.file_url || data.pdf_url || body?.url);
    if (!fileUrl) {
      throw new Error(body?.message || 'Unable to download this file.');
    }
    const saved = await ReactNativeBlobUtil.config({
      fileCache: true,
      path,
    }).fetch('GET', fileUrl, headers);
    if (saved.info().status >= 400) {
      throw new Error('Unable to download this file.');
    }
    savedPath = saved.path();
  }

  if (Platform.OS === 'android') {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: '',
          mimeType: 'application/pdf',
        },
        'Download',
        savedPath,
      );
    } catch (error) {
      // The viewer still opens the cached copy.
    }
  }

  return savedPath.startsWith('file://') ? savedPath : `file://${savedPath}`;
};

const fileSizeLabel = value => {
  if (typeof value === 'number') {
    if (value >= 1048576) {
      return `${(value / 1048576).toFixed(1)} MB`;
    }
    if (value >= 1024) {
      return `${Math.round(value / 1024)} KB`;
    }
    return `${value} B`;
  }
  return text(value);
};

const libraryCategory = item => {
  const name = (namedRecord(item.subject) || text(item.category || item.subject_name)).toLowerCase();
  if (name.includes('math')) {
    return 'math';
  }
  if (name.includes('english')) {
    return 'english';
  }
  if (name.includes('physics')) {
    return 'physics';
  }
  if (name.includes('science')) {
    return 'science';
  }
  return name.replace(/[^a-z0-9]+/g, '') || 'other';
};

const mapLibraryItem = (item, index) => {
  const slot = asObject(item) || {};
  const subjectName = namedRecord(slot.subject) || text(slot.subject_name);
  const className = namedRecord(slot.class) || text(slot.class_name);
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title || slot.name) || subjectName,
    subtitle: text(slot.subtitle) || [subjectName, className ? `Class ${className}` : ''].filter(Boolean).join(' - '),
    fileType: text(slot.file_type || slot.type || slot.extension).replace(/^\./, '').toUpperCase(),
    fileSize: fileSizeLabel(slot.file_size ?? slot.size),
    category: libraryCategory(slot),
    isNew: Boolean(slot.is_new || slot.isNew),
    pdfUrl: text(slot.file_url || slot.pdf_url || slot.download_url || slot.url),
  };
};

export const readLibraryPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.library)
        ? page.library
        : Array.isArray(page.resources)
          ? page.resources
          : Array.isArray(page.books)
            ? page.books
            : Array.isArray(page.entries)
              ? page.entries
              : [];
  return {
    items: list.map(mapLibraryItem).filter(item => item.title),
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

export const getStudentLibrary = (params = {}) =>
  axiosInstance.get('/student/library', {
    params,
  });

const fileUri = path => (path.startsWith('file://') ? path : `file://${path}`);

const libraryFileName = (title, resourceId) => {
  const base = text(title)
    .replace(/[^\w.-]+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 60);
  const name = base || `library-${resourceId}`;
  return name.toLowerCase().endsWith('.pdf') ? name : `${name}.pdf`;
};

export const downloadStudentLibraryFile = async (resourceId, title) => {
  let token = getAuthToken();
  if (!token) {
    try {
      token = await storage.getItem(storageKeys.token);
    } catch (error) {
      token = null;
    }
  }

  const headers = {
    Accept: 'application/pdf, application/json',
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  };
  const fileName = libraryFileName(title, resourceId);
  const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
  const url = `${API_BASE_URL}/student/library/${resourceId}/download`;
  const response = await ReactNativeBlobUtil.config({
    fileCache: true,
    path,
  }).fetch('GET', url, headers);
  const info = response.info();
  const type = String(info.headers?.['Content-Type'] || info.headers?.['content-type'] || '');

  if (info.status >= 400) {
    throw new Error('Unable to download this file.');
  }

  let savedPath = response.path();
  if (type.includes('json')) {
    const body = await response.json();
    if (body?.success === false) {
      throw new Error(body?.message || 'Unable to download this file.');
    }
    const fileUrl = body?.data?.url || body?.data?.file_url || body?.data?.pdf_url || body?.url;
    if (!fileUrl) {
      throw new Error(body?.message || 'Unable to download this file.');
    }
    const saved = await ReactNativeBlobUtil.config({
      fileCache: true,
      path,
    }).fetch('GET', fileUrl, headers);
    if (saved.info().status >= 400) {
      throw new Error('Unable to download this file.');
    }
    savedPath = saved.path();
  }

  if (Platform.OS === 'android') {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: '',
          mimeType: 'application/pdf',
        },
        'Download',
        savedPath,
      );
    } catch (error) {
      // The viewer still opens the cached copy.
    }
  }

  return fileUri(savedPath);
};

const announcementWhen = value => {
  const raw = text(value);
  if (!raw) {
    return {date: '', time: ''};
  }
  const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const month = SHORT_MONTHS[Number(dateOnly[2]) - 1];
    return {
      date: month ? `${Number(dateOnly[3])} ${month} ${dateOnly[1]}` : raw,
      time: '',
    };
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return {date: raw, time: clockLabel(raw)};
  }
  return {
    date: `${parsed.getDate()} ${SHORT_MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`,
    time: clockLabel(`${parsed.getHours()}:${String(parsed.getMinutes()).padStart(2, '0')}`),
  };
};

const announcementCategory = slot => {
  const name = text(slot.category || slot.type) || named(slot.category);
  const lower = name.toLowerCase();
  if (!name || lower.includes('notice')) {
    return 'Notice';
  }
  if (lower.includes('event')) {
    return 'Event';
  }
  if (lower.includes('update')) {
    return 'Update';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const mapAnnouncement = (item, index) => {
  const slot = asObject(item) || {};
  const published = slot.published_at || slot.created_at || slot.date;
  const when = announcementWhen(published);
  const clock = text(slot.time) ? clockLabel(slot.time) : when.time;
  return {
    id: text(slot.id) || String(index),
    category: announcementCategory(slot),
    title: text(slot.title) || named(slot.subject),
    message: text(slot.message || slot.body || slot.description || slot.content),
    date: text(slot.date_label) || when.date,
    time: clock,
  };
};

export const readAnnouncementPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.announcements)
        ? page.announcements
        : Array.isArray(page.entries)
          ? page.entries
          : Array.isArray(page.notices)
            ? page.notices
            : [];
  return {
    items: list.map(mapAnnouncement).filter(item => item.title),
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

export const mapStudentAnnouncement = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const slot = asObject(data.announcement) || data;
  return mapAnnouncement(slot, 0);
};

export const getStudentAnnouncements = (params = {}) =>
  axiosInstance.get('/student/announcements', {
    params,
  });

export const getStudentAnnouncement = announcementId =>
  axiosInstance.get(`/student/announcements/${announcementId}`);

const mapSyllabusTopic = (item, index) => {
  const slot = asObject(item) || {};
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title),
    duration: '',
    status: slot.is_completed === true ? 'completed' : 'pending',
  };
};

const mapSyllabusUnit = (unit, index) => {
  const slot = asObject(unit) || {};
  const topics = (Array.isArray(slot.topics) ? slot.topics : [])
    .map(mapSyllabusTopic)
    .filter(topic => topic.title);
  const progress = asObject(slot.progress) || {};
  const percentage = Number(progress.percentage);
  const completed = Number(progress.completed_topics);
  const total = Number(progress.total_topics);
  const number = text(slot.sort_order) || String(index + 1);
  return {
    id: text(slot.id) || String(index),
    number: number.padStart(2, '0'),
    title: text(slot.title),
    meta: Number.isFinite(total)
      ? `${Number.isFinite(completed) ? completed : 0}/${total} topics`
      : `${topics.length} topics`,
    progress: Number.isFinite(percentage) ? percentage / 100 : 0,
    percentText: Number.isFinite(percentage) ? `${Math.round(percentage)}%` : '0%',
    topics,
    completedTopics: Number.isFinite(completed) ? completed : 0,
    totalTopics: Number.isFinite(total) ? total : topics.length,
  };
};

export const mapStudentSyllabus = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || {};
  const units = Array.isArray(data.units) ? data.units : [];
  const groups = new Map();

  units.forEach(unit => {
    const slot = asObject(unit) || {};
    const subject = asObject(slot.subject) || {};
    const key = text(subject.id) || text(subject.name);
    if (!key) {
      return;
    }
    if (!groups.has(key)) {
      groups.set(key, {value: key, label: text(subject.name), chapters: []});
    }
    const group = groups.get(key);
    const chapter = mapSyllabusUnit(slot, group.chapters.length);
    if (chapter.title) {
      group.chapters.push(chapter);
    }
  });

  const subjects = [...groups.values()]
    .map(group => {
      const completedTopics = group.chapters.reduce((sum, chapter) => sum + chapter.completedTopics, 0);
      const totalTopics = group.chapters.reduce((sum, chapter) => sum + chapter.totalTopics, 0);
      const progress = totalTopics > 0 ? completedTopics / totalTopics : 0;
      return {
        value: group.value,
        label: group.label,
        status: '',
        progress,
        percentText: `${Math.round(progress * 100)}%`,
        completedTopics,
        totalTopics,
        chapters: group.chapters,
      };
    })
    .filter(item => item.label);

  const stats = asObject(data.stats) || {};
  return {
    subjects,
    stats: {
      total: text(stats.total_syllabus),
      published: text(stats.published),
      draft: text(stats.draft),
    },
  };
};

export const getStudentSyllabus = () => axiosInstance.get('/student/syllabus');

const resultScore = slot => {
  const percentage = slot.percentage ?? slot.percent ?? slot.score;
  if (percentage !== undefined && percentage !== null && percentage !== '') {
    return text(percentage).replace('%', '');
  }
  const obtained = Number(slot.obtained_marks ?? slot.obtained ?? slot.marks);
  const total = Number(slot.total_marks ?? slot.total ?? slot.max_marks);
  if (Number.isFinite(obtained) && Number.isFinite(total) && total > 0) {
    return String(Math.round((obtained / total) * 100));
  }
  return text(slot.obtained_marks ?? slot.marks);
};

const resultPeriod = slot => {
  const raw = text(
    slot.period || slot.term || slot.type || slot.assessment_period || slot.exam_type,
  ).toLowerCase();
  if (!raw) {
    return '';
  }
  if (raw.includes('year') || raw.includes('annual') || raw.includes('final')) {
    return 'year';
  }
  if (raw.includes('month') || raw.includes('mid') || raw.includes('term') || raw.includes('quarter')) {
    return 'monthly';
  }
  return '';
};

const firstResultList = record => {
  const source = asObject(record) || {};
  const keys = [
    'subjects',
    'results',
    'marks',
    'entries',
    'items',
    'subject_results',
    'card_subjects',
  ];
  for (const key of keys) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
    const nested = asObject(source[key]);
    if (!nested) {
      continue;
    }
    for (const inner of ['subjects', 'results', 'marks', 'entries', 'items', 'data']) {
      if (Array.isArray(nested[inner])) {
        return nested[inner];
      }
    }
  }
  return [];
};

const resultSubjects = record =>
  firstResultList(record)
    .map((item, index) => {
      const slot = asObject(item) || {};
      return {
        id: text(slot.id) || String(index),
        name: named(slot.subject) || text(slot.subject_name || slot.name || slot.title),
        grade: text(slot.grade || slot.grade_name),
        score: resultScore(slot),
        obtained: text(slot.obtained_marks ?? slot.obtained ?? slot.marks),
        total: text(slot.total_marks ?? slot.total ?? slot.max_marks),
        period: resultPeriod(slot),
      };
    })
    .filter(item => item.name);

const mapResultChild = record => {
  const slot = asObject(record);
  if (!slot) {
    return null;
  }
  const className = named(slot.class) || text(slot.class_name);
  const sectionName = named(slot.section) || text(slot.section_name);
  const name = text(slot.name);
  if (!name && !className && !text(slot.roll_no)) {
    return null;
  }
  return {
    label: name,
    className,
    sectionName,
    classLabel: [className, sectionName].filter(Boolean).join(' · '),
    classInfo: [className, sectionName].filter(Boolean).join(' · '),
    photoUrl: text(slot.photo_url || slot.profile_image),
    rollNo: text(slot.roll_no),
  };
};

const mapResultBlock = record => {
  const source = asObject(record) || {};
  return {
    overall:
      text(
        source.overall_grade ||
          source.overall ||
          source.grade ||
          asObject(source.summary)?.overall_grade ||
          asObject(source.summary)?.overall,
      ) || '—',
    hint: text(
      source.remark ||
        source.hint ||
        source.comment ||
        asObject(source.summary)?.remark,
    ),
    subjects: resultSubjects(source),
  };
};

const emptyResultBlock = () => ({overall: '—', hint: '', subjects: []});

const mergeSubjects = (left, right) => {
  const rows = new Map();
  [...(left || []), ...(right || [])].forEach(item => {
    const key = text(item?.name).toLowerCase();
    if (!key) {
      return;
    }
    const prev = rows.get(key) || {};
    rows.set(key, {
      id: prev.id || item.id,
      name: prev.name || item.name,
      grade: item.grade || prev.grade,
      score: item.score || prev.score,
      obtained: item.obtained || prev.obtained,
      total: item.total || prev.total,
      period: item.period || prev.period,
    });
  });
  return [...rows.values()];
};

const mergeResultBlock = (base, extra) => {
  const left = base || emptyResultBlock();
  const right = extra || emptyResultBlock();
  return {
    overall: left.overall !== '—' ? left.overall : right.overall,
    hint: left.hint || right.hint,
    subjects: mergeSubjects(left.subjects, right.subjects),
  };
};

const splitResultBlocks = (data, child) => {
  const monthly =
    asObject(data.monthly) ||
    asObject(data.month) ||
    asObject(data.mid_term) ||
    asObject(data.midterm);
  const year =
    asObject(data.yearly) ||
    asObject(data.year) ||
    asObject(data.annual) ||
    asObject(data.final);
  const fallback = mapResultBlock(data);
  if (monthly || year) {
    return {
      child,
      monthly: mergeResultBlock(mapResultBlock(monthly || {}), fallback),
      year: mergeResultBlock(mapResultBlock(year || {}), fallback),
    };
  }
  return {child, monthly: fallback, year: fallback};
};

export const mapStudentResultCard = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  return splitResultBlocks(data, mapResultChild(data.child || data.student));
};

export const mapStudentResultsSummary = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  return splitResultBlocks(data, mapResultChild(data.child || data.student));
};

const mapResultRow = (item, index) => {
  const slot = asObject(item) || {};
  return {
    id: text(slot.id) || String(index),
    name: named(slot.subject) || text(slot.subject_name || slot.name || slot.title),
    grade: text(slot.grade || slot.grade_name),
    score: resultScore(slot),
    obtained: text(slot.obtained_marks ?? slot.obtained ?? slot.marks),
    total: text(slot.total_marks ?? slot.total ?? slot.max_marks),
    period: resultPeriod(slot),
  };
};

export const readResultsPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : firstResultList(page).length
      ? firstResultList(page)
      : firstResultList(root);
  return {
    items: list.map(mapResultRow).filter(item => item.name),
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

const subjectsForPeriod = (items, period) =>
  items.filter(item => !item.period || item.period === period);

export const combineStudentResults = ({card, summary, list}) => {
  const cardMap = card || {monthly: emptyResultBlock(), year: emptyResultBlock()};
  const summaryMap = summary || {monthly: emptyResultBlock(), year: emptyResultBlock()};
  const items = Array.isArray(list) ? list : [];
  const monthlyItems = subjectsForPeriod(items, 'monthly');
  const yearItems = subjectsForPeriod(items, 'year');
  return {
    child: cardMap.child || summaryMap.child || null,
    monthly: mergeResultBlock(
      mergeResultBlock(cardMap.monthly, summaryMap.monthly),
      {
        overall: '—',
        hint: '',
        subjects: monthlyItems.length ? monthlyItems : items,
      },
    ),
    year: mergeResultBlock(mergeResultBlock(cardMap.year, summaryMap.year), {
      overall: '—',
      hint: '',
      subjects: yearItems.length ? yearItems : items,
    }),
  };
};

export const getStudentResults = (params = {}) =>
  axiosInstance.get('/student/results', {
    params,
  });

export const getStudentResultsSummary = () => axiosInstance.get('/student/results/summary');

export const getStudentResultCard = (params = {}) =>
  axiosInstance.get('/student/results/card', {
    params,
  });

const resultCardAuthHeaders = async () => {
  let token = getAuthToken();
  if (!token) {
    try {
      token = await storage.getItem(storageKeys.token);
    } catch (error) {
      token = null;
    }
  }
  return {
    Accept: 'application/pdf, application/json',
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  };
};

const resultCardFileUrl = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const document = asObject(data.document) || asObject(root.document) || {};
  return text(document.pdf_url || data.pdf_url || root.pdf_url);
};

const resolveFileUrl = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  if (raw.startsWith('//')) {
    return `https:${raw}`;
  }
  const origin = API_BASE_URL.replace(/\/api\/?$/, '');
  return raw.startsWith('/') ? `${origin}${raw}` : raw;
};

const saveStudentResultPdf = async (sourcePath, fileName) => {
  if (Platform.OS === 'android') {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: '',
          mimeType: 'application/pdf',
        },
        'Download',
        sourcePath,
      );
    } catch (error) {
      // The viewer still opens the cached copy.
    }
  }
  return fileUri(sourcePath);
};

const downloadResultFile = async (fileUrl, path, headers) => {
  const saved = await ReactNativeBlobUtil.config({
    fileCache: true,
    path,
  }).fetch('GET', fileUrl, headers);
  if (saved.info().status >= 400) {
    throw new Error('Unable to download result card.');
  }
  return saved.path();
};

export const downloadStudentResultCard = async () => {
  const headers = await resultCardAuthHeaders();
  const cardResponse = await getStudentResultCard({result_mode: 'final'});
  const cardBody = cardResponse?.data;
  if (cardBody && cardBody.success === false) {
    throw new Error(cardBody.message || 'Unable to download result card.');
  }

  const root = asObject(cardBody) || {};
  const data = asObject(root.data) || root;
  const document = asObject(data.document) || asObject(root.document) || {};
  const fileUrl = resolveFileUrl(resultCardFileUrl(cardBody));
  if (!fileUrl) {
    throw new Error(cardBody?.message || 'Unable to download result card.');
  }

  const rawName = text(document.filename).replace(/\.html?$/i, '.pdf');
  const fileName = rawName
    ? rawName.toLowerCase().endsWith('.pdf')
      ? rawName
      : `${rawName}.pdf`
    : 'student-result-card.pdf';
  const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
  const savedPath = await downloadResultFile(fileUrl, path, headers);
  return saveStudentResultPdf(savedPath, fileName);
};

const mapTeacher = (item, index) => {
  const slot = asObject(item) || {};
  const firstSubject = Array.isArray(slot.subjects) ? slot.subjects[0] : null;
  const name = text(slot.name || slot.full_name) || named(slot.teacher);
  const role = text(slot.role || slot.type || slot.designation).toLowerCase();
  return {
    id: text(slot.id) || String(index),
    name,
    initials: initialsFromName(name),
    subject: named(slot.subject) || text(slot.subject_name) || named(firstSubject),
    gender: text(slot.gender),
    photoUrl: text(slot.photo_url || slot.profile_image || slot.image),
    isClassTeacher:
      slot.is_class_teacher === true ||
      slot.is_class_teacher === 1 ||
      slot.is_class_teacher === '1' ||
      role.includes('class'),
  };
};

export const mapStudentTeachers = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const classSlot = asObject(data.class_teacher) || asObject(data.classTeacher);
  const list = Array.isArray(root.data)
    ? root.data
    : Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.teachers)
        ? data.teachers
        : Array.isArray(data.subject_teachers)
          ? data.subject_teachers
          : Array.isArray(data.entries)
            ? data.entries
            : [];
  const mapped = list.map(mapTeacher).filter(item => item.name);
  const classTeacher = classSlot ? mapTeacher(classSlot, 0) : mapped.find(item => item.isClassTeacher) || null;
  const classId = classTeacher?.name ? classTeacher.id : '';
  return {
    classTeacher: classTeacher?.name ? classTeacher : null,
    subjectTeachers: mapped.filter(item => item.id !== classId),
  };
};

export const mapStudentTeacher = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const slot = asObject(data.teacher) || data;
  return mapTeacher(slot, 0);
};

export const getStudentTeachers = () => axiosInstance.get('/student/teachers');

export const getStudentTeacher = teacherId =>
  axiosInstance.get(`/student/teachers/${teacherId}`);

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FULL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const ATTENDANCE_STATUS = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  leave: 'Leave',
};

const attendanceDate = value => {
  const raw = text(value);
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    return null;
  }
  const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
};

const mapAttendanceRecord = (item, index) => {
  const slot = asObject(item) || {};
  const parsed = attendanceDate(slot.date);
  const statusKey = text(slot.status).toLowerCase();
  return {
    id: text(slot.id) || String(index),
    day: parsed ? String(parsed.getDate()) : '',
    shortDay: parsed ? WEEKDAYS[parsed.getDay()] : '',
    dateLabel: parsed ? `${FULL_MONTHS[parsed.getMonth()]} ${parsed.getDate()}` : '',
    fullDay: parsed ? FULL_WEEKDAYS[parsed.getDay()] : '',
    iso: parsed
      ? `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`
      : '',
    status: ATTENDANCE_STATUS[statusKey] || '',
  };
};

export const mapStudentAttendance = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const summary = asObject(data.summary) || {};
  const percentage = Number(summary.percentage);
  const from = attendanceDate(data.from);
  const records = (Array.isArray(data.records) ? data.records : [])
    .map(mapAttendanceRecord)
    .filter(item => item.dateLabel);
  return {
    month: from ? `${FULL_MONTHS[from.getMonth()]} ${from.getFullYear()}` : '',
    present: text(summary.present),
    absent: text(summary.absent),
    late: text(summary.late),
    leave: text(summary.leave),
    rate: Number.isFinite(percentage) ? percentage / 100 : 0,
    rateText: Number.isFinite(percentage) ? `${percentage}%` : '',
    history: records,
  };
};

export const getStudentAttendance = (params = {}) =>
  axiosInstance.get('/student/attendance', {
    params,
  });

const SHORT_MONTHS_HOLIDAY = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const holidayType = slot => {
  const name = text(slot.type || slot.category || slot.kind);
  const lower = name.toLowerCase();
  if (!name) {
    return '';
  }
  if (lower.includes('national') || lower.includes('public')) {
    return 'National';
  }
  if (lower.includes('relig') || lower.includes('eid') || lower.includes('islam')) {
    return 'Religious';
  }
  if (lower.includes('school') || lower.includes('break') || lower.includes('academic')) {
    return 'School';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const holidayDateText = (start, end) => {
  const first = attendanceDate(start);
  const last = attendanceDate(end);
  if (first && last && first.getTime() !== last.getTime()) {
    return `${first.getDate()} ${SHORT_MONTHS_HOLIDAY[first.getMonth()]} - ${last.getDate()} ${SHORT_MONTHS_HOLIDAY[last.getMonth()]} ${last.getFullYear()}`;
  }
  const single = first || last;
  if (single) {
    return `${WEEKDAYS[single.getDay()]}, ${single.getDate()} ${SHORT_MONTHS_HOLIDAY[single.getMonth()]} ${single.getFullYear()}`;
  }
  return text(start || end);
};

const holidayDuration = (slot, start, end) => {
  const labeled = text(slot.duration || slot.duration_label);
  if (labeled) {
    return labeled;
  }
  const days = Number(slot.duration_days || slot.days);
  if (Number.isFinite(days) && days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }
  const first = attendanceDate(start);
  const last = attendanceDate(end);
  if (first && last) {
    const count = Math.round((last.getTime() - first.getTime()) / 86400000) + 1;
    if (count > 0) {
      return `${count} ${count === 1 ? 'day' : 'days'}`;
    }
  }
  return '';
};

const mapHoliday = (item, index) => {
  const slot = asObject(item) || {};
  const start = slot.start_date || slot.starts_at || slot.from || slot.date;
  const end = slot.end_date || slot.ends_at || slot.to;
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title || slot.name),
    date: holidayDateText(start, end),
    type: holidayType(slot),
    duration: holidayDuration(slot, start, end),
  };
};

export const mapStudentHolidays = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.holidays)
        ? page.holidays
        : Array.isArray(page.entries)
          ? page.entries
          : [];
  return list.map(mapHoliday).filter(item => item.title);
};

export const getStudentHolidays = () => axiosInstance.get('/student/holidays');

const examNumber = value => {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  return String(value).replace('%', '');
};

const examStatus = value => {
  const raw = text(value).toLowerCase();
  if (raw === 'passed' || raw === 'pass') {
    return 'PASSED';
  }
  if (raw === 'failed' || raw === 'fail') {
    return 'FAILED';
  }
  return '';
};

const examWhen = value => {
  const raw = text(value);
  if (!raw) {
    return {date: '', time: '', iso: ''};
  }
  const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const parsed = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    if (Number.isNaN(parsed.getTime())) {
      return {date: raw, time: '', iso: raw};
    }
    return {
      date: `${WEEKDAYS[parsed.getDay()]}, ${parsed.getDate()} ${SHORT_MONTHS_HOLIDAY[parsed.getMonth()]} ${parsed.getFullYear()}`,
      time: '',
      iso: raw,
    };
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return {date: raw, time: clockFromIso(raw), iso: ''};
  }
  return {
    date: `${WEEKDAYS[parsed.getDay()]}, ${parsed.getDate()} ${SHORT_MONTHS_HOLIDAY[parsed.getMonth()]} ${parsed.getFullYear()}`,
    time: clockFromIso(raw),
    iso: `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`,
  };
};

const examMarks = slot => {
  const labeled = text(slot.marks || slot.marks_label);
  if (labeled) {
    return labeled;
  }
  const obtained = text(slot.obtained_marks ?? slot.obtained ?? slot.marks_obtained);
  const total = text(slot.total_marks ?? slot.total ?? slot.max_marks);
  if (obtained && total) {
    return `${obtained}/${total}`;
  }
  return obtained;
};

const examScore = slot => {
  const percent = examNumber(slot.percentage ?? slot.percent ?? slot.score);
  return percent ? `${percent}%` : '';
};

const mapExamHistoryItem = (item, index) => {
  const slot = asObject(item) || {};
  const when = examWhen(slot.scheduled_at || slot.exam_date || slot.date || slot.held_at);
  return {
    id: text(slot.id) || String(index),
    subject: named(slot.subject) || text(slot.subject_name || slot.title || slot.name),
    title: text(slot.title) || named(slot.subject),
    date: when.date,
    dateISO: when.iso,
    status: examStatus(slot.status || slot.result_status || slot.result),
    marks: examMarks(slot),
    score: examScore(slot),
  };
};

const mapNextExam = slot => {
  const record = asObject(slot) || {};
  const when = examWhen(record.scheduled_at || record.exam_date || record.date);
  const subject = named(record.subject) || text(record.subject_name || record.title || record.name);
  if (!subject) {
    return null;
  }
  return {
    subject,
    date: when.date,
    time: text(record.starts_at) ? clockLabel(record.starts_at) : when.time,
  };
};

export const mapStudentExamsOverview = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const stats = asObject(data.overview) || asObject(data.stats) || asObject(data.summary) || data;
  return {
    totalExams: examNumber(
      stats.total_exams ?? stats.total ?? stats.exams_count ?? stats.count,
    ),
    averageScore: examNumber(
      stats.average_score ?? stats.average ?? stats.average_percentage,
    ),
    highestScore: examNumber(stats.highest_score ?? stats.highest ?? stats.max_score),
    lowestScore: examNumber(stats.lowest_score ?? stats.lowest ?? stats.min_score),
    nextExam: mapNextExam(stats.next_exam || stats.upcoming_exam || data.next_exam),
  };
};

export const readExamPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.upcoming)
      ? page.upcoming
      : Array.isArray(page.data)
        ? page.data
        : Array.isArray(page.exams)
          ? page.exams
          : Array.isArray(page.entries)
            ? page.entries
            : [];
  return {
    items: list,
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

export const readExamHistoryPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.history)
        ? page.history
        : Array.isArray(page.exams)
          ? page.exams
          : Array.isArray(page.past)
            ? page.past
            : [];
  return {
    items: list.map(mapExamHistoryItem).filter(item => item.subject || item.title),
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

export const mapStudentExam = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const slot = asObject(data.exam) || data;
  return mapExamHistoryItem(slot, 0);
};

export const combineStudentExams = ({overview, schedule, history}) => {
  const nextFromSchedule = Array.isArray(schedule)
    ? mapNextExam(schedule.find(item => mapNextExam(item)))
    : null;
  return {
    overview: overview || {
      totalExams: '',
      averageScore: '',
      highestScore: '',
      lowestScore: '',
      nextExam: null,
    },
    nextExam: overview?.nextExam || nextFromSchedule,
    history: Array.isArray(history) ? history : [],
  };
};

export const getStudentExamsOverview = () => axiosInstance.get('/student/exams/overview');

export const getStudentExams = (params = {}) =>
  axiosInstance.get('/student/exams', {
    params,
  });

export const getStudentExamsHistory = (params = {}) =>
  axiosInstance.get('/student/exams/history', {
    params,
  });

export const getStudentExam = examId => axiosInstance.get(`/student/exams/${examId}`);
