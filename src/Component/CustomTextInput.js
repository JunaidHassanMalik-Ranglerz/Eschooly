import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';

const CustomTextInput = props => {
  return (
    <View style={[styles.wrapper, props?.wrapperStyle]}>
      {props?.label ? (
        <Text style={[styles.label, props?.labelStyle]} numberOfLines={1}>{props?.label}</Text>
      ) : null}

      <View style={[styles.inputBox, props?.inputBoxStyle]}>
        {props?.icon ? (
          <View
            style={[
              styles.iconWrap,
              props?.iconBg ? {backgroundColor: props.iconBg} : null,
            ]}>
            <Image source={props?.icon} style={styles.icon} resizeMode="contain" />
          </View>
        ) : null}

        <TextInput
          style={[styles.input, props?.placeholderStyle, props?.inputStyle]}
          placeholder={props?.placeholder}
          placeholderTextColor={
            props?.placeholderStyle?.color ?? Colors.mutedText
          }
          value={props?.value}
          onChangeText={props?.onChangeText}
          keyboardType={props?.keyboardType}
        />

        {props?.rightIcon ? (
          <Image
            source={props.rightIcon}
            style={[styles.rightIcon, props?.rightIconStyle]}
            resizeMode="contain"
          />
        ) : null}
      </View>

      {props?.helper ? (
        <Text style={[styles.helper, props?.helperStyle]}>{props.helper}</Text>
      ) : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(1),
  },
  label: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(1),
    width:wp(40),
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.5),
    borderColor: Colors.primary,
    borderRadius: wp(10),

    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
    backgroundColor: Colors.white,
  },
  iconWrap: {
    width: wp(9.6),
    height: wp(9.6),
    borderRadius: wp(2),
    backgroundColor: Colors.violetSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  icon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },
  rightIcon: {
    width: 14,
    height: 14,
    marginLeft: wp(2),
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
    padding: 0,
  },
  helper: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(1),
  },
});
