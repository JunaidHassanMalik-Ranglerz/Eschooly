jest.mock('../src/api/axiosInstance', () => ({
  API_BASE_URL: 'https://ranglerz.click/eschool/public/api',
}));

import {
  childFeeChallanDownloadUrl,
  childFeeReceiptDownloadUrl,
  mapChildFees,
} from '../src/services/parentFeesMapper';
import {API_BASE_URL} from '../src/api/axiosInstance';
import {
  classifyFetchedDocument,
  jsonDocumentMessage,
} from '../src/utils/documentResponse';

describe('Parent fees mapping', () => {
  it('maps child, charges, challans, receipts and combined documents from a Laravel envelope', () => {
    const mapped = mapChildFees({
      success: true,
      data: {
        child: {id: 22, name: 'Ayesha Noor', class_name: '10'},
        summary: {
          title: 'Term 2 Fee',
          due_amount: '12500',
          currency: 'PKR',
          due_date: '2024-12-15',
          status: 'pending',
        },
        charges: [
          {
            id: 329,
            title: 'Term 2 Tuition',
            amount: '12500',
            due_amount: '12500',
            due_date: '2024-12-15',
            status: 'pending',
            category: 'school',
          },
          {
            charge_id: 410,
            title: 'Bus Fee',
            amount: '3000',
            status: 'unpaid',
            category: 'transport',
          },
        ],
        challans: [
          {
            charge_id: 329,
            title: 'Term 2 Challan',
            date: '2024-08-15',
            amount: '12500',
            status: 'unpaid',
          },
        ],
        receipts: [
          {
            payment_id: 88,
            title: 'Term 1 Receipt',
            paid_at: '2024-08-16',
            amount: '12500',
            status: 'paid',
          },
        ],
      },
    });

    expect(mapped.child.value).toBe('22');
    expect(mapped.child.label).toBe('Ayesha Noor');
    expect(mapped.summary.dueAmount).toBe('PKR 12500');
    expect(mapped.summary.status).toBe('Pending');
    expect(mapped.charges).toHaveLength(2);
    expect(mapped.charges[0].chargeId).toBe('329');
    expect(mapped.charges[0].category).toBe('school');
    expect(mapped.charges[1].chargeId).toBe('410');
    expect(mapped.charges[1].category).toBe('transport');
    expect(mapped.challans[0].chargeId).toBe('329');
    expect(mapped.challans[0].paymentId).toBe('');
    expect(mapped.challans[0].kind).toBe('challan');
    expect(mapped.receipts[0].paymentId).toBe('88');
    expect(mapped.receipts[0].chargeId).toBe('');
    expect(mapped.receipts[0].kind).toBe('receipt');
    expect(mapped.history).toHaveLength(1);
    expect(mapped.history[0].paymentId).toBe('88');
    expect(mapped.documents.map(item => item.id)).toEqual([
      'challan:329',
      'receipt:88',
    ]);
  });

  it('does not invent Paid/Pending/Overdue or use array indexes as download IDs', () => {
    const mapped = mapChildFees({
      data: {
        challans: [{title: 'No ID challan', amount: '1'}],
        receipts: [{id: 17, title: 'April Receipt'}],
      },
    });

    expect(mapped.challans).toHaveLength(0);
    expect(mapped.charges.filter(item => item.chargeId === '0')).toHaveLength(0);
    expect(mapped.receipts[0].paymentId).toBe('17');
    expect(mapped.receipts[0].status).toBe('');
  });

  it('dedupes combined documents by kind plus backend id', () => {
    const mapped = mapChildFees({
      data: {
        challans: [{id: 329, title: 'Challan A'}],
        documents: [
          {charge_id: 329, document_type: 'challan', title: 'Challan A copy'},
        ],
      },
    });

    expect(mapped.documents).toHaveLength(1);
    expect(mapped.documents[0].chargeId).toBe('329');
  });

  it('uses challans as fee details only when no charges collection is present', () => {
    const mapped = mapChildFees({
      data: {
        challans: [
          {charge_id: 329, title: 'Fee Challan', amount: '12500'},
        ],
      },
    });

    expect(mapped.charges[0].chargeId).toBe('329');
    expect(mapped.challans[0].chargeId).toBe('329');
  });

  it('does not classify documents from title keywords', () => {
    const mapped = mapChildFees({
      data: {
        charges: [{id: 1, title: 'Transport Activity Fee', amount: '500'}],
      },
    });

    expect(mapped.charges[0].category).toBe('');
  });

  it('builds authenticated challan and receipt download URLs with the correct IDs', () => {
    expect(childFeeChallanDownloadUrl(22, 329)).toBe(
      `${API_BASE_URL}/parent/children/22/fees/challans/329/download`,
    );
    expect(childFeeReceiptDownloadUrl(22, 88)).toBe(
      `${API_BASE_URL}/parent/children/22/fees/receipts/88/download`,
    );
  });
});

describe('Fee document response classification', () => {
  it('treats HTML challans as html, never pdf', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'text/html; charset=UTF-8',
        bodyPreview: '<!DOCTYPE html><html><title>Fee Challan — Ayesha Noor</title>',
      }).kind,
    ).toBe('html');
  });

  it('treats PDF magic bytes as pdf even without a content type', () => {
    expect(
      classifyFetchedDocument({
        contentType: '',
        bodyPreview: '%PDF-1.4\n%',
      }).kind,
    ).toBe('pdf');
  });

  it('treats JSON error bodies as json', () => {
    expect(
      classifyFetchedDocument({
        contentType: 'application/json',
        bodyPreview: '{"success":false,"message":"Not found"}',
      }).kind,
    ).toBe('json');
    expect(jsonDocumentMessage('{"message":"Invalid payment ID"}')).toBe(
      'Invalid payment ID',
    );
  });
});
