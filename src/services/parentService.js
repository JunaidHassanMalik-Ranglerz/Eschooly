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

  const countText = (...values) => {
    for (const value of values) {
      if (Array.isArray(value)) {
        return String(value.length);
      }
      const nested = asObject(value);
      if (nested) {
        const nestedCount = nested.count ?? nested.total;
        if (nestedCount !== undefined && nestedCount !== null && nestedCount !== '') {
          return text(nestedCount);
        }
        continue;
      }
      if (value !== undefined && value !== null && value !== '') {
        return text(value);
      }
    }
    return '';
  };

  return {
    attendance: attendanceLabel(record.attendance),
    libraryCount: text(record.library_count ?? record.library),
    exams: text(record.exams_count ?? record.exams),
    announcements: countText(
      record.announcements_count,
      record.announcement_count,
      record.announcements,
    ),
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

const responseData = body => {
  const root = asObject(body) || {};
  return asObject(root.data) || root;
};

const firstList = (record, keys) => {
  if (Array.isArray(record)) {
    return record;
  }
  const source = asObject(record) || {};
  for (const key of keys) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
    const nested = asObject(source[key]);
    if (!nested) {
      continue;
    }
    for (const inner of ['items', 'data', 'entries', 'books', 'resources']) {
      if (Array.isArray(nested[inner])) {
        return nested[inner];
      }
    }
  }
  return [];
};

const dateLabel = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const timeLabel = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  if (raw.includes('T')) {
    return clockLabel(raw.split('T')[1]);
  }
  return clockLabel(raw);
};

const categoryLabel = value => {
  const name = named(value);
  if (!name) {
    return 'Notice';
  }
  const lower = name.toLowerCase();
  if (lower.includes('event')) {
    return 'Event';
  }
  if (lower.includes('update')) {
    return 'Update';
  }
  if (lower.includes('notice')) {
    return 'Notice';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const topicStatus = value => {
  const raw = text(value).toLowerCase().replace(/\s+/g, '_');
  if (raw === 'completed' || raw === 'complete' || raw === 'done') {
    return 'completed';
  }
  if (raw === 'in_progress' || raw === 'progress' || raw === 'ongoing') {
    return 'in_progress';
  }
  return 'pending';
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

export const mapChildAnnouncements = body => {
  const data = responseData(body);
  return {
    child: data.child ? mapHomeChild(data.child) : null,
    items: firstList(data, ['announcements', 'entries', 'notices']).map((item, index) => {
      const slot = asObject(item) || {};
      const published =
        slot.sent_at || slot.published_at || slot.created_at || slot.date;
      return {
        id: text(slot.id) || String(index),
        category: categoryLabel(slot.category || slot.type),
        title: text(slot.title) || named(slot.subject),
        message: text(slot.message || slot.body || slot.description || slot.content),
        date: dateLabel(slot.date || published),
        time: timeLabel(slot.time) || timeLabel(published),
        icon: text(slot.icon),
      };
    }).filter(item => item.title),
  };
};

const mapTopic = (item, index) => {
  const slot = asObject(item) || {};
  const completed = slot.is_completed === true || slot.is_completed === 1 || slot.is_completed === '1';
  return {
    id: text(slot.id) || String(index),
    title: text(slot.title || slot.topic_title || slot.topic_name) || named(slot.name) || named(slot.topic),
    duration: text(slot.duration || slot.duration_label || slot.hours),
    status: completed ? 'completed' : topicStatus(slot.status),
  };
};

const chapterFromUnit = (unit, index) => {
  const slot = asObject(unit) || {};
  const topics = (Array.isArray(slot.topics) ? slot.topics : [])
    .map(mapTopic)
    .filter(topic => topic.title);
  const progress = asObject(slot.progress) || {};
  const percentage = Number(progress.percentage);
  const completed = Number(progress.completed_topics);
  const total = Number(progress.total_topics);
  const ratioValue = Number.isFinite(percentage) ? percentage / 100 : 0;
  const number = text(slot.sort_order) || String(index + 1);
  return {
    id: text(slot.id) || String(index),
    number: number.padStart(2, '0'),
    title: text(slot.title),
    meta: Number.isFinite(total) ? `${Number.isFinite(completed) ? completed : 0}/${total} topics` : `${topics.length} topics`,
    progress: ratioValue,
    percentText: Number.isFinite(percentage) ? `${Math.round(percentage)}%` : '0%',
    topics,
    completedTopics: Number.isFinite(completed) ? completed : 0,
    totalTopics: Number.isFinite(total) ? total : topics.length,
  };
};

export const mapChildSyllabus = body => {
  const data = responseData(body);
  const units = Array.isArray(data.units) ? data.units : [];
  const groups = new Map();

  units.forEach(unit => {
    const slot = asObject(unit) || {};
    const subject = asObject(slot.subject) || {};
    const key = text(subject.id) || named(subject);
    if (!key) {
      return;
    }
    if (!groups.has(key)) {
      groups.set(key, {value: key, label: named(subject), chapters: []});
    }
    const group = groups.get(key);
    const chapter = chapterFromUnit(slot, group.chapters.length);
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
    child: data.child ? mapHomeChild(data.child) : null,
    subjects,
    stats: {
      total: text(stats.total_syllabus),
      published: text(stats.published),
      draft: text(stats.draft),
      update: '',
    },
  };
};

const libraryCategory = item => {
  const name = (named(item.subject) || text(item.category || item.subject_name)).toLowerCase();
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

export const mapChildLibrary = body => {
  const data = responseData(body);
  const child = data.child
    ? {...mapHomeChild(data.child), status: text(asObject(data.child)?.status) || 'Active'}
    : null;
  const className = named(data.class) || child?.className || '';
  return {
    child,
    items: firstList(data, ['library', 'books', 'resources', 'entries']).map((item, index) => {
      const slot = asObject(item) || {};
      const subjectName = named(slot.subject) || text(slot.subject_name);
      return {
        id: text(slot.id) || String(index),
        title: text(slot.title) || subjectName,
        subtitle: text(slot.subtitle) || [subjectName, className ? `Class ${className}` : ''].filter(Boolean).join(' - '),
        fileType: text(slot.file_type || slot.type) || 'PDF',
        fileSize: fileSizeLabel(slot.file_size ?? slot.size),
        category: libraryCategory(slot),
        isNew: Boolean(slot.is_new || slot.isNew),
        pdfUrl: text(slot.file_url || slot.pdf_url || slot.download_url || slot.url),
      };
    }).filter(item => item.title),
  };
};

const localSchedule = value => {
  const raw = text(value);
  const parsed = new Date(raw);
  if (!raw || Number.isNaN(parsed.getTime())) {
    return {date: dateLabel(raw), time: timeLabel(raw), iso: raw.slice(0, 10)};
  }
  const hours = parsed.getHours();
  const minutes = String(parsed.getMinutes()).padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return {
    date: dateLabel(raw),
    time: `${hour12}:${minutes} ${suffix}`,
    iso: `${parsed.getFullYear()}-${month}-${day}`,
  };
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const scheduleDateLabel = value => {
  const parsed = new Date(text(value));
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }
  return `${WEEKDAYS[parsed.getDay()]}, ${parsed.getDate()} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`;
};

const typeLabel = value => {
  const raw = text(value).replace(/_/g, ' ');
  if (!raw) {
    return '';
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const mapScheduleExam = (item, index) => {
  const slot = asObject(item) || {};
  const when = localSchedule(slot.scheduled_at);
  const minutes = Number(slot.duration_minutes);
  return {
    id: text(slot.id) || String(index),
    subject: text(slot.title) || named(slot.subject),
    date: scheduleDateLabel(slot.scheduled_at),
    time: when.time,
    duration: Number.isFinite(minutes) && minutes > 0 ? `${minutes} min` : '',
    venue: text(slot.venue),
    type: typeLabel(slot.type),
    syllabus: text(slot.syllabus_outline),
  };
};

export const mapChildExams = body => {
  const data = responseData(body);
  const upcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
  return {
    child: data.child ? mapHomeChild(data.child) : null,
    schedule: upcoming.map(mapScheduleExam).filter(item => item.subject),
  };
};

const statusLabel = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

export const mapChildTransport = body => {
  const data = responseData(body);
  const childRecord = asObject(data.child);
  const child = childRecord ? mapHomeChild(childRecord) : null;
  const section = named(childRecord?.section);
  if (child && section) {
    const className = [child.className, section].filter(Boolean).join(' - ');
    child.className = className;
    child.classLabel = className;
    child.classBadge = className;
  }
  const allocation = asObject(Array.isArray(data.allocations) ? data.allocations[0] : null);
  if (!data.allocated || !allocation) {
    return {child, allocated: false, details: null};
  }
  const vehicle = asObject(allocation.vehicle) || {};
  const driver = asObject(allocation.driver) || {};
  const stop = asObject(allocation.stop) || {};
  const homeToSchool = asObject(allocation.home_to_school) || {};
  const schoolToHome = asObject(allocation.school_to_home) || {};
  const liveTrip = asObject(data.current_trip);
  return {
    child,
    allocated: true,
    details: {
      busName: text(vehicle.name),
      busNo: text(vehicle.plate_number),
      status: statusLabel(allocation.status),
      driverName: text(driver.name),
      driverContact: text(driver.phone),
      pickupTime: clockLabel(stop.pickup_time || homeToSchool.pickup_time),
      dropTime: clockLabel(stop.drop_time || schoolToHome.drop_time),
    },
    trip: {
      status: text(liveTrip?.status) || statusLabel(allocation.status),
      morning: [
        {
          id: 'pickup',
          title: 'Picked up from home',
          time: clockLabel(homeToSchool.pickup_time || stop.pickup_time),
          done: Boolean(data.pickup_completed),
        },
        {
          id: 'school',
          title: 'Reached school',
          time: '',
          done: Boolean(data.school_reached),
        },
      ],
      evening: [
        {
          id: 'leave',
          title: 'Left school',
          time: clockLabel(schoolToHome.route_return_time),
          done: Boolean(data.school_departure),
        },
        {
          id: 'drop',
          title: 'Dropped at home',
          time: clockLabel(schoolToHome.drop_time || stop.drop_time),
          done: Boolean(data.home_drop_completed),
        },
      ],
    },
  };
};

export const getChildAnnouncements = childId =>
  axiosInstance.get(`/parent/children/${childId}/announcements`);

export const getChildSyllabus = childId =>
  axiosInstance.get(`/parent/children/${childId}/syllabus`);

export const getChildLibrary = childId =>
  axiosInstance.get(`/parent/children/${childId}/library`);

const ATTENDANCE_STATUS = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  leave: 'Leave',
};

const FULL_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

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

export const mapChildAttendance = body => {
  const data = responseData(body);
  const summary = asObject(data.summary) || {};
  const percentage = Number(summary.percentage);
  const from = attendanceDate(data.from);
  const records = (Array.isArray(data.records) ? data.records : [])
    .map(mapAttendanceRecord)
    .filter(item => item.dateLabel);
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayRecord = records.find(item => item.iso === todayIso);
  return {
    child: data.child ? mapHomeChild(data.child) : null,
    view: text(data.view),
    month: from ? `${FULL_MONTHS[from.getMonth()]} ${from.getFullYear()}` : '',
    present: text(summary.present),
    absent: text(summary.absent),
    late: text(summary.late),
    leave: text(summary.leave),
    rate: Number.isFinite(percentage) ? percentage / 100 : 0,
    rateText: Number.isFinite(percentage) ? `${percentage}%` : '',
    todayStatus: todayRecord?.status || '',
    todayDate: todayRecord ? `${todayRecord.shortDay}, ${todayRecord.dateLabel}` : '',
    history: records,
  };
};

export const getChildExams = childId =>
  axiosInstance.get(`/parent/children/${childId}/exams`);

export const getChildAttendance = (childId, {view = 'monthly', month} = {}) =>
  axiosInstance.get(`/parent/children/${childId}/attendance`, {
    params: {
      view,
      ...(month ? {month} : {}),
    },
  });

export const getChildTransport = childId =>
  axiosInstance.get(`/parent/children/${childId}/transport`);
