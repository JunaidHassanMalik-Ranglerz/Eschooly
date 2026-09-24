import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import {SCREEN_WAVES} from './CardWave';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import {CARD_GRADIENTS} from '../Constants/CardTheme';

const ExamNextExamCard = ({subject, date, time, animationIndex = 2}) => (
  <ProfileGradientCard
    innerStyle={styles.inner}
    animationIndex={animationIndex}
    colors={CARD_GRADIENTS.sapphire}
    waveVariant={SCREEN_WAVES.fees}>
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Image source={Images.calendarClock} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {Strings.nextExam}: {subject}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {date} - {time}
        </Text>
      </View>
    </View>
  </ProfileGradientCard>
);

export default ExamNextExamCard;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.white,
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  subtitle: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
});
