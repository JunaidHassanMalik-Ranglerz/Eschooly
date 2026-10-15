const firstValidationError = errors => {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  const values = Object.values(errors);
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value === 'string' && value) {
      return value;
    }
    if (Array.isArray(value) && typeof value[0] === 'string' && value[0]) {
      return value[0];
    }
  }

  return null;
};

export const getApiErrorMessage = error => {
  const data = error?.response?.data;
  console.log('data', data);
  const validationMessage = firstValidationError(data?.errors);
  if (validationMessage) {
    return validationMessage;
  }

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message.trim();
  }

  if (error?.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }

  if (!error?.response && typeof error?.message === 'string' && error.message) {
    return error.message;
  }

  if (!error?.response) {
    return 'Network error. Please check your connection.';
  }

  return 'Unable to complete the request.';
};
