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
          {id: '2-2', title: 'Triangles', duration: '2h', status: 'in_progress'},
          {id: '2-3', title: 'Circles', duration: '1.5h', status: 'pending'},
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
          {id: '3-2', title: 'Identities', duration: '1.5h', status: 'pending'},
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
          {id: '4-1', title: 'Mean & Median', duration: '2h', status: 'in_progress'},
          {id: '4-2', title: 'Probability', duration: '1.5h', status: 'pending'},
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
        topics: [],
      },
      {
        id: '2',
        number: '02',
        title: 'Chapter 2 — Force & Laws',
        meta: '8 topics · 12 hours',
        progress: 0.4,
        percentText: '40%',
        topics: [],
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
        topics: [],
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
        topics: [],
      },
    ],
  },
];

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
    overall: 'A',
    hint: 'Great Progress!',
    subjects: [
      {id: '1', name: 'Mathematics', grade: 'A+', score: 94, color: '#16A34A'},
      {id: '2', name: 'Science', grade: 'A+', score: 93, color: '#2563EB'},
      {id: '3', name: 'English', grade: 'A', score: 89, color: '#7C3AED'},
      {id: '4', name: 'Computer', grade: 'A', score: 90, color: '#0D9488'},
      {id: '5', name: 'Islamic Studies', grade: 'A-', score: 85, color: '#EA580C'},
    ],
  },
};
