import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {EnterView} from '../AnimatedCard';
import {useScreenMotion} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter, getScreenCardEntering} from '../../utils/cardAnimation';
import {isSequentialEnterMotion} from '../../hooks/useScreenEnterGate';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {hp} from '../../Constants/Responsive';

const ProfileSectionTitle = ({
  children,
  style,
  light = false,
  animationIndex,
  disableAnimation = false,
}) => {
  const motion = useScreenMotion();
  const text = (
    <Text style={[styles.title, light && styles.titleLight, style]}>
      {children}
    </Text>
  );

  if (disableAnimation || animationIndex == null) {
    return text;
  }

  const sectionMotion = isSequentialEnterMotion(motion)
    ? getHomeScreenEnter(animationIndex)
    : getScreenCardEntering(motion, animationIndex);

  return (
    <EnterView
      enterKey={`section-${animationIndex}`}
      motion={sectionMotion}
      style={styles.enterWrap}>
      {text}
    </EnterView>
  );
};

export default ProfileSectionTitle;

const styles = StyleSheet.create({
  enterWrap: {
    alignSelf: 'stretch',
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.2),
  },
  titleLight: {
    color: Colors.white,
  },
});
