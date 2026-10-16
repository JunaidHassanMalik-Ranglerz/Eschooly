import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axiosInstance, {API_BASE_URL, getAuthToken} from '../api/axiosInstance';
import {storage, storageKeys} from '../utils/storage';

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

export const mapHomeChild = child => {
  const record = asObject(child) || {};
  const classRecord = asObject(record.class);
  const name = text(record.name);
  const className = text(
    record.class_name || classRecord?.name || classRecord?.class_name,
  );

  return {
    id: record.id,
    value: text(record.id),
    label: name,
    name,
    photoUrl: text(record.profile_image || record.photo_url),
    className,
    classLabel: className,
    classBadge: className,
    rollNo: text(record.roll_no),
    initials: initialsFromName(name),
  };
};

const mapScheduleItem = (item, index) => {
  const record = asObject(item) || {};
  return {
    id: text(record.id) || String(index),
    subject: text(record.subject),
    time: text(record.time),
    icon: text(record.icon) || 'time-outline',
    iconColor: text(record.icon_color) || text(record.iconColor),
  };
};

const attendanceLabel = attendance => {
  const record = asObject(attendance);
  if (!record) {
    return text(attendance);
  }
  if (record.percentage === undefined || record.percentage === null || record.percentage === '') {
    return '';
  }
  const value = text(record.percentage);
  return value.includes('%') ? value : `${value}%`;
};

export const mapDashboard = dashboard => {
  const record = asObject(dashboard) || {};
  const scheduleSource = Array.isArray(record.today_schedule)
    ? record.today_schedule
    : Array.isArray(record.timetable)
      ? record.timetable
      : Array.isArray(record.schedule)
        ? record.schedule
        : [];

  return {
    attendance: attendanceLabel(record.attendance),
    libraryCount: text(record.library_count ?? record.library),
    exams: text(record.exams_count ?? record.exams),
    announcements: text(record.announcements_count ?? record.announcements),
    unreadNotifications: text(record.unread_notifications),
    schedule: scheduleSource.map(mapScheduleItem).filter(item => item.subject),
  };
};

export const mapParentHome = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const children = (Array.isArray(data.children) ? data.children : []).map(mapHomeChild);
  const selectedSource = asObject(data.selected_child);
  const selected = selectedSource ? mapHomeChild(selectedSource) : children[0] || null;

  return {
    parent: asObject(data.parent),
    children,
    selectedChildId: selected?.value || null,
    dashboard: data.dashboard == null ? null : mapDashboard(data.dashboard),
  };
};

const named = value => {
  const record = asObject(value);
  if (record) {
    return text(record.name);
  }
  return text(value);
};

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

const slotTime = record => {
  const time = text(record.time);
  if (time) {
    return time;
  }
  const start = clockLabel(record.starts_at || record.start_time);
  const end = clockLabel(record.ends_at || record.end_time);
  if (start && end) {
    return `${start} - ${end}`;
  }
  return start || end;
};

const slotClassLabel = record => {
  const className = named(record.class) || text(record.class_name);
  const section = named(record.section);
  return [className, section].filter(Boolean).join(' · ');
};

export const mapChildTimetable = body => {
  const root = asObject(body) || {};
  const data = root.data === undefined ? root : root.data;
  const record = asObject(data);
  const list = Array.isArray(data)
    ? data
    : Array.isArray(record?.entries)
      ? record.entries
      : [];

  return list
    .map((item, index) => {
      const slot = asObject(item) || {};
      return {
        id: text(slot.id) || String(index),
        period: text(slot.period_number || slot.period),
        subject: named(slot.subject) || text(slot.subject_name),
        time: slotTime(slot),
        classLabel: slotClassLabel(slot),
        teacher: named(slot.teacher),
        room: text(slot.room),
      };
    })
    .filter(item => item.subject);
};

const scoreValue = slot => {
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

const subjectRows = record => {
  if (Array.isArray(record.subjects)) {
    return record.subjects;
  }
  if (Array.isArray(record.results)) {
    return record.results;
  }
  if (Array.isArray(record.marks)) {
    return record.marks;
  }
  return [];
};

const mapResultCard = record => {
  const source = asObject(record) || {};
  return {
    overall: text(source.overall_grade || source.overall || source.grade) || '—',
    hint: text(source.remark || source.hint || source.comment),
    subjects: subjectRows(source)
      .map((item, index) => {
        const slot = asObject(item) || {};
        return {
          id: text(slot.id) || String(index),
          name: named(slot.subject) || text(slot.subject_name || slot.name),
          grade: text(slot.grade || slot.grade_name),
          score: scoreValue(slot),
        };
      })
      .filter(item => item.name),
  };
};

export const mapChildResultCard = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const monthly = asObject(data.monthly) || asObject(data.month);
  const year = asObject(data.yearly) || asObject(data.year) || asObject(data.annual);
  const child = data.child ? mapHomeChild(data.child) : null;

  if (monthly || year) {
    return {
      child,
      monthly: mapResultCard(monthly || {}),
      year: mapResultCard(year || {}),
    };
  }

  const card = mapResultCard(data);
  return {child, monthly: card, year: card};
};

export const getParentHome = () => axiosInstance.get('/parent/home');

export const getChildDashboard = childId =>
  axiosInstance.get(`/parent/children/${childId}/dashboard`);

export const getChildTimetable = (childId, day) =>
  axiosInstance.get(`/parent/children/${childId}/timetable`, {
    params: {day},
  });

export const getChildResultCard = childId =>
  axiosInstance.get(`/parent/children/${childId}/results/card`);

const authHeaders = async () => {
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

const responseMessage = async response => {
  try {
    const body = await response.json();
    if (typeof body?.message === 'string' && body.message.trim()) {
      return body.message.trim();
    }
  } catch (error) {
    return '';
  }
  return '';
};

const fileUri = path => (path.startsWith('file://') ? path : `file://${path}`);

const saveResultPdf = async (sourcePath, fileName) => {
  if (Platform.OS !== 'android') {
    return fileUri(sourcePath);
  }

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
    // The in-app viewer still opens from the saved copy.
  }

  return fileUri(sourcePath);
};

export const downloadChildResultCard = async childId => {
  const headers = await authHeaders();
  const url = `${API_BASE_URL}/parent/children/${childId}/results/card/print`;
  const fileName = `result-card-${childId}.pdf`;
  const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;

  const response = await ReactNativeBlobUtil.config({
    fileCache: true,
    path,
  }).fetch('GET', url, headers);
  const info = response.info();
  const type = String(info.headers?.['Content-Type'] || info.headers?.['content-type'] || '');

  if (info.status >= 400) {
    throw new Error((await responseMessage(response)) || 'Unable to download result card.');
  }

  if (type.includes('json')) {
    const body = await response.json();
    if (body?.success === false) {
      throw new Error(body.message || 'Unable to download result card.');
    }
    const fileUrl = body?.data?.url || body?.data?.pdf_url || body?.url;
    if (!fileUrl) {
      throw new Error(body?.message || 'Unable to download result card.');
    }
    const saved = await ReactNativeBlobUtil.config({
      fileCache: true,
      path,
    }).fetch('GET', fileUrl, headers);
    if (saved.info().status >= 400) {
      throw new Error('Unable to download result card.');
    }
    return saveResultPdf(saved.path(), fileName);
  }

  return saveResultPdf(response.path(), fileName);
};
