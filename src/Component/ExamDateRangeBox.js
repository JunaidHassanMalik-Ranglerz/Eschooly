import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import ExamDateRangeModal, {formatRangeLabel} from './ExamDateRangeModal';

const ExamDateRangeBox = ({startDate, endDate, onApply}) => {
  const [visible, setVisible] = useState(false);

  const rangeLabel = formatRangeLabel(startDate, endDate);

  return (
    <>
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.8}
        onPress={() => setVisible(true)}>
        <Icon name="calendar-outline" size={wp(5)} color={Colors.primary} />
        <View style={styles.textWrap}>
          <Text style={styles.label}>{Strings.dateRange}</Text>
          <Text style={styles.value}>{rangeLabel}</Text>
        </View>
        <Icon name="chevron-forward" size={wp(4.5)} color={Colors.primary} />
      </TouchableOpacity>

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
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  textWrap: {
    flex: 1,
    marginLeft: wp(3),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    letterSpacing: 0.5,
    marginBottom: hp(0.3),
  },
  value: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
  },
});
