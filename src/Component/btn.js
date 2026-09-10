import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const Btn = props => {
  const isOutline = props?.variant === 'outline';
  const showIcon = props?.showIcon !== false;
  const iconRight = props?.iconRight === true;
  const size = props?.iconSize || wp(5);
  const iconColor = isOutline ? Colors.red : Colors.white;

  const iconEl = showIcon ? (
    props?.image ? (
      <Image
        source={props?.image}
        style={[styles.btnIcon, {width: size, height: size}]}
        resizeMode="contain"
      />
    ) : (
      <Icon
        name={props?.icon || 'card-outline'}
        size={size}
        color={iconColor}
      />
    )
  ) : null;

  return (
    <TouchableOpacity
      style={[styles.btn, isOutline && styles.outlineBtn, props?.style]}
      activeOpacity={0.85}
      onPress={props?.onPress}>
      {!iconRight && iconEl}
      <Text
        style={[
          styles.btnText,
          isOutline && styles.outlineText,
          props?.textStyle,
        ]}>
        {props?.title || Strings.payNow}
      </Text>
      {iconRight && iconEl}
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp(10),
    paddingVertical: hp(1.8),
    marginTop: hp(2),
    gap: wp(2),
  },
  btnText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
  },
  btnIcon: {
    width: wp(5),
    height: wp(5),
  },
  outlineBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: wp(4),
  },
  outlineText: {
    color: Colors.red,
  },
});
