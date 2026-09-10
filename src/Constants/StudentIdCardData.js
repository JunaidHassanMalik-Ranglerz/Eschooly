const ID_CARD_DEFAULT = {
  initials: 'AH',
  name: 'Ahmed Hassan',
  status: 'Active',
  summaryLine: 'Class 10A · Roll No. 15',
  schoolName: 'E-School',
  schoolTagline: 'Empowering Education',
  academicYear: '2024-25',
  role: 'Student',
  class: '10A',
  section: 'B',
  rollNo: '15',
  studentId: 'STU-2024-047',
  schoolLine: 'E-School International Academy',
  cityLine: 'Kabul, Afghanistan',
  dateOfIssue: 'Apr 12, 2024',
  validUntil: 'Mar 31, 2025',
  classSectionValue: 'Class 10A · B',
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
    initials: student.initials || ID_CARD_DEFAULT.initials,
    name: student.label || ID_CARD_DEFAULT.name,
    studentId: student.studentId || ID_CARD_DEFAULT.studentId,
    section,
    summaryLine: `${classLabel} · Roll No. ${rollNo}`,
    classSectionValue: `${classLabel} · ${section}`,
  };
};
