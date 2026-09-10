import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const CompletedExamCard = ({item, onPress}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.gradeBadge, {backgroundColor: item.gradeBg}]}>
          <Text style={[styles.gradeText, {color: item.gradeColor}]}>
            {item.grade}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="calendar-outline" size={wp(4)} color={Colors.grayText} />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>

      <Text style={styles.score}>
        {item.score} / {item.totalMarks} {Strings.marksLower}
      </Text>

      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}>
        <Text style={styles.link}>{Strings.viewResult}</Text>
        <Icon name="arrow-forward" size={wp(4)} color={Colors.linkBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default CompletedExamCard;

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
    marginBottom: hp(0.8),
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingRight: wp(2),
  },
  gradeBadge: {
    borderRadius: wp(2),
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.3),
  },
  gradeText: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
    gap: wp(2),
  },
  infoText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  score: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
    gap: wp(1),
  },
  link: {
    color: Colors.linkBlue,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
});
