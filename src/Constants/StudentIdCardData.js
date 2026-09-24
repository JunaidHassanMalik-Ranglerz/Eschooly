const ID_CARD_DEFAULT = {
  value: '1',
  initials: 'BKH',
  name: 'Bilal Khaliq',
  gender: 'Male',
  status: 'Active',
  summaryLine: 'Class 7 · Roll No. 12',
  schoolName: 'E-School',
  schoolTagline: 'Empowering Education',
  academicYear: '2025-26',
  role: 'Student',
  class: 'Class 7',
  section: 'B',
  rollNo: '12',
  studentId: 'SCH-2025-0412',
  schoolLine: 'E-School International Academy',
  cityLine: 'Islamabad, Pakistan',
  dateOfIssue: 'Apr 12, 2025',
  validUntil: 'Mar 31, 2026',
  classSectionValue: 'Class 7 · B',
  classBadge: 'Class 7 - B',
  classInfo: 'Class 7 · Section B',
};

export const getIdCardData = student => {
  if (!student) {
    return ID_CARD_DEFAULT;
  }

  const classLabel = student.className || ID_CARD_DEFAULT.class;
  const rollNo = student.rollNo || ID_CARD_DEFAULT.rollNo;
  const section = student.section || ID_CARD_DEFAULT.section;

  return {
    ...ID_CARD_DEFAULT,
    value: student.value || ID_CARD_DEFAULT.value,
    initials: student.initials || ID_CARD_DEFAULT.initials,
    name: student.label || student.name || ID_CARD_DEFAULT.name,
    gender: student.gender || ID_CARD_DEFAULT.gender,
    photo: student.photo,
    photoUrl: student.photoUrl,
    classBadge: student.classBadge || `${classLabel} - ${section}`,
    classInfo: student.classInfo || `${classLabel} · Section ${section}`,
    studentId: student.studentId || ID_CARD_DEFAULT.studentId,
    section,
    summaryLine: `${classLabel} · Roll No. ${rollNo}`,
    class: classLabel,
    classSectionValue: `${classLabel} · ${section}`,
    rollNo,
  };
};
