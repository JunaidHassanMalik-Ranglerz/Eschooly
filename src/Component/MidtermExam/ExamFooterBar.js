import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {formatTime} from '../../utils/formatTime';
import {wp, hp} from '../../Constants/Responsive';

const ExamFooterBar = ({timeLeft, className, totalMarks, marksLabel}) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.timerPill}>
        <Icon name="time-outline" size={wp(4.5)} color={Colors.red} />
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>
      <Text style={styles.meta}>
        {className} · {totalMarks} {marksLabel}
      </Text>
    </View>
  );
};

export default ExamFooterBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFD6D6',
    borderRadius: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    gap: wp(1.5),
  },
  timer: {
    color: Colors.red,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  meta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
});
