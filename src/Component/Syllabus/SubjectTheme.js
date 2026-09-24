import {Colors} from '../../Constants/Colors';
import {PROFILE_GRADIENT} from '../Profile/ProfileTheme';

const BLUE_THEMES = {
  Mathematics: {
    gradient: ['#071A3D', '#12325A', '#1E40AF'],
    icon: 'calculator-outline',
    iconColor: '#93C5FD',
  },
  Physics: {
    gradient: ['#0A2F5C', '#0D5CA8', '#2563EB'],
    icon: 'flash-outline',
    iconColor: '#7DD3FC',
  },
  Chemistry: {
    gradient: ['#062653', '#07346B', '#1345A3'],
    icon: 'flask-outline',
    iconColor: '#BFDBFE',
  },
  Biology: {
    gradient: ['#0C4A6E', '#0369A1', '#0284C7'],
    icon: 'leaf-outline',
    iconColor: '#BAE6FD',
  },
  English: {
    gradient: ['#1E3A8A', '#1D4ED8', '#3B82F6'],
    icon: 'book-outline',
    iconColor: '#DBEAFE',
  },
  Urdu: {
    gradient: ['#172554', '#1E3A8A', '#2563EB'],
    icon: 'language-outline',
    iconColor: '#C7D2FE',
  },
  Islamiat: {
    gradient: ['#0F172A', '#1E3A8A', '#1D4ED8'],
    icon: 'moon-outline',
    iconColor: '#A5B4FC',
  },
  'Computer Science': {
    gradient: ['#12325A', '#1345A3', '#0D5CA8'],
    icon: 'laptop-outline',
    iconColor: '#60A5FA',
  },
};

export const getSubjectTheme = label =>
  BLUE_THEMES[label] || {
    gradient: PROFILE_GRADIENT,
    icon: 'book-outline',
    iconColor: Colors.iconSky,
  };

/** Same multi-stop blues used on Syllabus chapter / filter cards. */
export const SYLLABUS_BOX_GRADIENTS = Object.values(BLUE_THEMES).map(
  theme => theme.gradient,
);

export const getSyllabusBoxGradient = (index = 0) =>
  SYLLABUS_BOX_GRADIENTS[Math.abs(index) % SYLLABUS_BOX_GRADIENTS.length];

/** Same face as Holidays row on Academics menu (student list index 5). */
export const ACADEMICS_MENU_GRADIENT = getSyllabusBoxGradient(6);

export const SUBJECT_ICON_THEMES = {
  Chemistry: {icon: 'flask-outline', color: '#6366F1'},
  Biology: {icon: 'leaf-outline', color: '#0EA5E9'},
  English: {icon: 'book-outline', color: '#2563EB'},
  Mathematics: {icon: 'calculator-outline', color: '#38BDF8'},
  Science: {icon: 'planet-outline', color: '#60A5FA'},
  Urdu: {icon: 'language-outline', color: '#818CF8'},
  Computer: {icon: 'laptop-outline', color: '#3B82F6'},
  Islamiat: {icon: 'moon-outline', color: '#6366F1'},
};

export const getSubjectIconTheme = subject =>
  SUBJECT_ICON_THEMES[subject] || {
    icon: 'book-outline',
    color: Colors.iconSky,
  };

/** Timetable slot colors — Mathematics/Science aligned with English/Computer. */
export const getTimetableSubjectGradient = (subject, fallbackIndex = 0) => {
  if (subject === 'Mathematics') {
    return BLUE_THEMES.English.gradient;
  }
  if (subject === 'Science') {
    return BLUE_THEMES['Computer Science'].gradient;
  }
  const key = subject === 'Computer' ? 'Computer Science' : subject;
  if (BLUE_THEMES[key]) {
    return BLUE_THEMES[key].gradient;
  }
  return getSyllabusBoxGradient(fallbackIndex);
};
