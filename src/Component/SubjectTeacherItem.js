import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Btn from './btn';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SubjectTeacherItem = props => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText} numberOfLines={1}>{props?.item?.initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{props?.item?.name}</Text>
        <View style={styles.subjectRow}>
          <Image
            source={Images.lecture}
            style={styles.lectureIcon}
            resizeMode="contain"
          />
          <Text style={styles.subject} numberOfLines={1}>{props?.item?.subject}</Text>
        </View>
      </View>

      <Btn
        title={Strings.message}
        image={Images.messageIcon}
        iconSize={wp(3.7)}
        style={styles.messageBtn}
        textStyle={styles.messageBtnText}
        onPress={() => props?.onMessage?.(props?.item)}
      />
    </View>
  );
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
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  info: {
    flex: 1,
    marginRight: wp(2),
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    marginBottom: hp(0.4),
    width:wp(40),
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
    width:wp(30),
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
