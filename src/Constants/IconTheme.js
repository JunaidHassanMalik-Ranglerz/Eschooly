import {Colors} from './Colors';

/** Academics menu icon palette — reuse across student screens. */
export const FEATURE_ICON_META = {
  subjects: {icon: 'book', color: Colors.iconPurple},
  syllabus: {icon: 'book', color: Colors.iconTeal},
  assignments: {icon: 'document-text', color: Colors.iconOrange},
  assignment: {icon: 'document-text', color: Colors.iconOrange},
  teachers: {icon: 'people', color: Colors.iconCyan},
  teacher: {icon: 'people', color: Colors.iconCyan},
  attendance: {icon: 'calendar', color: Colors.iconGreen},
  timetable: {icon: 'time', color: Colors.iconPurple},
  holidays: {icon: 'sunny', color: Colors.iconAmber},
  exams: {icon: 'clipboard', color: Colors.iconPink},
  exam: {icon: 'clipboard', color: Colors.iconPink},
  result: {icon: 'trophy', color: Colors.iconTeal},
  results: {icon: 'trophy', color: Colors.iconTeal},
  fee: {icon: 'card', color: Colors.warning},
  library: {icon: 'library', color: Colors.iconTeal},
  digitalLibrary: {icon: 'library', color: Colors.iconTeal},
  online: {icon: 'play', color: Colors.iconPink},
  onlineClass: {icon: 'videocam', color: Colors.iconOrange},
  announcements: {icon: 'megaphone', color: Colors.iconPink},
  notification: {icon: 'notifications', color: Colors.iconPurple},
  transport: {icon: 'bus', color: Colors.iconAmber},
  transportTrack: {icon: 'bus', color: Colors.iconAmber},
  diary: {icon: 'journal', color: Colors.iconTeal},
  profile: {icon: 'person', color: Colors.iconCyan},
  password: {icon: 'lock-closed', color: Colors.iconPurple},
  download: {icon: 'download', color: Colors.iconGreen},
  watch: {icon: 'play', color: Colors.iconGreen},
  video: {icon: 'videocam', color: Colors.iconSky},
  document: {icon: 'document-text', color: Colors.iconOrange},
  calendar: {icon: 'calendar', color: Colors.iconGreen},
  search: {icon: 'search', color: Colors.iconCyan},
};

export const HUB_ICON_META = [
  FEATURE_ICON_META.onlineClass,
  FEATURE_ICON_META.timetable,
  FEATURE_ICON_META.assignments,
  FEATURE_ICON_META.digitalLibrary,
  FEATURE_ICON_META.announcements,
  FEATURE_ICON_META.results,
  FEATURE_ICON_META.syllabus,
];

export const getFeatureIcon = key =>
  FEATURE_ICON_META[key] || FEATURE_ICON_META.subjects;

export const getHubIconMeta = index =>
  HUB_ICON_META[index % HUB_ICON_META.length] || FEATURE_ICON_META.subjects;
