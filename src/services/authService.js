import axiosInstance from '../api/axiosInstance';

const asObject = value =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : null;

const stringOrNull = value =>
  typeof value === 'string' && value.trim() ? value.trim() : null;

const slimParent = parent => {
  if (!parent) {
    return null;
  }

  const user = {};
  ['id', 'family_id', 'school_id', 'cnic', 'status', 'name', 'email', 'phone'].forEach(
    key => {
      if (parent[key] !== undefined && parent[key] !== null && parent[key] !== '') {
        user[key] = parent[key];
      }
    },
  );

  return Object.keys(user).length ? user : null;
};

export const mapParentLogin = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data);
  const parent =
    asObject(root.parent) ||
    asObject(root.user) ||
    asObject(data?.parent) ||
    asObject(data?.user);
  const token =
    stringOrNull(root.token) ||
    stringOrNull(root.access_token) ||
    stringOrNull(data?.token) ||
    stringOrNull(data?.access_token);
  const tokenType =
    stringOrNull(root.token_type) || stringOrNull(data?.token_type) || 'Bearer';

  const rawMessage = stringOrNull(root.message);
  const message =
    !rawMessage || rawMessage === 'parent.api.logged_in'
      ? 'Signed in successfully.'
      : rawMessage;

  return {
    token,
    tokenType,
    role: 'parent',
    user: slimParent(parent),
    message,
  };
};

const toFormData = fields => {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      form.append(key, String(value));
    }
  });
  return form;
};

export const parentLogin = ({familyId, password}) => {
  const form = toFormData({
    id: familyId,
    password,
  });

  return axiosInstance.post('/parent/login', form);
};

const slimStudent = student => {
  if (!student) {
    return null;
  }

  const user = {};
  ['id', 'student_id', 'admission_no', 'school_id', 'name', 'full_name', 'email', 'phone', 'class_name', 'section', 'roll_no'].forEach(
    key => {
      if (student[key] !== undefined && student[key] !== null && student[key] !== '') {
        user[key] = student[key];
      }
    },
  );

  return Object.keys(user).length ? user : null;
};

const humanAuthMessage = (rawMessage, fallback) => {
  const message = stringOrNull(rawMessage);
  if (!message || message.includes('.api.')) {
    return fallback;
  }
  return message;
};

export const mapStudentLogin = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data);
  const student =
    asObject(root.student) ||
    asObject(root.user) ||
    asObject(data?.student) ||
    asObject(data?.user);
  const token =
    stringOrNull(root.token) ||
    stringOrNull(root.access_token) ||
    stringOrNull(data?.token) ||
    stringOrNull(data?.access_token);
  const tokenType =
    stringOrNull(root.token_type) || stringOrNull(data?.token_type) || 'Bearer';

  return {
    token,
    tokenType,
    role: 'student',
    user: slimStudent(student),
    message: humanAuthMessage(root.message, 'Signed in successfully.'),
  };
};

export const studentLogin = ({studentId, password}) => {
  const form = toFormData({
    student_id: studentId,
    password,
  });

  return axiosInstance.post('/student/login', form);
};

export const changeStudentPassword = fields => {
  const form = toFormData({
    current_password: fields.current_password,
    password: fields.password,
    password_confirmation: fields.password_confirmation,
  });

  return axiosInstance.post('/student/password', form);
};

export const studentLogout = () => axiosInstance.post('/student/logout');

export const changeParentPassword = fields => {
  const form = toFormData({
    parent_current_password: fields.parent_current_password,
    parent_password: fields.parent_password,
    parent_password_confirmation: fields.parent_password_confirmation,
  });

  return axiosInstance.post('/parent/password', form);
};

const HIDDEN_PROFILE_KEYS = new Set([
  'id',
  'password',
  'token',
  'access_token',
  'remember_token',
  'school_id',
  'profile',
  'family',
  'school',
  'user',
  'parent',
]);

const PROFILE_LABELS = {
  cnic: 'CNIC Number',
  email: 'Email',
  phone: 'Phone Number',
  mobile: 'Phone Number',
  address: 'Address',
  father_name: 'Father Name',
  gender: 'Gender',
  occupation: 'Occupation',
  emergency_contact: 'Emergency Contact',
  emergency_phone: 'Emergency Contact',
  nationality: 'Nationality',
  family_id: 'Family ID',
  status: 'Status',
  date_of_issue: 'Date of Issue',
  issued_at: 'Date of Issue',
  valid_until: 'Valid Until',
  expires_at: 'Valid Until',
  created_at: 'Account Since',
  last_login_at: 'Last Login',
  name: 'Name',
  full_name: 'Name',
  children: 'Linked Children',
};

const labelForKey = key =>
  PROFILE_LABELS[key] ||
  key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());

const displayValue = value => {
  if (Array.isArray(value)) {
    const names = value
      .map(item => {
        if (typeof item === 'string' || typeof item === 'number') {
          return String(item);
        }
        if (item && typeof item === 'object') {
          return item.name || item.full_name || item.label || '';
        }
        return '';
      })
      .filter(Boolean);
    return names.join(', ');
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return '';
};

const addDetail = (details, seen, key, value) => {
  const text = displayValue(value);
  if (!text || seen.has(key) || HIDDEN_PROFILE_KEYS.has(key)) {
    return;
  }
  if (key.includes('password') || key.includes('token')) {
    return;
  }
  seen.add(key);
  details.push({key, label: labelForKey(key), value: text});
};

const collectDetails = (...sources) => {
  const details = [];
  const seen = new Set();
  sources.forEach(source => {
    const record = asObject(source);
    if (!record) {
      return;
    }
    Object.entries(record).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        addDetail(details, seen, key === 'students' ? 'children' : key, value);
        return;
      }
      if (value && typeof value === 'object') {
        return;
      }
      addDetail(details, seen, key, value);
    });
  });
  return details;
};

const firstText = (...values) => {
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
    if (typeof value === 'number') {
      return String(value);
    }
  }
  return '';
};

const initialsFromName = name =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');

export const mapParentProfile = body => {
  const root = asObject(body) || {};
  const data = asObject(root.data) || root;
  const parent = asObject(data.parent) || asObject(data.user) || data;
  const profile = asObject(parent.profile) || asObject(data.profile) || {};
  const family = asObject(parent.family) || asObject(data.family) || {};
  const name = firstText(
    profile.name,
    profile.full_name,
    parent.name,
    parent.full_name,
    family.name,
  );
  const mapped = {};

  if (name) {
    mapped.label = name;
    mapped.initials = initialsFromName(name);
  }

  const fields = {
    cnic: firstText(profile.cnic, parent.cnic, family.cnic),
    email: firstText(profile.email, parent.email, family.email),
    phone: firstText(
      profile.phone,
      profile.mobile,
      parent.phone,
      parent.mobile,
      family.phone,
    ),
    address: firstText(profile.address, parent.address, family.address),
    fatherName: firstText(
      profile.father_name,
      parent.father_name,
      family.father_name,
    ),
    gender: firstText(profile.gender, parent.gender, family.gender),
    dateOfIssue: firstText(
      profile.date_of_issue,
      profile.issued_at,
      parent.date_of_issue,
    ),
    validUntil: firstText(
      profile.valid_until,
      profile.expires_at,
      parent.valid_until,
    ),
    familyId: firstText(parent.family_id, profile.family_id, family.family_id),
  };

  Object.entries(fields).forEach(([key, value]) => {
    if (value) {
      mapped[key] = value;
    }
  });

  if (parent.id !== undefined && parent.id !== null) {
    mapped.id = parent.id;
  }
  if (parent.school_id !== undefined && parent.school_id !== null) {
    mapped.schoolId = parent.school_id;
  }

  const school = asObject(parent.school) || asObject(data.school);
  mapped.details = collectDetails(profile, parent, family, {
    children: parent.children || parent.students || family.children || family.students,
    school: school?.name,
  });

  return mapped;
};

export const parentProfile = () => axiosInstance.get('/parent/profile');

export const parentLogout = () => axiosInstance.post('/parent/logout');
