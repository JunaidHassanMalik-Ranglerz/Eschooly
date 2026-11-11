import {Colors} from '../src/Constants/Colors';
import {Theme, spacing, radius, elevation} from '../src/Constants/Theme';
import {Typography} from '../src/Constants/Typography';
import {
  EducationIcons,
  EDUCATION_ICON_COUNT,
  getFeatureArt,
} from '../src/Assets/EducationIcons';
import {getFeatureIcon, getFeatureArt as getThemedArt} from '../src/Constants/IconTheme';

describe('UI foundation tokens and 3D registry', () => {
  it('locks approved brand colors', () => {
    expect(Colors.primary).toBe('#071A3D');
    expect(Colors.brandNavy).toBe('#071A3D');
    expect(Colors.brandRoyal).toBe('#1345A3');
    expect(Colors.primaryLight).toBe('#1345A3');
    expect(Colors.canvas).toBe(Colors.parentBg);
  });

  it('exports typography, spacing, radius, and elevation', () => {
    expect(Typography.displayName.fontFamily).toBeTruthy();
    expect(spacing.md).toBeGreaterThan(0);
    expect(radius.card).toBeGreaterThan(0);
    expect(elevation.card).toBeTruthy();
    expect(Theme.Colors).toBe(Colors);
  });

  it('registers all 21 approved educational assets', () => {
    expect(EDUCATION_ICON_COUNT).toBe(21);
    expect(Object.keys(EducationIcons)).toHaveLength(21);
    expect(EducationIcons.onlineClasses).toBeTruthy();
    expect(EducationIcons.welcomeGraduationBooks).toBeTruthy();
  });

  it('maps live feature keys to 3D art without inventing diary or exam-taking art', () => {
    expect(getFeatureArt('online')).toBe(EducationIcons.onlineClasses);
    expect(getFeatureArt('library')).toBe(EducationIcons.digitalLibrary);
    expect(getThemedArt('assignments')).toBe(EducationIcons.assignments);
    expect(getFeatureArt('diary')).toBeNull();
    expect(getFeatureArt('onlineExams')).toBeNull();
    expect(getFeatureIcon('password').art).toBeUndefined();
  });
});
