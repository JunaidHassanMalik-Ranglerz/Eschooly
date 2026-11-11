import {Colors} from './Colors';
import {EducationIcons, getFeatureArt as getRegisteredArt} from '../Assets/EducationIcons';

/** Academics menu icon palette — reuse across student screens. */
export const FEATURE_ICON_META = {
  subjects: {icon: 'book', color: Colors.iconPurple, art: EducationIcons.subjects},
  syllabus: {icon: 'book', color: Colors.iconTeal, art: EducationIcons.syllabus},
  assignments: {
    icon: 'document-text',
    color: Colors.iconOrange,
    art: EducationIcons.assignments,
  },
  assignment: {
    icon: 'document-text',
    color: Colors.iconOrange,
    art: EducationIcons.assignments,
  },
  teachers: {icon: 'people', color: Colors.iconCyan, art: EducationIcons.teachers},
  teacher: {icon: 'people', color: Colors.iconCyan, art: EducationIcons.teachers},
  attendance: {icon: 'calendar', color: Colors.iconGreen, art: EducationIcons.attendance},
  timetable: {icon: 'time', color: Colors.iconPurple, art: EducationIcons.timetable},
  holidays: {icon: 'sunny', color: Colors.iconAmber, art: EducationIcons.holidays},
  exams: {icon: 'clipboard', color: Colors.iconPink, art: EducationIcons.exams},
  exam: {icon: 'clipboard', color: Colors.iconPink, art: EducationIcons.exams},
  result: {icon: 'trophy', color: Colors.iconTeal, art: EducationIcons.results},
  results: {icon: 'trophy', color: Colors.iconTeal, art: EducationIcons.results},
  fee: {icon: 'card', color: Colors.warning, art: EducationIcons.fees},
  library: {icon: 'library', color: Colors.iconTeal, art: EducationIcons.digitalLibrary},
  digitalLibrary: {
    icon: 'library',
    color: Colors.iconTeal,
    art: EducationIcons.digitalLibrary,
  },
  online: {icon: 'play', color: Colors.iconPink, art: EducationIcons.onlineClasses},
  onlineClass: {
    icon: 'videocam',
    color: Colors.iconOrange,
    art: EducationIcons.onlineClasses,
  },
  announcements: {
    icon: 'megaphone',
    color: Colors.iconPink,
    art: EducationIcons.announcements,
  },
  notification: {
    icon: 'notifications',
    color: Colors.iconPurple,
    art: EducationIcons.notifications,
  },
  transport: {icon: 'bus', color: Colors.iconAmber, art: EducationIcons.transport},
  transportTrack: {icon: 'bus', color: Colors.iconAmber, art: EducationIcons.transport},
  diary: {icon: 'journal', color: Colors.iconTeal},
  profile: {icon: 'person', color: Colors.iconCyan, art: EducationIcons.profile},
  password: {icon: 'lock-closed', color: Colors.iconPurple},
  download: {icon: 'download', color: Colors.iconGreen},
  watch: {icon: 'play', color: Colors.iconGreen},
  video: {icon: 'videocam', color: Colors.iconSky},
  document: {icon: 'document-text', color: Colors.iconOrange},
  calendar: {icon: 'calendar', color: Colors.iconGreen},
  search: {icon: 'search', color: Colors.iconCyan},
  nextClass: {icon: 'planet', color: Colors.iconSky, art: EducationIcons.physicsAtom},
  latestResult: {icon: 'ribbon', color: Colors.iconTeal, art: EducationIcons.resultBadge},
  linkedChildren: {
    icon: 'people',
    color: Colors.iconCyan,
    art: EducationIcons.linkedChildren,
  },
  childJourney: {icon: 'map', color: Colors.iconAmber, art: EducationIcons.childJourney},
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

export const getFeatureArt = key =>
  FEATURE_ICON_META[key]?.art || getRegisteredArt(key);

export const getHubIconMeta = index =>
  HUB_ICON_META[index % HUB_ICON_META.length] || FEATURE_ICON_META.subjects;
