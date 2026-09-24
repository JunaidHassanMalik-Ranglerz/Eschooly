import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DepthIcon from './DepthIcon';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8'];

const NOTICE_BLUE = {
  bg: 'rgba(56, 189, 248, 0.18)',
  text: '#7DD3FC',
};

const CATEGORY_STYLES = {
  Event: {
    ...NOTICE_BLUE,
    icon: 'trophy-outline',
    accent: '#F59E0B',
  },
  Notice: {
    ...NOTICE_BLUE,
    icon: 'megaphone-outline',
    accent: '#2563EB',
  },
  Update: {
    ...NOTICE_BLUE,
    icon: 'refresh-circle-outline',
    accent: '#0EA5E9',
  },
};

const AnnouncementCard = ({
  item,
  animationIndex = 0,
  entering,
  replayToken = 0,
}) => {
  const category = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Notice;
  const accent = item.iconColor || category.accent;

  return (
    <AnimatedCard
      index={animationIndex}
      entering={entering}
      replayToken={replayToken}
      style={styles.wrap}>
      <View style={styles.clip}>
      <LinearGradient
        colors={CARD_GRADIENT}
        locations={[0, 0.5, 1]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.face}>
        <CardWave variant={SCREEN_WAVES.announcements} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={[styles.badge, {backgroundColor: category.bg}]}>
              <DepthIcon name={category.icon} size={wp(4.2)} color={accent} />
              <Text style={[styles.badgeText, {color: category.text}]}>
                {item.category}
              </Text>
            </View>
            <View style={styles.dateRow}>
              <Icon name="calendar-outline" size={wp(3.5)} color="#B9CEF0" />
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <DepthIcon
              name={item.icon || category.icon}
              size={wp(6.2)}
              color={accent}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.message} numberOfLines={4}>
            {item.message}
          </Text>

          <View style={styles.timeRow}>
            <Icon name="time-outline" size={wp(3.5)} color="#B9CEF0" />
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </LinearGradient>
      </View>
    </AnimatedCard>
  );
};

export default AnnouncementCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(1.6),
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
  face: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#65C4FF',
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(2),
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.45),
    gap: wp(1.2),
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    includeFontPadding: false,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#B9CEF0',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
    includeFontPadding: false,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.2),
  },
  title: {
    flex: 1,
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
    marginTop: hp(0.75),
    includeFontPadding: false,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.1),
  },
  time: {
    color: '#B9CEF0',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.2),
    includeFontPadding: false,
  },
});
