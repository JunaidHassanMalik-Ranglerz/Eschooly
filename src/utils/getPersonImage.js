import {Images} from '../Assets';
import {getStudentPortrait} from '../Constants/studentImages';
import {getMappedPersonImage} from './personImageMap';

const normalizeGender = gender => {
  const value = (gender || '').toString().trim().toLowerCase();
  if (value === 'male' || value === 'm') {
    return 'male';
  }
  if (value === 'female' || value === 'f') {
    return 'female';
  }
  return 'neutral';
};

export const inferGenderFromName = name => {
  const value = (name || '').trim().toLowerCase();
  if (/^(mr|dr)\./.test(value)) {
    return 'male';
  }
  if (/^(ms|mrs)\./.test(value)) {
    return 'female';
  }
  return 'neutral';
};

export const getPersonImageSource = person => {
  if (!person) {
    return Images.threeDots;
  }

  if (person.photoUrl) {
    return typeof person.photoUrl === 'number'
      ? person.photoUrl
      : {uri: person.photoUrl};
  }

  if (person.photo) {
    return person.photo;
  }

  const mapped = getMappedPersonImage(person);
  if (mapped) {
    return mapped;
  }

  if (person.className || /class\s*\d/i.test(person.classBadge || person.classInfo || '')) {
    const studentPhoto = getStudentPortrait(person);
    if (studentPhoto) {
      return studentPhoto;
    }
  }

  let gender = normalizeGender(person.gender);
  if (gender === 'neutral') {
    gender = inferGenderFromName(person.label || person.name);
  }
  const isParentProfile = person.classBadge === 'Parent Account';

  if (isParentProfile && gender === 'male') {
    return Images.profileParentMale;
  }
  if (gender === 'male') {
    return Images.profileAvatarMale;
  }
  if (gender === 'female') {
    return Images.profileAvatarFemale;
  }

  return Images.threeDots;
};
