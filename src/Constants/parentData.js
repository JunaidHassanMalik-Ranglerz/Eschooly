export const PARENT_PROFILE = {
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

export const PARENT_CHILDREN = [
  {
    value: '1',
    label: 'Ahmed Hassan',
    initials: 'AHA',
    className: 'Class 7',
    section: 'B',
    classBadge: 'Class 7 - Section B',
    classInfo: 'Class 7 - Section B',
    meta: 'Class 7 - Section B · Roll 15',
    rollNo: '15',
    month: 'September 2026',
    present: '22',
    absent: '01',
    late: '02',
    leave: '00',
    rate: 0.96,
    rateText: '96%',
    todayStatus: 'Present',
    todayDate: 'Mon, 14 Sep 2026',
    homeworkPending: '5',
    examsUpcoming: '6',
    announcementsNew: '3',
  },
  {
    value: '2',
    label: 'Ayesha Hassan',
    initials: 'AYS',
    className: 'Class 4',
    section: 'A',
    classBadge: 'Class 4 - Section A',
    classInfo: 'Class 4 - Section A',
    meta: 'Class 4 - Section A · Roll 09',
    rollNo: '09',
    month: 'September 2026',
    present: '20',
    absent: '02',
    late: '01',
    leave: '01',
    rate: 0.91,
    rateText: '91%',
    todayStatus: 'Late',
    todayDate: 'Mon, 14 Sep 2026',
    homeworkPending: '3',
    examsUpcoming: '4',
    announcementsNew: '2',
  },
  {
    value: '3',
    label: 'Zain Hassan',
    initials: 'ZHN',
    className: 'Class 2',
    section: 'A',
    classBadge: 'Class 2 - Section A',
    classInfo: 'Class 2 - Section A',
    meta: 'Class 2 - Section A · Roll 07',
    rollNo: '07',
    month: 'September 2026',
    present: '21',
    absent: '01',
    late: '01',
    leave: '00',
    rate: 0.94,
    rateText: '94%',
    todayStatus: 'Present',
    todayDate: 'Mon, 14 Sep 2026',
    homeworkPending: '2',
    examsUpcoming: '3',
    announcementsNew: '1',
  },
];

export const PARENT_ATTENDANCE_HISTORY = {
  '1': [
    {id: '1', day: '14', shortDay: 'Mon', dateLabel: 'September 14', fullDay: 'Monday', status: 'Present'},
    {id: '2', day: '13', shortDay: 'Sun', dateLabel: 'September 13', fullDay: 'Sunday', status: 'Present'},
    {id: '3', day: '12', shortDay: 'Sat', dateLabel: 'September 12', fullDay: 'Saturday', status: 'Late'},
    {id: '4', day: '11', shortDay: 'Fri', dateLabel: 'September 11', fullDay: 'Friday', status: 'Present'},
    {id: '5', day: '10', shortDay: 'Thu', dateLabel: 'September 10', fullDay: 'Thursday', status: 'Absent'},
    {id: '6', day: '09', shortDay: 'Wed', dateLabel: 'September 09', fullDay: 'Wednesday', status: 'Present'},
  ],
  '2': [
    {id: '1', day: '14', shortDay: 'Mon', dateLabel: 'September 14', fullDay: 'Monday', status: 'Late'},
    {id: '2', day: '13', shortDay: 'Sun', dateLabel: 'September 13', fullDay: 'Sunday', status: 'Present'},
    {id: '3', day: '12', shortDay: 'Sat', dateLabel: 'September 12', fullDay: 'Saturday', status: 'Present'},
    {id: '4', day: '11', shortDay: 'Fri', dateLabel: 'September 11', fullDay: 'Friday', status: 'Absent'},
    {id: '5', day: '10', shortDay: 'Thu', dateLabel: 'September 10', fullDay: 'Thursday', status: 'Present'},
  ],
  '3': [
    {id: '1', day: '14', shortDay: 'Mon', dateLabel: 'September 14', fullDay: 'Monday', status: 'Present'},
    {id: '2', day: '13', shortDay: 'Sun', dateLabel: 'September 13', fullDay: 'Sunday', status: 'Present'},
    {id: '3', day: '12', shortDay: 'Sat', dateLabel: 'September 12', fullDay: 'Saturday', status: 'Present'},
    {id: '4', day: '11', shortDay: 'Fri', dateLabel: 'September 11', fullDay: 'Friday', status: 'Leave'},
    {id: '5', day: '10', shortDay: 'Thu', dateLabel: 'September 10', fullDay: 'Thursday', status: 'Present'},
  ],
};

export const PARENT_SCHEDULE = {
  '1': [
    {id: '1', subject: 'Mathematics', time: '08:00 AM - 09:00 AM', icon: 'calculator-outline', iconBg: '#EEF2FF', iconColor: '#2563EB', teacher: 'Mr. Ahmed Khan', room: 'Room 12'},
    {id: '2', subject: 'Science', time: '09:00 AM - 10:00 AM', icon: 'flask-outline', iconBg: '#E8F8EE', iconColor: '#16A34A', teacher: 'Ms. Hina Tariq', room: 'Lab 2'},
    {id: '3', subject: 'English', time: '10:30 AM - 11:30 AM', icon: 'book-outline', iconBg: '#F3E8FF', iconColor: '#7C3AED', teacher: 'Ms. Sara Ali', room: 'Room 08'},
  ],
  '2': [
    {id: '1', subject: 'English', time: '08:00 AM - 08:45 AM', icon: 'book-outline', iconBg: '#F3E8FF', iconColor: '#7C3AED', teacher: 'Ms. Sara Ali', room: 'Room 04'},
    {id: '2', subject: 'Mathematics', time: '09:00 AM - 09:45 AM', icon: 'calculator-outline', iconBg: '#EEF2FF', iconColor: '#2563EB', teacher: 'Mr. Hassan Raza', room: 'Room 04'},
    {id: '3', subject: 'Art', time: '10:00 AM - 10:45 AM', icon: 'color-palette-outline', iconBg: '#FFF4E5', iconColor: '#EA580C', teacher: 'Ms. Rabia Ansari', room: 'Art Room'},
  ],
  '3': [
    {id: '1', subject: 'English', time: '08:15 AM - 09:00 AM', icon: 'book-outline', iconBg: '#F3E8FF', iconColor: '#7C3AED', teacher: 'Ms. Rabia Ansari', room: 'Room 02'},
    {id: '2', subject: 'Mathematics', time: '09:00 AM - 09:45 AM', icon: 'calculator-outline', iconBg: '#EEF2FF', iconColor: '#2563EB', teacher: 'Mr. Tariq Mehmood', room: 'Room 02'},
    {id: '3', subject: 'Art', time: '10:00 AM - 10:45 AM', icon: 'color-palette-outline', iconBg: '#FFF4E5', iconColor: '#EA580C', teacher: 'Ms. Rabia Ansari', room: 'Art Room'},
  ],
};

export const PARENT_TIMETABLE = {
  '1': [
    {id: '1', period: '01', subject: 'Mathematics', time: '9:00 AM - 10:00 AM', teacher: 'Mr. Ahmed Khan', room: 'Room 12'},
    {id: '2', period: '02', subject: 'English', time: '10:00 AM - 11:00 AM', teacher: 'Ms. Sara Ali', room: 'Room 08'},
    {id: '3', period: '03', subject: 'Science', time: '11:00 AM - 12:00 PM', teacher: 'Ms. Hina Tariq', room: 'Lab 2'},
    {id: '4', period: '04', subject: 'Computer', time: '12:00 PM - 1:00 PM', teacher: 'Mr. Usman Farooq', room: 'Lab 1'},
  ],
  '2': [
    {id: '1', period: '01', subject: 'English', time: '9:00 AM - 10:00 AM', teacher: 'Ms. Sara Ali', room: 'Room 04'},
    {id: '2', period: '02', subject: 'Mathematics', time: '10:00 AM - 11:00 AM', teacher: 'Mr. Hassan Raza', room: 'Room 04'},
    {id: '3', period: '03', subject: 'Science', time: '11:00 AM - 12:00 PM', teacher: 'Ms. Hina Tariq', room: 'Room 04'},
    {id: '4', period: '04', subject: 'Art', time: '12:00 PM - 1:00 PM', teacher: 'Ms. Rabia Ansari', room: 'Art Room'},
  ],
  '3': [
    {id: '1', period: '01', subject: 'English', time: '9:00 AM - 9:45 AM', teacher: 'Ms. Rabia Ansari', room: 'Room 02'},
    {id: '2', period: '02', subject: 'Mathematics', time: '9:45 AM - 10:30 AM', teacher: 'Mr. Tariq Mehmood', room: 'Room 02'},
    {id: '3', period: '03', subject: 'Science', time: '11:00 AM - 11:45 AM', teacher: 'Ms. Hina Tariq', room: 'Room 02'},
    {id: '4', period: '04', subject: 'Art', time: '12:00 PM - 12:45 PM', teacher: 'Ms. Rabia Ansari', room: 'Art Room'},
  ],
};

export const PARENT_EXAM_SCHEDULE = {
  '1': [
    {
      id: '1',
      subject: 'Mathematics',
      date: 'Mon, 22 Sep 2026',
      time: '09:00 AM',
      duration: '90 min',
      venue: 'Hall A · Seat 15',
      type: 'Mid-Term',
      syllabus: 'Ch 1–4: Integers, Fractions, Linear Equations, Geometry basics',
    },
    {
      id: '2',
      subject: 'Science',
      date: 'Wed, 24 Sep 2026',
      time: '09:00 AM',
      duration: '90 min',
      venue: 'Hall B · Lab Block',
      type: 'Mid-Term',
      syllabus: 'Ch 1–3: Nutrition, Heat, Acids & Bases. Practical notebook required',
    },
    {
      id: '3',
      subject: 'English',
      date: 'Fri, 26 Sep 2026',
      time: '10:00 AM',
      duration: '75 min',
      venue: 'Room 08',
      type: 'Mid-Term',
      syllabus: 'Units 1–5: Unseen passage, Grammar, Letter writing, Poem “Daffodils”',
    },
    {
      id: '4',
      subject: 'Computer',
      date: 'Sat, 27 Sep 2026',
      time: '11:00 AM',
      duration: '60 min',
      venue: 'Lab 1',
      type: 'Practical',
      syllabus: 'MS Word, PowerPoint, Internet safety. Lab login will be provided',
    },
    {
      id: '5',
      subject: 'Urdu',
      date: 'Mon, 29 Sep 2026',
      time: '09:00 AM',
      duration: '60 min',
      venue: 'Room 08',
      type: 'Mid-Term',
      syllabus: 'Lessons 1–6, Mazmoon, Khaka, and seen poem from the textbook',
    },
    {
      id: '6',
      subject: 'Islamiat',
      date: 'Wed, 01 Oct 2026',
      time: '09:00 AM',
      duration: '45 min',
      venue: 'Room 12',
      type: 'Oral + Written',
      syllabus: 'Kalimas, Namaz steps, and short questions from Unit 1–2',
    },
  ],
  '2': [
    {
      id: '1',
      subject: 'English',
      date: 'Tue, 23 Sep 2026',
      time: '09:00 AM',
      duration: '45 min',
      venue: 'Room 04',
      type: 'Class Test',
      syllabus: 'Unit 2: Reading, 8 spellings, and 5 sentences on “My School”',
    },
    {
      id: '2',
      subject: 'Mathematics',
      date: 'Thu, 25 Sep 2026',
      time: '09:00 AM',
      duration: '45 min',
      venue: 'Room 04',
      type: 'Class Test',
      syllabus: 'Place value, addition/subtraction of 3-digit numbers, and shapes',
    },
    {
      id: '3',
      subject: 'Science',
      date: 'Mon, 28 Sep 2026',
      time: '09:30 AM',
      duration: '40 min',
      venue: 'Room 04',
      type: 'Quiz',
      syllabus: 'Plants, animals, and healthy food. Diagram of a plant part',
    },
    {
      id: '4',
      subject: 'Urdu',
      date: 'Wed, 30 Sep 2026',
      time: '09:00 AM',
      duration: '40 min',
      venue: 'Room 04',
      type: 'Class Test',
      syllabus: 'Sabaq 1–3, 10 words dictation, and 4 lines on “Mera Ghar”',
    },
  ],
  '3': [
    {
      id: '1',
      subject: 'English',
      date: 'Wed, 24 Sep 2026',
      time: '09:00 AM',
      duration: '35 min',
      venue: 'Room 02',
      type: 'Class Test',
      syllabus: 'Phonics a–z, 6 CVC words, and matching pictures to words',
    },
    {
      id: '2',
      subject: 'Mathematics',
      date: 'Fri, 26 Sep 2026',
      time: '09:00 AM',
      duration: '35 min',
      venue: 'Room 02',
      type: 'Class Test',
      syllabus: 'Counting 1–50, number names, and simple addition within 10',
    },
    {
      id: '3',
      subject: 'Urdu',
      date: 'Tue, 29 Sep 2026',
      time: '09:15 AM',
      duration: '30 min',
      venue: 'Room 02',
      type: 'Oral',
      syllabus: 'Haroof-e-tahajji, 5 two-letter words, and reciting the class rhyme',
    },
  ],
};

export const PARENT_ANNOUNCEMENTS = [
  {
    id: '1',
    category: 'Event',
    title: 'Annual Sports Day',
    message:
      'Annual Sports Day registration is now open for all classes. Parents are requested to confirm participation from the portal.',
    date: '18 Sep 2026',
    time: '08:00 AM',
    childIds: ['1', '2', '3'],
  },
  {
    id: '2',
    category: 'Notice',
    title: 'Mid-Term Exam Schedule Published',
    message:
      'The mid-term examination timetable is now available. Please review dates, subjects and venues for your child.',
    date: '14 Sep 2026',
    time: '10:00 AM',
    childIds: ['1', '2', '3'],
  },
  {
    id: '3',
    category: 'Update',
    title: 'Parent-Teacher Meeting',
    message:
      'PTM is scheduled for all classes. Kindly confirm your attendance with the school administration.',
    date: '20 Sep 2026',
    time: '11:00 AM',
    childIds: ['1', '2', '3'],
  },
  {
    id: '4',
    category: 'Notice',
    title: 'Library Books Return',
    message:
      'Students of Class 7 must return borrowed library books before 30 September.',
    date: '12 Sep 2026',
    time: '09:00 AM',
    childIds: ['1'],
  },
];

export const PARENT_NOTIFICATIONS = [
  {
    id: '1',
    type: 'academic',
    title: 'New Homework Assigned',
    message:
      'Mathematics homework for Chapter 4 is assigned for tomorrow. Please complete exercise 4.2 and upload it before class.',
    date: 'Today',
    time: '2h ago',
    icon: 'document-text-outline',
    iconBg: '#EEF2FF',
    iconColor: '#2563EB',
    unread: true,
    childIds: ['1'],
  },
  {
    id: '2',
    type: 'academic',
    title: 'Exam Schedule Published',
    message:
      'Mid-term exam schedule is now available. Science paper is on 22 Sep at 9:00 AM. Check the Exam section for the full timetable.',
    date: 'Today',
    time: '5h ago',
    icon: 'calendar-outline',
    iconBg: '#FFF4E5',
    iconColor: '#EA580C',
    unread: true,
    childIds: ['1', '2', '3'],
  },
  {
    id: '3',
    type: 'general',
    title: 'School Announcement',
    message:
      'Annual Sports Day registration is now open for all classes. Confirm your child’s participation from the portal before Friday.',
    date: 'Yesterday',
    time: '1d ago',
    icon: 'megaphone-outline',
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
    unread: false,
    childIds: ['1', '2', '3'],
  },
  {
    id: '4',
    type: 'academic',
    title: 'Diary Update',
    message:
      'A new entry has been added in your child’s daily diary. Please review the teacher note and acknowledge it from Parent Diary.',
    date: 'Yesterday',
    time: '1d ago',
    icon: 'journal-outline',
    iconBg: '#CFFAFE',
    iconColor: '#0891B2',
    unread: false,
    childIds: ['1'],
  },
  {
    id: '5',
    type: 'academic',
    title: 'Result Published',
    message:
      'Term test results are now available. Overall grade is A (92%). Open Results to review subject-wise marks and teacher remarks.',
    date: '13 Sep',
    time: '2d ago',
    icon: 'trophy-outline',
    iconBg: '#F3E8FF',
    iconColor: '#7C3AED',
    unread: false,
    childIds: ['1', '2', '3'],
  },
  {
    id: '6',
    type: 'general',
    title: 'Teacher Message',
    message:
      'You have a new message from Mr. Salman Khan. Open Chat to reply and stay updated on class progress and upcoming work.',
    date: '12 Sep',
    time: '2d ago',
    icon: 'chatbubble-ellipses-outline',
    iconBg: '#E8F8EE',
    iconColor: '#16A34A',
    unread: false,
    childIds: ['1'],
  },
];

export const PARENT_DIARY = {
  '1': [
    {
      id: '1',
      name: 'Mr. Ahmed Khan',
      initials: 'AK',
      time: 'Today, 11:40 AM',
      message:
        'Ahmed completed Exercise 4.2 in class with good accuracy. Please finish Q7–Q10 at home and bring the notebook tomorrow for checking.',
    },
    {
      id: '2',
      name: 'Ms. Hina Tariq',
      initials: 'HT',
      time: 'Today, 09:20 AM',
      message:
        'Science practical is on Wednesday. Ahmed should revise Heat (Ch 2) and bring the lab coat plus practical notebook.',
    },
    {
      id: '3',
      name: 'Ms. Sara Ali',
      initials: 'SA',
      time: 'Yesterday, 02:15 PM',
      message:
        'English letter-writing draft was collected. Please help Ahmed rewrite the formal letter with a correct heading and closing.',
    },
    {
      id: '4',
      name: 'Mr. Usman Farooq',
      initials: 'UF',
      time: '13 Sep, 12:30 PM',
      message:
        'Computer lab work: create a 5-slide PowerPoint on Internet Safety. File name should be Ahmed_Hassan_7B.pptx.',
    },
    {
      id: '5',
      name: 'Ms. Ayesha Khan',
      initials: 'AY',
      time: '12 Sep, 10:05 AM',
      message:
        'Class teacher note: Ahmed was punctual this week. Mid-term seating is Hall A, Seat 15. Admit card will be issued on 19 Sep.',
    },
  ],
  '2': [
    {
      id: '1',
      name: 'Ms. Sara Ali',
      initials: 'SA',
      time: 'Today, 10:50 AM',
      message:
        'Ayesha read Unit 2 fluently in class. Please practice 8 spellings from the list and write 5 sentences on “My School”.',
    },
    {
      id: '2',
      name: 'Mr. Hassan Raza',
      initials: 'HR',
      time: 'Today, 09:35 AM',
      message:
        'Math worksheet on 3-digit addition is due tomorrow. Ayesha should show carry-over steps clearly in her copy.',
    },
    {
      id: '3',
      name: 'Ms. Rabia Ansari',
      initials: 'RA',
      time: 'Yesterday, 01:10 PM',
      message:
        'Art period: please send crayons, a glue stick, and an old magazine for the collage activity tomorrow.',
    },
    {
      id: '4',
      name: 'Ms. Hina Tariq',
      initials: 'HT',
      time: '13 Sep, 11:00 AM',
      message:
        'Science quiz is on 28 Sep. Revise plants and healthy food. Ayesha should also practice labelling a plant diagram.',
    },
  ],
  '3': [
    {
      id: '1',
      name: 'Ms. Rabia Ansari',
      initials: 'RA',
      time: 'Today, 11:15 AM',
      message:
        'Zain recited the class rhyme confidently. Please read the English picture book for 10 minutes tonight and circle 4 CVC words.',
    },
    {
      id: '2',
      name: 'Mr. Tariq Mehmood',
      initials: 'TM',
      time: 'Yesterday, 09:40 AM',
      message:
        'Counting 1–50 is improving. Practice number names 11–20 with flashcards. The class test is on Friday, 26 Sep.',
    },
    {
      id: '3',
      name: 'Ms. Hina Tariq',
      initials: 'HT',
      time: '13 Sep, 12:05 PM',
      message:
        'Please send a labelled water bottle and extra stationery. Zain left his pencil box in class and borrowed from a friend today.',
    },
    {
      id: '4',
      name: 'Ms. Rabia Ansari',
      initials: 'RA',
      time: '12 Sep, 02:00 PM',
      message:
        'Urdu oral test is on 29 Sep. Practice haroof-e-tahajji and 5 two-letter words. A short rhyme recitation is also included.',
    },
  ],
};

export const PARENT_FEES = {
  '1': {
    dueAmount: 'Rs. 12,500',
    dueDate: 'Dec 15, 2024',
    term: 'Term 2 Fee',
    challanNo: 'CH-2026-0412',
    month: 'December 2024',
    status: 'Due Soon',
    school: {
      dueAmount: 'Rs. 12,500',
      dueDate: 'Dec 15, 2024',
      term: 'Term 2 Fee',
    },
    transport: {
      dueAmount: 'Rs. 3,000',
      dueDate: 'Dec 20, 2024',
      term: 'Transport Fee',
    },
    details: [
      {id: '1', title: 'Tuition Fee', amount: 'Rs. 8,000'},
      {id: '2', title: 'Lab Fee', amount: 'Rs. 2,500'},
      {id: '3', title: 'Exam Fee', amount: 'Rs. 2,000'},
    ],
    history: [
      {id: '1', title: 'Term 1 Fee', date: '15 Aug 2024', amount: 'Rs. 12,500', status: 'Paid'},
      {id: '2', title: 'Lab Fee', date: '10 Jul 2024', amount: 'Rs. 2,500', status: 'Paid'},
    ],
    receipts: [
      {id: '1', title: 'Term 1 Challan', date: '15 Aug 2024', type: 'Challan'},
      {id: '2', title: 'Term 1 Receipt', date: '16 Aug 2024', type: 'Receipt'},
    ],
  },
  '2': {
    dueAmount: 'Rs. 8,200',
    dueDate: 'Dec 15, 2024',
    term: 'Term 2 Fee',
    challanNo: 'CH-2026-0187',
    month: 'December 2024',
    status: 'Due Soon',
    school: {
      dueAmount: 'Rs. 8,200',
      dueDate: 'Dec 15, 2024',
      term: 'Term 2 Fee',
    },
    transport: {
      dueAmount: 'Rs. 2,400',
      dueDate: 'Dec 20, 2024',
      term: 'Transport Fee',
    },
    details: [
      {id: '1', title: 'Tuition Fee', amount: 'Rs. 6,000'},
      {id: '2', title: 'Lab Fee', amount: 'Rs. 1,200'},
      {id: '3', title: 'Exam Fee', amount: 'Rs. 1,000'},
    ],
    history: [
      {id: '1', title: 'Term 1 Fee', date: '14 Aug 2024', amount: 'Rs. 8,200', status: 'Paid'},
    ],
    receipts: [
      {id: '1', title: 'Term 1 Receipt', date: '15 Aug 2024', type: 'Receipt'},
    ],
  },
  '3': {
    dueAmount: 'Rs. 6,800',
    dueDate: 'Dec 15, 2024',
    term: 'Term 2 Fee',
    challanNo: 'CH-2026-0294',
    month: 'December 2024',
    status: 'Due Soon',
    school: {
      dueAmount: 'Rs. 6,800',
      dueDate: 'Dec 15, 2024',
      term: 'Term 2 Fee',
    },
    transport: {
      dueAmount: 'Rs. 2,200',
      dueDate: 'Dec 20, 2024',
      term: 'Transport Fee',
    },
    details: [
      {id: '1', title: 'Tuition Fee', amount: 'Rs. 5,000'},
      {id: '2', title: 'Lab Fee', amount: 'Rs. 800'},
      {id: '3', title: 'Exam Fee', amount: 'Rs. 1,000'},
    ],
    history: [
      {id: '1', title: 'Term 1 Fee', date: '14 Aug 2024', amount: 'Rs. 6,800', status: 'Paid'},
    ],
    receipts: [
      {id: '1', title: 'Term 1 Receipt', date: '15 Aug 2024', type: 'Receipt'},
    ],
  },
};

export const PARENT_TRANSPORT = {
  '1': {
    busName: 'Al-Hamd School Bus',
    busNo: 'BSA-786',
    status: 'On Route',
    etaTitle: 'Bus Approaching',
    etaSubtitle: '5 mins away',
    driverName: 'Mr. Salman Khan',
    driverContact: '0300 1234567',
    pickupTime: '07:15 AM',
    dropTime: '02:30 PM',
  },
  '2': {
    busName: 'Al-Hamd School Bus',
    busNo: 'BSA-241',
    status: 'On Route',
    etaTitle: 'Bus Approaching',
    etaSubtitle: '8 mins away',
    driverName: 'Mr. Ali Raza',
    driverContact: '0300 7654321',
    pickupTime: '07:30 AM',
    dropTime: '02:15 PM',
  },
  '3': {
    busName: 'Al-Hamd School Bus',
    busNo: 'BSA-118',
    status: 'On Route',
    etaTitle: 'Bus Approaching',
    etaSubtitle: '6 mins away',
    driverName: 'Mr. Imran Ali',
    driverContact: '0300 1122334',
    pickupTime: '07:40 AM',
    dropTime: '02:00 PM',
  },
};

export const PARENT_CHAT_USER = {
  name: 'School Admin',
  initials: 'SA',
};

export const getChildRecords = (map, childId) =>
  map?.[childId] || map?.['1'] || [];
