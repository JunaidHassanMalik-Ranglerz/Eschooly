import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const UpcomingExamCard = ({item, onPress}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.marksBadge}>
          <Text style={styles.marksText}>
            {item.marks} {Strings.marksLabel}
          </Text>
        </View>
      </View>

      <View style={styles.tags}>
        <View style={[styles.tag, {backgroundColor: item.subjectBg}]}>
          <Text style={[styles.tagText, {color: item.subjectColor}]}>
            {item.subject}
          </Text>
        </View>
        <View style={styles.classTag}>
          <Text style={styles.classText}>{item.className}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="calendar-outline" size={wp(4)} color={Colors.grayText} />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="time-outline" size={wp(4)} color={Colors.grayText} />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>

      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}>
        <Text style={styles.link}>{Strings.viewDetails}</Text>
        <Icon name="chevron-forward" size={wp(4)} color={Colors.linkBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default UpcomingExamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingRight: wp(2),
  },
  marksBadge: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
  marksText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1.2),
  },
  tag: {
    borderRadius: wp(2),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  classTag: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(2),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  classText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxs0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.6),
    gap: wp(2),
  },
  infoText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
    gap: wp(1),
  },
  link: {
    color: Colors.linkBlue,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
});
