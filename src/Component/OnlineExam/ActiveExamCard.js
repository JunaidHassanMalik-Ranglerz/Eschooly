import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {formatTime} from '../../utils/formatTime';
import {wp, hp} from '../../Constants/Responsive';
import AnimatedCard from '../AnimatedCard';
import {
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../Profile/ProfileTheme';

const ActiveExamCard = ({exam, onStart, animationIndex = 0}) => {
  const [timeLeft, setTimeLeft] = useState(exam.timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedCard
      index={animationIndex}
      style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
      <LinearGradient
        colors={CARD_GRADIENTS.royal}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{Strings.liveNow}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{Strings.inProgress}</Text>
          </View>
        </View>

        <Text style={styles.title}>{exam.title}</Text>
        <Text style={styles.meta}>
          {exam.className} · {exam.marks} {Strings.marksLabel} · {exam.duration}{' '}
          {Strings.minLabel}
        </Text>

        <View style={styles.timerBox}>
          <View style={styles.timerLeft}>
            <Icon name="time-outline" size={wp(5)} color={Colors.iconSky} />
            <Text style={styles.timerLabel}>{Strings.timeRemaining}</Text>
          </View>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.85}
          onPress={() => onStart?.(timeLeft)}>
          <Text style={styles.btnText}>{Strings.startExam}</Text>
          <Icon name="arrow-forward" size={wp(4.5)} color={Colors.white} />
        </TouchableOpacity>
      </LinearGradient>
    </AnimatedCard>
  );
};

export default ActiveExamCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: hp(2.5),
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  card: {
    borderRadius: wp(4),
    padding: wp(4),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.iconSky,
    marginRight: wp(1.5),
  },
  liveText: {
    color: Colors.iconSky,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs2,
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm2,
    marginBottom: hp(0.4),
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    marginBottom: hp(1.5),
  },
  timerBox: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(3),
    padding: wp(3.5),
    marginBottom: hp(1.5),
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  timerLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    marginLeft: wp(1.5),
  },
  timer: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.lg,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(8),
    paddingVertical: hp(1.6),
    gap: wp(2),
  },
  btnText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.sm2,
  },
});
