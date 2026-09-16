import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const IdCardFlipButton = ({isBack, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.8}
      onPress={onPress}>
      <Icon
        name="refresh-outline"
        size={wp(4.5)}
        color={Colors.linkBlue}
      />
      <Text style={styles.text}>
        {isBack ? Strings.flipToFront : Strings.flipToBack}
      </Text>
    </TouchableOpacity>
  );
};

export default IdCardFlipButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
    paddingVertical: hp(1),
  },
  icon: {
    marginRight: wp(1.5),
  },
  text: {
    color: Colors.linkBlue,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.5),
  },
});
