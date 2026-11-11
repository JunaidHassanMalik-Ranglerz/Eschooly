/**
 * Central registry for the 21 approved 3D educational PNGs.
 * Never crop design-reference/approved-home.png.
 * Never tint these sources — they are full-color illustrations.
 */
export const EducationIcons = {
  onlineClasses: require('./3d/online-classes.png'),
  timetable: require('./3d/timetable.png'),
  assignments: require('./3d/assignments.png'),
  digitalLibrary: require('./3d/digital-library.png'),
  results: require('./3d/results.png'),
  physicsAtom: require('./3d/physics-atom.png'),
  resultBadge: require('./3d/result-badge.png'),
  attendance: require('./3d/attendance.png'),
  exams: require('./3d/exams.png'),
  teachers: require('./3d/teachers.png'),
  holidays: require('./3d/holidays.png'),
  transport: require('./3d/transport.png'),
  fees: require('./3d/fees.png'),
  syllabus: require('./3d/syllabus.png'),
  announcements: require('./3d/announcements.png'),
  notifications: require('./3d/notifications.png'),
  linkedChildren: require('./3d/linked-children.png'),
  subjects: require('./3d/subjects.png'),
  profile: require('./3d/profile.png'),
  childJourney: require('./3d/child-journey.png'),
  welcomeGraduationBooks: require('./3d/welcome-graduation-books.png'),
};

/** Feature keys used by HUB_ITEMS, MENU_LIST, and parent stats. */
export const FEATURE_ART = {
  online: EducationIcons.onlineClasses,
  onlineClass: EducationIcons.onlineClasses,
  onlineClasses: EducationIcons.onlineClasses,
  timetable: EducationIcons.timetable,
  assignments: EducationIcons.assignments,
  assignment: EducationIcons.assignments,
  library: EducationIcons.digitalLibrary,
  digitalLibrary: EducationIcons.digitalLibrary,
  results: EducationIcons.results,
  result: EducationIcons.results,
  syllabus: EducationIcons.syllabus,
  subjects: EducationIcons.subjects,
  announcements: EducationIcons.announcements,
  attendance: EducationIcons.attendance,
  exams: EducationIcons.exams,
  exam: EducationIcons.exams,
  teachers: EducationIcons.teachers,
  teacher: EducationIcons.teachers,
  holidays: EducationIcons.holidays,
  fee: EducationIcons.fees,
  fees: EducationIcons.fees,
  transport: EducationIcons.transport,
  transportTrack: EducationIcons.transport,
  notification: EducationIcons.notifications,
  notifications: EducationIcons.notifications,
  profile: EducationIcons.profile,
  myProfile: EducationIcons.profile,
  linkedChildren: EducationIcons.linkedChildren,
  childJourney: EducationIcons.childJourney,
  physicsAtom: EducationIcons.physicsAtom,
  nextClass: EducationIcons.physicsAtom,
  resultBadge: EducationIcons.resultBadge,
  latestResult: EducationIcons.resultBadge,
  welcome: EducationIcons.welcomeGraduationBooks,
};

export const getFeatureArt = key => FEATURE_ART[key] || null;

export const EDUCATION_ICON_COUNT = Object.keys(EducationIcons).length;
