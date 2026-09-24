import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

const ClassTeacherCard = ({teacher, onMessage, premium = false, animationIndex = 0}) => {
  const subjectIcon = getSubjectIconTheme(teacher?.subject);
  const teacherPerson = {
    label: teacher?.name,
    name: teacher?.name,
    gender: teacher?.gender,
  };

  const content = (
    <View style={styles.card}>
      <PersonAvatar person={teacherPerson} size={wp(12)} />

      <View style={styles.info}>
        <View style={styles.badgeRow}>
          <Icon
            name="checkmark-circle"
            size={wp(3.5)}
            color={premium ? Colors.iconGreen : Colors.primary}
          />
          <Text
            style={[styles.badgeText, premium && styles.badgeTextPremium]}
            numberOfLines={1}>
            {Strings.classTeacher}
          </Text>
        </View>
        <Text style={[styles.name, premium && styles.namePremium]} numberOfLines={1}>
          {teacher?.name}
        </Text>
        <View style={styles.subjectRow}>
          <DepthIcon
            name={subjectIcon.icon}
            size={wp(4.8)}
            color={subjectIcon.color}
          />
          <Text
            style={[styles.subject, premium && styles.subjectPremium]}
            numberOfLines={1}>
            {teacher?.subject}
          </Text>
        </View>
      </View>

      <Btn
        title={Strings.message}
        image={Images.messageIcon}
        iconSize={wp(3.7)}
        style={styles.messageBtn}
        textStyle={styles.messageBtnText}
        onPress={() => onMessage?.(teacher)}
      />
    </View>
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.sectionRow}>
        <Icon name="star" size={wp(3.5)} color={Colors.primary} />
        <Text style={styles.sectionLabel} numberOfLines={1}>
          {Strings.classTeacher}
        </Text>
      </View>

      {premium ? (
        <ProfileGradientCard
          innerStyle={styles.premiumInner}
          animationIndex={animationIndex}
          colors={[Colors.parentHeader, Colors.parentHeader]}
          waveVariant={SCREEN_WAVES.teachers}>
          {content}
        </ProfileGradientCard>
      ) : (
        <AnimatedCard index={animationIndex} style={styles.plainCard}>
          {content}
        </AnimatedCard>
      )}
    </View>
  );
};

export default ClassTeacherCard;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2.5),
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    gap: wp(1.5),
  },
  sectionLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs,
    letterSpacing: 0.5,
    width: wp(45),
  },
  plainCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    padding: wp(4),
  },
  premiumInner: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    marginBottom: hp(0.3),
  },
  badgeText: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs,
    letterSpacing: 0.3,
  },
  badgeTextPremium: {
    color: Colors.iconGreen,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    marginBottom: hp(0.4),
  },
  namePremium: {
    color: Colors.white,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  subject: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
  subjectPremium: {
    color: Colors.whiteMuted75,
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
