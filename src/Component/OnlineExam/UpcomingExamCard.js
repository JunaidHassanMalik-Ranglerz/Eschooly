import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import AnimatedCard from '../AnimatedCard';
import {
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../Profile/ProfileTheme';

const UpcomingExamCard = ({item, onPress, animationIndex = 0}) => (
  <AnimatedCard
    index={animationIndex}
    style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
    <LinearGradient
      colors={CARD_GRADIENTS.sapphire}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.marksBadge}>
          <Text style={styles.marksText}>
            {item.marks} {Strings.marksLabel}
          </Text>
        </View>
      </View>

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.subject}</Text>
        </View>
        <View style={styles.classTag}>
          <Text style={styles.classText}>{item.className}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="calendar-outline" size={wp(4)} color={Colors.whiteMuted85} />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="time-outline" size={wp(4)} color={Colors.whiteMuted85} />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>

      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}>
        <Text style={styles.link}>{Strings.viewDetails}</Text>
        <Icon name="chevron-forward" size={wp(4)} color={Colors.iconSky} />
      </TouchableOpacity>
    </LinearGradient>
  </AnimatedCard>
);

export default UpcomingExamCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: hp(1.5),
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  card: {
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#65C4FF',
    padding: wp(4),
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingRight: wp(2),
  },
  marksBadge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
  marksText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1.2),
  },
  tag: {
    borderRadius: wp(2),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
    backgroundColor: Colors.whiteOverlay22,
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
    color: Colors.iconSky,
  },
  classTag: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(2),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  classText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.6),
    gap: wp(2),
  },
  infoText: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
    gap: wp(1),
  },
  link: {
    color: Colors.iconSky,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
});
