import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const TeacherMessageBtn = ({variant = 'outline', onPress}) => {
  const isFilled = variant === 'filled';

  return (
    <TouchableOpacity
      style={[styles.btn, isFilled ? styles.btnFilled : styles.btnOutline]}
      activeOpacity={0.85}
      onPress={onPress}>
      <Icon
        name="chatbubble-outline"
        size={wp(3.8)}
        color={isFilled ? Colors.white : Colors.primary}
      />
      <Text style={[styles.btnText, isFilled ? styles.textFilled : styles.textOutline]}>
        {Strings.message}
      </Text>
    </TouchableOpacity>
  );
};

export default TeacherMessageBtn;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    borderRadius: wp(8),
    gap: wp(1.2),
  },
  btnFilled: {
    backgroundColor: Colors.primary,
  },
  btnOutline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  btnText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
  },
  textFilled: {
    color: Colors.white,
  },
  textOutline: {
    color: Colors.primary,
  },
});
