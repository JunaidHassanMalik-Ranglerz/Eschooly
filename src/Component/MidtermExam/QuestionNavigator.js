import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const COLS = 8;
const GAP = wp(1.6);
const H_PAD = wp(16);
const BOX = (wp(100) - H_PAD - GAP * (COLS - 1)) / COLS;

const QuestionNavigator = ({
  total,
  currentIndex,
  answers,
  flagged,
  onJump,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.questionNavigator}</Text>
        <Text style={styles.hint}>{Strings.tapToJump}</Text>
      </View>

      <View style={styles.grid}>
        {Array.from({length: total}, (_, index) => {
          const num = index + 1;
          const isCurrent = index === currentIndex;
          const isAnswered = answers[index] != null && !isCurrent;
          const isFlagged = flagged.includes(index);

          return (
            <TouchableOpacity
              key={num}
              style={[
                styles.box,
                isAnswered && styles.boxAnswered,
                isCurrent && styles.boxCurrent,
                !isAnswered && !isCurrent && styles.boxUnanswered,
              ]}
              activeOpacity={0.8}
              onPress={() => onJump(index)}>
              <Text
                style={[
                  styles.boxText,
                  isAnswered && styles.boxTextAnswered,
                  isCurrent && styles.boxTextCurrent,
                  !isAnswered && !isCurrent && styles.boxTextUnanswered,
                ]}>
                {num}
              </Text>
              {isFlagged ? <View style={styles.flagDot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.legend}>
        <LegendItem
          boxStyle={styles.legendAnswered}
          label={Strings.answeredLegend}
        />
        <LegendItem
          boxStyle={styles.legendCurrent}
          bordered
          label={Strings.currentLegend}
        />
        <LegendItem
          boxStyle={styles.legendUnanswered}
          label={Strings.unansweredLegend}
        />
      </View>
    </View>
  );
};

const LegendItem = ({boxStyle, label, bordered}) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendBox, boxStyle, bordered && styles.legendBorder]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

export default QuestionNavigator;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  title: {
    color: Colors.grayText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs2,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  hint: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  box: {
    width: BOX,
    height: BOX,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  boxAnswered: {
    backgroundColor: Colors.primary,
  },
  boxCurrent: {
    backgroundColor: '#EAF1FF',
    borderWidth: 1.5,
    borderColor: Colors.linkBlue,
  },
  boxUnanswered: {
    backgroundColor: '#F3F4F6',
  },
  boxText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs2,
  },
  boxTextAnswered: {
    color: Colors.white,
  },
  boxTextCurrent: {
    color: Colors.primary,
  },
  boxTextUnanswered: {
    color: Colors.mutedText,
  },
  flagDot: {
    position: 'absolute',
    top: wp(0.8),
    right: wp(0.8),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.warning,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: hp(1.5),
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: wp(3.2),
    height: wp(3.2),
    borderRadius: wp(0.8),
    marginRight: wp(1.2),
  },
  legendBorder: {
    borderWidth: 1,
    borderColor: Colors.linkBlue,
  },
  legendAnswered: {
    backgroundColor: Colors.primary,
  },
  legendCurrent: {
    backgroundColor: '#EAF1FF',
  },
  legendUnanswered: {
    backgroundColor: '#F3F4F6',
  },
  legendText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxs0,
  },
});
