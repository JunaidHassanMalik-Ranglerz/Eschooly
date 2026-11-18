import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import ClassTabBar from './ClassTabBar';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {Typography} from '../../Constants/Typography';
import {Fontsize} from '../../Constants/Fontsize';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ART_SIZE = wp(36);
const ART_SLOT = wp(28);
const CORNER = radius.banner;
const WAVE_COLOR = 'rgba(19, 69, 163, 0.16)';

const OnlineClassHero = ({
  tabs,
  selected,
  onSelect,
  animationIndex = 1,
  entering,
  replayToken = 0,
}) => (
  <AnimatedCard
    index={animationIndex}
    entering={entering}
    replayToken={replayToken}
    style={styles.enter}>
    <View style={styles.shell}>
      <View style={styles.clip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
          start={{x: 0, y: 0.08}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          <CardWave variant={SCREEN_WAVES.assignmentIce} color={WAVE_COLOR} />
          <View style={styles.upper}>
            <View style={styles.copy}>
              <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.78}
                maxFontSizeMultiplier={1.15}>
                {Strings.onlineClass}
              </Text>
              <View style={styles.underline} />
            </View>
            <View pointerEvents="none" style={styles.art}>
              <FeatureArtImage
                source={EducationIcons.onlineClasses}
                width={ART_SIZE}
                height={ART_SIZE}
              />
            </View>
          </View>
          <View style={styles.lower}>
            <ClassTabBar tabs={tabs} selected={selected} onSelect={onSelect} />
          </View>
        </LinearGradient>
      </View>
    </View>
  </AnimatedCard>
);

export default OnlineClassHero;

const styles = StyleSheet.create({
  enter: {
    marginBottom: hp(1.45),
    overflow: 'visible',
    zIndex: 2,
  },
  shell: {
    borderRadius: CORNER,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    ...elevation.banner,
  },
  clip: {
    borderRadius: CORNER,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: CORNER,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingTop: hp(1.05),
    paddingBottom: hp(1.0),
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
    paddingTop: hp(0.35),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  title: {
    ...Typography.bannerTitle,
    fontSize: Fontsize.mm,
    lineHeight: Fontsize.mm * 1.18,
    color: Colors.textPrimary,
    flexShrink: 1,
    includeFontPadding: false,
    textAlign: 'left',
  },
  underline: {
    width: wp(8),
    height: hp(0.42),
    borderRadius: wp(1),
    backgroundColor: Colors.brandRoyal,
    marginTop: hp(0.5),
  },
  art: {
    width: ART_SIZE,
    height: ART_SLOT,
    marginRight: -wp(1.2),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 1,
  },
  lower: {
    marginTop: hp(0.5),
    zIndex: 2,
  },
});
