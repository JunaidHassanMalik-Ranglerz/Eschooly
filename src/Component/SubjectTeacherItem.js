import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Btn from './btn';
import DepthIcon from './DepthIcon';
import PersonAvatar from './Profile/PersonAvatar';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import {SCREEN_WAVES} from './CardWave';
import {getSubjectIconTheme} from './Syllabus/SubjectTheme';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SubjectTeacherItem = ({item, onMessage, premium = false, animationIndex = 0}) => {
  const teacherPerson = {
    label: item?.name,
    name: item?.name,
    gender: item?.gender,
  };
  const subjectIcon = getSubjectIconTheme(item?.subject);

  const content = (
    <View style={styles.row}>
      <PersonAvatar person={teacherPerson} size={wp(11)} />

      <View style={styles.info}>
        <Text style={[styles.name, premium && styles.namePremium]} numberOfLines={1}>
          {item?.name}
        </Text>
        <View style={styles.subjectRow}>
          <DepthIcon name={subjectIcon.icon} size={wp(4.8)} color={subjectIcon.color} />
          <Text
            style={[styles.subject, premium && styles.subjectPremium]}
            numberOfLines={1}>
            {item?.subject}
          </Text>
        </View>
      </View>

      <Btn
        title={Strings.message}
        image={Images.messageIcon}
        iconSize={wp(3.7)}
        style={styles.messageBtn}
        textStyle={styles.messageBtnText}
        onPress={() => onMessage?.(item)}
      />
    </View>
  );

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        colors={[Colors.parentHeader, Colors.parentHeader]}
        waveVariant={SCREEN_WAVES.teachers}>
        {content}
      </ProfileGradientCard>
    );
  }

  return <AnimatedCard index={animationIndex} style={styles.card}>{content}</AnimatedCard>;
};

export default SubjectTeacherItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.2),
  },
  premiumInner: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    marginBottom: hp(0.4),
    width: wp(40),
  },
  namePremium: {
    color: Colors.white,
    width: undefined,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.4),
  },
  subject: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    width: wp(30),
  },
  subjectPremium: {
    color: Colors.whiteMuted75,
    width: undefined,
  },
  messageBtn: {
    marginTop: 0,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1),
    borderRadius: wp(8),
    gap: wp(1.5),
  },
  messageBtnText: {
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
});
