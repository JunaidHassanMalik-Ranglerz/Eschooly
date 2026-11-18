import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedCard from '../AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../CardWave';
import FeatureArtImage from '../Glass/FeatureArtImage';
import {useStudentTone} from '../Glass/StudentTone';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';

const LiveClassCard = ({
  item,
  animationIndex = 1,
  entering,
  replayToken = 0,
  joining = false,
  onJoin,
}) => {
  const icy = useStudentTone();
  const {width} = useWindowDimensions();
  const showArt = icy && width >= 360;

  const identity = (
    <>
      <View style={styles.topRow}>
        {item?.providerLabel !== '' ? (
          <View style={styles.zoomRow}>
            <View style={[styles.zoomIconBox, icy && styles.zoomIconBoxIcy]}>
              <Icon
                name="videocam-outline"
                size={wp(4)}
                color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
              />
            </View>
            <Text
              style={[styles.zoomText, icy && styles.zoomTextIcy]}
              numberOfLines={1}>
              {item?.providerLabel || Strings.zoomMeeting}
            </Text>
          </View>
        ) : (
          <View style={styles.zoomRow} />
        )}
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText} numberOfLines={1}>
            {item?.status || Strings.liveBadge}
          </Text>
        </View>
      </View>

      <View style={styles.identityRow}>
        <View style={styles.copy}>
          {item?.title ? (
            <Text style={[styles.title, icy && styles.titleIcy]}>
              {item.title}
            </Text>
          ) : null}
          {item?.classInfo ? (
            <Text
              style={[styles.classInfo, icy && styles.classInfoIcy]}
              numberOfLines={2}>
              {item.classInfo}
            </Text>
          ) : null}
        </View>
        {showArt ? (
          <View style={styles.artSlot} pointerEvents="none">
            <FeatureArtImage
              source={EducationIcons.onlineClasses}
              size={wp(14)}
            />
          </View>
        ) : null}
      </View>

      {item?.joined || item?.started ? (
        <View style={styles.infoRow}>
          {item?.joined ? (
            <View style={styles.infoItem}>
              <Icon
                name="people-outline"
                size={wp(4)}
                color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
              />
              <Text
                style={[styles.infoText, icy && styles.infoTextIcy]}
                numberOfLines={1}>
                {item.joined}
              </Text>
            </View>
          ) : null}
          {item?.started ? (
            <View style={styles.infoItem}>
              <Icon
                name="time-outline"
                size={wp(4)}
                color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
              />
              <Text
                style={[styles.infoText, icy && styles.infoTextIcy]}
                numberOfLines={1}>
                {item.started}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );

  const actions = (
    <View style={[styles.bottomPart, icy && styles.bottomPartIcy]}>
      <TouchableOpacity
        style={[styles.joinBtn, icy && styles.joinBtnIcy]}
        activeOpacity={0.85}
        disabled={joining}
        onPress={() => onJoin?.(item)}>
        <Icon name="videocam" size={wp(4.5)} color={Colors.white} />
        <Text style={styles.joinText} numberOfLines={1}>
          {Strings.joinClass}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.noteBtn, icy && styles.noteBtnIcy]}
        activeOpacity={0.85}>
        <Image
          source={Images.onlineClasstickIcon}
          style={[styles.tickIcon, icy && styles.tickIconIcy]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        entering={entering}
        replayToken={replayToken}
        style={styles.cardWrapIcy}>
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
                color="rgba(91, 156, 255, 0.16)"
              />
            </View>
            <View style={styles.topPartIcy}>{identity}</View>
            {actions}
          </View>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={styles.cardWrap}>
      <View style={styles.card}>
        <LinearGradient
          colors={CARD_GRADIENTS.sapphire}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.topPart}>
          <CardWave variant={SCREEN_WAVES.onlineClass} />
          {identity}
        </LinearGradient>
        {actions}
      </View>
    </AnimatedCard>
  );
};

export default LiveClassCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: hp(2.2),
  },
  cardWrapIcy: {
    marginBottom: hp(1.45),
    overflow: 'visible',
  },
  card: {
    borderRadius: wp(5),
    backgroundColor: Colors.white,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.banner,
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
  topPart: {
    padding: wp(4),
    paddingBottom: hp(2),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    overflow: 'hidden',
  },
  topPartIcy: {
    paddingHorizontal: wp(3.6),
    paddingTop: hp(1.45),
    paddingBottom: hp(1.2),
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.15),
    zIndex: 1,
  },
  zoomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  zoomIconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomIconBoxIcy: {
    backgroundColor: Colors.hubCard,
  },
  zoomText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    letterSpacing: 0.6,
    flex: 1,
    includeFontPadding: false,
  },
  zoomTextIcy: {
    color: Colors.textSecondary,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    gap: wp(1.2),
  },
  liveDot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(1),
    backgroundColor: Colors.white,
  },
  liveText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    letterSpacing: 0.4,
    includeFontPadding: false,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  artSlot: {
    width: wp(14),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginBottom: hp(0.4),
    zIndex: 1,
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontSize: Fontsize.sm,
  },
  classInfo: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(1.5),
    zIndex: 1,
  },
  classInfoIcy: {
    color: Colors.textSecondary,
    marginBottom: hp(1.1),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    zIndex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
    minWidth: 0,
  },
  infoText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    flex: 1,
    includeFontPadding: false,
  },
  infoTextIcy: {
    color: Colors.textSecondary,
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: wp(3),
    gap: wp(2),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bottomPartIcy: {
    backgroundColor: 'transparent',
    borderTopColor: Colors.borderSubtle,
    paddingHorizontal: wp(3.2),
    paddingBottom: hp(1.25),
    paddingTop: hp(1.05),
  },
  joinBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp(8),
    paddingVertical: hp(1.35),
    minHeight: hp(5.2),
    gap: wp(2),
  },
  joinBtnIcy: {
    backgroundColor: Colors.brandNavy,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.brandRoyal,
    ...elevation.card,
  },
  joinText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
  },
  noteBtn: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteBtnIcy: {
    borderColor: Colors.borderSubtle,
    backgroundColor: Colors.hubCard,
  },
  tickIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  tickIconIcy: {
    tintColor: Colors.brandRoyal,
  },
});
