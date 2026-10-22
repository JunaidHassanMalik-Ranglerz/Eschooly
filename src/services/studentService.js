import axiosInstance from '../api/axiosInstance';
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
