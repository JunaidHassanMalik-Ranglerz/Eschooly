import {Strings} from './Strings';

export const CLASS_TABS = [
  {id: 'live', label: Strings.liveNowTab, showDot: true},
  {id: 'upcoming', label: Strings.upcomingTab},
  {id: 'ended', label: Strings.endedTab},
];

export const LIVE_CLASS = {
  title: 'Algebra — Linear Equations',
  classInfo: 'Class 10A · Mathematics',
  joined: '28 / 32 joined',
  started: 'Started 12 min ago',
};

export const UPCOMING_CLASSES = [
  {
    id: '1',
    title: 'Geometry — Triangles',
    classInfo: 'Class 10A · Mathematics',
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
