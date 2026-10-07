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
  rollNo: '12',
  guardian: 'Imran Khaliq',
  dob: '12 March 2014',
  classInfo: 'Class 7 · Section B',
  gender: 'Male',
  phone: '+92 300 4567890',
  address: 'House 12, Street 5, Islamabad',
  validUntil: 'Mar 31, 2026',
};

export const PARENT_DATA = {
  label: 'Imran Khaliq',
  initials: 'IK',
  classBadge: 'Parent Account',
  cnic: '35202-1234567-1',
  fatherName: 'Muhammad Khaliq',
  gender: 'Male',
  dateOfIssue: '12 Apr 2024',
  validUntil: '31 Mar 2027',
  email: 'imran.khaliq@email.com',
  phone: '+92 300 1234567',
  address: 'House 12, Street 5, Islamabad',
};

const buildStudent = ({
  value,
  label,
  initials,
  gender,
  className,
  section,
  studentId,
  guardian,
  dob,
  rollNo,
  phone,
  address,
}) => ({
  value,
  label,
  initials,
  gender,
  className,
  section,
  classBadge: `${className} - ${section}`,
  classInfo: `${className} · Section ${section}`,
  studentId,
  guardian,
  dob,
  rollNo,
  phone,
  address,
  validUntil: 'Mar 31, 2026',
});

export const STUDENT_LIST = [
  buildStudent({
    value: '6',
    label: 'Hira Malik',
    initials: 'HM',
    gender: 'Female',
    className: 'Class 2',
    section: 'A',
    studentId: 'SCH-2025-0102',
    guardian: 'Tariq Malik',
    dob: '18 May 2019',
    rollNo: '05',
    phone: '+92 300 1122334',
    address: 'House 21, F-8, Islamabad',
  }),
  buildStudent({
    value: '2',
    label: 'Jalal Khaliq',
    initials: 'JK',
    gender: 'Male',
    className: 'Class 3',
    section: 'A',
    studentId: 'SCH-2025-0187',
    guardian: 'Imran Khaliq',
    dob: '5 June 2018',
    rollNo: '08',
    phone: '+92 300 4567891',
    address: 'House 12, Street 5, Islamabad',
  }),
  buildStudent({
    value: '4',
    label: 'Hamza Siddiqui',
    initials: 'HS',
    gender: 'Male',
    className: 'Class 4',
    section: 'C',
    studentId: 'SCH-2025-0241',
    guardian: 'Asif Siddiqui',
    dob: '22 August 2017',
    rollNo: '11',
    phone: '+92 321 5550141',
    address: 'House 8, Block C, Rawalpindi',
  }),
  buildStudent({
    value: '7',
    label: 'Fahad Iqbal',
    initials: 'FI',
    gender: 'Male',
    className: 'Class 5',
    section: 'B',
    studentId: 'SCH-2025-0315',
    guardian: 'Nadeem Iqbal',
    dob: '3 February 2016',
    rollNo: '09',
    phone: '+92 345 7788990',
    address: 'Lane 3, Bahria Town, Rawalpindi',
  }),
  buildStudent({
    value: '8',
    label: 'Maham Noor',
    initials: 'MN',
    gender: 'Female',
    className: 'Class 6',
    section: 'A',
    studentId: 'SCH-2025-0388',
    guardian: 'Shahid Noor',
    dob: '14 November 2015',
    rollNo: '07',
    phone: '+92 312 4455667',
    address: 'House 5, Sector I-8, Islamabad',
  }),
  buildStudent({
    value: '1',
    label: 'Bilal Khaliq',
    initials: 'BKH',
    gender: 'Male',
    className: 'Class 7',
    section: 'B',
    studentId: 'SCH-2025-0412',
    guardian: 'Imran Khaliq',
    dob: '12 March 2014',
    rollNo: '12',
    phone: '+92 300 4567890',
    address: 'House 12, Street 5, Islamabad',
  }),
  buildStudent({
    value: '3',
    label: 'Aqsa Khaliq',
    initials: 'AK',
    gender: 'Female',
    className: 'Class 8',
    section: 'C',
    studentId: 'SCH-2025-0299',
    guardian: 'Imran Khaliq',
    dob: '10 January 2013',
    rollNo: '21',
    phone: '+92 300 4567892',
    address: 'House 12, Street 5, Islamabad',
  }),
  buildStudent({
    value: '9',
    label: 'Daniyal Sheikh',
    initials: 'DS',
    gender: 'Male',
    className: 'Class 9',
    section: 'A',
    studentId: 'SCH-2025-0510',
    guardian: 'Kamran Sheikh',
    dob: '9 September 2011',
    rollNo: '16',
    phone: '+92 301 9988776',
    address: 'Street 9, DHA Phase 2, Islamabad',
  }),
  buildStudent({
    value: '5',
    label: 'Laiba Ahmed',
    initials: 'LA',
    gender: 'Female',
    className: 'Class 10',
    section: 'B',
    studentId: 'SCH-2025-0602',
    guardian: 'Imtiaz Ahmed',
    dob: '27 April 2010',
    rollNo: '04',
    phone: '+92 333 6100204',
    address: 'Street 4, G-10, Islamabad',
  }),
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
  initials: 'BKH',
  label: 'Bilal Khaliq',
  classInfo: 'Class 7 - B • Roll 12',
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
  if (grade >= 9) {
    return SYLLABUS_LIST;
  }

  return SYLLABUS_LIST;
};

export const SYLLABUS_DATA = SYLLABUS_LIST[0];

export const TEACHER_STUDENTS = STUDENT_LIST.map(item => ({
  value: item.value,
  label: item.label,
  initials: item.initials,
  classInfo: item.classInfo,
}));

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

const ATTENDANCE_STATS = {
  '1': {present: '22', absent: '02', leave: '01', rate: 0.88, rateText: '88%'},
  '2': {present: '20', absent: '03', leave: '02', rate: 0.8, rateText: '80%'},
  '3': {present: '21', absent: '02', leave: '02', rate: 0.84, rateText: '84%'},
  '4': {present: '23', absent: '01', leave: '01', rate: 0.92, rateText: '92%'},
  '5': {present: '19', absent: '03', leave: '03', rate: 0.76, rateText: '76%'},
  '6': {present: '24', absent: '01', leave: '00', rate: 0.96, rateText: '96%'},
  '7': {present: '21', absent: '02', leave: '02', rate: 0.84, rateText: '84%'},
  '8': {present: '22', absent: '02', leave: '01', rate: 0.88, rateText: '88%'},
  '9': {present: '20', absent: '04', leave: '01', rate: 0.8, rateText: '80%'},
};

export const ATTENDANCE_STUDENTS = STUDENT_LIST.map(item => ({
  ...item,
  month: 'November 2024',
  ...(ATTENDANCE_STATS[item.value] || ATTENDANCE_STATS['1']),
}));

export const ATTENDANCE_DATE_RANGES = [
  {value: '1', label: 'Nov 1 - Nov 29, 2024'},
  {value: '2', label: 'Oct 1 - Oct 31, 2024'},
  {value: '3', label: 'Sep 1 - Sep 30, 2024'},
  {value: '4', label: 'Aug 1 - Aug 31, 2024'},
  {value: '5', label: 'Jul 1 - Jul 31, 2024'},
  {value: '6', label: 'Jun 1 - Jun 30, 2024'},
  {value: '7', label: 'May 1 - May 31, 2024'},
  {value: '8', label: 'Apr 1 - Apr 30, 2024'},
  {value: '9', label: 'Mar 1 - Mar 31, 2024'},
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
    teacher: 'Ms. Ayesha Khan',
    room: 'Room 12',
  },
  {
    id: '2',
    period: '02',
    subject: 'English',
    time: '10:00 AM - 11:00 AM',
    teacher: 'Mr. Salman Khan',
    room: 'Room 08',
  },
  {
    id: '3',
    period: '03',
    subject: 'Physics',
    time: '11:00 AM - 12:00 PM',
    teacher: 'Mr. Naseem Khan',
    room: 'Lab 2',
  },
  {
    id: '4',
    period: '04',
    subject: 'Computer',
    time: '12:00 PM - 1:00 PM',
    teacher: 'Mr. Imran Ali',
    room: 'Lab 1',
  },
];

const TIMETABLE_CLASS_2 = [
  {id: '1', period: '01', subject: 'English', time: '9:00 AM - 9:40 AM', teacher: 'Ms. Fatima Noor', room: 'Room 3'},
  {id: '2', period: '02', subject: 'Mathematics', time: '9:45 AM - 10:25 AM', teacher: 'Ms. Fatima Noor', room: 'Room 3'},
  {id: '3', period: '03', subject: 'Science', time: '10:30 AM - 11:10 AM', teacher: 'Mr. Ali Abbas', room: 'Room 5'},
  {id: '4', period: '04', subject: 'Art', time: '11:15 AM - 11:55 AM', teacher: 'Ms. Zainab Shah', room: 'Art Room'},
];

const TIMETABLE_CLASS_4 = [
  {id: '1', period: '01', subject: 'English', time: '9:00 AM - 10:00 AM', teacher: 'Mr. Ali Abbas', room: 'Room 6'},
  {id: '2', period: '02', subject: 'Mathematics', time: '10:00 AM - 11:00 AM', teacher: 'Ms. Fatima Noor', room: 'Room 6'},
  {id: '3', period: '03', subject: 'Science', time: '11:00 AM - 12:00 PM', teacher: 'Mr. Naseem Khan', room: 'Lab 1'},
  {id: '4', period: '04', subject: 'Urdu', time: '12:00 PM - 1:00 PM', teacher: 'Ms. Zainab Shah', room: 'Room 6'},
];

const TIMETABLE_CLASS_9 = [
  {id: '1', period: '01', subject: 'Mathematics', time: '8:30 AM - 9:30 AM', teacher: 'Mr. Tariq Mehmood', room: 'Room 15'},
  {id: '2', period: '02', subject: 'Physics', time: '9:35 AM - 10:35 AM', teacher: 'Dr. Kamran Siddiqui', room: 'Lab 3'},
  {id: '3', period: '03', subject: 'Chemistry', time: '10:40 AM - 11:40 AM', teacher: 'Ms. Hina Tariq', room: 'Lab 2'},
  {id: '4', period: '04', subject: 'English', time: '11:45 AM - 12:45 PM', teacher: 'Ms. Rabia Ansari', room: 'Room 15'},
];

export const getTimetableForClass = className => {
  const grade = getClassGrade(className);
  if (grade <= 2) {
    return TIMETABLE_CLASS_2;
  }
  if (grade <= 4) {
    return TIMETABLE_CLASS_4;
  }
  if (grade >= 9) {
    return TIMETABLE_CLASS_9;
  }
  return STUDENT_TIMETABLE;
};

const UPCOMING_CLASS_BY_GRADE = {
  2: {
    title: 'Phonics — Letter Sounds',
    classInfo: 'Class 2A · English',
    time: '9:00 AM',
    subject: 'English',
  },
  4: {
    title: 'Multiplication Tables',
    classInfo: 'Class 4A · Mathematics',
    time: '10:00 AM',
    subject: 'Mathematics',
  },
  7: {
    title: 'Geometry - Triangles',
    classInfo: 'Class 7B · Mathematics',
    time: '9:00 AM',
    subject: 'Mathematics',
  },
  9: {
    title: 'Organic Chemistry — Hydrocarbons',
    classInfo: 'Class 9B · Chemistry',
    time: '10:40 AM',
    subject: 'Chemistry',
  },
};

export const getUpcomingClassForClass = className => {
  const grade = getClassGrade(className);
  if (grade <= 2) {
    return UPCOMING_CLASS_BY_GRADE[2];
  }
  if (grade <= 4) {
    return UPCOMING_CLASS_BY_GRADE[4];
  }
  if (grade >= 9) {
    return UPCOMING_CLASS_BY_GRADE[9];
  }
  return UPCOMING_CLASS_BY_GRADE[7];
};

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

const buildStudentNotificationMessage = (student, templateIndex) => {
  const classLabel = `${student.className} Section ${student.section}`;
  const messages = [
    `Mathematics assignment for ${classLabel} is in your portal. Complete exercise 4.2 before 18 Sep, 11:59 PM.`,
    `You were marked Present today for ${classLabel}. Your September attendance is updated in the app.`,
    `September tuition fee is due by 20 Sep. Pay from the Fee section to avoid a late fine.`,
    `Term-1 results for ${classLabel} are live. Open Results to view marks and download your report card.`,
    `Your ${classLabel} timetable has been revised. Check Timetable for the full weekly schedule.`,
    `Your class teacher sent a message about the upcoming practical. Open Chat to read and reply.`,
    `A new school announcement for ${classLabel} is posted. Open Announcements for event details.`,
    `Holiday calendar updated. School remains closed on 16 Sep; ${classLabel} classes resume on 17 Sep.`,
  ];
  return messages[templateIndex];
};

const STUDENT_NOTIFICATION_TEMPLATES = [
  {
    type: 'academic',
    title: 'New assignment uploaded',
    date: 'Today',
    time: '10 min ago',
    icon: 'document-text-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
  },
  {
    type: 'academic',
    title: 'Attendance marked successfully',
    date: 'Today',
    time: '1h ago',
    icon: 'checkmark-circle-outline',
    iconBg: '#E8F8EE',
    iconColor: '#16A34A',
  },
  {
    type: 'general',
    title: 'Fee payment reminder',
    date: 'Today',
    time: '3h ago',
    icon: 'card-outline',
    iconBg: '#FFF4E5',
    iconColor: '#EA580C',
  },
  {
    type: 'academic',
    title: 'Exam result published',
    date: 'Today',
    time: '4h ago',
    icon: 'trophy-outline',
    iconBg: '#F3E8FF',
    iconColor: '#7C3AED',
  },
  {
    type: 'academic',
    title: 'Timetable updated',
    date: 'Yesterday',
    time: 'Yesterday',
    icon: 'calendar-outline',
    iconBg: '#CFFAFE',
    iconColor: '#0891B2',
  },
  {
    type: 'general',
    title: 'Teacher shared a new message',
    date: 'Yesterday',
    time: 'Yesterday',
    icon: 'chatbubble-ellipses-outline',
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
  },
  {
    type: 'general',
    title: 'New announcement available',
    date: '13 Sep',
    time: '2d ago',
    icon: 'megaphone-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
  },
  {
    type: 'general',
    title: 'Holiday schedule updated',
    date: '12 Sep',
    time: '3d ago',
    icon: 'sunny-outline',
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
  },
];

/** Legacy export — Class 7 default student notifications (8 items). */
export const STUDENT_NOTIFICATIONS = STUDENT_NOTIFICATION_TEMPLATES.map(
  (template, index) => ({
    id: `s1-${index + 1}`,
    ...template,
    message: buildStudentNotificationMessage(
      STUDENT_LIST.find(s => s.value === '1') || STUDENT_LIST[0],
      index,
    ),
    unread: index < 4,
    classNames: ['Class 7'],
    childIds: ['1'],
  }),
);

/** 8 notifications per linked student / class (Class 2 … Class 10). */
export const ALL_STUDENT_NOTIFICATIONS = STUDENT_LIST.flatMap(student =>
  STUDENT_NOTIFICATION_TEMPLATES.map((template, index) => ({
    id: `s-${student.value}-${index + 1}`,
    ...template,
    message: buildStudentNotificationMessage(student, index),
    unread: index < 3,
    childIds: [student.value],
    classNames: [student.className],
  })),
);

const ASSIGNMENT_SUBJECTS_CLASS_2 = [
  {
    id: '1',
    name: 'English',
    icon: 'book-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1345A3',
    pendingCount: 1,
    assignments: [
      {
        id: '1-1',
        title: 'Alphabet Writing Practice',
        teacher: 'Ms. Rabia Ansari',
        dueDate: '16 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
    ],
  },
  {
    id: '2',
    name: 'Mathematics',
    icon: 'calculator-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
    pendingCount: 1,
    assignments: [
      {
        id: '2-1',
        title: 'Numbers 1–20 Worksheet',
        teacher: 'Mr. Tariq Mehmood',
        dueDate: '17 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
    ],
  },
  {
    id: '3',
    name: 'Art',
    icon: 'color-palette-outline',
    iconBg: '#FFF4E5',
    iconColor: '#EA580C',
    pendingCount: 0,
    assignments: [
      {
        id: '3-1',
        title: 'Colour the Shapes',
        teacher: 'Ms. Rabia Ansari',
        dueDate: '12 Sep 2026',
        status: 'submitted',
        type: 'project',
      },
    ],
  },
];

const ASSIGNMENT_SUBJECTS_CLASS_4 = [
  {
    id: '1',
    name: 'English',
    icon: 'book-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1345A3',
    pendingCount: 1,
    assignments: [
      {
        id: '1-1',
        title: 'Paragraph Writing — My School',
        teacher: 'Ms. Sara Ali',
        dueDate: '16 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
    ],
  },
  {
    id: '2',
    name: 'Mathematics',
    icon: 'calculator-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
    pendingCount: 1,
    assignments: [
      {
        id: '2-1',
        title: 'Multiplication Tables 6–9',
        teacher: 'Mr. Hassan Raza',
        dueDate: '18 Sep 2026',
        status: 'pending',
        type: 'homework',
      },
    ],
  },
  {
    id: '3',
    name: 'Science',
    icon: 'flask-outline',
    iconBg: '#E8F8EE',
    iconColor: '#16A34A',
    pendingCount: 0,
    assignments: [
      {
        id: '3-1',
        title: 'Plants Around Us Chart',
        teacher: 'Ms. Hina Tariq',
        dueDate: '14 Sep 2026',
        status: 'submitted',
        type: 'project',
      },
    ],
  },
  {
    id: '4',
    name: 'Urdu',
    icon: 'language-outline',
    iconBg: '#F3E8FF',
    iconColor: '#7C3AED',
    pendingCount: 0,
    assignments: [
      {
        id: '4-1',
        title: 'Huroof e Tahaji Practice',
        teacher: 'Ms. Zainab Shah',
        dueDate: '10 Sep 2026',
        status: 'submitted',
        type: 'homework',
      },
    ],
  },
];

const ASSIGNMENT_OVERVIEW_BY_GRADE = {
  2: {total: 4, pending: 2, submitted: 2, overdue: 0},
  4: {total: 6, pending: 2, submitted: 4, overdue: 0},
  7: ASSIGNMENT_OVERVIEW,
};

const STUDENT_RESULTS_CLASS_2 = {
  [Strings.term1]: {
    overall: 'A',
    hint: 'Great start!',
    subjects: [
      {id: '1', name: 'English', grade: 'A', score: 90, color: '#2563EB'},
      {id: '2', name: 'Mathematics', grade: 'A-', score: 86, color: '#16A34A'},
      {id: '3', name: 'Science', grade: 'B+', score: 82, color: '#0D9488'},
      {id: '4', name: 'Art', grade: 'A+', score: 94, color: '#EA580C'},
    ],
  },
};

const STUDENT_RESULTS_CLASS_4 = {
  [Strings.term1]: {
    overall: 'A-',
    hint: 'Keep it up!',
    subjects: [
      {id: '1', name: 'English', grade: 'A', score: 88, color: '#2563EB'},
      {id: '2', name: 'Mathematics', grade: 'A-', score: 85, color: '#16A34A'},
      {id: '3', name: 'Science', grade: 'B+', score: 80, color: '#0D9488'},
      {id: '4', name: 'Urdu', grade: 'A', score: 87, color: '#7C3AED'},
      {id: '5', name: 'Art', grade: 'A+', score: 92, color: '#EA580C'},
    ],
  },
};

export const getAssignmentSubjectsForClass = className => {
  const grade = getClassGrade(className);
  if (grade <= 2) {
    return ASSIGNMENT_SUBJECTS_CLASS_2;
  }
  if (grade <= 4) {
    return ASSIGNMENT_SUBJECTS_CLASS_4;
  }
  if (grade >= 9) {
    return ASSIGNMENT_SUBJECTS;
  }
  return ASSIGNMENT_SUBJECTS;
};

export const getAssignmentOverviewForClass = className => {
  const grade = getClassGrade(className);
  if (grade <= 2) {
    return ASSIGNMENT_OVERVIEW_BY_GRADE[2];
  }
  if (grade <= 4) {
    return ASSIGNMENT_OVERVIEW_BY_GRADE[4];
  }
  return ASSIGNMENT_OVERVIEW_BY_GRADE[7];
};

export const getStudentResultsForClass = (className, term) => {
  const grade = getClassGrade(className);
  const key = term || Strings.term1;

  if (grade <= 2) {
    return STUDENT_RESULTS_CLASS_2[key] || STUDENT_RESULTS_CLASS_2[Strings.term1];
  }
  if (grade <= 4) {
    return STUDENT_RESULTS_CLASS_4[key] || STUDENT_RESULTS_CLASS_4[Strings.term1];
  }
  return STUDENT_RESULTS[key] || STUDENT_RESULTS[Strings.term1];
};

const TEACHER_PROFILE_KEYS = ['1', '2', '3'];

/** Attendance / linked students use ids like 6, 4, 7 — map each to a teacher profile. */
export const getTeachersForChild = childId => {
  if (TEACHERS_BY_STUDENT[childId]) {
    return TEACHERS_BY_STUDENT[childId];
  }

  const studentIndex = STUDENT_LIST.findIndex(item => item.value === childId);
  if (studentIndex >= 0) {
    const profileKey =
      TEACHER_PROFILE_KEYS[studentIndex % TEACHER_PROFILE_KEYS.length];
    return TEACHERS_BY_STUDENT[profileKey];
  }

  return TEACHERS_BY_STUDENT['1'];
};

export const getExamStudentForChild = (child, examStudents = []) => {
  if (!child) {
    return examStudents[0];
  }
  return (
    examStudents.find(item => item.value === child.value) || {
      value: child.value,
      label: child.label,
      initials: child.initials,
      classInfo: child.classBadge || child.classLabel,
      totalExams: child.examsUpcoming || '6',
      averageScore: '88',
      highestScore: '96',
      lowestScore: '72',
      nextExamSubject:
        getClassGrade(child.className) <= 4 ? 'English' : 'Mathematics',
      nextExamDate: 'Mon, 18 Sep',
      nextExamTime: '09:30 AM',
    }
  );
};

