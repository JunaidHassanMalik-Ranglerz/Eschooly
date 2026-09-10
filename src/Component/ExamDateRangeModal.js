import React, {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHEET_H_PAD = wp(4);
const OVERLAY_H_PAD = wp(5);
const SCREEN_WIDTH = Dimensions.get('window').width;
const DAY_WIDTH =
  (SCREEN_WIDTH - OVERLAY_H_PAD * 2 - SHEET_H_PAD * 2) / 7;
const CIRCLE_SIZE = wp(8.5);

const toDateKey = date => {
  if (!date) {
    return null;
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const fromParts = (year, month, day) => new Date(year, month, day);

const formatShort = date => {
  if (!date) {
    return '';
  }
  const month = MONTHS[date.getMonth()].slice(0, 3);
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

const formatRangeLabel = (start, end) => {
  if (!start || !end) {
    return '';
  }
  const startMonth = MONTHS[start.getMonth()].slice(0, 3);
  const endMonth = MONTHS[end.getMonth()].slice(0, 3);
  if (start.getFullYear() === end.getFullYear()) {
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${formatShort(start)} - ${formatShort(end)}`;
};

const getCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    days.push({day, month: prevMonth, year: prevYear, current: false});
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({day: d, month, year, current: true});
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    days.push({day: d, month: nextMonth, year: nextYear, current: false});
  }

  return days;
};

const getRangeType = (date, start, end) => {
  if (!start || !end) {
    if (start && toDateKey(date) === toDateKey(start)) {
      return 'single';
    }
    return 'none';
  }

  const key = toDateKey(date);
  const startKey = toDateKey(start);
  const endKey = toDateKey(end);

  if (key === startKey && key === endKey) {
    return 'single';
  }
  if (key === startKey) {
    return 'start';
  }
  if (key === endKey) {
    return 'end';
  }
  if (date > start && date < end) {
    return 'middle';
  }
  return 'none';
};

const ExamDateRangeModal = ({visible, startDate, endDate, onClose, onApply}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  useEffect(() => {
    if (visible) {
      setTempStart(startDate);
      setTempEnd(endDate);
      const base = startDate || today;
      setViewYear(base.getFullYear());
      setViewMonth(base.getMonth());
    }
  }, [visible, startDate, endDate]);

  const weeks = useMemo(() => {
    const days = getCalendarDays(viewYear, viewMonth);
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  }, [viewYear, viewMonth]);

  const startKey = toDateKey(tempStart);
  const endKey = toDateKey(tempEnd);
  const todayKey = toDateKey(today);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayPress = (year, month, day) => {
    const picked = fromParts(year, month, day);

    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(picked);
      setTempEnd(null);
      return;
    }

    if (picked < tempStart) {
      setTempEnd(tempStart);
      setTempStart(picked);
      return;
    }

    setTempEnd(picked);
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
  };

  const handleApply = () => {
    if (tempStart && tempEnd && onApply) {
      onApply(tempStart, tempEnd);
    }
    onClose();
  };

  const renderDayCell = (item, index) => {
    const date = fromParts(item.year, item.month, item.day);
    const key = toDateKey(date);
    const rangeType = getRangeType(date, tempStart, tempEnd);
    const isSelected = key === startKey || key === endKey;
    const isToday = key === todayKey;

    return (
      <TouchableOpacity
        key={`${key}-${index}`}
        style={styles.dayCell}
        activeOpacity={0.8}
        onPress={() => handleDayPress(item.year, item.month, item.day)}>
        {rangeType === 'middle' ? <View style={styles.rangeMiddle} /> : null}
        {rangeType === 'start' ? <View style={styles.rangeStart} /> : null}
        {rangeType === 'end' ? <View style={styles.rangeEnd} /> : null}

        <View
          style={[
            styles.dayCircle,
            isSelected && styles.dayCircleSelected,
            isToday && !isSelected && styles.dayCircleToday,
          ]}>
          <Text
            style={[
              styles.dayText,
              !item.current && styles.dayTextMuted,
              isSelected && styles.dayTextSelected,
            ]}>
            {item.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.navBtn}
              activeOpacity={0.8}
              onPress={handlePrevMonth}>
              <Icon name="chevron-back" size={wp(4.2)} color={Colors.black} />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.monthTitle}>
                {MONTHS[viewMonth]} {viewYear}
              </Text>
              <Text style={styles.selectLabel}>{Strings.selectRange}</Text>
            </View>

            <TouchableOpacity
              style={styles.navBtn}
              activeOpacity={0.8}
              onPress={handleNextMonth}>
              <Icon name="chevron-forward" size={wp(4.2)} color={Colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map(day => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {weeks.map((week, weekIndex) => (
              <View key={`week-${weekIndex}`} style={styles.weekLine}>
                {week.map((item, dayIndex) => renderDayCell(item, dayIndex))}
              </View>
            ))}
          </View>

          <View style={styles.rangeBox}>
            <View style={styles.rangeSideLeft}>
              <Text style={styles.rangeLabel}>{Strings.start}</Text>
              <Text style={styles.rangeValue}>
                {formatShort(tempStart) || '-'}
              </Text>
            </View>

            <Icon
              name="arrow-forward"
              size={wp(4)}
              color={Colors.grayText}
              style={styles.rangeArrow}
            />

            <View style={styles.rangeSideRight}>
              <Text style={styles.rangeLabel}>{Strings.end}</Text>
              <Text style={styles.rangeValue}>{formatShort(tempEnd) || '-'}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleClear} activeOpacity={0.8}>
              <Text style={styles.clearText}>{Strings.clear}</Text>
            </TouchableOpacity>

            <View style={styles.footerBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.8}
                onPress={onClose}>
                <Text style={styles.cancelText}>{Strings.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  !(tempStart && tempEnd) && styles.applyBtnDisabled,
                ]}
                disabled={!(tempStart && tempEnd)}
                activeOpacity={0.85}
                onPress={handleApply}>
                <Text style={styles.applyText}>{Strings.apply}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {formatRangeLabel};
export default ExamDateRangeModal;

const rangeBarBase = {
  position: 'absolute',
  height: CIRCLE_SIZE,
  top: (wp(10) - CIRCLE_SIZE) / 2,
  backgroundColor: Colors.lightGray,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'center',
    paddingHorizontal: OVERLAY_H_PAD,
  },
  sheet: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: SHEET_H_PAD,
    paddingTop: hp(2.5),
    paddingBottom: hp(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.2),
  },
  navBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  monthTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
  },
  selectLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    marginTop: hp(0.4),
    letterSpacing: 1,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: hp(1.2),
  },
  weekday: {
    width: DAY_WIDTH,
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    letterSpacing: 0.3,
  },
  calendarGrid: {
    marginBottom: hp(0.5),
  },
  weekLine: {
    flexDirection: 'row',
  },
  dayCell: {
    width: DAY_WIDTH,
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rangeMiddle: {
    ...rangeBarBase,
    left: 0,
    right: 0,
  },
  rangeStart: {
    ...rangeBarBase,
    left: '50%',
    right: 0,
  },
  rangeEnd: {
    ...rangeBarBase,
    left: 0,
    right: '50%',
  },
  dayCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dayCircleSelected: {
    backgroundColor: Colors.primary,
  },
  dayCircleToday: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  dayText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
  },
  dayTextMuted: {
    color: '#D0D0D0',
  },
  dayTextSelected: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  rangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2.2),
  },
  rangeSideLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rangeSideRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rangeArrow: {
    marginHorizontal: wp(2),
  },
  rangeLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    letterSpacing: 0.5,
    marginBottom: hp(0.4),
  },
  rangeValue: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.normal,
  },
  footerBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  cancelBtn: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.3),
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  cancelText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.normal,
  },
  applyBtn: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.3),
    borderRadius: wp(8),
    backgroundColor: Colors.primary,
  },
  applyBtnDisabled: {
    opacity: 0.45,
  },
  applyText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
  },
});
