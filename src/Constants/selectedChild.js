import {getClassGrade} from './dummydata';



/**

 * Central class-to-subjects map for dummy parent UI.

 * Every academic screen should derive subjects from the active child's class.

 */

export const CLASS_SUBJECTS = {

  2: ['English', 'Mathematics', 'Science', 'Art'],

  4: ['English', 'Mathematics', 'Science', 'Art', 'Urdu'],

  7: [

    'Mathematics',

    'Physics',

    'Chemistry',

    'English',

    'Computer',

    'Islamic Studies',

  ],

  9: [

    'Mathematics',

    'Physics',

    'Chemistry',

    'Biology',

    'English',

    'Computer Science',

    'Islamic Studies',

  ],

};



export const getSubjectsForClass = className => {

  const grade = getClassGrade(className);

  if (grade <= 2) {

    return CLASS_SUBJECTS[2];

  }

  if (grade <= 4) {

    return CLASS_SUBJECTS[4];

  }

  if (grade >= 9) {

    return CLASS_SUBJECTS[9];

  }

  return CLASS_SUBJECTS[7];

};



export const buildActiveStudent = child => {

  if (!child) {

    return null;

  }



  const classLabel =

    child.className && child.section

      ? `${child.className} ${child.section}`

      : child.classBadge || '';

  const grade = getClassGrade(child.className);



  return {

    ...child,

    classLabel,

    grade,

    subjects: getSubjectsForClass(child.className),

  };

};


