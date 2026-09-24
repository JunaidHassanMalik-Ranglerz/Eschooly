import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DepthIcon from '../DepthIcon';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import {SCREEN_WAVES} from '../CardWave';
import {FEATURE_ICON_META} from '../../Constants/IconTheme';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';

const RecordingClassCard = ({
  item,
  animationIndex = 0,
  gradientIndex,
  entering,
  replayToken = 0,
}) => {
  const paletteIndex = gradientIndex ?? animationIndex;
  return (
  <ProfileGradientCard
    innerStyle={styles.inner}
    animationIndex={animationIndex}
    entering={entering}
    replayToken={replayToken}
    colors={getSubjectGradient(paletteIndex + 2)}
    waveVariant={paletteIndex === 0 ? SCREEN_WAVES.onlineClass : null}>
    <View style={styles.topRow}>
      <View style={styles.videoIconWrap}>
        <Image source={Images.videoIcon} style={styles.videoIcon} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText} numberOfLines={1}>
              {item?.status}
            </Text>
          </View>
        </View>
        <Text style={styles.detail} numberOfLines={1}>
          {item?.detail}
        </Text>
      </View>
    </View>

    <View style={styles.btnRow}>
      <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={() => {}}>
        <DepthIcon name={FEATURE_ICON_META.watch.icon} size={wp(3.5)} color={FEATURE_ICON_META.watch.color} />
        <Text style={styles.actionText} numberOfLines={1}>
          {Strings.watch}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={() => {}}>
        <DepthIcon name={FEATURE_ICON_META.download.icon} size={wp(3.5)} color={FEATURE_ICON_META.download.color} />
        <Text style={styles.actionText} numberOfLines={1}>
          {Strings.download}
        </Text>
      </TouchableOpacity>
    </View>
  </ProfileGradientCard>
  );
};

export default RecordingClassCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.3),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    zIndex: 1,
  },
  videoIconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  videoIcon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.white,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.3),
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
    includeFontPadding: false,
  },
  detail: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  statusBadge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    gap: wp(2),
    zIndex: 1,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(5),
    paddingVertical: hp(1.15),
    gap: wp(1.5),
  },
  actionText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
  },
});
