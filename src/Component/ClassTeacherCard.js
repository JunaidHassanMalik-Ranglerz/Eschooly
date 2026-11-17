import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from './btn';
import DepthIcon from './DepthIcon';
import PersonAvatar from './Profile/PersonAvatar';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import AnimatedCard from './AnimatedCard';
import CardWave, {SCREEN_WAVES} from './CardWave';
import {useStudentTone} from './Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';
import {getSubjectIconTheme} from './Syllabus/SubjectTheme';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {elevation, radius} from '../Constants/Theme';
import {wp, hp} from '../Constants/Responsive';

const ClassTeacherCard = ({teacher, onMessage, onPress, premium = false, animationIndex = 0}) => {
  const icy = useStudentTone();
  const subjectIcon = getSubjectIconTheme(teacher?.subject);
  const teacherPerson = {
    label: teacher?.name,
    name: teacher?.name,
    gender: teacher?.gender,
    photoUrl: teacher?.photoUrl,
  };

  const messageIcy = (
    <TouchableOpacity
      style={styles.messageBtnIcy}
      activeOpacity={0.85}
      onPress={() => onMessage?.(teacher)}>
      <Icon name="chatbubble-outline" size={wp(3.8)} color={Colors.brandRoyal} />
      <Text style={styles.messageBtnTextIcy}>{Strings.message}</Text>
    </TouchableOpacity>
  );

  const content = (
    <View style={styles.card}>
      <PersonAvatar
        person={teacherPerson}
        size={icy ? wp(13) : wp(12)}
        borderWidth={icy ? StyleSheet.hairlineWidth * 2 : 0}
        borderColor={icy ? Colors.borderSubtle : undefined}
      />

      <View style={styles.info}>
        <View style={styles.badgeRow}>
          <Icon
            name="checkmark-circle"
            size={wp(3.5)}
            color={
              icy ? Colors.brandRoyal : premium ? Colors.iconGreen : Colors.primary
            }
          />
          <Text
            style={[
              styles.badgeText,
              premium && styles.badgeTextPremium,
              icy && styles.badgeTextIcy,
            ]}
            numberOfLines={1}>
            {Strings.classTeacher}
          </Text>
        </View>
        <Text
          style={[styles.name, premium && styles.namePremium, icy && styles.nameIcy]}
          numberOfLines={2}>
          {teacher?.name}
        </Text>
        {teacher?.subject ? (
          <View style={styles.subjectRow}>
            <DepthIcon
              name={subjectIcon.icon}
              size={wp(4.8)}
              color={icy ? Colors.brandRoyal : subjectIcon.color}
            />
            <Text
              style={[
                styles.subject,
                premium && styles.subjectPremium,
                icy && styles.subjectIcy,
              ]}
              numberOfLines={2}>
              {teacher?.subject}
            </Text>
          </View>
        ) : null}
      </View>

      {icy ? (
        messageIcy
      ) : (
        <Btn
          title={Strings.message}
          image={Images.messageIcon}
          iconSize={wp(3.7)}
          style={styles.messageBtn}
          textStyle={styles.messageBtnText}
          onPress={() => onMessage?.(teacher)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.sectionRow}>
        <Icon
          name="star"
          size={wp(3.5)}
          color={icy ? Colors.brandRoyal : Colors.primary}
        />
        <Text
          style={[styles.sectionLabel, icy && styles.sectionLabelIcy]}
          numberOfLines={1}>
          {Strings.classTeacher}
        </Text>
      </View>

      {icy ? (
        <AnimatedCard index={animationIndex} style={styles.wrapIcy}>
          <TouchableOpacity
            activeOpacity={onPress ? 0.88 : 1}
            disabled={!onPress}
            onPress={onPress}
            style={styles.pressIcy}>
            <View style={styles.clipIcy}>
              <LinearGradient
                colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={styles.fillIcy}
              />
              <View pointerEvents="none" style={styles.waveIcy}>
                <CardWave
                  variant={SCREEN_WAVES.assignmentIce}
                  color="rgba(91, 156, 255, 0.18)"
                />
              </View>
              <View style={styles.premiumInnerIcy}>{content}</View>
            </View>
          </TouchableOpacity>
        </AnimatedCard>
      ) : premium ? (
        <ProfileGradientCard
          innerStyle={styles.premiumInner}
          animationIndex={animationIndex}
          colors={[Colors.parentHeader, Colors.parentHeader]}
          waveVariant={SCREEN_WAVES.teachers}
          onPress={onPress}>
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
    flex: 1,
  },
  sectionLabelIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    letterSpacing: 0,
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
    minWidth: 0,
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
    flexShrink: 1,
  },
  badgeTextPremium: {
    color: Colors.iconGreen,
  },
  badgeTextIcy: {
    color: Colors.brandRoyal,
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
  nameIcy: {
    color: Colors.brandNavy,
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
    flex: 1,
    minWidth: 0,
  },
  subjectPremium: {
    color: Colors.whiteMuted75,
  },
  subjectIcy: {
    color: Colors.textSecondary,
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
  wrapIcy: {
    overflow: 'visible',
  },
  pressIcy: {
    borderRadius: radius.banner,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  premiumInnerIcy: {
    paddingVertical: hp(1.35),
    paddingHorizontal: wp(3.6),
  },
  messageBtnIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(0.95),
    borderRadius: wp(8),
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.brandRoyal,
    gap: wp(1.2),
    flexShrink: 0,
  },
  messageBtnTextIcy: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
  },
});
