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

export const changeParentPassword = (fields, token) => {
  const form = toFormData({
    parent_current_password: fields.parent_current_password,
    parent_password: fields.parent_password,
    parent_password_confirmation: fields.parent_password_confirmation,
  });
  const config = {};
  if (token) {
    config.headers = {Authorization: `Bearer ${token}`};
  }

  return axiosInstance.post('/parent/password', form, config);
};
