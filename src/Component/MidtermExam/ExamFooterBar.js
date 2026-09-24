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
        <Icon name="time-outline" size={wp(4.5)} color={Colors.iconSky} />
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
    borderTopColor: Colors.whiteOverlay22,
    backgroundColor: '#071A3D',
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay18,
    borderWidth: 1,
    borderColor: Colors.iconSky,
    borderRadius: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    gap: wp(1.5),
  },
  timer: {
    color: Colors.iconSky,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  meta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
});
