import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const WAVE_COLOR = 'rgba(32, 126, 210, 0.12)';

/** One signature wave style per screen — use on hero/selected cards only. */
export const SCREEN_WAVES = {
  parentHome: 'doubleLayer',
  parentHomeSchedule: 'scheduleTimetable',
  studentHome: 'studentUpcoming',
  academics: 'academicsHero',
  parentProfile: 'parentIdentity',
  contactDetails: 'contactDetails',
  announcements: 'announcement',
  notifications: 'notification',
  assignment: 'assignment',
  syllabus: 'syllabus',
  attendance: 'attendanceHero',
  fees: 'feeHero',
  transport: 'diagonalFlow',
  results: 'results',
  diary: 'diaryBanner',
  childProfile: 'cornerArc',
  teachers: 'teachers',
  onlineClass: 'onlineClass',
  library: 'library',
};

const RIGHT = (width = '56%') => ({
  top: 0,
  right: 0,
  bottom: 0,
  width,
});

const VARIANTS = {
  // Generic right-side styles
  announcement: {
    style: RIGHT('58%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M68 72 C90 62 104 16 140 8 C160 3 180 2 200 0 L200 72 Z', opacity: 1},
      {d: 'M110 72 C130 50 146 20 172 10 C186 5 194 3 200 1 L200 72 Z', opacity: 0.65},
    ],
  },
  notification: {
    style: RIGHT('54%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M72 72 C94 58 118 22 150 10 C170 4 188 2 200 0 L200 72 Z', opacity: 0.95},
      {d: 'M118 72 C136 54 152 28 178 14 C190 8 196 4 200 2 L200 72 Z', opacity: 0.55},
    ],
  },
  softCurve: {
    style: RIGHT('52%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M82 72 C104 58 120 24 152 10 C172 4 188 2 200 0 L200 72 Z', opacity: 1},
    ],
  },
  doubleLayer: {
    style: RIGHT('60%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M64 72 C88 62 106 20 142 8 C162 2 182 1 200 0 L200 72 Z', opacity: 1},
      {d: 'M108 72 C128 52 144 26 172 12 C186 6 194 3 200 1 L200 72 Z', opacity: 0.58},
    ],
  },
  cornerArc: {
    style: {top: 0, right: 0, width: '48%', height: '78%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M120 0 C160 8 188 28 200 52 L200 0 Z', opacity: 0.9},
      {d: 'M140 72 C168 48 188 28 200 12 L200 72 Z', opacity: 0.55},
    ],
  },
  circularGlow: {
    style: {top: '8%', right: '-6%', width: '52%', height: '84%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M160 36 C160 16 176 4 196 4 C196 24 180 44 160 44 C160 40 160 38 160 36 Z', opacity: 0.85},
      {d: 'M170 36 C170 22 182 12 198 12 C198 26 186 38 170 38 Z', opacity: 0.45},
    ],
  },
  diagonalFlow: {
    style: RIGHT('50%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M90 72 L200 18 L200 72 Z', opacity: 0.75},
      {d: 'M110 72 L200 34 L200 72 Z', opacity: 0.45},
    ],
  },
  abstractWave: {
    style: RIGHT('46%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M100 72 C118 54 132 30 158 16 C178 6 192 2 200 0 L200 72 Z', opacity: 0.8},
      {d: 'M130 72 C148 60 162 42 188 28 L200 72 Z', opacity: 0.4},
    ],
  },
  academicsHero: {
    style: RIGHT('54%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M74 72 C96 64 114 28 146 12 C166 4 184 2 200 0 L200 72 Z', opacity: 0.75},
      {d: 'M112 72 C132 54 148 28 176 14 L200 72 Z', opacity: 0.38},
    ],
  },
  attendanceHero: {
    style: RIGHT('52%'),
    viewBox: '0 0 200 72',
    paths: [{d: 'M86 72 C108 60 124 26 156 12 L200 72 Z', opacity: 0.68}],
  },
  feeHero: {
    style: {top: 0, right: 0, width: '50%', height: '76%'},
    viewBox: '0 0 200 72',
    paths: [{d: 'M126 0 C166 10 190 30 200 54 L200 0 Z', opacity: 0.62}],
  },
  diaryBanner: {
    style: RIGHT('48%'),
    viewBox: '0 0 200 72',
    paths: [{d: 'M94 72 L200 30 L200 72 Z', opacity: 0.55}],
  },
  onlineClass: {
    style: RIGHT('56%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M66 72 C88 62 106 22 140 10 L200 72 Z', opacity: 0.7},
      {d: 'M104 72 L200 26 L200 72 Z', opacity: 0.35},
    ],
  },
  // Home stat cards — each a distinct right-side pattern
  statAttendance: {
    style: RIGHT('54%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M76 72 C98 64 112 26 144 12 C164 5 182 2 200 0 L200 72 Z', opacity: 1},
    ],
  },
  statLibrary: {
    style: {top: 0, right: 0, width: '50%', height: '80%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M128 0 C168 10 192 30 200 56 L200 0 Z', opacity: 0.88},
    ],
  },
  statExams: {
    style: {top: '10%', right: '-4%', width: '48%', height: '80%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M158 36 C158 18 172 6 192 8 C192 28 176 46 158 46 Z', opacity: 0.82},
    ],
  },
  statAnnouncements: {
    style: RIGHT('48%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M96 72 L200 22 L200 72 Z', opacity: 0.72},
      {d: 'M118 72 L200 38 L200 72 Z', opacity: 0.38},
    ],
  },
  // Today schedule rows
  scheduleTimetable: {
    style: {top: 0, right: 0, bottom: 0, width: '46%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M118 72 C140 58 158 28 188 8 L200 0 L200 72 Z', opacity: 0.85},
      {d: 'M138 72 C154 54 168 32 192 18 L200 72 Z', opacity: 0.45},
    ],
  },
  scheduleLesson: {
    style: {top: 0, right: 0, bottom: 0, width: '44%'},
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M128 72 L200 32 L200 72 Z', opacity: 0.72},
    ],
  },
  // Student hub cards
  studentHub1: {style: RIGHT('52%'), viewBox: '0 0 200 72', paths: [{d: 'M80 72 C102 64 118 28 148 12 C168 4 186 2 200 0 L200 72 Z', opacity: 0.85}]},
  studentHub2: {style: RIGHT('48%'), viewBox: '0 0 200 72', paths: [{d: 'M96 72 L200 24 L200 72 Z', opacity: 0.72}]},
  studentHub3: {style: {top: 0, right: 0, width: '46%', height: '75%'}, viewBox: '0 0 200 72', paths: [{d: 'M132 0 C172 12 194 32 200 58 L200 0 Z', opacity: 0.8}]},
  studentHub4: {style: RIGHT('54%'), viewBox: '0 0 200 72', paths: [{d: 'M108 72 C128 52 146 24 172 10 L200 72 Z', opacity: 0.65}]},
  studentHub5: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M100 72 C120 58 138 32 164 16 L200 72 Z', opacity: 0.7}]},
  studentHub6: {style: {top: '8%', right: '-5%', width: '50%', height: '82%'}, viewBox: '0 0 200 72', paths: [{d: 'M162 36 C162 18 176 6 196 8 C196 28 180 44 162 44 Z', opacity: 0.75}]},
  studentUpcoming: {
    style: RIGHT('55%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M70 72 C92 62 108 20 140 8 C160 2 180 1 200 0 L200 72 Z', opacity: 0.55},
    ],
  },
  // Academics menu — unique per row
  menuSubjects: {style: RIGHT('56%'), viewBox: '0 0 200 72', paths: [{d: 'M68 72 C90 62 104 16 140 8 C160 3 180 2 200 0 L200 72 Z', opacity: 0.7}, {d: 'M110 72 C130 50 146 20 172 10 L200 72 Z', opacity: 0.4}]},
  menuAssignments: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M94 72 L200 26 L200 72 Z', opacity: 0.68}]},
  menuTeachers: {style: RIGHT('58%'), viewBox: '0 0 200 72', paths: [{d: 'M72 72 C94 58 118 22 150 10 L200 72 Z', opacity: 0.65}, {d: 'M118 72 C136 54 152 28 178 14 L200 72 Z', opacity: 0.35}]},
  menuAttendance: {style: {top: 0, right: 0, width: '46%', height: '72%'}, viewBox: '0 0 200 72', paths: [{d: 'M124 0 C164 10 188 28 200 52 L200 0 Z', opacity: 0.62}]},
  menuTimetable: {style: RIGHT('52%'), viewBox: '0 0 200 72', paths: [{d: 'M88 72 C110 58 126 24 158 10 L200 72 Z', opacity: 0.66}]},
  menuHolidays: {style: RIGHT('48%'), viewBox: '0 0 200 72', paths: [{d: 'M102 72 C122 56 140 30 166 14 L200 72 Z', opacity: 0.58}]},
  menuExams: {style: {top: '6%', right: '-4%', width: '48%', height: '88%'}, viewBox: '0 0 200 72', paths: [{d: 'M156 36 C156 16 172 4 192 6 C192 26 176 44 156 44 Z', opacity: 0.6}]},
  menuResult: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M98 72 L200 30 L200 72 Z', opacity: 0.64}]},
  menuFee: {style: RIGHT('54%'), viewBox: '0 0 200 72', paths: [{d: 'M80 72 C102 64 118 28 148 12 L200 72 Z', opacity: 0.6}]},
  // Profile / parent account
  parentIdentity: {
    style: RIGHT('58%'),
    viewBox: '0 0 200 72',
    paths: [
      {d: 'M60 72 C82 66 100 24 136 10 C158 3 178 1 200 0 L200 72 Z', opacity: 0.45},
    ],
  },
  contactDetails: {
    style: RIGHT('52%'),
    viewBox: '0 0 200 72',
    paths: [{d: 'M92 72 L200 32 L200 72 Z', opacity: 0.5}],
  },
  actionMoreInfo: {style: RIGHT('48%'), viewBox: '0 0 200 72', paths: [{d: 'M100 72 C120 58 138 32 164 16 L200 72 Z', opacity: 0.48}]},
  actionPassword: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M96 72 L200 28 L200 72 Z', opacity: 0.45}]},
  actionLogout: {style: {top: 0, right: 0, width: '44%', height: '70%'}, viewBox: '0 0 200 72', paths: [{d: 'M130 0 C170 8 192 26 200 48 L200 0 Z', opacity: 0.42}]},
  // Screen aliases (all right-side)
  syllabus: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M80 72 C102 64 118 28 148 12 L200 72 Z', opacity: 0.65}]},
  assignment: {style: RIGHT('52%'), viewBox: '0 0 200 72', paths: [{d: 'M88 72 C110 58 126 24 158 10 L200 72 Z', opacity: 0.62}]},
  teachers: {style: RIGHT('48%'), viewBox: '0 0 200 72', paths: [{d: 'M96 72 L200 34 L200 72 Z', opacity: 0.58}]},
  attendance: {style: RIGHT('62%'), viewBox: '0 0 200 72', paths: [{d: 'M60 72 C82 66 100 24 136 10 L200 72 Z', opacity: 0.65}]},
  fees: {style: RIGHT('58%'), viewBox: '0 0 200 72', paths: [{d: 'M72 72 C94 58 118 22 150 10 L200 72 Z', opacity: 0.6}]},
  transport: {style: RIGHT('54%'), viewBox: '0 0 200 72', paths: [{d: 'M76 72 C98 64 112 26 144 12 L200 72 Z', opacity: 0.58}]},
  results: {style: RIGHT('48%'), viewBox: '0 0 200 72', paths: [{d: 'M98 72 L200 36 L200 72 Z', opacity: 0.55}]},
  library: {style: RIGHT('56%'), viewBox: '0 0 200 72', paths: [{d: 'M64 72 C88 62 106 20 142 8 L200 72 Z', opacity: 0.58}]},
  profile: {style: RIGHT('50%'), viewBox: '0 0 200 72', paths: [{d: 'M90 72 C112 58 128 26 160 12 L200 72 Z', opacity: 0.45}]},
  // Legacy aliases
  home: {style: RIGHT('54%'), viewBox: '0 0 200 72', paths: [{d: 'M76 72 C98 64 112 26 144 12 L200 72 Z', opacity: 1}]},
  timetable: {style: RIGHT('52%'), viewBox: '0 0 200 72', paths: [{d: 'M88 72 C110 58 126 24 158 10 L200 72 Z', opacity: 0.9}]},
};

export const MENU_WAVE_BY_KEY = {
  subjects: 'menuSubjects',
  assignments: 'menuAssignments',
  teachers: 'menuTeachers',
  attendance: 'menuAttendance',
  timetable: 'menuTimetable',
  holidays: 'menuHolidays',
  exams: 'menuExams',
  result: 'menuResult',
  fee: 'menuFee',
};

export const STUDENT_HUB_WAVES = [
  'studentHub1',
  'studentHub2',
  'studentHub3',
  'studentHub4',
  'studentHub5',
  'studentHub6',
];

const CardWave = ({variant = 'announcement', color = WAVE_COLOR, style}) => {
  const config = VARIANTS[variant] || VARIANTS.softCurve;

  return (
    <View style={[styles.wrap, config.style, style]} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox={config.viewBox}
        preserveAspectRatio="none">
        {config.paths.map((path, index) => (
          <Path key={index} d={path.d} fill={color} opacity={path.opacity} />
        ))}
      </Svg>
    </View>
  );
};

export default CardWave;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 0,
  },
});
