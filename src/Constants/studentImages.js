import {getClassGrade} from './dummydata';

/** Local single-student portraits — one student per image, school uniform. */
export const STUDENT_PORTRAITS = {
  class2Student: require('../Assets/Profile/Students/class2Student.jpg'),
  class3Student: require('../Assets/Profile/Students/class3Student.jpg'),
  class4Student: require('../Assets/Profile/Students/class4Student.jpg'),
  class5Student: require('../Assets/Profile/Students/class5Student.jpg'),
  class6Student: require('../Assets/Profile/Students/class6Student.jpg'),
  class7Student: require('../Assets/Profile/Students/class7Student.jpg'),
  class8Student: require('../Assets/Profile/Students/class8Student.jpg'),
  class9Student: require('../Assets/Profile/Students/class9Student.jpg'),
  class10Student: require('../Assets/Profile/Students/class10Student.jpg'),
  hiraMalik: require('../Assets/Profile/Students/hiraMalik.jpg'),
  jalalKhaliq: require('../Assets/Profile/Students/jalalKhaliq.jpg'),
  hamzaSiddiqui: require('../Assets/Profile/Students/hamzaSiddiqui.jpg'),
  fahadIqbal: require('../Assets/Profile/Students/fahadIqbal.jpg'),
  mahamNoor: require('../Assets/Profile/Students/mahamNoor.jpg'),
  bilalKhaliq: require('../Assets/Profile/Students/bilalKhaliq.jpg'),
  aqsaKhaliq: require('../Assets/Profile/Students/aqsaKhaliq.jpg'),
  daniyalSheikh: require('../Assets/Profile/Students/daniyalSheikh.jpg'),
  laibaAhmed: require('../Assets/Profile/Students/laibaAhmed.jpg'),
};

const PORTRAIT_BY_STUDENT_ID = {
  '1': STUDENT_PORTRAITS.class7Student,
  '2': STUDENT_PORTRAITS.class3Student,
  '3': STUDENT_PORTRAITS.class8Student,
  '4': STUDENT_PORTRAITS.class4Student,
  '5': STUDENT_PORTRAITS.class10Student,
  '6': STUDENT_PORTRAITS.class2Student,
  '7': STUDENT_PORTRAITS.class5Student,
  '8': STUDENT_PORTRAITS.class6Student,
  '9': STUDENT_PORTRAITS.class9Student,
};

const PORTRAIT_BY_NAME = {
  'hira malik': STUDENT_PORTRAITS.class2Student,
  'jalal khaliq': STUDENT_PORTRAITS.class3Student,
  'hamza siddiqui': STUDENT_PORTRAITS.class4Student,
  'fahad iqbal': STUDENT_PORTRAITS.class5Student,
  'maham noor': STUDENT_PORTRAITS.class6Student,
  'bilal khaliq': STUDENT_PORTRAITS.class7Student,
  'aqsa khaliq': STUDENT_PORTRAITS.class8Student,
  'daniyal sheikh': STUDENT_PORTRAITS.class9Student,
  'laiba ahmed': STUDENT_PORTRAITS.class10Student,
};

const PORTRAIT_BY_GRADE = {
  2: STUDENT_PORTRAITS.class2Student,
  3: STUDENT_PORTRAITS.class3Student,
  4: STUDENT_PORTRAITS.class4Student,
  5: STUDENT_PORTRAITS.class5Student,
  6: STUDENT_PORTRAITS.class6Student,
  7: STUDENT_PORTRAITS.class7Student,
  8: STUDENT_PORTRAITS.class8Student,
  9: STUDENT_PORTRAITS.class9Student,
  10: STUDENT_PORTRAITS.class10Student,
};

const normalizeName = name =>
  (name || '')
    .trim()
    .toLowerCase()
    .replace(/^(mr\.|ms\.|mrs\.|dr\.|m\.)\s*/i, '');

/** Age-appropriate portrait when id/name lookup is missing. */
export const getStudentPortraitByGrade = className => {
  const grade = getClassGrade(className);
  return PORTRAIT_BY_GRADE[grade] || STUDENT_PORTRAITS.class7Student;
};

export const getStudentPortrait = person => {
  if (!person) {
    return null;
  }

  if (person.value && PORTRAIT_BY_STUDENT_ID[person.value]) {
    return PORTRAIT_BY_STUDENT_ID[person.value];
  }

  const name = normalizeName(person.label || person.name);
  if (name && PORTRAIT_BY_NAME[name]) {
    return PORTRAIT_BY_NAME[name];
  }

  const className = person.className || person.classBadge || person.classInfo;
  return getStudentPortraitByGrade(className);
};
