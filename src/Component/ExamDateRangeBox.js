import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGradientCard from './Profile/ProfileGradientCard';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {CARD_GRADIENTS} from '../Constants/CardTheme';
import {wp, hp} from '../Constants/Responsive';
import ExamDateRangeModal, {formatRangeLabel} from './ExamDateRangeModal';

const ExamDateRangeBox = ({startDate, endDate, onApply, animationIndex = 0}) => {
  const [visible, setVisible] = useState(false);
  const rangeLabel = formatRangeLabel(startDate, endDate);

  return (
    <>
      <ProfileGradientCard
        innerStyle={styles.inner}
        animationIndex={animationIndex}
        colors={CARD_GRADIENTS.royal}
        onPress={() => setVisible(true)}>
        <View style={styles.row}>
          <Icon name="calendar-outline" size={wp(5)} color={Colors.white} />
          <View style={styles.textWrap}>
            <Text style={styles.label}>{Strings.dateRange}</Text>
            <Text style={styles.value}>{rangeLabel}</Text>
          </View>
          <Icon name="chevron-forward" size={wp(4.5)} color={Colors.whiteMuted85} />
        </View>
      </ProfileGradientCard>

      <ExamDateRangeModal
        visible={visible}
        startDate={startDate}
        endDate={endDate}
        onClose={() => setVisible(false)}
        onApply={onApply}
      />
    </>
  );
};

export default ExamDateRangeBox;

const styles = StyleSheet.create({
  inner: {
    paddingVertical: hp(1.2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textWrap: {
    flex: 1,
    marginLeft: wp(3),
  },
  label: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    letterSpacing: 0.5,
    marginBottom: hp(0.3),
  },
  value: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
  },
});
