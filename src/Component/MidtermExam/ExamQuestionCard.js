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
import {GRADIENT_END, GRADIENT_START} from '../Profile/ProfileTheme';

const ExamQuestionCard = ({question, selected, onSelect}) => {
  return (
    <LinearGradient
      colors={CARD_GRADIENTS.royal}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Q{question.id}</Text>
        </View>
        <Text style={styles.marks}>
          {question.marks} {Strings.marksLabel}
        </Text>
      </View>

      <Text style={styles.question}>{question.text}</Text>

      {question.options.map(option => {
        const active = selected === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            style={[styles.option, active && styles.optionActive]}
            activeOpacity={0.85}
            onPress={() => onSelect(option.key)}>
            <View style={[styles.letter, active && styles.letterActive]}>
              <Text style={[styles.letterText, active && styles.letterTextActive]}>
                {option.key}
              </Text>
            </View>
            <Text style={[styles.optionValue, active && styles.optionValueActive]}>
              {option.value}
            </Text>
            <Icon
              name={active ? 'radio-button-on' : 'radio-button-off'}
              size={wp(5)}
              color={active ? Colors.iconSky : Colors.whiteMuted75}
            />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

export default ExamQuestionCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  badge: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(2),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs2,
  },
  marks: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  question: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm2,
    lineHeight: hp(2.8),
    marginBottom: hp(1.5),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteOverlay22,
    borderRadius: wp(3),
    padding: wp(3),
    marginBottom: hp(1),
    backgroundColor: Colors.whiteOverlay18,
  },
  optionActive: {
    borderColor: Colors.iconSky,
    borderWidth: 1.5,
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
  },
  letter: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  letterActive: {
    backgroundColor: Colors.iconSky,
  },
  letterText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.small,
  },
  letterTextActive: {
    color: Colors.white,
  },
  optionValue: {
    flex: 1,
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.sm,
  },
  optionValueActive: {
    color: Colors.white,
  },
});
