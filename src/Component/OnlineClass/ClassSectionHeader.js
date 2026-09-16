import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';

const ClassSectionHeader = props => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{props?.title}</Text>
      {props?.linkText ? (
        <TouchableOpacity activeOpacity={0.8} onPress={props?.onPress}>
          <Text style={styles.link}>{props?.linkText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ClassSectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.3),
    marginTop: hp(0.4),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  link: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
});
