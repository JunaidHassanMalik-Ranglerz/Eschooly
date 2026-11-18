import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {hp} from '../../Constants/Responsive';
import {useStudentTone} from '../Glass/StudentTone';

const ClassSectionHeader = props => {
  const icy = useStudentTone();
  return (
    <View style={styles.row}>
      <Text style={[styles.title, icy && styles.titleIcy]}>{props?.title}</Text>
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
  titleIcy: {
    color: Colors.brandNavy,
  },
  link: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
});
