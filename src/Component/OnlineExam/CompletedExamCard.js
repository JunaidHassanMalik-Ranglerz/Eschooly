import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import AnimatedCard from '../AnimatedCard';
import {
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../Profile/ProfileTheme';

const gradeTone = grade => {
  if (String(grade).startsWith('A')) {
    return {bg: 'rgba(56, 189, 248, 0.22)', text: '#BFDBFE'};
  }
  if (String(grade).startsWith('B')) {
    return {bg: 'rgba(99, 102, 241, 0.22)', text: '#C7D2FE'};
  }
  return {bg: Colors.whiteOverlay18, text: Colors.white};
};

const CompletedExamCard = ({item, onPress, animationIndex = 0}) => {
  const tone = gradeTone(item.grade);
  return (
    <AnimatedCard
      index={animationIndex}
      style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
      <LinearGradient
        colors={CARD_GRADIENTS.deep}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.gradeBadge, {backgroundColor: tone.bg}]}>
            <Text style={[styles.gradeText, {color: tone.text}]}>
              {item.grade}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar-outline" size={wp(4)} color={Colors.whiteMuted85} />
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
          <Icon name="arrow-forward" size={wp(4)} color={Colors.iconSky} />
        </TouchableOpacity>
      </LinearGradient>
    </AnimatedCard>
  );
};

export default CompletedExamCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: hp(1.5),
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  card: {
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#65C4FF',
    padding: wp(4),
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(0.8),
  },
  title: {
    flex: 1,
    color: Colors.white,
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
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  score: {
    color: Colors.white,
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
    color: Colors.iconSky,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
});
