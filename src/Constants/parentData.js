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
    examsUpcoming: '2',
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
    examsUpcoming: '1',
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
    examsUpcoming: '1',
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
    {id: '1', subject: 'Mathematics', date: 'Mon, 22 Sep 2026', time: '09:00 AM', duration: '90 min', venue: 'Hall A', type: 'Mid-Term', syllabus: 'Chapters 1 - 4'},
    {id: '2', subject: 'Science', date: 'Wed, 24 Sep 2026', time: '09:00 AM', duration: '90 min', venue: 'Hall B', type: 'Mid-Term', syllabus: 'Chapters 1 - 3'},
    {id: '3', subject: 'English', date: 'Fri, 26 Sep 2026', time: '10:00 AM', duration: '60 min', venue: 'Room 08', type: 'Mid-Term', syllabus: 'Unit 1 - 5'},
    {id: '4', subject: 'Urdu', date: 'Mon, 29 Sep 2026', time: '09:00 AM', duration: '60 min', venue: 'Room 08', type: 'Mid-Term', syllabus: 'Lessons 1 - 6'},
  ],
  '2': [
    {id: '1', subject: 'English', date: 'Tue, 23 Sep 2026', time: '09:00 AM', duration: '45 min', venue: 'Room 04', type: 'Class Test', syllabus: 'Unit 2'},
    {id: '2', subject: 'Mathematics', date: 'Thu, 25 Sep 2026', time: '09:00 AM', duration: '45 min', venue: 'Room 04', type: 'Class Test', syllabus: 'Numbers & Shapes'},
  ],
  '3': [
    {id: '1', subject: 'English', date: 'Wed, 24 Sep 2026', time: '09:00 AM', duration: '40 min', venue: 'Room 02', type: 'Class Test', syllabus: 'Unit 1'},
    {id: '2', subject: 'Mathematics', date: 'Fri, 26 Sep 2026', time: '09:00 AM', duration: '40 min', venue: 'Room 02', type: 'Class Test', syllabus: 'Addition & Subtraction'},
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
    message: 'Mathematics homework has been assigned for tomorrow.',
    time: '2h ago',
    icon: 'document-text-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
    unread: true,
    childIds: ['1'],
  },
  {
    id: '2',
    type: 'academic',
    title: 'Exam Schedule Published',
    message: 'Mid-term exam schedule is now available.',
    time: '5h ago',
    icon: 'calendar-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
    unread: true,
    childIds: ['1', '2', '3'],
  },
  {
    id: '3',
    type: 'general',
    title: 'School Announcement',
    message: 'Annual Sports Day registration is now open.',
    time: '1d ago',
    icon: 'megaphone-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
    unread: false,
    childIds: ['1', '2', '3'],
  },
  {
    id: '4',
    type: 'academic',
    title: 'Diary Update',
    message: "New entry added in your child's daily diary.",
    time: '1d ago',
    icon: 'journal-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
    unread: false,
    childIds: ['1'],
  },
  {
    id: '5',
    type: 'academic',
    title: 'Result Published',
    message: 'Term test results are now available.',
    time: '2d ago',
    icon: 'bar-chart-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
    unread: false,
    childIds: ['1', '2', '3'],
  },
  {
    id: '6',
    type: 'general',
    title: 'Teacher Message',
    message: 'You have a new message from Mr. Salman Khan.',
    time: '2d ago',
    icon: 'chatbubble-ellipses-outline',
    iconBg: '#EEF2FF',
    iconColor: '#1A4F9C',
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
      time: '2h ago',
      message: 'Mathematics homework assigned for tomorrow. Please complete exercise 4.2.',
    },
    {
      id: '2',
      name: 'Ms. Hina Tariq',
      initials: 'HT',
      time: '1d ago',
      message: 'Science quiz will be held on Wednesday. Revise chapters 1 and 2.',
    },
  ],
  '2': [
    {
      id: '1',
      name: 'Ms. Sara Ali',
      initials: 'SA',
      time: '3h ago',
      message: 'Please bring art supplies for tomorrow\'s creative activity.',
    },
  ],
  '3': [
    {
      id: '1',
      name: 'Ms. Rabia Ansari',
      initials: 'RA',
      time: '4h ago',
      message: 'Please complete the English reading worksheet for tomorrow.',
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
