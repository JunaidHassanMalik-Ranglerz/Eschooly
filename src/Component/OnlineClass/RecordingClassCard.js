import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from '../DepthIcon';
import ProfileGradientCard from '../Profile/ProfileGradientCard';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {FEATURE_ICON_META} from '../../Constants/IconTheme';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {getSubjectGradient} from '../../Constants/CardTheme';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';

const RecordingClassCard = ({
  item,
  animationIndex = 0,
  gradientIndex,
  entering,
  replayToken = 0,
  watching = false,
  downloading = false,
  onWatch,
  onDownload,
}) => {
  const paletteIndex = gradientIndex ?? animationIndex;
  const icy = useStudentTone();
  const showWatch = icy ? Boolean(item?.canWatch) : item?.canWatch !== false;
  const showDownload = icy
    ? Boolean(item?.canDownload)
    : item?.canDownload !== false;

  const body = (
    <>
      <View style={styles.topRow}>
        <View style={[styles.videoIconWrap, icy && styles.videoIconWrapIcy]}>
          {icy ? (
            <FeatureArtImage
              source={EducationIcons.onlineClasses}
              size={wp(9)}
            />
          ) : (
            <Image
              source={Images.videoIcon}
              style={styles.videoIcon}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.info}>
          <View style={styles.titleRow}>
            {item?.title ? (
              <Text
                style={[styles.title, icy && styles.titleIcy]}
                numberOfLines={2}>
                {item.title}
              </Text>
            ) : (
              <View style={styles.title} />
            )}
            {item?.status ? (
              <View style={[styles.statusBadge, icy && styles.statusBadgeIcy]}>
                <Text
                  style={[styles.statusText, icy && styles.statusTextIcy]}
                  numberOfLines={1}>
                  {item.status}
                </Text>
              </View>
            ) : null}
          </View>
          {item?.detail ? (
            <Text style={[styles.detail, icy && styles.detailIcy]}>
              {item.detail}
            </Text>
          ) : null}
        </View>
      </View>

      {showWatch || showDownload ? (
        <View style={styles.btnRow}>
          {showWatch ? (
            <TouchableOpacity
              style={[styles.actionBtn, icy && styles.actionBtnIcy]}
              activeOpacity={0.8}
              disabled={watching || (icy && !onWatch)}
              onPress={() => onWatch?.(item)}>
              {watching ? (
                <ActivityIndicator
                  size="small"
                  color={icy ? Colors.brandRoyal : Colors.white}
                />
              ) : icy ? (
                <Icon
                  name="play-outline"
                  size={wp(4)}
                  color={Colors.brandRoyal}
                />
              ) : (
                <DepthIcon
                  name={FEATURE_ICON_META.watch.icon}
                  size={wp(3.5)}
                  color={FEATURE_ICON_META.watch.color}
                />
              )}
              <Text
                style={[styles.actionText, icy && styles.actionIcy]}
                numberOfLines={1}>
                {Strings.watch}
              </Text>
            </TouchableOpacity>
          ) : null}

          {showDownload ? (
            <TouchableOpacity
              style={[styles.actionBtn, icy && styles.actionBtnIcy]}
              activeOpacity={0.8}
              disabled={downloading || (icy && !onDownload)}
              onPress={() => onDownload?.(item)}>
              {downloading ? (
                <ActivityIndicator
                  size="small"
                  color={icy ? Colors.brandNavy : Colors.white}
                />
              ) : icy ? (
                <Icon
                  name="download-outline"
                  size={wp(4)}
                  color={Colors.brandNavy}
                />
              ) : (
                <DepthIcon
                  name={FEATURE_ICON_META.download.icon}
                  size={wp(3.5)}
                  color={FEATURE_ICON_META.download.color}
                />
              )}
              <Text
                style={[styles.actionText, icy && styles.actionIcy]}
                numberOfLines={1}>
                {Strings.download}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        entering={entering}
        replayToken={replayToken}
        style={styles.wrapIcy}>
        <View style={styles.pressIcy}>
          <View style={styles.clipIcy}>
            <LinearGradient
              colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.fillIcy}
            />
            <View pointerEvents="none" style={styles.waveIcy}>
              <CardWave
                variant={SCREEN_WAVES.assignmentIce}
                color="rgba(91, 156, 255, 0.14)"
              />
            </View>
            <View style={styles.innerIcy}>{body}</View>
          </View>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.inner}
      animationIndex={animationIndex}
      entering={entering}
      replayToken={replayToken}
      colors={getSubjectGradient(paletteIndex + 2)}
      waveVariant={paletteIndex === 0 ? SCREEN_WAVES.onlineClass : null}>
      {body}
    </ProfileGradientCard>
  );
};

export default RecordingClassCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.3),
  },
  wrapIcy: {
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  innerIcy: {
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.3),
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    flexShrink: 0,
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
    minHeight: hp(4.8),
    gap: wp(1.5),
  },
  actionText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
  },
  titleIcy: {
    color: Colors.brandNavy,
  },
  detailIcy: {
    color: Colors.textSecondary,
  },
  actionIcy: {
    color: Colors.brandNavy,
  },
  videoIconWrapIcy: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
    backgroundColor: Colors.hubCard,
  },
  statusBadgeIcy: {
    backgroundColor: Colors.hubCard,
  },
  statusTextIcy: {
    color: Colors.brandRoyal,
  },
  actionBtnIcy: {
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
});
