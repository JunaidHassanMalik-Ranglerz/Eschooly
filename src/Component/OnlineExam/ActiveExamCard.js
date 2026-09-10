import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {formatTime} from '../../utils/formatTime';
import {wp, hp} from '../../Constants/Responsive';

const ActiveExamCard = ({exam, onStart}) => {
  const [timeLeft, setTimeLeft] = useState(exam.timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.card}>
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
          <Icon name="time-outline" size={wp(5)} color={Colors.red} />
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
    </View>
  );
};

export default ActiveExamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF0F0',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2.5),
    borderWidth: 1,
    borderColor: '#FFE0E0',
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
    backgroundColor: Colors.red,
    marginRight: wp(1.5),
  },
  liveText: {
    color: Colors.red,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs2,
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: '#FFE8E8',
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
  },
  badgeText: {
    color: Colors.red,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm2,
    marginBottom: hp(0.4),
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    marginBottom: hp(1.5),
  },
  timerBox: {
    backgroundColor: Colors.white,
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
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    marginLeft: wp(1.5),
  },
  timer: {
    color: Colors.red,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.lg,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
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
