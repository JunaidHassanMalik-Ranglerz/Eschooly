jest.mock('../src/api/axiosInstance', () => ({
  API_BASE_URL: 'https://ranglerz.click/eschool/public/api',
}));

import {API_BASE_URL} from '../src/api/axiosInstance';
import {studentAssignmentAttachmentDownloadUrl} from '../src/services/studentAssignmentDocument';
import {
  classifyFetchedDocument,
  jsonDocumentMessage,
} from '../src/utils/documentResponse';

describe('Student assignment attachment download URL', () => {
  it('uses the selected assignment and file ids on the existing download endpoint', () => {
    expect(studentAssignmentAttachmentDownloadUrl(41, 88)).toBe(
      `${API_BASE_URL}/student/assignments/41/attachments/88/download`,
    );
    expect(studentAssignmentAttachmentDownloadUrl(41, 88)).not.toBe(
      studentAssignmentAttachmentDownloadUrl(41, 99),
    );
  });
});

describe('Student assignment document classification', () => {
  it('treats a real PDF signature as pdf', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'application/pdf',
        bodyPreview: '%PDF-1.4\n%',
      }).kind,
    ).toBe('pdf');
  });

  it('does not treat HTML error or print pages as pdf', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'text/html; charset=utf-8',
        bodyPreview: '<!DOCTYPE html><html><body>Login</body></html>',
      }).kind,
    ).toBe('html');
  });

  it('does not treat JSON errors as pdf even when the filename ends with .pdf', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'application/json',
        bodyPreview: '{"success":false,"message":"Unauthenticated."}',
      }).kind,
    ).toBe('json');
    expect(jsonDocumentMessage('{"message":"Unauthenticated."}')).toBe(
      'Unauthenticated.',
    );
  });
});
