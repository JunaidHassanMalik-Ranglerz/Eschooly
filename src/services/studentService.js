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

const mapAssignment = (item, index) => {
  const slot = asObject(item) || {};
  const status = text(slot.status).toLowerCase();
  const type = text(slot.type || slot.assignment_type).toLowerCase();
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title || slot.name),
    teacher: namedRecord(slot.teacher) || text(slot.teacher_name),
    dueDate: formatDue(slot.due_at || slot.due_date || slot.deadline || slot.due_on || slot.due),
    status: ['pending', 'submitted', 'overdue'].includes(status) ? status : 'pending',
    type: ['homework', 'project', 'quiz', 'lab'].includes(type) ? type : 'homework',
    subjectId: text(asObject(slot.subject)?.id ?? slot.subject_id),
    subjectName: namedRecord(slot.subject) || text(slot.subject_name),
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

export const mapStudentAssignments = (pages, overviewBody) => {
  const collected = pages.reduce(
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

  const subjects = collected.grouped.length
    ? collected.grouped.map(mapSubjectGroup).filter(item => item.name)
    : groupFlatAssignments(collected.flat);

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
  if (raw.includes('year') || raw.includes('annual')) {
    return 'year';
  }
  if (raw.includes('month')) {
    return 'monthly';
  }
  return '';
};

const resultSubjects = record => {
  const source = asObject(record) || {};
  const list = Array.isArray(source.subjects)
    ? source.subjects
    : Array.isArray(source.results)
      ? source.results
      : Array.isArray(source.marks)
        ? source.marks
        : [];
  return list
    .map((item, index) => {
      const slot = asObject(item) || {};
      return {
        id: text(slot.id) || String(index),
        name: named(slot.subject) || text(slot.subject_name || slot.name || slot.title),
        grade: text(slot.grade || slot.grade_name),
        score: resultScore(slot),
        period: resultPeriod(slot),
      };
    })
    .filter(item => item.name);
};

const mapResultBlock = record => {
  const source = asObject(record) || {};
  return {
    overall: text(source.overall_grade || source.overall || source.grade) || '—',
    hint: text(source.remark || source.hint || source.comment),
    subjects: resultSubjects(source),
  };
};

const emptyResultBlock = () => ({overall: '—', hint: '', subjects: []});

const mergeResultBlock = (base, extra) => {
  const left = base || emptyResultBlock();
  const right = extra || emptyResultBlock();
  return {
    overall: left.overall !== '—' ? left.overall : right.overall,
    hint: left.hint || right.hint,
    subjects: left.subjects.length ? left.subjects : right.subjects,
  };
};

export const mapStudentResultCard = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const monthly = asObject(data.monthly) || asObject(data.month);
  const year = asObject(data.yearly) || asObject(data.year) || asObject(data.annual);
  if (monthly || year) {
    return {
      monthly: mapResultBlock(monthly || {}),
      year: mapResultBlock(year || {}),
    };
  }
  const card = mapResultBlock(data);
  return {monthly: card, year: card};
};

export const mapStudentResultsSummary = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const monthly = asObject(data.monthly) || asObject(data.month);
  const year = asObject(data.yearly) || asObject(data.year) || asObject(data.annual);
  if (monthly || year) {
    return {
      monthly: mapResultBlock(monthly || {}),
      year: mapResultBlock(year || {}),
    };
  }
  const summary = mapResultBlock(data);
  return {monthly: summary, year: summary};
};

export const readResultsPage = body => {
  const root = asObject(body) || {};
  const data = root.data;
  const page = asObject(data) || {};
  const list = Array.isArray(data)
    ? data
    : Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.results)
        ? page.results
        : Array.isArray(page.entries)
          ? page.entries
          : Array.isArray(page.subjects)
            ? page.subjects
            : [];
  return {
    items: list
      .map((item, index) => {
        const slot = asObject(item) || {};
        return {
          id: text(slot.id) || String(index),
          name: named(slot.subject) || text(slot.subject_name || slot.name || slot.title),
          grade: text(slot.grade || slot.grade_name),
          score: resultScore(slot),
          period: resultPeriod(slot),
        };
      })
      .filter(item => item.name),
    lastPage: Number(page.meta?.last_page || page.last_page || root.meta?.last_page) || 1,
  };
};

const subjectsForPeriod = (items, period) =>
  items.filter(item => !item.period || item.period === period);

export const combineStudentResults = ({card, summary, list}) => {
  const cardMap = card || {monthly: emptyResultBlock(), year: emptyResultBlock()};
  const summaryMap = summary || {monthly: emptyResultBlock(), year: emptyResultBlock()};
  const items = Array.isArray(list) ? list : [];
  const monthlyList = {
    overall: '—',
    hint: '',
    subjects: subjectsForPeriod(items, 'monthly'),
  };
  const yearList = {
    overall: '—',
    hint: '',
    subjects: subjectsForPeriod(items, 'year'),
  };
  return {
    monthly: mergeResultBlock(mergeResultBlock(cardMap.monthly, summaryMap.monthly), monthlyList),
    year: mergeResultBlock(mergeResultBlock(cardMap.year, summaryMap.year), yearList),
  };
};

export const getStudentResults = (params = {}) =>
  axiosInstance.get('/student/results', {
    params,
  });

export const getStudentResultsSummary = () => axiosInstance.get('/student/results/summary');

export const getStudentResultCard = () => axiosInstance.get('/student/results/card');

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
