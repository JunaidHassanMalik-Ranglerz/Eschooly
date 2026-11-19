export const classifyFetchedDocument = ({contentType, bodyPreview} = {}) => {
  const type = String(contentType || '').toLowerCase();
  const preview = String(bodyPreview || '').trim();
  const head = preview.slice(0, 240).toLowerCase();

  if (preview.startsWith('%PDF-')) {
    return {kind: 'pdf'};
  }
  if (type.includes('json') || head.startsWith('{') || head.startsWith('[')) {
    return {kind: 'json'};
  }
  if (
    type.includes('html') ||
    head.startsWith('<!doctype html') ||
    head.startsWith('<html') ||
    /<title[\s>]/.test(head)
  ) {
    return {kind: 'html'};
  }
  if (type.includes('application/pdf') || type.includes('pdf')) {
    return {kind: 'pdf'};
  }
  if (head.startsWith('<')) {
    return {kind: 'html'};
  }
  return {kind: 'unknown'};
};

export const jsonDocumentMessage = body => {
  try {
    const parsed = JSON.parse(body);
    if (parsed && typeof parsed.message === 'string' && parsed.message) {
      return parsed.message;
    }
  } catch (error) {
    return '';
  }
  return '';
};
