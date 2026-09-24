import {Images} from '../Assets';
import {getStudentPortrait, STUDENT_PORTRAITS} from '../Constants/studentImages';

const P = {
  hiraMalik: STUDENT_PORTRAITS.class2Student,
  jalalKhaliq: STUDENT_PORTRAITS.class3Student,
  hamzaSiddiqui: STUDENT_PORTRAITS.class4Student,
  fahadIqbal: STUDENT_PORTRAITS.class5Student,
  mahamNoor: STUDENT_PORTRAITS.class6Student,
  bilalKhaliq: STUDENT_PORTRAITS.class7Student,
  aqsaKhaliq: STUDENT_PORTRAITS.class8Student,
  daniyalSheikh: STUDENT_PORTRAITS.class9Student,
  laibaAhmed: STUDENT_PORTRAITS.class10Student,
  ahmedHassan: require('../Assets/Profile/Students/ahmedHassan.jpg'),
  ayeshaHassan: require('../Assets/Profile/Students/ayeshaHassan.jpg'),
  zainHassan: require('../Assets/Profile/Students/zainHassan.jpg'),
  bilalAhmed: require('../Assets/Profile/Students/bilalAhmed.jpg'),
  muhammadKhaliq: require('../Assets/Profile/People/muhammadKhaliq.jpg'),
  imranKhaliq: require('../Assets/Profile/People/imranKhaliq.jpg'),
  ahmedKhan: require('../Assets/Profile/People/ahmedKhan.jpg'),
  naseemKhan: require('../Assets/Profile/People/naseemKhan.jpg'),
  salmanKhan: require('../Assets/Profile/People/salmanKhan.jpg'),
  imranAli: require('../Assets/Profile/People/imranAli.jpg'),
  hassanRaza: require('../Assets/Profile/People/hassanRaza.jpg'),
  aliAbbas: require('../Assets/Profile/People/aliAbbas.jpg'),
  usmanFarooq: require('../Assets/Profile/People/usmanFarooq.jpg'),
  tariqMehmood: require('../Assets/Profile/People/tariqMehmood.jpg'),
  kamranSiddiqui: Images.profileAvatarNeutral,
  saleem: require('../Assets/Profile/People/saleem.jpg'),
  aliRaza: Images.guardian,
  ayeshaKhan: require('../Assets/Profile/People/ayeshaKhan.jpg'),
  aqsaKhan: require('../Assets/Profile/People/aqsaKhan.jpg'),
  saraMalik: require('../Assets/Profile/People/saraMalik.jpg'),
  fatimaNoor: Images.profileAvatarFemale,
  zainabShah: require('../Assets/Profile/People/zainabShah.jpg'),
  hinaTariq: require('../Assets/Profile/People/hinaTariq.jpg'),
  rabiaAnsari: require('../Assets/Profile/People/rabiaAnsari.jpg'),
  saraAli: require('../Assets/Profile/People/saraAli.jpg'),
  schoolAdmin: require('../Assets/Profile/People/schoolAdmin.jpg'),
};

const STUDENT_IMAGE_BY_ID = {
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

const PERSON_IMAGE_BY_NAME = {
  'hira malik': P.hiraMalik,
  'jalal khaliq': P.jalalKhaliq,
  'hamza siddiqui': P.hamzaSiddiqui,
  'fahad iqbal': P.fahadIqbal,
  'maham noor': P.mahamNoor,
  'bilal khaliq': P.bilalKhaliq,
  'aqsa khaliq': P.aqsaKhaliq,
  'daniyal sheikh': P.daniyalSheikh,
  'laiba ahmed': P.laibaAhmed,
  'ahmed hassan': P.ahmedHassan,
  'ayesha hassan': P.ayeshaHassan,
  'zain hassan': P.zainHassan,
  'bilal ahmed': P.bilalAhmed,
  'muhammad khaliq': P.muhammadKhaliq,
  'imran khaliq': P.imranKhaliq,
  'ahmed khan': P.ahmedKhan,
  'naseem khan': P.naseemKhan,
  'salman khan': P.salmanKhan,
  'imran ali': P.imranAli,
  'ali imran': P.imranAli,
  'hassan raza': P.hassanRaza,
  'ali abbas': P.aliAbbas,
  'usman farooq': P.usmanFarooq,
  'tariq mehmood': P.tariqMehmood,
  'kamran siddiqui': P.kamranSiddiqui,
  'm.saleem': P.saleem,
  saleem: P.saleem,
  'ali raza': P.aliRaza,
  'ayesha khan': P.ayeshaKhan,
  'aqsa khan': P.aqsaKhan,
  'sara malik': P.saraMalik,
  'fatima noor': P.fatimaNoor,
  'zainab shah': P.zainabShah,
  'hina tariq': P.hinaTariq,
  'rabia ansari': P.rabiaAnsari,
  'sara ali': P.saraAli,
  'school admin': P.schoolAdmin,
};

const normalizeName = name =>
  (name || '')
    .trim()
    .toLowerCase()
    .replace(/^(mr\.|ms\.|mrs\.|dr\.|m\.)\s*/i, '');

const isStudentPerson = person => {
  if (person?.classBadge === 'Parent Account') {
    return false;
  }
  const badge = (person?.classBadge || person?.classInfo || '').toLowerCase();
  return (
    Boolean(person?.className) ||
    /class\s*\d/i.test(badge) ||
    /roll/i.test(person?.meta || '')
  );
};

export const getMappedPersonImage = person => {
  if (!person) {
    return null;
  }

  if (person.classBadge === 'Parent Account') {
    return Images.profileParentMale;
  }

  if (isStudentPerson(person) && person.value && STUDENT_IMAGE_BY_ID[person.value]) {
    return STUDENT_IMAGE_BY_ID[person.value];
  }

  const name = normalizeName(person.label || person.name);
  if (name && PERSON_IMAGE_BY_NAME[name]) {
    return PERSON_IMAGE_BY_NAME[name];
  }

  if (isStudentPerson(person)) {
    return getStudentPortrait(person);
  }

  return null;
};
