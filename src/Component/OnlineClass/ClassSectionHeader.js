import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {ocText} from './onlineClassText';
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
    marginBottom: hp(1.2),
    marginTop: hp(0.5),
  },
  title: {
    ...ocText,
    color: Colors.grayText,
    letterSpacing: 0.8,
  },
  link: {
    ...ocText,
    color: Colors.onlineClassviewsColor,
  },
});
