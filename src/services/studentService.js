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
