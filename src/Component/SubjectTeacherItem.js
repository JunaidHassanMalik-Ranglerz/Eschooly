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

const SubjectTeacherItem = ({item, onMessage, onPress, premium = false, animationIndex = 0}) => {
  const icy = useStudentTone();
  const teacherPerson = {
    label: item?.name,
    name: item?.name,
    gender: item?.gender,
    photoUrl: item?.photoUrl,
  };
  const subjectIcon = getSubjectIconTheme(item?.subject);

  const content = (
    <View style={styles.row}>
      <PersonAvatar
        person={teacherPerson}
        size={icy ? wp(12) : wp(11)}
        borderWidth={icy ? StyleSheet.hairlineWidth * 2 : 0}
        borderColor={icy ? Colors.borderSubtle : undefined}
      />

      <View style={styles.info}>
        <Text
          style={[styles.name, premium && styles.namePremium, icy && styles.nameIcy]}
          numberOfLines={2}>
          {item?.name}
        </Text>
        {item?.subject ? (
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
              {item?.subject}
            </Text>
          </View>
        ) : null}
      </View>

      {icy ? (
        <TouchableOpacity
          style={styles.messageBtnIcy}
          activeOpacity={0.85}
          onPress={() => onMessage?.(item)}>
          <Icon name="chatbubble-outline" size={wp(3.8)} color={Colors.brandRoyal} />
          <Text style={styles.messageBtnTextIcy}>{Strings.message}</Text>
        </TouchableOpacity>
      ) : (
        <Btn
          title={Strings.message}
          image={Images.messageIcon}
          iconSize={wp(3.7)}
          style={styles.messageBtn}
          textStyle={styles.messageBtnText}
          onPress={() => onMessage?.(item)}
        />
      )}
    </View>
  );

  if (icy) {
    return (
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
                color="rgba(91, 156, 255, 0.16)"
              />
            </View>
            <View style={styles.premiumInnerIcy}>{content}</View>
          </View>
        </TouchableOpacity>
      </AnimatedCard>
    );
  }

  if (premium) {
    return (
      <ProfileGradientCard
        innerStyle={styles.premiumInner}
        animationIndex={animationIndex}
        colors={[Colors.parentHeader, Colors.parentHeader]}
        waveVariant={SCREEN_WAVES.teachers}
        onPress={onPress}>
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
    minWidth: 0,
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
  nameIcy: {
    color: Colors.brandNavy,
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
  subjectIcy: {
    color: Colors.textSecondary,
    width: undefined,
    flex: 1,
    minWidth: 0,
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
    marginBottom: hp(1.15),
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
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3.4),
  },
  messageBtnIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
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
