import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from './DepthIcon';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';

const CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8'];

const NotificationCard = ({item, onPress, animationIndex = 0, entering}) => {
  const icy = useStudentTone();
  const accent = item.iconColor || Colors.iconSky;
  const isUnread = !!item.unread;
  const when =
    item.date && item.time
      ? `${item.date}  ·  ${item.time}`
      : item.date || item.time;
  const iconName = item.icon || 'notifications-outline';

  const content = (
    <>
      {isUnread ? (
        <View
          style={[styles.unreadDot, icy && styles.unreadDotIcy]}
          pointerEvents="none"
        />
      ) : null}

      <View style={[styles.iconSlot, icy && styles.iconSlotIcy]}>
        {icy ? (
          <Icon name={iconName} size={wp(5.2)} color={Colors.brandRoyal} />
        ) : (
          <DepthIcon name={iconName} size={wp(6.8)} color={accent} />
        )}
      </View>

      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            icy && styles.titleIcy,
            icy && isUnread && styles.titleUnreadIcy,
          ]}>
          {item.title}
        </Text>
        {item.message ? (
          <Text style={[styles.message, icy && styles.messageIcy]}>
            {item.message}
          </Text>
        ) : null}
        {when || isUnread ? (
          <View style={styles.metaRow}>
            {when ? (
              <>
                <Icon
                  name="time-outline"
                  size={wp(3.5)}
                  color={icy ? Colors.textSecondary : '#B9CEF0'}
                />
                <Text style={[styles.meta, icy && styles.metaIcy]}>{when}</Text>
              </>
            ) : null}
            {isUnread ? (
              <Text style={[styles.unreadLabel, icy && styles.unreadLabelIcy]}>
                New
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </>
  );

  const card = (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      style={[styles.wrap, icy && styles.wrapIcy]}>
      {icy ? (
        <View style={[styles.pressIcy, isUnread && styles.pressUnreadIcy]}>
          <View style={[styles.clipIcy, isUnread && styles.clipUnreadIcy]}>
            <LinearGradient
              colors={
                isUnread
                  ? [Colors.hubCard, Colors.bannerIceEnd]
                  : [Colors.bannerIceStart, Colors.bannerIceEnd]
              }
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
            <View style={styles.faceIcyInner}>{content}</View>
          </View>
        </View>
      ) : (
        <View style={[styles.clip, isUnread && styles.wrapUnread]}>
          <LinearGradient
            colors={CARD_GRADIENT}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.face}>
            <CardWave variant={SCREEN_WAVES.notifications} />
            {content}
          </LinearGradient>
        </View>
      )}
    </AnimatedCard>
  );

  if (!onPress) {
    return card;
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      {card}
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.6),
  },
  wrapIcy: {
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  clip: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#0A4E8A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  wrapUnread: {
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.55)',
  },
  face: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#65C4FF',
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(2),
    overflow: 'hidden',
  },
  unreadDot: {
    position: 'absolute',
    top: hp(1.4),
    right: wp(3.5),
    width: wp(2.2),
    height: wp(2.2),
    borderRadius: wp(1.1),
    backgroundColor: '#7DD3FC',
    zIndex: 2,
  },
  iconSlot: {
    width: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    marginTop: hp(0.2),
    zIndex: 1,
  },
  iconSlotIcy: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.hubCard,
    marginTop: 0,
    marginRight: wp(3.2),
  },
  body: {
    flex: 1,
    minWidth: 0,
    zIndex: 1,
    paddingRight: wp(4),
  },
  title: {
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    fontWeight: '700',
    includeFontPadding: false,
  },
  message: {
    color: '#AFC7ED',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: wp(4.6),
    marginTop: hp(0.55),
    includeFontPadding: false,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.1),
    flexWrap: 'wrap',
    gap: wp(2),
  },
  meta: {
    color: '#B9CEF0',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginLeft: wp(1.2),
    includeFontPadding: false,
  },
  unreadLabel: {
    color: '#BFDBFE',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
    includeFontPadding: false,
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  pressUnreadIcy: {
    backgroundColor: Colors.hubCard,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  clipUnreadIcy: {
    borderColor: Colors.brandRoyal,
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  faceIcyInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(1.35),
    zIndex: 1,
  },
  unreadDotIcy: {
    backgroundColor: Colors.brandAccent,
    top: hp(1.2),
    right: wp(2.8),
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontWeight: '600',
  },
  titleUnreadIcy: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  messageIcy: {
    color: Colors.textSecondary,
    lineHeight: Fontsize.sm + 4,
  },
  metaIcy: {
    color: Colors.textSecondary,
  },
  unreadLabelIcy: {
    color: Colors.brandRoyal,
  },
});
