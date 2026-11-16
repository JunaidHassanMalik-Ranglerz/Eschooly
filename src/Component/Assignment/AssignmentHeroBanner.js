import React from 'react';
import {StyleSheet} from 'react-native';
import FeatureHeroBanner from '../Glass/FeatureHeroBanner';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Strings} from '../../Constants/Strings';
import {SCREEN_WAVES} from '../CardWave';
import {hp} from '../../Constants/Responsive';

const AssignmentHeroBanner = ({
  title = Strings.assignment,
  subtitle = Strings.assignmentsHeroSubtitle,
  art = EducationIcons.assignments,
  overlayArt = EducationIcons.digitalLibrary,
  style,
  ...rest
}) => (
  <FeatureHeroBanner
    title={title}
    subtitle={subtitle}
    art={art}
    overlayArt={overlayArt}
    waveVariant={SCREEN_WAVES.assignmentIce}
    style={[styles.gap, style]}
    {...rest}
  />
);

export default AssignmentHeroBanner;

const styles = StyleSheet.create({
  gap: {
    marginBottom: hp(1.45),
  },
});
