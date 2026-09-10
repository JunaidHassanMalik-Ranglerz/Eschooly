import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const ExamNextExamCard = props => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Image
          source={Images.calendarClock}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {Strings.nextExam}: {props?.subject} 
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {props?.date} - {props?.time} 
        </Text>
      </View>
    </View>
  );
};

export default ExamNextExamCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
  },
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: '#EEF0F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.primary,
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(4),
    marginBottom: hp(0),
  },
  subtitle: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
});
