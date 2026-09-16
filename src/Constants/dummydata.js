import {Images} from '../Assets';
import {Strings} from './Strings';

export const LOGGED_IN_STUDENT = {
  value: '1',
  label: 'Bilal Khaliq',
  initials: 'BKH',
  className: 'Class 7',
  section: 'B',
  classBadge: 'Class 7 - B',
  studentId: 'SCH-2025-0412',
  guardian: 'Imran Khaliq',
  dob: '12 March 2014',
  classInfo: 'Class 7 · Section B',
};

export const PARENT_DATA = {
  label: 'Bilal Khaliq',
  initials: 'BKH',
  classBadge: 'Parent Account',
  cnic: '35202-1234567-1',
  fatherName: 'Muhammad Khaliq',
  gender: 'Male',
  dateOfIssue: '12 Apr 2024',
  validUntil: '31 Mar 2027',
  email: 'bilal.khaliq@email.com',
  phone: '+92 300 1234567',
  address: 'House 12, Street 5, Islamabad',
};


export const STUDENT_LIST = [
  {
    value: '1',
    label: 'Bilal Khaliq',
    initials: 'AR',
    className: 'Class 7',
    section: 'B',
    classBadge: 'Class 7 - B',
    studentId: 'SCH-2025-0412',
    guardian: 'Imran Khaliq',
    dob: '12 March 2014',
  },
  {
    value: '2',
    label: 'Jalal Khaliq',
    initials: 'JK',
    className: 'Class 3',
    section: 'A',
    classBadge: 'Class 3 - A',
    studentId: 'SCH-2025-0187',
    guardian: 'Imran Khaliq',
    dob: '5 June 2016',
    classInfo: 'Class 3 · Section A',
  },
  {
    value: '3',
    label: 'Aqsa Khaliq',
    initials: 'AK',
    className: 'Class 8',
    section: 'C',
    classBadge: 'Class 8 - C',
    studentId: 'SCH-2025-0299',
    guardian: 'Imran Khaliq',
    dob: '10 Jan 2013',
    classInfo: 'Class 8 · Section C',
  },
];

export const MENU_LIST = [
  {
    value: 'subjects',
    label: Strings.subjects,
    icon: Images.reportSurvey,
    screen: 'Syllabus',
  },
  {
    value: 'assignments',
    label: Strings.assignment,
    icon: Images.lecture,
    screen: 'Assignment',
  },
  {
    value: 'teachers',
    label: Strings.teachers,
    icon: Images.multiplePerson,
    screen: 'Teachers',
    tab: true,
    parentScreen: 'ParentTeachers',
  },
  {
    value: 'attendance',
    label: Strings.attendance,
    icon: Images.calendarClock,
    screen: 'Attends',
    tab: true,
    parentScreen: 'ParentAttendance',
  },
  {
    value: 'timetable',
    label: Strings.timetable,
    icon: Images.clock,
    screen: 'Timetable',
  },
  {
    value: 'holidays',
    label: Strings.holidays,
    icon: Images.calendar,
    screen: 'Holidays',
  },
  {
    value: 'exams',
    label: Strings.exams,
    icon: Images.exams,
    screen: 'Exam',
    tab: true,
    parentScreen: 'ExamSchedule',
  },
  {
    value: 'result',
    label: Strings.result,
    icon: Images.reportCard,
    screen: 'StudentResults',
    parentScreen: 'ParentResults',
  },
  {
    value: 'fee',
    label: Strings.fee,
    icon: Images.tuitionFee,
    screen: 'Fee',
  },
];

export const HOLIDAY_LIST = [
  {
    id: '1',
    title: 'Independence Day',
    date: 'Fri, 14 Aug 2026',
    type: 'National',
    duration: '1 day',
  },
  {
    id: '2',
    title: 'Eid-ul-Fitr',
    date: 'Thu, 20 Mar 2026',
    type: 'Religious',
    duration: '3 days',
  },
  {
    id: '3',
    title: 'Summer Break',
    date: '01 Jun - 15 Jul 2026',
    type: 'School',
    duration: '6 weeks',
  },
  {
    id: '4',
    title: 'Quaid-e-Azam Day',
    date: 'Fri, 25 Dec 2026',
    type: 'National',
    duration: '1 day',
  },
];

export const PARENT_PROFILE_MENU_LIST = [
  {
    value: 'myProfile',
    label: Strings.myProfile,
    icon: Images.profile,
    screen: 'MyProfile',
  },
  {
    value: 'menu',
    label: Strings.menu,
    icon: Images.lecture,
    screen: 'Menu',
  },
];

export const PROFILE_MENU_LIST = [
  {
    value: 'myProfile',
    label: Strings.myProfile,
    icon: Images.profile,
    screen: 'MyProfile',
  },
  {
    value: 'mySyllabus',
    label: Strings.mySyllabus,
    icon: Images.reportSurvey,
    screen: 'Syllabus',
  },
  {
    value: 'onlineExams',
    label: Strings.onlineExams,
    icon: Images.exams,
    screen: 'OnlineExam',
  },
  {
    value: 'onlineClasses',
    label: Strings.onlineClasses,
    icon: Images.onlineClass,
    screen: 'OnlineClass',
  },
  {
    value: 'digitalLibrary',
    label: Strings.digitalLibrary,
    icon: Images.library,
    screen: 'DigitalLibrary',
  },
  {
    value: 'studentIdCard',
    label: Strings.studentIdCard,
    icon: Images.idCard,
    screen: 'StudentIdCard',
  },
  {
    value: 'reportCardReady',
    label: Strings.reportCardReady,
    icon: Images.reportCard,
    screen: null,
  },
  {
    value: 'menu',
    label: Strings.menu,
    icon: Images.lecture,
    screen: 'Menu',
  },
];

export const STUDENT_DUES_FEES = [
  {
    id: '1',
    title: 'Tuition Fee',
    month: 'November 2025',
    amount: 'AFN. 50',
    status: 'Overdue',
    icon: Images.tuitionFee,
  },
  {
    id: '2',
    title: 'Transport Fee',
    month: 'November 2025',
    amount: 'AFN. 30',
    status: 'Pending',
    icon: Images.transport,
  },
  {
    id: '3',
    title: 'Lab Fee',
    month: 'October 2025',
    amount: 'AFN. 20',
    status: 'Pending',
    icon: Images.lab,
  },
];

export const STUDENT_DUES = {
  initials: 'AR',
  label: 'Bilal Khaliq',
  classInfo: 'Class 5 - B • Roll 12',
  totalAmount: 'AFN.100',
};

export const FEED_DATA = [
  {
    id: 1,
    type: 'diary',
    name: 'Ahmed Hassan',
    initials: 'AH',
    time: '2h ago',
    message:
      'Math homework assigned for tomorrow. Please check the diary.',
  },
  {
    id: 2,
    type: 'diary',
    name: 'Bilal Ahmed',
    initials: 'BA',
    time: '1d ago',
    message:
      'Science quiz results have been uploaded. Great performance this.',
  },
  {
    id: 3,
    type: 'announcement',
    title: 'Annual Sports Day',
    author: 'By School Admin',
    message:
      'All students are requested to participate in the annual sports day events.Registration closes soon.',
    dateRange: 'Dec 15 - Dec 18, 2024',
  },

  {
    id: 4,
    type: 'announcement',
    title: 'Parent-Teacher Meeting',
    author: 'By School Admin',
    message:
      'Parent-Teacher meeting scheduled for all classes. Please confirm your attendance through the portal.',
    dateRange: 'Dec 20, 2024',
  },
];

export const SYLLABUS_CLASS_NAME = 'Class 10A';

export const SYLLABUS_LIST = [
  {
    value: '1',
    label: 'Mathematics',
    progress: 0.68,
    percentText: '68%',
    completedTopics: 33,
    totalTopics: 48,
    chapters: [
      {
        id: '1',
        number: '01',
        title: 'Chapter 1 — Algebra',
        meta: '8 topics · 12 hours',
        progress: 0.87,
        percentText: '87%',
        topics: [
          {id: '1-1', title: 'Linear Equations', duration: '2h', status: 'completed'},
          {id: '1-2', title: 'Quadratic Equations', duration: '2h', status: 'completed'},
          {id: '1-3', title: 'Polynomials', duration: '1.5h', status: 'in_progress'},
          {id: '1-4', title: 'Factorisation', duration: '1.5h', status: 'pending'},
          {id: '1-5', title: 'Algebraic Identities', duration: '1.5h', status: 'pending'},
          {id: '1-6', title: 'Linear Inequalities', duration: '1.5h', status: 'pending'},
          {id: '1-7', title: 'Word Problems', duration: '1h', status: 'pending'},
          {id: '1-8', title: 'Revision', duration: '1h', status: 'pending'},
        ],
      },
      {
        id: '2',
        number: '02',
        title: 'Chapter 2 — Geometry',
        meta: '10 topics · 14 hours',
        progress: 0.6,
        percentText: '60%',
        topics: [
          {id: '2-1', title: 'Lines & Angles', duration: '2h', status: 'completed'},
          {id: '2-2', title: 'Triangles', duration: '2h', status: 'completed'},
          {id: '2-3', title: 'Congruence of Triangles', duration: '1.5h', status: 'completed'},
          {id: '2-4', title: 'Quadrilaterals', duration: '1.5h', status: 'in_progress'},
          {id: '2-5', title: 'Circles', duration: '1.5h', status: 'in_progress'},
          {id: '2-6', title: 'Polygons', duration: '1h', status: 'pending'},
          {id: '2-7', title: 'Constructions', duration: '1.5h', status: 'pending'},
          {id: '2-8', title: 'Area of Plane Figures', duration: '1.5h', status: 'pending'},
          {id: '2-9', title: 'Coordinate Geometry', duration: '1h', status: 'pending'},
          {id: '2-10', title: 'Practical Geometry', duration: '1h', status: 'pending'},
        ],
      },
      {
        id: '3',
        number: '03',
        title: 'Chapter 3 — Trigonometry',
        meta: '7 topics · 10 hours',
        progress: 0.45,
        percentText: '45%',
        topics: [
          {id: '3-1', title: 'Trigonometric Ratios', duration: '2h', status: 'completed'},
          {id: '3-2', title: 'Trigonometric Identities', duration: '1.5h', status: 'completed'},
          {id: '3-3', title: 'Complementary Angles', duration: '1.5h', status: 'in_progress'},
          {id: '3-4', title: 'Heights and Distances', duration: '1.5h', status: 'pending'},
          {id: '3-5', title: 'Trigonometric Tables', duration: '1h', status: 'pending'},
          {id: '3-6', title: 'Word Problems', duration: '1.5h', status: 'pending'},
          {id: '3-7', title: 'Revision Exercise', duration: '1h', status: 'pending'},
        ],
      },
      {
        id: '4',
        number: '04',
        title: 'Chapter 4 — Statistics',
        meta: '9 topics · 11 hours',
        progress: 0.2,
        percentText: '20%',
        topics: [
          {id: '4-1', title: 'Collection of Data', duration: '1h', status: 'completed'},
          {id: '4-2', title: 'Frequency Tables', duration: '1.5h', status: 'in_progress'},
          {id: '4-3', title: 'Mean & Median', duration: '1.5h', status: 'pending'},
          {id: '4-4', title: 'Mode', duration: '1h', status: 'pending'},
          {id: '4-5', title: 'Bar Graphs', duration: '1.5h', status: 'pending'},
          {id: '4-6', title: 'Pie Charts', duration: '1h', status: 'pending'},
          {id: '4-7', title: 'Range', duration: '1h', status: 'pending'},
          {id: '4-8', title: 'Class Interval', duration: '1.5h', status: 'pending'},
          {id: '4-9', title: 'Practice Problems', duration: '1h', status: 'pending'},
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Physics',
    progress: 0.52,
    percentText: '52%',
    completedTopics: 18,
    totalTopics: 35,
    chapters: [
      {
        id: '1',
        number: '01',
        title: 'Chapter 1 — Motion',
        meta: '6 topics · 10 hours',
        progress: 0.75,
        percentText: '75%',
        topics: [
          {id: '1-1', title: 'Distance and Displacement', duration: '1.5h', status: 'completed'},
          {id: '1-2', title: 'Speed and Velocity', duration: '2h', status: 'completed'},
          {id: '1-3', title: 'Acceleration', duration: '1.5h', status: 'completed'},
          {id: '1-4', title: 'Equations of Motion', duration: '2h', status: 'in_progress'},
          {id: '1-5', title: 'Graphs of Motion', duration: '1.5h', status: 'pending'},
          {id: '1-6', title: 'Numerical Practice', duration: '1.5h', status: 'pending'},
        ],
      },
      {
        id: '2',
        number: '02',
        title: 'Chapter 2 — Force & Laws',
        meta: '8 topics · 12 hours',
        progress: 0.4,
        percentText: '40%',
        topics: [
          {id: '2-1', title: 'Types of Forces', duration: '1.5h', status: 'completed'},
          {id: '2-2', title: "Newton's First Law", duration: '1.5h', status: 'completed'},
          {id: '2-3', title: "Newton's Second Law", duration: '2h', status: 'in_progress'},
          {id: '2-4', title: "Newton's Third Law", duration: '1.5h', status: 'pending'},
          {id: '2-5', title: 'Mass and Weight', duration: '1.5h', status: 'pending'},
          {id: '2-6', title: 'Friction', duration: '1.5h', status: 'pending'},
          {id: '2-7', title: 'Momentum', duration: '1.5h', status: 'pending'},
          {id: '2-8', title: 'Numerical Practice', duration: '1h', status: 'pending'},
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Chemistry',
    progress: 0.41,
    percentText: '41%',
    completedTopics: 12,
    totalTopics: 30,
    chapters: [
      {
        id: '1',
        number: '01',
        title: 'Chapter 1 — Chemical Reactions',
        meta: '5 topics · 8 hours',
        progress: 0.55,
        percentText: '55%',
        topics: [
          {id: '1-1', title: 'Introduction to Reactions', duration: '1.5h', status: 'completed'},
          {id: '1-2', title: 'Types of Chemical Reactions', duration: '2h', status: 'completed'},
          {id: '1-3', title: 'Balancing Chemical Equations', duration: '2h', status: 'in_progress'},
          {id: '1-4', title: 'Signs of a Chemical Change', duration: '1.5h', status: 'pending'},
          {id: '1-5', title: 'Everyday Chemical Reactions', duration: '1h', status: 'pending'},
        ],
      },
    ],
  },
  {
    value: '4',
    label: 'English',
    progress: 0.63,
    percentText: '63%',
    completedTopics: 20,
    totalTopics: 32,
    chapters: [
      {
        id: '1',
        number: '01',
        title: 'Chapter 1 — Prose',
        meta: '4 topics · 6 hours',
        progress: 0.8,
        percentText: '80%',
        topics: [
          {id: '1-1', title: 'The Selfish Giant', duration: '1.5h', status: 'completed'},
          {id: '1-2', title: 'Comprehension Questions', duration: '1.5h', status: 'completed'},
          {id: '1-3', title: 'Vocabulary & Meanings', duration: '1.5h', status: 'completed'},
          {id: '1-4', title: 'Character Sketch', duration: '1.5h', status: 'in_progress'},
        ],
      },
    ],
  },
];

const syllabusSubject = (value, label, progress, completedTopics, totalTopics, chapters) => ({
  value,
  label,
  progress,
  percentText: `${Math.round(progress * 100)}%`,
  completedTopics,
  totalTopics,
  chapters,
});

const syllabusChapter = (id, number, title, meta, progress, topics = []) => ({
  id,
  number,
  title,
  meta,
  progress,
  percentText: `${Math.round(progress * 100)}%`,
  topics,
});

const SYLLABUS_CLASS_2 = [
  syllabusSubject('1', 'English', 0.72, 9, 12, [
    syllabusChapter('1', '01', 'Chapter 1 — Phonics', '4 topics · 6 hours', 0.85, [
      {id: '1-1', title: 'Letter Sounds A to M', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Letter Sounds N to Z', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Three-Letter Words', duration: '1.5h', status: 'completed'},
      {id: '1-4', title: 'Reading Practice', duration: '1.5h', status: 'in_progress'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Stories', '3 topics · 5 hours', 0.5, [
      {id: '2-1', title: 'The Thirsty Crow', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'The Lion and the Mouse', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Story Questions', duration: '2h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('2', 'Urdu', 0.64, 8, 12, [
    syllabusChapter('1', '01', 'Chapter 1 — Alphabets', '4 topics · 6 hours', 0.7, [
      {id: '1-1', title: 'Haroof-e-Tahajji', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Joining Letters', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Simple Words', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Reading Drill', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Words', '3 topics · 5 hours', 0.45, [
      {id: '2-1', title: 'Everyday Words', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Two-Letter Words', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Picture Dictionary', duration: '2h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('3', 'Mathematics', 0.8, 10, 12, [
    syllabusChapter('1', '01', 'Chapter 1 — Numbers', '4 topics · 6 hours', 0.9, [
      {id: '1-1', title: 'Counting 1 to 100', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Place Value', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Before and After', duration: '1.5h', status: 'completed'},
      {id: '1-4', title: 'Comparing Numbers', duration: '1.5h', status: 'in_progress'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Addition', '3 topics · 5 hours', 0.65, [
      {id: '2-1', title: 'Adding Single Digits', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Adding Two-Digit Numbers', duration: '2h', status: 'in_progress'},
      {id: '2-3', title: 'Word Problems', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('4', 'General Knowledge', 0.58, 6, 10, [
    syllabusChapter('1', '01', 'Chapter 1 — Myself', '3 topics · 4 hours', 0.7, [
      {id: '1-1', title: 'My Name and Family', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Parts of the Body', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'My School', duration: '1h', status: 'in_progress'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Animals', '3 topics · 4 hours', 0.4, [
      {id: '2-1', title: 'Pet Animals', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Farm Animals', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Wild Animals', duration: '1h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('5', 'Islamiat', 0.7, 7, 10, [
    syllabusChapter('1', '01', 'Chapter 1 — Kalimas', '3 topics · 4 hours', 0.8, [
      {id: '1-1', title: 'First Kalima', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Second Kalima', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Practice and Recitation', duration: '1h', status: 'in_progress'},
    ]),
  ]),
];

const SYLLABUS_CLASS_4 = [
  syllabusSubject('1', 'English', 0.66, 14, 22, [
    syllabusChapter('1', '01', 'Chapter 1 — Grammar', '5 topics · 8 hours', 0.75, [
      {id: '1-1', title: 'Nouns', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Pronouns', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Verbs', duration: '2h', status: 'completed'},
      {id: '1-4', title: 'Adjectives', duration: '1.5h', status: 'in_progress'},
      {id: '1-5', title: 'Simple Tenses', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Comprehension', '4 topics · 6 hours', 0.5, [
      {id: '2-1', title: 'Reading a Passage', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Finding the Main Idea', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'True or False', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Short Answers', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('2', 'Urdu', 0.6, 12, 20, [
    syllabusChapter('1', '01', 'Chapter 1 — Reading', '4 topics · 6 hours', 0.65, [
      {id: '1-1', title: 'Lesson Reading', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Meanings of Words', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Question Answers', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Oral Practice', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Writing', '4 topics · 6 hours', 0.4, [
      {id: '2-1', title: 'Sentence Making', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Fill in the Blanks', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Dictation', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Short Paragraph', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('3', 'Mathematics', 0.71, 16, 22, [
    syllabusChapter('1', '01', 'Chapter 1 — Fractions', '5 topics · 8 hours', 0.8, [
      {id: '1-1', title: 'Proper Fractions', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Improper Fractions', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Mixed Numbers', duration: '1.5h', status: 'completed'},
      {id: '1-4', title: 'Equivalent Fractions', duration: '2h', status: 'in_progress'},
      {id: '1-5', title: 'Adding Fractions', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Geometry', '4 topics · 6 hours', 0.55, [
      {id: '2-1', title: 'Points and Lines', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Shapes Around Us', duration: '1.5h', status: 'completed'},
      {id: '2-3', title: 'Types of Angles', duration: '1.5h', status: 'in_progress'},
      {id: '2-4', title: 'Measuring Length', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('4', 'Science', 0.54, 10, 18, [
    syllabusChapter('1', '01', 'Chapter 1 — Plants', '4 topics · 6 hours', 0.6, [
      {id: '1-1', title: 'Parts of a Plant', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'How Plants Grow', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Uses of Plants', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Seeds and Fruits', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Human Body', '4 topics · 6 hours', 0.35, [
      {id: '2-1', title: 'Sense Organs', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Bones and Muscles', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Healthy Food', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Keeping Clean', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('5', 'Social Studies', 0.48, 8, 16, [
    syllabusChapter('1', '01', 'Chapter 1 — Our Country', '3 topics · 5 hours', 0.55, [
      {id: '1-1', title: 'Map of Pakistan', duration: '2h', status: 'completed'},
      {id: '1-2', title: 'National Symbols', duration: '1.5h', status: 'in_progress'},
      {id: '1-3', title: 'Our Provinces', duration: '1.5h', status: 'pending'},
    ]),
  ]),
];

const SYLLABUS_CLASS_6 = [
  syllabusSubject('1', 'English', 0.62, 16, 26, [
    syllabusChapter('1', '01', 'Chapter 1 — Grammar', '5 topics · 8 hours', 0.7, [
      {id: '1-1', title: 'Parts of Speech', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Tenses Overview', duration: '2h', status: 'completed'},
      {id: '1-3', title: 'Active and Passive', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Direct and Indirect Speech', duration: '1.5h', status: 'pending'},
      {id: '1-5', title: 'Punctuation', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Composition', '4 topics · 6 hours', 0.45, [
      {id: '2-1', title: 'Paragraph Writing', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Letter Writing', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Story Writing', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Essay Outline', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('2', 'Urdu', 0.57, 14, 24, [
    syllabusChapter('1', '01', 'Chapter 1 — Poetry', '4 topics · 6 hours', 0.6, [
      {id: '1-1', title: 'Nazm Reading', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Meanings and Explanation', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Central Idea', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Question Answers', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Prose', '4 topics · 6 hours', 0.4, [
      {id: '2-1', title: 'Lesson Summary', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Word Meanings', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Grammar in Context', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Creative Response', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('3', 'Mathematics', 0.69, 20, 30, [
    syllabusChapter('1', '01', 'Chapter 1 — Integers', '5 topics · 8 hours', 0.8, [
      {id: '1-1', title: 'Positive & Negative Numbers', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Number Line', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Addition of Integers', duration: '1.5h', status: 'completed'},
      {id: '1-4', title: 'Subtraction of Integers', duration: '2h', status: 'in_progress'},
      {id: '1-5', title: 'Word Problems', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Algebra Basics', '5 topics · 8 hours', 0.5, [
      {id: '2-1', title: 'Algebraic Expressions', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Like and Unlike Terms', duration: '1.5h', status: 'completed'},
      {id: '2-3', title: 'Simplification', duration: '2h', status: 'in_progress'},
      {id: '2-4', title: 'Simple Equations', duration: '1.5h', status: 'pending'},
      {id: '2-5', title: 'Practice Exercise', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('4', 'General Science', 0.5, 12, 24, [
    syllabusChapter('1', '01', 'Chapter 1 — Matter', '4 topics · 6 hours', 0.55, [
      {id: '1-1', title: 'States of Matter', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Solids, Liquids and Gases', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Change of State', duration: '1.5h', status: 'in_progress'},
      {id: '1-4', title: 'Physical and Chemical Changes', duration: '1.5h', status: 'pending'},
    ]),
    syllabusChapter('2', '02', 'Chapter 2 — Energy', '4 topics · 6 hours', 0.35, [
      {id: '2-1', title: 'Forms of Energy', duration: '1.5h', status: 'completed'},
      {id: '2-2', title: 'Heat and Light', duration: '1.5h', status: 'in_progress'},
      {id: '2-3', title: 'Sound', duration: '1.5h', status: 'pending'},
      {id: '2-4', title: 'Energy Conservation', duration: '1.5h', status: 'pending'},
    ]),
  ]),
  syllabusSubject('5', 'Computer', 0.73, 10, 14, [
    syllabusChapter('1', '01', 'Chapter 1 — Computer Basics', '4 topics · 6 hours', 0.8, [
      {id: '1-1', title: 'What is a Computer', duration: '1.5h', status: 'completed'},
      {id: '1-2', title: 'Hardware and Software', duration: '1.5h', status: 'completed'},
      {id: '1-3', title: 'Input and Output Devices', duration: '1.5h', status: 'completed'},
      {id: '1-4', title: 'Uses of Computer', duration: '1.5h', status: 'in_progress'},
    ]),
  ]),
  syllabusSubject('6', 'Islamiat', 0.61, 9, 14, [
    syllabusChapter('1', '01', 'Chapter 1 — Seerah', '3 topics · 5 hours', 0.65, [
      {id: '1-1', title: 'Birth of the Holy Prophet (PBUH)', duration: '2h', status: 'completed'},
      {id: '1-2', title: 'Life in Makkah', duration: '1.5h', status: 'in_progress'},
      {id: '1-3', title: 'Hijrah to Madinah', duration: '1.5h', status: 'pending'},
    ]),
  ]),
];

export const getClassGrade = className => {
  const grade = Number(String(className || '').match(/\d+/)?.[0] || 0);
  return Number.isFinite(grade) ? grade : 0;
};

export const getSyllabusListForClass = className => {
  const grade = getClassGrade(className);

  if (grade <= 0) {
    return SYLLABUS_LIST;
  }
  if (grade <= 2) {
    return SYLLABUS_CLASS_2;
  }
  if (grade <= 4) {
    return SYLLABUS_CLASS_4;
  }
  if (grade <= 6) {
    return SYLLABUS_CLASS_6;
  }

  return SYLLABUS_LIST;
};

export const SYLLABUS_DATA = SYLLABUS_LIST[0];

export const TEACHER_STUDENTS = [
  {
    value: '1',
    label: 'Bilal Khaliq',
    initials: 'BKH',
    classInfo: 'Class 7 · Section B',
  },
  {
    value: '2',
    label: 'Jalal Khaliq',
    initials: 'JLK',
    classInfo: 'Class 3 · Section A',
  },
  {
    value: '3',
    label: 'Aqsa Khaliq',
    initials: 'AQS',
    classInfo: 'Class 8 · Section C',
  },
];

export const CLASS_TEACHER = {
  id: 'ct1',
  name: 'Ms. Ayesha Khan',
  initials: 'AK',
  subject: 'Mathematics',
};

export const SUBJECT_TEACHERS = [
  {id: '1', name: 'Mr. Naseem Khan', initials: 'RK', subject: 'Science'},
  {id: '2', name: 'Mr. Salman Khan', initials: 'SK', subject: 'English'},
  {id: '3', name: 'Ms. Aqsa Khan', initials: 'AK', subject: 'Urdu'},
  {id: '4', name: 'Mr. Imran Ali', initials: 'IA', subject: 'Computer'},
  {id: '5', name: 'Ms. Sara Malik', initials: 'SM', subject: 'Islamiat'},
];

export const TEACHERS_BY_STUDENT = {
  '1': {
    classTeacher: CLASS_TEACHER,
    subjectTeachers: SUBJECT_TEACHERS,
  },
  '2': {
    classTeacher: {
      id: 'ct2',
      name: 'Mr. Hassan Raza',
      initials: 'HR',
      subject: 'General Knowledge',
    },
    subjectTeachers: [
      {id: '1', name: 'Ms. Fatima Noor', initials: 'FN', subject: 'Mathematics'},
      {id: '2', name: 'Mr. Ali Abbas', initials: 'AA', subject: 'English'},
      {id: '3', name: 'Ms. Zainab Shah', initials: 'ZS', subject: 'Urdu'},
    ],
  },
  '3': {
    classTeacher: {
      id: 'ct3',
      name: 'Dr. Kamran Siddiqui',
      initials: 'KS',
      subject: 'Physics',
    },
    subjectTeachers: [
      {id: '1', name: 'Ms. Hina Tariq', initials: 'HT', subject: 'Chemistry'},
      {id: '2', name: 'Mr. Usman Farooq', initials: 'UF', subject: 'Biology'},
      {id: '3', name: 'Ms. Rabia Ansari', initials: 'RA', subject: 'English'},
      {id: '4', name: 'Mr. Tariq Mehmood', initials: 'TM', subject: 'Mathematics'},
    ],
  },
};

export const ATTENDANCE_STUDENTS = [
  {
    value: '1',
    label: 'Bilal Khaliq',
    initials: 'BKH',
    classInfo: 'Class 7 · Section B',
    month: 'November 2024',
    present: '22',
    absent: '02',
    leave: '01',
    rate: 0.88,
    rateText: '88%',
  },
  {
    value: '2',
    label: 'Jalal Khaliq',
    initials: 'JLK',
    classInfo: 'Class 3 · Section A',
    month: 'November 2024',
    present: '20',
    absent: '03',
    leave: '02',
    rate: 0.8,
    rateText: '80%',
  },
  {
    value: '3',
    label: 'Aqsa Khaliq',
    initials: 'AQS',
    classInfo: 'Class 8 · Section C',
    month: 'November 2024',
    present: '21',
    absent: '02',
    leave: '02',
    rate: 0.84,
    rateText: '84%',
  },
  {
    value: '4',
    label: 'Zainab Khaliq',
    initials: 'ZNB',
    classInfo: 'Class 4 · Section C',
    month: 'November 2024',
    present: '21',
    absent: '02',
    leave: '02',
    rate: 0.84,
    rateText: '84%',
  },
  {
    value: '5',
    label: 'Sara Khaliq',
    initials: 'SRK',
    classInfo: 'Class 8 · Section C',
    month: 'November 2024',
    present: '21',
    absent: '02',
    leave: '02',
    rate: 0.84,
    rateText: '84%',
  },
];

export const ATTENDANCE_DATE_RANGES = [
  {value: '1', label: 'Nov 1 - Nov 29, 2024'},
  {value: '2', label: 'Oct 1 - Oct 31, 2024'},
  {value: '3', label: 'Sep 1 - Sep 30, 2024'},
];

export const ATTENDANCE_HISTORY = [
  {
    id: '1',
    day: '29',
    shortDay: 'Fri',
    dateLabel: 'November 29',
    fullDay: 'Friday',
    status: 'Present',
  },
  {
    id: '2',
    day: '28',
    shortDay: 'Thu',
    dateLabel: 'November 28',
    fullDay: 'Thursday',
    status: 'Present',
  },
  {
    id: '3',
    day: '27',
    shortDay: 'Wed',
    dateLabel: 'November 27',
    fullDay: 'Wednesday',
    status: 'Absent',
  },
  {
    id: '4',
    day: '26',
    shortDay: 'Tue',
    dateLabel: 'November 26',
    fullDay: 'Tuesday',
    status: 'Leave',
  },
  {
    id: '5',
    day: '25',
    shortDay: 'Mon',
    dateLabel: 'November 25',
    fullDay: 'Monday',
    status: 'Unmarked',
  },
  {
    id: '6',
    day: '22',
    shortDay: 'Fri',
    dateLabel: 'November 22',
    fullDay: 'Friday',
    status: 'Present',
  },
];

export const CHAT_USER = {
  name: 'M.Saleem',
  initials: 'AR',
};

export const CHAT_ANNOUNCEMENT = {
  school: 'eSchool — Greenfield High',
  title: 'Parent-Teacher Meeting Rescheduled',
  desc:
    'The PTM originally scheduled for 15 Nov has been moved to 18 Nov due to the national holiday. Please confirm your attendance.',
  date: '18 Nov',
  time: '10:00 AM',
};

export const CHAT_MESSAGES = [
  {
    id: '1',
    text: 'Hi',
    type: 'received',
    sender: 'Ms. Priya',
    time: '09:42',
  },
];

export const CHAT_LIST = [
  {
    id: '1',
    name: 'Mr. Ahmed Khan',
    role: 'Mathematics Teacher',
    lastMessage: 'Please submit homework by tomorrow.',
    time: '10:30 AM',
    unread: 2,
    initials: 'AK',
  },
  {
    id: '2',
    name: 'Ms. Sara Ali',
    role: 'English Teacher',
    lastMessage: 'Great work on the essay!',
    time: 'Yesterday',
    unread: 0,
    initials: 'SA',
  },
  {
    id: '3',
    name: 'School Admin',
    role: 'Administration',
    lastMessage: 'Parent meeting scheduled for Friday.',
    time: 'Mon',
    unread: 1,
    initials: 'SA',
  },
  {
    id: '4',
    name: 'Mr. Hassan Raza',
    role: 'Physics Teacher',
    lastMessage: 'Lab report deadline is next week.',
    time: 'Sun',
    unread: 0,
    initials: 'HR',
  },
];

export const ASSIGNMENT_OVERVIEW = {
  total: 11,
  pending: 4,
  submitted: 6,
  overdue: 1,
};

export const ASSIGNMENT_SUBJECTS = [
  {
    id: '1',
    name: 'Mathematics',
    icon: 'calculator-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1345A3',
    pendingCount: 2,
    assignments: [
      {
        id: '1-1',
        title: 'Algebra Practice Sheet — Chapter 1',
        teacher: 'Mr. Ahmed Khan',
        dueDate: '15 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
      {
        id: '1-2',
        title: 'Quadratic Equations Worksheet',
        teacher: 'Mr. Ahmed Khan',
        dueDate: '18 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
      {
        id: '1-3',
        title: 'Geometry Project — Triangles',
        teacher: 'Mr. Ahmed Khan',
        dueDate: '20 Sep 2026',
        status: 'submitted',
        type: 'project',
      },
    ],
  },
  {
    id: '2',
    name: 'Physics',
    icon: 'planet-outline',
    iconBg: '#E8F8F5',
    iconColor: '#007A55',
    pendingCount: 1,
    assignments: [
      {
        id: '2-1',
        title: 'Motion & Velocity Lab Report',
        teacher: 'Mr. Hassan Raza',
        dueDate: '12 Sep 2026',
        status: 'overdue',
        type: 'lab',
      },
      {
        id: '2-2',
        title: 'Force Laws — Chapter Quiz',
        teacher: 'Mr. Hassan Raza',
        dueDate: '22 Sep 2026',
        status: 'submitted',
        type: 'quiz',
      },
      {
        id: '2-3',
        title: 'Light & Reflection Worksheet',
        teacher: 'Mr. Hassan Raza',
        dueDate: '08 Sep 2026',
        status: 'submitted',
        type: 'homework',
      },
    ],
  },
  {
    id: '3',
    name: 'Chemistry',
    icon: 'flask-outline',
    iconBg: '#FFF4E5',
    iconColor: '#FF9500',
    pendingCount: 2,
    assignments: [
      {
        id: '3-1',
        title: 'Chemical Reactions — Notes Submission',
        teacher: 'Ms. Sara Ali',
        dueDate: '16 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
      {
        id: '3-2',
        title: 'Periodic Table Chart Project',
        teacher: 'Ms. Sara Ali',
        dueDate: '25 Sep 2026',
        status: 'submitted',
        type: 'project',
      },
      {
        id: '3-3',
        title: 'Acids and Bases Lab Notes',
        teacher: 'Ms. Sara Ali',
        dueDate: '19 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
    ],
  },
  {
    id: '4',
    name: 'English',
    icon: 'book-outline',
    iconBg: '#FFECEC',
    iconColor: '#FF3B30',
    pendingCount: 0,
    assignments: [
      {
        id: '4-1',
        title: 'Essay — My Favourite Book',
        teacher: 'Ms. Fatima Noor',
        dueDate: '10 Sep 2026',
        status: 'submitted',
        type: 'homework',
      },
      {
        id: '4-2',
        title: 'Poetry Recitation Recording',
        teacher: 'Ms. Fatima Noor',
        dueDate: '14 Sep 2026',
        status: 'submitted',
        type: 'project',
      },
    ],
  },
];

export const STUDENT_TIMETABLE = [
  {
    id: '1',
    period: '01',
    subject: 'Mathematics',
    time: '9:00 AM - 10:00 AM',
    teacher: 'Mr. Ahmed Khan',
    room: 'Room 12',
  },
  {
    id: '2',
    period: '02',
    subject: 'English',
    time: '10:00 AM - 11:00 AM',
    teacher: 'Ms. Sara Ali',
    room: 'Room 08',
  },
  {
    id: '3',
    period: '03',
    subject: 'Science',
    time: '11:00 AM - 12:00 PM',
    teacher: 'Ms. Hina Tariq',
    room: 'Lab 2',
  },
  {
    id: '4',
    period: '04',
    subject: 'Computer',
    time: '12:00 PM - 1:00 PM',
    teacher: 'Mr. Usman Farooq',
    room: 'Lab 1',
  },
];

export const STUDENT_UPCOMING_CLASS = {
  title: 'Geometry - Triangles',
  classInfo: 'Class 7B • Mathematics',
  time: '9:00 AM',
  subject: 'Mathematics',
};

export const STUDENT_RESULT_TERMS = [Strings.term1, Strings.term2, Strings.term3];

export const STUDENT_RESULTS = {
  [Strings.term1]: {
    overall: 'A',
    hint: 'Great Progress!',
    subjects: [
      {id: '1', name: 'Mathematics', grade: 'A+', score: 96, color: '#16A34A'},
      {id: '2', name: 'Science', grade: 'A', score: 90, color: '#2563EB'},
      {id: '3', name: 'English', grade: 'A-', score: 86, color: '#7C3AED'},
      {id: '4', name: 'Computer', grade: 'B+', score: 82, color: '#0D9488'},
      {id: '5', name: 'Islamic Studies', grade: 'A', score: 88, color: '#EA580C'},
    ],
  },
  [Strings.term2]: {
    overall: 'A-',
    hint: 'Keep it up!',
    subjects: [
      {id: '1', name: 'Mathematics', grade: 'A', score: 91, color: '#16A34A'},
      {id: '2', name: 'Science', grade: 'A-', score: 87, color: '#2563EB'},
      {id: '3', name: 'English', grade: 'A-', score: 86, color: '#7C3AED'},
      {id: '4', name: 'Computer', grade: 'B+', score: 81, color: '#0D9488'},
      {id: '5', name: 'Islamic Studies', grade: 'B+', score: 80, color: '#EA580C'},
    ],
  },
  [Strings.term3]: {
    overall: 'A+',
    hint: 'Excellent work!',
    subjects: [
      {id: '1', name: 'Mathematics', grade: 'A+', score: 94, color: '#16A34A'},
      {id: '2', name: 'Science', grade: 'A+', score: 93, color: '#2563EB'},
      {id: '3', name: 'English', grade: 'A', score: 89, color: '#7C3AED'},
      {id: '4', name: 'Computer', grade: 'A', score: 90, color: '#0D9488'},
      {id: '5', name: 'Islamic Studies', grade: 'A-', score: 85, color: '#EA580C'},
    ],
  },
};

export const STUDENT_NOTIFICATIONS = [
  {
    id: 's1',
    type: 'academic',
    title: 'New assignment uploaded',
    message:
      'Mathematics Chapter 4 assignment is now in your portal. Submit the PDF before 18 Sep, 11:59 PM.',
    date: 'Today',
    time: '10 min ago',
    icon: 'document-text-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
    unread: true,
  },
  {
    id: 's2',
    type: 'academic',
    title: 'Upcoming exam reminder',
    message:
      'Science mid-term is on 22 Sep at 9:00 AM in Hall B. Revise chapters 1–3 and bring your admit card.',
    date: 'Today',
    time: '1h ago',
    icon: 'calendar-outline',
    iconBg: '#FFF4E5',
    iconColor: '#EA580C',
    unread: true,
  },
  {
    id: 's3',
    type: 'general',
    title: 'Fee payment due',
    message:
      'September tuition fee of Rs. 8,500 is due by 20 Sep. Pay from the Fee section to avoid a late fine.',
    date: 'Today',
    time: '3h ago',
    icon: 'card-outline',
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
    unread: true,
  },
  {
    id: 's4',
    type: 'academic',
    title: 'Online class starting soon',
    message:
      'Algebra — Linear Equations starts in 15 minutes. Join from Online Classes to avoid missing attendance.',
    date: 'Today',
    time: '4h ago',
    icon: 'videocam-outline',
    iconBg: '#CFFAFE',
    iconColor: '#0891B2',
    unread: true,
  },
  {
    id: 's5',
    type: 'academic',
    title: 'Attendance update',
    message:
      'Your September attendance is 88%. One leave is marked for 12 Sep. Contact class teacher for a correction.',
    date: 'Yesterday',
    time: 'Yesterday',
    icon: 'checkmark-circle-outline',
    iconBg: '#E8F8EE',
    iconColor: '#16A34A',
    unread: false,
  },
  {
    id: 's6',
    type: 'academic',
    title: 'Exam result published',
    message:
      'Term-1 results are live. Overall grade: A (92%). Open Results to view subject-wise marks.',
    date: '13 Sep',
    time: '2d ago',
    icon: 'trophy-outline',
    iconBg: '#F3E8FF',
    iconColor: '#7C3AED',
    unread: false,
  },
  {
    id: 's7',
    type: 'general',
    title: 'School holiday announcement',
    message:
      'School will remain closed on 16 Sep for a public holiday. Regular classes resume on 17 Sep.',
    date: '12 Sep',
    time: '3d ago',
    icon: 'sunny-outline',
    iconBg: '#CCFBF1',
    iconColor: '#0D9488',
    unread: false,
  },
];

