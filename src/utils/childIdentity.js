export const asChildLabel = value => {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  if (typeof value === 'object') {
    return asChildLabel(
      value.name || value.title || value.section_name || value.class_name,
    );
  }
  const label = String(value).trim();
  return label === '[object Object]' ? '' : label;
};

const escapeRegExp = value =>
  asChildLabel(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const classIncludesSection = (className, section) => {
  const cls = asChildLabel(className);
  const sec = asChildLabel(section);
  if (!cls || !sec) {
    return false;
  }
  const trailingToken = new RegExp(`(?:^|[\\s\\-_./])${escapeRegExp(sec)}$`, 'i');
  if (trailingToken.test(cls)) {
    return true;
  }
  const compact = cls.replace(/\s+/g, '').toLowerCase();
  const compactSec = sec.replace(/\s+/g, '').toLowerCase();
  return compact.endsWith(compactSec) && compact.length > compactSec.length;
};

export const formatChildClassLabel = student => {
  const className = asChildLabel(
    student?.classLabel ||
      student?.className ||
      student?.classBadge ||
      student?.classInfo,
  );
  const section = asChildLabel(student?.sectionName);
  if (!className) {
    return section;
  }
  if (!section || classIncludesSection(className, section)) {
    return className;
  }
  return `${className} ${section}`;
};

export const formatChildClassRollLine = student => {
  const classLabel = formatChildClassLabel(student);
  const rollNo = asChildLabel(student?.rollNo || student?.roll_no);
  return [classLabel, rollNo ? `Roll ${rollNo}` : ''].filter(Boolean).join(' · ');
};

export const formatChildStatus = student => {
  const raw = asChildLabel(student?.status);
  const value = raw || (student?.label || student?.name ? 'Active' : '');
  return value.replace(/\b\w/g, char => char.toUpperCase());
};
