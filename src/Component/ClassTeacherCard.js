import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from './btn';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const ClassTeacherCard = props => {
  return (
    <View style={styles.wrap}>
      <View style={styles.sectionRow}>
        <Icon name="star" size={wp(3.5)} color={Colors.primary} />
        <Text style={styles.sectionLabel} numberOfLines={1}>{Strings.classTeacher}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText} numberOfLines={1}>
            {props?.teacher?.initials}
          </Text>
        </View>

        <View style={styles.info}>
          <View style={styles.badgeRow}>
            <Icon name="checkmark-circle" size={wp(3.5)} color={Colors.primary} />
            <Text style={styles.badgeText} numberOfLines={1}>{Strings.classTeacher}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {props?.teacher?.name}
          </Text>
          <View style={styles.subjectRow}>
            <Image
              source={Images.lecture}
              style={styles.lectureIcon}
              resizeMode="contain"
            />
            <Text style={styles.subject} numberOfLines={1}>
              {props?.teacher?.subject}
            </Text>
          </View>
        </View>

        <Btn
          title={Strings.message}
          image={Images.messageIcon}
          iconSize={wp(3.7)}
          style={styles.messageBtn}
          textStyle={styles.messageBtnText}
          onPress={props?.onMessage}
        />
      </View>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    padding: wp(4),
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  info: {
    flex: 1,
    marginRight: wp(2),
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
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize:wp(3.73),
    marginBottom: hp(0.4),
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  lectureIcon: {
    width: wp(3.5),
    height: wp(3.5),
  },
  subject: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
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
