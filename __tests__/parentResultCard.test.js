jest.mock('../src/api/axiosInstance', () => ({
  API_BASE_URL: 'https://ranglerz.click/eschool/public/api',
}));

import {API_BASE_URL} from '../src/api/axiosInstance';
import {childResultCardPrintUrl} from '../src/services/parentResultCardUrl';
import {
  classifyFetchedDocument,
  jsonDocumentMessage,
} from '../src/utils/documentResponse';

describe('Parent Result Card print URL', () => {
  it('uses the selected child id on the existing print endpoint', () => {
    expect(childResultCardPrintUrl(22)).toBe(
      `${API_BASE_URL}/parent/children/22/results/card/print`,
    );
    expect(childResultCardPrintUrl(22)).not.toBe(
      childResultCardPrintUrl(31),
    );
  });
});

describe('Parent Result Card document classification', () => {
  it('treats the live print HTML body as html, never pdf', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'text/html; charset=utf-8',
        bodyPreview: '<!DOCTYPE html><html><body><table><tr><td>Result</td></tr></table></body></html>',
      }).kind,
    ).toBe('html');
  });

  it('does not trust a PDF content-type when the body is HTML', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'application/pdf',
        bodyPreview: '<!DOCTYPE html><html><body>Result Card</body></html>',
      }).kind,
    ).toBe('html');
  });

  it('still recognizes a real PDF by magic bytes', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'application/pdf',
        bodyPreview: '%PDF-1.4\n%',
      }).kind,
    ).toBe('pdf');
  });

  it('surfaces unauthorized JSON instead of opening a viewer', () => {
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
