import Animated from 'react-native-reanimated';
import {KIND_CYCLE, MOTION_KINDS} from '../hooks/useEnterMotion';
import {
  HOME_MATCHED_SCREEN_MOTIONS,
  isSequentialEnterMotion,
} from '../hooks/useScreenEnterGate';

const MAX_STAGGER = 12;
const BASE_DELAY = 22;

/** List / scroll items at or above this index wait for scroll unless overridden. */
export const SCROLL_REVEAL_FROM_INDEX = 6;
export const SCROLL_REVEAL_LEAD_PX = 64;

const SCROLL_REVEAL_KINDS = [
  MOTION_KINDS.orbitIn,
  MOTION_KINDS.tiltIn,
  MOTION_KINDS.cascade,
  MOTION_KINDS.elastic,
  MOTION_KINDS.wow,
  MOTION_KINDS.snapDown,
];
const ENTER_DURATION = 520;
const HOME_ENTER_DURATION = 560;
const HOME_STAGGER = 52;
const HOME_SCREEN_DURATION = 640;
const HOME_SCREEN_STAGGER = 80;
const HOME_SCREEN_FROM_Y = 24;
const HOME_SCREEN_LEAD = 32;

const motion = (kind, delayMs = 0, extra = {}) => ({
  kind,
  delay: delayMs,
  duration: ENTER_DURATION,
  ...extra,
});

const spinSettle = (index, extra = {}) => ({
  spinIn: true,
  spinIndex: index,
  spinDeg: 9,
  ...extra,
});

const homeMotion = (kind, delayMs = 0, extra = {}, spinIndex = 0) => {
  const spin =
    extra.enterVisible || extra.spinIn === false
      ? extra
      : {...spinSettle(spinIndex, extra)};
  return motion(kind, delayMs, {
    duration: HOME_ENTER_DURATION,
    profile: 'home',
    ...spin,
  });
};

/** Home Screen: fade + slight rise, sequential top-to-bottom. */
const homeScreenEnter = (slot = 0) =>
  motion(MOTION_KINDS.appear, HOME_SCREEN_LEAD + Math.abs(slot) * HOME_SCREEN_STAGGER, {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fromY: HOME_SCREEN_FROM_Y,
    spinIn: false,
    fullOffset: true,
  });

const makeHomeScreenPalette = () =>
  Array.from({length: MAX_STAGGER + 1}, (_, index) => homeScreenEnter(index));

const HOME_KIND_CYCLE = [
  MOTION_KINDS.glideUp,
  MOTION_KINDS.glideLeft,
  MOTION_KINDS.appear,
  MOTION_KINDS.glideRight,
];

const makeHomeMotionPalette = (kinds, delayStep = HOME_STAGGER) =>
  Array.from({length: MAX_STAGGER + 1}, (_, index) =>
    homeMotion(kinds[index % kinds.length], index * delayStep, {}, index),
  );

export const enterFromLeft = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.glideLeft, delayMs, {fromX: -64, duration: durationMs});

export const enterFromRight = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.glideRight, delayMs, {fromX: 64, duration: durationMs});

export const enterFromTop = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.glideUp, delayMs, {fromY: -40, duration: durationMs});

export const enterFromBottom = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.glideDown, delayMs, {fromY: 40, duration: durationMs});

export const enterScaleUp = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.pop, delayMs, {fromY: 24, duration: durationMs});

export const enterBounceIn = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.bounceUp, delayMs, {
    bounce: true,
    fromY: 28,
    duration: durationMs,
  });

export const enterFromTopLeft = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.orbitIn, delayMs, {
    fromX: -34,
    fromY: -26,
    duration: durationMs,
  });

export const enterFromBottomRight = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.tiltIn, delayMs, {
    fromX: 24,
    fromY: 24,
    duration: durationMs,
  });

const enterFade = (delayMs = 0, durationMs = ENTER_DURATION) =>
  motion(MOTION_KINDS.appear, delayMs, {duration: durationMs});

const makeMotionPalette = (kinds, delayStep = BASE_DELAY) =>
  Array.from({length: MAX_STAGGER + 1}, (_, index) =>
    motion(kinds[index % kinds.length], index * delayStep, {
      ...spinSettle(index),
    }),
  );

const cycleFrom = offset =>
  Array.from(
    {length: KIND_CYCLE.length},
    (_, i) => KIND_CYCLE[(offset + i) % KIND_CYCLE.length],
  );

const CARD_ENTERING = makeMotionPalette(cycleFrom(0), BASE_DELAY);

export const getCardEntering = (index = 0) =>
  CARD_ENTERING[Math.min(Math.abs(index), MAX_STAGGER)];

const SCREEN_PALETTES = {
  register: makeHomeScreenPalette(),
  role: makeHomeScreenPalette(),
  studentHome: makeHomeScreenPalette(),
  parentHome: makeHomeScreenPalette(),
  menu: makeHomeScreenPalette(),
  notification: makeHomeScreenPalette(),
  announcements: makeHomeScreenPalette(),
  assignment: makeHomeScreenPalette(),
  attendance: makeHomeScreenPalette(),
  exam: makeHomeScreenPalette(),
  library: makeHomeScreenPalette(),
  holidays: makeHomeScreenPalette(),
  teacher: makeHomeScreenPalette(),
  results: makeHomeScreenPalette(),
  syllabus: makeHomeScreenPalette(),
  onlineClass: makeHomeScreenPalette(),
  fee: makeHomeScreenPalette(),
  transport: makeHomeScreenPalette(),
  childProfile: makeMotionPalette(cycleFrom(3), 34),
  myProfile: makeHomeScreenPalette(),
  updatePassword: makeHomeScreenPalette(),
  timetable: makeHomeScreenPalette(),
  diary: makeMotionPalette(cycleFrom(7), 34),
  examSchedule: makeHomeScreenPalette(),
  chat: makeHomeScreenPalette(),
  dues: makeMotionPalette(cycleFrom(10), 36),
  onlineExam: makeMotionPalette(cycleFrom(11), 34),
  studentIdCard: makeMotionPalette(cycleFrom(12), 36),
  midterm: makeMotionPalette(cycleFrom(13), 32),
  pdfViewer: makeMotionPalette(cycleFrom(14), 30),
  splash: makeMotionPalette(cycleFrom(1), 40),
  profile: makeMotionPalette(cycleFrom(4), 34),
};

export const resolveScreenEnterMotion = (screenMotion, config) => {
  if (!config) {
    return config;
  }
  if (
    !HOME_MATCHED_SCREEN_MOTIONS.has(screenMotion) &&
    !isSequentialEnterMotion(screenMotion)
  ) {
    return config;
  }
  if (config.profile === 'home') {
    return config;
  }
  return {
    ...config,
    profile: 'home',
    duration: config.duration ?? HOME_ENTER_DURATION,
  };
};

export const getScreenCardEntering = (motionName, index = 0) => {
  const palette = SCREEN_PALETTES[motionName] || CARD_ENTERING;
  const config = palette[Math.min(Math.abs(index), MAX_STAGGER)];
  return resolveScreenEnterMotion(motionName, config);
};

export const getScrollRevealEntering = (motionName, index = 0) => {
  const kind = SCROLL_REVEAL_KINDS[Math.abs(index) % SCROLL_REVEAL_KINDS.length];
  const delay = Math.min(Math.abs(index) * 14, 84);
  const base = HOME_MATCHED_SCREEN_MOTIONS.has(motionName)
    ? homeMotion(kind, delay, {duration: 500}, index)
    : motion(kind, delay, {...spinSettle(index), duration: 480});
  return resolveScreenEnterMotion(motionName, base);
};

export const HUB_CARD_ENTERING = [
  homeScreenEnter(2),
  homeScreenEnter(3),
  homeScreenEnter(4),
  homeScreenEnter(5),
  homeScreenEnter(6),
  homeScreenEnter(7),
];

export const getHubCardEntering = (hubIndex = 0) =>
  HUB_CARD_ENTERING[Math.abs(hubIndex) % HUB_CARD_ENTERING.length];

export const SCREEN_HEADER_HOME_ENTERING = homeMotion(MOTION_KINDS.glideUp, 0);
export const NOTIFICATION_TABS_HOME_ENTERING = homeMotion(
  MOTION_KINDS.appear,
  HOME_STAGGER,
);

export const getHomeScreenEnter = (slot = 0) => homeScreenEnter(slot);

const chatHomeDelay = slot =>
  HOME_SCREEN_LEAD + Math.max(0, slot) * HOME_SCREEN_STAGGER;

/** Chat header — subtle drop-in, Home-matched timing. */
export const getChatHeaderEnter = () =>
  motion(MOTION_KINDS.glideUp, chatHomeDelay(0), {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fullOffset: true,
    spinIn: false,
    fromY: -26,
  });

/** Received = from left, sent = from right. */
export const getChatBubbleEnter = (slot = 0, type = 'received') => {
  const sent = type === 'sent';
  return motion(sent ? MOTION_KINDS.glideRight : MOTION_KINDS.glideLeft, chatHomeDelay(slot), {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fullOffset: true,
    spinIn: false,
    fromX: sent ? 44 : -44,
    fromY: 12,
  });
};

export const getChatInputEnter = (slot = 0) =>
  motion(MOTION_KINDS.appear, chatHomeDelay(slot), {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fullOffset: true,
    spinIn: false,
    fromY: 22,
  });

export const getChatSendEnter = (slot = 0) =>
  motion(MOTION_KINDS.glideRight, chatHomeDelay(slot), {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fullOffset: true,
    spinIn: false,
    fromX: 26,
    fromY: 10,
  });

const ATTENDANCE_CARD_KINDS = [
  MOTION_KINDS.appear,
  MOTION_KINDS.glideLeft,
  MOTION_KINDS.glideUp,
  MOTION_KINDS.glideRight,
  MOTION_KINDS.pop,
  MOTION_KINDS.appear,
  MOTION_KINDS.glideLeft,
  MOTION_KINDS.glideRight,
  MOTION_KINDS.glideUp,
  MOTION_KINDS.pop,
  MOTION_KINDS.appear,
  MOTION_KINDS.glideRight,
];

/** Home-matched timing; motion kind varies by slot for visual variety. */
export const getAttendanceCardEnter = (slot = 0) => {
  const kind = ATTENDANCE_CARD_KINDS[Math.abs(slot) % ATTENDANCE_CARD_KINDS.length];
  const delay = HOME_SCREEN_LEAD + Math.abs(slot) * HOME_SCREEN_STAGGER;
  const base = {
    duration: HOME_SCREEN_DURATION,
    profile: 'home',
    fullOffset: true,
    spinIn: false,
  };

  if (kind === MOTION_KINDS.glideLeft) {
    return motion(kind, delay, {...base, fromX: -38, fromY: 14});
  }
  if (kind === MOTION_KINDS.glideRight) {
    return motion(kind, delay, {...base, fromX: 38, fromY: 14});
  }
  if (kind === MOTION_KINDS.glideUp) {
    return motion(kind, delay, {...base, fromY: -22});
  }
  if (kind === MOTION_KINDS.pop) {
    return motion(kind, delay, {...base, fromY: 22});
  }
  return motion(MOTION_KINDS.appear, delay, {...base, fromY: HOME_SCREEN_FROM_Y});
};

export const HOME_GREETING_ENTERING = homeScreenEnter(0);
export const getHomeGreetingEntering = () => HOME_GREETING_ENTERING;

export const STUDENT_HOME_DROPDOWN_ENTERING = homeScreenEnter(1);
export const STUDENT_HOME_SECTION_ENTERING = homeScreenEnter(8);
export const STUDENT_HOME_UPCOMING_ENTERING = homeScreenEnter(9);

export const PARENT_HOME_HEADER_ENTERING = homeScreenEnter(0);
export const PARENT_HOME_DROPDOWN_ENTERING = homeScreenEnter(1);

export const PARENT_HOME_STAT_ATTENDANCE = homeScreenEnter(2);
export const PARENT_HOME_STAT_LIBRARY = homeScreenEnter(3);
export const PARENT_HOME_STAT_EXAMS = homeScreenEnter(4);
export const PARENT_HOME_STAT_ANNOUNCE = homeScreenEnter(5);

export const PARENT_HOME_STAT_ENTERING = [
  PARENT_HOME_STAT_ATTENDANCE,
  PARENT_HOME_STAT_LIBRARY,
  PARENT_HOME_STAT_EXAMS,
  PARENT_HOME_STAT_ANNOUNCE,
];

export const PARENT_HOME_SECTION_ENTERING = homeScreenEnter(6);
export const PARENT_HOME_SCHEDULE_TIMETABLE = homeScreenEnter(7);
export const PARENT_HOME_SCHEDULE_ENGLISH = homeScreenEnter(8);

export const PARENT_HOME_SCHEDULE_ENTERING = [
  PARENT_HOME_SCHEDULE_TIMETABLE,
  PARENT_HOME_SCHEDULE_ENGLISH,
];

export const getParentHomeStatEntering = (slot = 0) =>
  PARENT_HOME_STAT_ENTERING[
    Math.min(Math.abs(slot), PARENT_HOME_STAT_ENTERING.length - 1)
  ];

export const getParentHomeScheduleEntering = (slot = 0) =>
  PARENT_HOME_SCHEDULE_ENTERING[
    Math.min(Math.abs(slot), PARENT_HOME_SCHEDULE_ENTERING.length - 1)
  ];

export const getParentHomeHeaderEntering = () => PARENT_HOME_HEADER_ENTERING;
export const getParentHomeDropdownEntering = () => PARENT_HOME_DROPDOWN_ENTERING;

export const ATTENDANCE_HEADER_ENTERING = homeScreenEnter(0);
export const ATTENDANCE_DROPDOWN_ENTERING = homeScreenEnter(1);
export const ATTENDANCE_TABS_ENTERING = homeScreenEnter(2);
export const ATTENDANCE_STATS_ENTERING = homeScreenEnter(2);
export const ATTENDANCE_STATS_AFTER_TABS_ENTERING = homeMotion(
  MOTION_KINDS.glideLeft,
  HOME_STAGGER * 3,
);
export const ATTENDANCE_DATE_ENTERING = homeMotion(
  MOTION_KINDS.glideRight,
  HOME_STAGGER * 3,
);
export const ATTENDANCE_DATE_AFTER_TABS_ENTERING = homeMotion(
  MOTION_KINDS.glideRight,
  HOME_STAGGER * 4,
);
export const ATTENDANCE_HISTORY_ACTION_ENTERING = homeMotion(
  MOTION_KINDS.appear,
  HOME_STAGGER * 5,
);
export const ATTENDANCE_HISTORY_ACTION_STUDENT_ENTERING = homeMotion(
  MOTION_KINDS.appear,
  HOME_STAGGER * 4,
);
export const ATTENDANCE_HISTORY_HEADER_ENTERING = homeMotion(
  MOTION_KINDS.appear,
  HOME_STAGGER * 5,
);
/** Mirrors Home stat grid + schedule row (52ms steps from first content row). */
const ATTENDANCE_STEP_KINDS = [
  MOTION_KINDS.glideUp,
  MOTION_KINDS.glideLeft,
  MOTION_KINDS.glideUp,
  MOTION_KINDS.glideRight,
  MOTION_KINDS.appear,
  MOTION_KINDS.glideRight,
  MOTION_KINDS.appear,
];

const attendanceContentDelay = (step, isParent) =>
  HOME_STAGGER * 2 +
  (isParent ? HOME_STAGGER : 0) +
  Math.abs(step) * HOME_STAGGER;

export const getAttendanceStepEntering = (step = 0, isParent = false) =>
  homeMotion(
    ATTENDANCE_STEP_KINDS[Math.abs(step) % ATTENDANCE_STEP_KINDS.length],
    attendanceContentDelay(step, isParent),
  );

export const getAttendanceInnerEntering = getAttendanceStepEntering;

export const getAttendanceDateEntering = isParent =>
  getAttendanceStepEntering(5, isParent);

export const getAttendanceHistoryLabelEntering = isParent =>
  homeMotion(
    MOTION_KINDS.appear,
    attendanceContentDelay(6, isParent),
  );

export const getAttendanceHistoryEntering = (index = 0, isParent = false) => {
  const tabOffset = isParent ? HOME_STAGGER : 0;
  if (index === 0) {
    return homeMotion(
      MOTION_KINDS.glideLeft,
      HOME_STAGGER * 7 + tabOffset,
    );
  }
  if (index === 1) {
    return homeMotion(
      MOTION_KINDS.glideUp,
      HOME_STAGGER * 8 + tabOffset,
    );
  }
  return homeMotion(
    HOME_KIND_CYCLE[(index + 2) % HOME_KIND_CYCLE.length],
    HOME_STAGGER * 7 + tabOffset + Math.abs(index) * HOME_STAGGER,
  );
};

export const ROLE_HEADER_ENTERING = homeScreenEnter(0);
export const ROLE_PARENT_CARD_ENTERING = homeScreenEnter(1);
export const ROLE_STUDENT_CARD_ENTERING = homeScreenEnter(2);
export const ROLE_BG_ENTERING = homeScreenEnter(0);
export const ROLE_FOOTER_ENTERING = homeScreenEnter(3);

export const getRoleParentCardEntering = () => ROLE_PARENT_CARD_ENTERING;
export const getRoleStudentCardEntering = () => ROLE_STUDENT_CARD_ENTERING;
export const getRoleBgEntering = () => ROLE_BG_ENTERING;
export const getRoleHeaderEntering = () => ROLE_HEADER_ENTERING;
export const getRoleCardEntering = (index = 0) =>
  index === 0 ? ROLE_PARENT_CARD_ENTERING : ROLE_STUDENT_CARD_ENTERING;
export const getRoleFooterEntering = () => ROLE_FOOTER_ENTERING;

export const REGISTER_HEADER_ENTERING = homeScreenEnter(0);
export const REGISTER_WELCOME_ENTERING = homeScreenEnter(1);
export const REGISTER_HEADING_ENTERING = homeScreenEnter(2);
export const REGISTER_DESC_ENTERING = homeScreenEnter(3);
export const REGISTER_INPUT_1_ENTERING = homeScreenEnter(4);
export const REGISTER_INPUT_2_ENTERING = homeScreenEnter(5);
export const REGISTER_BUTTON_ENTERING = homeScreenEnter(6);
export const REGISTER_FOOTER_ENTERING = homeScreenEnter(7);

export const getRegisterEntering = index => {
  const list = [
    REGISTER_HEADER_ENTERING,
    REGISTER_WELCOME_ENTERING,
    REGISTER_HEADING_ENTERING,
    REGISTER_DESC_ENTERING,
    REGISTER_INPUT_1_ENTERING,
    REGISTER_INPUT_2_ENTERING,
    REGISTER_BUTTON_ENTERING,
    REGISTER_FOOTER_ENTERING,
  ];
  return list[Math.min(Math.abs(index), list.length - 1)];
};

export const ACADEMICS_HEADER_ENTERING = homeScreenEnter(0);
export const ACADEMICS_PROFILE_ENTERING = homeScreenEnter(1);

export const ANNOUNCEMENTS_HEADER_ENTERING = homeScreenEnter(0);
export const ANNOUNCEMENTS_PROFILE_ENTERING = homeScreenEnter(1);

const ACADEMICS_MENU_ORDER = [
  'subjects',
  'assignments',
  'teachers',
  'attendance',
  'timetable',
  'holidays',
  'exams',
  'result',
  'fee',
];

export const getAcademicsMenuEntering = (key, slot) => {
  if (typeof slot === 'number') {
    return homeScreenEnter(slot);
  }
  const orderIndex = ACADEMICS_MENU_ORDER.indexOf(key);
  return homeScreenEnter(orderIndex >= 0 ? orderIndex + 2 : 2);
};

export const ACADEMICS_MENU_MOTION = {
  subjects: {kind: MOTION_KINDS.glideLeft},
  assignments: {kind: MOTION_KINDS.pop},
  teachers: {kind: MOTION_KINDS.glideRight},
  attendance: {kind: MOTION_KINDS.squeeze},
  timetable: {kind: MOTION_KINDS.flipIn},
  holidays: {kind: MOTION_KINDS.bounceUp},
  exams: {kind: MOTION_KINDS.orbitIn},
  result: {kind: MOTION_KINDS.tiltIn},
  fee: {kind: MOTION_KINDS.cascade},
};

export const getAcademicsMenuMotion = key =>
  ACADEMICS_MENU_MOTION[key] || ACADEMICS_MENU_MOTION.subjects;

export {Animated};
