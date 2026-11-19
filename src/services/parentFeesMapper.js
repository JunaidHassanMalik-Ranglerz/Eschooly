import {API_BASE_URL} from '../api/apiBaseUrl';

const asObject = value =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : null;

const text = value => {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  return String(value);
};

const responseData = body => {
  const root = asObject(body) || {};
  return asObject(root.data) || root;
};

const firstList = (record, keys) => {
  if (Array.isArray(record)) {
    return record;
  }
  const source = asObject(record) || {};
  for (const key of keys) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
    const nested = asObject(source[key]);
    if (!nested) {
      continue;
    }
    for (const inner of ['items', 'data', 'entries', 'books', 'resources']) {
      if (Array.isArray(nested[inner])) {
        return nested[inner];
      }
    }
  }
  return [];
};

const dateLabel = value => {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const hasFeeValue = value => value !== undefined && value !== null && value !== '';

const moneyText = (value, currency) => {
  if (!hasFeeValue(value)) {
    return '';
  }
  if (typeof value === 'number' && !Number.isFinite(value)) {
    return '';
  }
  const raw = text(value);
  if (!raw) {
    return '';
  }
  if (/[a-zA-Z]/.test(raw)) {
    return raw;
  }
  const curr = text(currency);
  return curr ? `${curr} ${raw}` : raw;
};

const displayFeeStatus = value => {
  const raw = text(value).replace(/[_-]+/g, ' ').trim();
  if (!raw) {
    return '';
  }
  return raw.replace(/\b\w/g, char => char.toUpperCase());
};

const feeCategoryKey = slot => {
  if (slot?.is_transport === true || slot?.is_transport === 1) {
    return 'transport';
  }
  const raw = text(slot?.category || slot?.fee_category).toLowerCase();
  if (!raw) {
    return '';
  }
  if (raw.includes('transport')) {
    return 'transport';
  }
  if (
    raw.includes('school') ||
    raw.includes('academic') ||
    raw.includes('tuition')
  ) {
    return 'school';
  }
  return raw;
};

const documentKind = (slot, fallback) => {
  const raw = text(
    slot?.document_type || slot?.doc_type || slot?.kind,
  ).toLowerCase();
  if (raw.includes('receipt') || fallback === 'receipt') {
    return 'receipt';
  }
  if (raw.includes('challan') || fallback === 'challan') {
    return 'challan';
  }
  if (hasFeeValue(slot?.payment_id || slot?.paymentId)) {
    return 'receipt';
  }
  if (hasFeeValue(slot?.charge_id || slot?.chargeId)) {
    return 'challan';
  }
  return fallback || '';
};

const mapFeeChild = child => {
  const record = asObject(child) || {};
  const classRecord = asObject(record.class);
  const name = text(record.name);
  const className = text(
    record.class_name || classRecord?.name || classRecord?.class_name,
  );
  return {
    id: record.id,
    value: text(record.id),
    label: name,
    name,
    className,
  };
};

const mapFeeCharge = item => {
  const slot = asObject(item) || {};
  const chargeId = text(slot.charge_id || slot.chargeId || slot.id);
  if (!chargeId) {
    return null;
  }
  const currency = slot.currency || slot.currency_code;
  return {
    id: chargeId,
    chargeId,
    title: text(
      slot.title || slot.name || slot.fee_title || slot.fee_name || slot.term,
    ),
    amount: moneyText(
      slot.amount ?? slot.total_amount ?? slot.total,
      currency,
    ),
    paidAmount: moneyText(slot.paid_amount ?? slot.paid, currency),
    dueAmount: moneyText(
      slot.due_amount ?? slot.balance ?? slot.remaining ?? slot.outstanding,
      currency,
    ),
    dueDate: dateLabel(slot.due_date || slot.date),
    status: displayFeeStatus(slot.status),
    category: feeCategoryKey(slot),
    hint: text(slot.description || slot.note || slot.period || slot.term),
  };
};

const mapFeeDocument = (item, fallbackKind) => {
  const slot = asObject(item) || {};
  const kind = documentKind(slot, fallbackKind);
  const isReceipt = kind === 'receipt';
  const chargeId = text(
    slot.charge_id || slot.chargeId || (!isReceipt ? slot.id : ''),
  );
  const paymentId = text(
    slot.payment_id || slot.paymentId || (isReceipt ? slot.id : ''),
  );
  const recordId = isReceipt ? paymentId : chargeId;
  if (!recordId) {
    return null;
  }
  const currency = slot.currency || slot.currency_code;
  return {
    id: `${isReceipt ? 'receipt' : 'challan'}:${recordId}`,
    recordId,
    chargeId: isReceipt ? '' : chargeId,
    paymentId: isReceipt ? paymentId : '',
    kind: isReceipt ? 'receipt' : 'challan',
    type: isReceipt ? 'Receipt' : 'Challan',
    title: text(
      slot.title ||
        slot.name ||
        slot.fee_title ||
        slot.challan_title ||
        slot.receipt_title,
    ),
    date: dateLabel(
      slot.date ||
        slot.issued_at ||
        slot.paid_at ||
        slot.created_at ||
        slot.due_date,
    ),
    amount: moneyText(
      slot.amount ?? slot.total ?? slot.paid_amount ?? slot.due_amount,
      currency,
    ),
    status: displayFeeStatus(slot.status),
    category: feeCategoryKey(slot),
  };
};

const uniqueDocuments = items => {
  const seen = new Set();
  return items.filter(item => {
    if (!item?.id || seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};

export const childFeeChallanDownloadUrl = (studentId, chargeId) =>
  `${API_BASE_URL}/parent/children/${studentId}/fees/challans/${chargeId}/download`;

export const childFeeReceiptDownloadUrl = (studentId, paymentId) =>
  `${API_BASE_URL}/parent/children/${studentId}/fees/receipts/${paymentId}/download`;

export const mapChildFees = body => {
  const data = responseData(body);
  const child = data.child ? mapFeeChild(data.child) : null;
  const summarySource = asObject(data.summary) || asObject(data.overview) || {};
  const currency = summarySource.currency || data.currency;
  const charges = firstList(data, [
    'charges',
    'fees',
    'fee_details',
    'items',
  ])
    .map(mapFeeCharge)
    .filter(Boolean);
  const challans = firstList(data, ['challans', 'challan_documents'])
    .map(item => mapFeeDocument(item, 'challan'))
    .filter(Boolean);
  const receipts = firstList(data, ['receipts', 'payments', 'payment_history'])
    .map(item => mapFeeDocument(item, 'receipt'))
    .filter(Boolean);
  const listedDocuments = firstList(data, [
    'documents',
    'combined_documents',
    'files',
  ])
    .map(item => mapFeeDocument(item, documentKind(asObject(item) || {}, '')))
    .filter(Boolean);
  const fallbackCharges = charges.length
    ? charges
    : firstList(data, ['challans'])
        .map(mapFeeCharge)
        .filter(Boolean);

  return {
    child,
    summary: {
      title: text(summarySource.title || summarySource.term || data.title),
      amount: moneyText(
        summarySource.total ?? summarySource.amount ?? data.total,
        currency,
      ),
      dueAmount: moneyText(
        summarySource.due_amount ??
          summarySource.due ??
          summarySource.balance ??
          data.due_amount,
        currency,
      ),
      paidAmount: moneyText(
        summarySource.paid_amount ?? summarySource.paid,
        currency,
      ),
      dueDate: dateLabel(summarySource.due_date || data.due_date),
      status: displayFeeStatus(summarySource.status || data.status),
    },
    charges: fallbackCharges,
    challans: uniqueDocuments(challans),
    receipts: uniqueDocuments(receipts),
    documents: uniqueDocuments([...listedDocuments, ...challans, ...receipts]),
    history: uniqueDocuments(receipts),
  };
};
