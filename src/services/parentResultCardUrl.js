import {API_BASE_URL} from '../api/apiBaseUrl';

export const childResultCardPrintUrl = childId =>
  `${API_BASE_URL}/parent/children/${childId}/results/card/print`;
