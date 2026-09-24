/** Shared blue card palette — Notification / Assignment reference styling. */
export const NAVY = '#071A3D';
export const SCREEN_BG = '#DCEBFD';
export const CARD_BORDER = '#65C4FF';

export const CARD_GRADIENTS = {
  notification: ['#07346B', '#062653', '#0D5CA8'],
  royal: ['#12325A', '#071A3D', '#1345A3'],
  sapphire: ['#0A2F5C', '#0D5CA8', '#2563EB'],
  deep: ['#051B41', '#0C2E65', '#164785'],
  accent: ['#1E5AE8', '#3B82F6', '#1A3FCE'],
  hub: ['#07346B', '#1345A3'],
  hubAlt: ['#0A2F5C', '#2563EB'],
  hubSoft: ['#12325A', '#0D5CA8'],
};

export const SUBJECT_GRADIENTS = [
  CARD_GRADIENTS.notification,
  CARD_GRADIENTS.royal,
  CARD_GRADIENTS.sapphire,
  CARD_GRADIENTS.deep,
  CARD_GRADIENTS.accent,
  ['#0C2C5E', '#071F48', '#0D3470'],
];

export const HUB_GRADIENTS = [
  CARD_GRADIENTS.hub,
  CARD_GRADIENTS.hubAlt,
  CARD_GRADIENTS.hubSoft,
  CARD_GRADIENTS.notification,
  CARD_GRADIENTS.sapphire,
  CARD_GRADIENTS.deep,
];

export const EXAM_STAT_GRADIENTS = [
  CARD_GRADIENTS.notification,
  CARD_GRADIENTS.sapphire,
  CARD_GRADIENTS.royal,
  CARD_GRADIENTS.deep,
];

export const getSubjectGradient = index =>
  SUBJECT_GRADIENTS[index % SUBJECT_GRADIENTS.length];

export const getHubGradient = index => HUB_GRADIENTS[index % HUB_GRADIENTS.length];
