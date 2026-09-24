import {Strings} from './Strings';

export const CLASS_TABS = [
  {id: 'live', label: Strings.liveNowTab, showDot: true},
  {id: 'upcoming', label: Strings.upcomingTab},
  {id: 'ended', label: Strings.endedTab},
];

export const LIVE_CLASS = {
  title: 'Algebra — Linear Equations',
  classInfo: 'Class 7B · Mathematics',
  joined: '28 / 32 joined',
  started: 'Started 12 min ago',
};

export const UPCOMING_CLASSES = [
  {
    id: '1',
    title: 'Geometry — Triangles',
    classInfo: 'Class 7B · Mathematics',
    month: 'AUG',
    monthBg: '#F0F0F0',
    monthColor: '#071A3D',
    badge: Strings.tomorrow,
    badgeBg: '#F0F0F0',
    badgeColor: '#71717B',
    stripeColor: '#1345A3',
    time: '09:00 AM',
    duration: '60 min',
    zoomLink: 'zoom.us/j/9876543210',
    showFooter: true,
  },
  {
    id: '2',
    title: 'Hindi Grammar',
    classInfo: 'Class 9B · Hindi',
    month: 'AUG',
    monthBg: '#FFF4E5',
    monthColor: '#FF9500',
    badge: Strings.scheduled,
    badgeBg: '#FFF4E5',
    badgeColor: '#FF9500',
    stripeColor: '#FF9500',
    time: '11:00 AM',
    duration: '45 min',
    showFooter: false,
  },
];

export const RECORDING_CLASSES = [
  {
    id: '1',
    title: 'Quadratic Equations',
    detail: 'Aug 12 · 42 min · Recorded',
    status: Strings.endedLabel,
  },
];

const gradeFromClassName = className =>
  Number(String(className || '').match(/\d+/)?.[0] || 7);

const ONLINE_BY_GRADE = {
  2: {
    live: {
      title: 'Phonics — Letter Sounds',
      classInfo: 'Class 2A · English',
      joined: '18 / 22 joined',
      started: 'Started 8 min ago',
    },
    upcoming: [
      {
        id: '1',
        title: 'Counting 1–20',
        classInfo: 'Class 2A · Mathematics',
        month: 'SEP',
        monthBg: '#F0F0F0',
        monthColor: '#071A3D',
        badge: Strings.tomorrow,
        badgeBg: '#F0F0F0',
        badgeColor: '#71717B',
        stripeColor: '#1345A3',
        time: '09:00 AM',
        duration: '40 min',
        showFooter: true,
      },
    ],
    recordings: [
      {
        id: '1',
        title: 'Colours and Shapes',
        detail: 'Sep 10 · 30 min · Recorded',
        status: Strings.endedLabel,
      },
    ],
  },
  4: {
    live: {
      title: 'Paragraph Writing',
      classInfo: 'Class 4A · English',
      joined: '22 / 26 joined',
      started: 'Started 10 min ago',
    },
    upcoming: [
      {
        id: '1',
        title: 'Multiplication Tables',
        classInfo: 'Class 4A · Mathematics',
        month: 'SEP',
        monthBg: '#F0F0F0',
        monthColor: '#071A3D',
        badge: Strings.scheduled,
        badgeBg: '#FFF4E5',
        badgeColor: '#FF9500',
        stripeColor: '#1345A3',
        time: '10:00 AM',
        duration: '45 min',
        showFooter: false,
      },
    ],
    recordings: [
      {
        id: '1',
        title: 'Plants Around Us',
        detail: 'Sep 08 · 38 min · Recorded',
        status: Strings.endedLabel,
      },
    ],
  },
  7: {
    live: {
      title: 'Algebra — Linear Equations',
      classInfo: 'Class 7B · Mathematics',
      joined: '28 / 32 joined',
      started: 'Started 12 min ago',
    },
    upcoming: [
      {
        id: '1',
        title: 'Geometry — Triangles',
        classInfo: 'Class 7B · Mathematics',
        month: 'AUG',
        monthBg: '#F0F0F0',
        monthColor: '#071A3D',
        badge: Strings.tomorrow,
        badgeBg: '#F0F0F0',
        badgeColor: '#71717B',
        stripeColor: '#1345A3',
        time: '09:00 AM',
        duration: '60 min',
        zoomLink: 'zoom.us/j/9876543210',
        showFooter: true,
      },
    ],
    recordings: RECORDING_CLASSES,
  },
  9: {
    live: {
      title: 'Organic Chemistry — Hydrocarbons',
      classInfo: 'Class 9B · Chemistry',
      joined: '26 / 30 joined',
      started: 'Started 15 min ago',
    },
    upcoming: [
      {
        id: '1',
        title: 'Quadratic Equations Revision',
        classInfo: 'Class 9B · Mathematics',
        month: 'SEP',
        monthBg: '#F0F0F0',
        monthColor: '#071A3D',
        badge: Strings.tomorrow,
        badgeBg: '#F0F0F0',
        badgeColor: '#71717B',
        stripeColor: '#1345A3',
        time: '08:30 AM',
        duration: '55 min',
        showFooter: true,
      },
      {
        id: '2',
        title: 'Physics — Motion Laws',
        classInfo: 'Class 9B · Physics',
        month: 'SEP',
        monthBg: '#FFF4E5',
        monthColor: '#FF9500',
        badge: Strings.scheduled,
        badgeBg: '#FFF4E5',
        badgeColor: '#FF9500',
        stripeColor: '#1345A3',
        time: '09:35 AM',
        duration: '50 min',
        showFooter: false,
      },
    ],
    recordings: [
      {
        id: '1',
        title: 'Cell Structure & Function',
        detail: 'Sep 12 · 48 min · Recorded',
        status: Strings.endedLabel,
      },
    ],
  },
};

export const getOnlineClassesForClass = className => {
  const grade = gradeFromClassName(className);
  if (grade <= 2) {
    return ONLINE_BY_GRADE[2];
  }
  if (grade <= 4) {
    return ONLINE_BY_GRADE[4];
  }
  if (grade >= 9) {
    return ONLINE_BY_GRADE[9];
  }
  return ONLINE_BY_GRADE[7];
};
