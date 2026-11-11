import {Fonts} from './Fonts';
import {Fontsize} from './Fontsize';

/**
 * Semantic type roles for the approved Home system.
 * Wraps existing Fonts + Fontsize. Do not change Fontsize values here.
 */
export const Typography = {
  brand: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  greeting: {
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  displayName: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
  },
  bannerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  bannerSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  link: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  cardTitle: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  cardMeta: {
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  chip: {
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  tab: {
    fontFamily: Fonts.medium,
    fontSize: Fontsize.tab,
  },
  tabActive: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.tab,
  },
  button: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
};

export default Typography;
