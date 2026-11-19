import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import AnimatedCard from '../../Component/AnimatedCard';
import EschoolyScreenShell from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import TimetableStudentHeader from '../../Component/Timetable/TimetableStudentHeader';
import TimetablePeriodCard from '../../Component/Timetable/TimetablePeriodCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import {
  fetchChildDashboard,
  fetchChildTimetable,
  fetchParentHome,
} from '../../store/slices/parentHomeSlice';
import {fetchStudentTimetable} from '../../store/slices/studentHomeSlice';

const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

const getStartLabel = time => (time || '').split(' - ')[0] || time;

const buildWeek = date => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({length: 7}, (_, index) => {
    const item = new Date(start);
    item.setDate(start.getDate() + index);
    return {
      key: String(index),
      label: WEEK_DAYS[index],
      day: item.getDate(),
      date: item,
    };
  });
};

const Timetable = () => {
  const dispatch = useDispatch();
  const {isParent} = useRoleData();
  const icy = true;
  const bottomPad = useStackBottomPad();
  const {selectedChildId, children} = useSelector(state => state.parentHome);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [parentSlots, setParentSlots] = useState([]);
  const [studentSlots, setStudentSlots] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const [viewMode, setViewMode] = useState(Strings.day);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [switchVisible, setSwitchVisible] = useState(false);

  const week = useMemo(() => buildWeek(currentDate), [currentDate]);
  const dayName = DAY_NAMES[currentDate.getDay()];
  const parentChild =
    children.find(item => item.value === String(selectedChildId)) ||
    children[0] ||
    null;
  const parentCanSwitch = isParent && children.length > 1;
  const classLabel = isParent ? parentChild?.className || '' : '';
  const timetable = isParent ? parentSlots : studentSlots;
  const visibleItems = timetable.filter(item => item.subject !== 'Break');
  const list = viewMode === Strings.week ? visibleItems.slice(0, 3) : visibleItems;

  useEffect(() => {
    if (!isParent || selectedChildId) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [dispatch, isParent, selectedChildId]);

  useEffect(() => {
    if (!isParent || !selectedChildId) {
      return undefined;
    }

    let active = true;
    setLoading(true);

    dispatch(fetchChildTimetable({childId: selectedChildId, day: dayName}))
      .unwrap()
      .then(slots => {
        if (active) {
          setParentSlots(slots);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentSlots([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load timetable.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dayName, dispatch, isParent, selectedChildId]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }

    let active = true;
    setLoading(true);

    dispatch(fetchStudentTimetable(dayName))
      .unwrap()
      .then(slots => {
        if (active) {
          setStudentSlots(slots);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentSlots([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load timetable.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dayName, dispatch, isParent]);

  const changeWeek = direction => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(next);
  };

  const openChildSwitch = useCallback(() => {
    if (!parentCanSwitch) {
      return;
    }
    setSwitchVisible(true);
  }, [parentCanSwitch]);

  const handleSelectChild = useCallback(
    nextId => {
      if (!nextId || String(nextId) === String(selectedChildId)) {
        return;
      }
      dispatch(fetchChildDashboard(nextId));
    },
    [dispatch, selectedChildId],
  );

  const modeToggle = (
    <View
      style={[
        styles.toggleWrap,
        icy && styles.toggleWrapStudent,
        icy && isParent && styles.toggleWrapParent,
      ]}>
      {[Strings.day, Strings.week].map(tab => {
        const active = tab === viewMode;
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.toggleBtn,
              active && (icy ? styles.toggleBtnActiveStudent : styles.toggleBtnActive),
            ]}
            activeOpacity={0.85}
            onPress={() => setViewMode(tab)}>
            <Text
              style={[
                styles.toggleText,
                icy && styles.toggleTextStudent,
                active && styles.toggleTextActive,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const monthNav = (
    <View
      style={[
        styles.monthRow,
        icy && styles.monthRowStudent,
        icy && isParent && styles.monthRowParent,
      ]}>
      <TouchableOpacity
        onPress={() => changeWeek(-1)}
        style={[
          styles.monthArrow,
          icy && styles.monthArrowStudent,
          icy && isParent && styles.monthArrowParent,
        ]}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Previous week">
        <Icon
          name="chevron-back"
          size={wp(5)}
          color={icy ? Colors.brandNavy : Colors.primary}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.month,
          icy && styles.monthStudent,
          icy && isParent && styles.monthParent,
        ]}
        numberOfLines={1}>
        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
      </Text>
      <TouchableOpacity
        onPress={() => changeWeek(1)}
        style={[
          styles.monthArrow,
          icy && styles.monthArrowStudent,
          icy && isParent && styles.monthArrowParent,
        ]}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Next week">
        <Icon
          name="chevron-forward"
          size={wp(5)}
          color={icy ? Colors.brandNavy : Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  const dateStrip = (
    <View
      style={[
        styles.weekRow,
        icy && styles.weekRowStudent,
        icy && isParent && styles.weekRowParent,
      ]}>
      {week.map(item => {
        const active =
          item.date.getDate() === currentDate.getDate() &&
          item.date.getMonth() === currentDate.getMonth();
        return (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.dayCol,
              icy && styles.dayColStudent,
              icy && isParent && styles.dayColParent,
            ]}
            activeOpacity={0.85}
            onPress={() => setCurrentDate(item.date)}>
            <Text
              style={[
                styles.dayLabel,
                icy && styles.dayLabelStudent,
                icy && isParent && styles.dayLabelParent,
              ]}
              numberOfLines={1}>
              {item.label}
            </Text>
            <View
              style={[
                styles.dateCircle,
                icy && styles.dateCircleStudent,
                icy && isParent && styles.dateCircleParent,
                active &&
                  (icy ? styles.dateCircleActiveStudent : styles.dateCircleActive),
                active && icy && isParent && styles.dateCircleActiveParent,
              ]}>
              <Text
                style={[
                  styles.dateText,
                  icy && styles.dateTextStudent,
                  icy && isParent && styles.dateTextParent,
                  active && styles.dateTextActive,
                ]}>
                {item.day}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderParentSlot = (item, index) => (
    <ProfileGradientCard
      key={item.id}
      innerStyle={styles.slotInner}
      animationIndex={index + 5}
      colors={CARD_GRADIENTS.notification}
      variant="navy"
      waveVariant={index !== 0 ? null : 'timetable'}
      disableAnimation>
      <View style={styles.slotRow}>
        <Text style={styles.timePremium}>{getStartLabel(item.time)}</Text>
        <View style={styles.slotBody}>
          <Text style={styles.subjectPremium}>{item.subject}</Text>
          <Text style={styles.classPremium}>
            {[
              item.period ? `Period ${item.period}` : '',
              item.time,
              item.classLabel ? `Class ${item.classLabel}` : classLabel,
              item.teacher,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        </View>
      </View>
    </ProfileGradientCard>
  );

  const periods = loading || (isParent && !selectedChildId) ? (
    <ActivityIndicator
      style={styles.loader}
      size="large"
      color={icy ? Colors.brandRoyal : Colors.primary}
    />
  ) : icy ? (
    list.map(item => (
      <TimetablePeriodCard key={item.id} item={item} classLabel={classLabel} />
    ))
  ) : (
    list.map(renderParentSlot)
  );

  const empty =
    !loading && !(isParent && !selectedChildId) && list.length === 0 ? (
      <Text style={[styles.emptyText, icy && styles.emptyTextStudent]}>
        {Strings.noTimetable}
      </Text>
    ) : null;

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}>
            <EschoolyScreenShell.Header>
              <TimetableStudentHeader
                unreadCount={unreadNotifications}
                subtitle={
                  isParent
                    ? Strings.timetableSubtitleParent
                    : Strings.timetableSubtitleStudent
                }
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  {isParent ? (
                    <SelectedChildBanner
                      child={parentChild}
                      icy
                      compactMargin
                      animationIndex={1}
                      canSwitch={parentCanSwitch}
                      onSwitchPress={
                        parentCanSwitch ? openChildSwitch : undefined
                      }
                    />
                  ) : null}
                  {modeToggle}
                  <View style={[styles.calCard, isParent && styles.calCardParent]}>
                    {monthNav}
                    {dateStrip}
                  </View>
                  <Text style={styles.sectionTitle}>{Strings.timetable}</Text>
                  {periods}
                  {empty}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
          {parentCanSwitch ? (
            <ChildSwitchModal
              visible={switchVisible}
              childrenList={children}
              selectedId={String(selectedChildId || parentChild?.value || '')}
              onSelect={handleSelectChild}
              onClose={() => setSwitchVisible(false)}
            />
          ) : null}
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar
          backgroundColor={Colors.parentBg}
          barStyle="dark-content"
        />
        <MainHeaderComponent title={Strings.timetable} navyBack />
        <ScrollEnterScrollView
          contentContainerStyle={[styles.content, {paddingBottom: bottomPad}]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}>
          <AnimatedCard index={1} style={styles.toggleCard}>
            {modeToggle}
          </AnimatedCard>
          <AnimatedCard index={2} style={styles.monthCard}>
            {monthNav}
          </AnimatedCard>
          <AnimatedCard index={3} style={styles.weekCard}>
            {dateStrip}
          </AnimatedCard>
          <ProfileSectionTitle animationIndex={4} style={styles.scheduleTitle}>
            {Strings.timetable}
          </ProfileSectionTitle>
          {periods}
          {empty}
        </ScrollEnterScrollView>
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(Timetable, 'timetable');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scroll: {
    flex: 1,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBody: {
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  toggleWrapStudent: {
    backgroundColor: Colors.bannerIceStart,
    borderColor: Colors.borderGlass,
    marginBottom: hp(1.45),
    overflow: 'visible',
    zIndex: 2,
    ...elevation.banner,
  },
  toggleWrapParent: {
    marginTop: hp(0.2),
    marginBottom: hp(1.2),
  },
  toggleBtnActiveStudent: {
    backgroundColor: Colors.brandNavy,
  },
  toggleTextStudent: {
    color: Colors.textPrimary,
  },
  monthRowStudent: {
    justifyContent: 'space-between',
    marginBottom: hp(0.35),
  },
  monthRowParent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(0.55),
  },
  monthArrowStudent: {
    width: wp(11),
    height: wp(11),
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthArrowParent: {
    width: wp(10),
    height: wp(10),
  },
  monthStudent: {
    flex: 1,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: Fontsize.sm1,
    paddingHorizontal: wp(1),
  },
  monthParent: {
    minWidth: 0,
    paddingHorizontal: wp(2),
  },
  dayLabelStudent: {
    color: Colors.textSecondary,
    textAlign: 'center',
    width: '100%',
    marginBottom: hp(0.55),
    fontSize: Fontsize.xs0,
  },
  dayLabelParent: {
    marginBottom: hp(0.4),
    includeFontPadding: false,
  },
  dayColStudent: {
    minHeight: hp(7.2),
    paddingVertical: hp(0.35),
  },
  dayColParent: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    alignItems: 'center',
    paddingVertical: hp(0.2),
  },
  dateCircleStudent: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(8.5),
  },
  dateCircleParent: {
    width: wp(8.2),
    height: wp(8.2),
    borderRadius: wp(8.2),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dateCircleActiveStudent: {
    backgroundColor: Colors.brandNavy,
    borderRadius: wp(8.5),
    overflow: 'hidden',
  },
  dateCircleActiveParent: {
    borderRadius: wp(8.2),
  },
  dateTextStudent: {
    color: Colors.textPrimary,
    includeFontPadding: false,
    textAlign: 'center',
  },
  dateTextParent: {
    width: '100%',
    textAlignVertical: 'center',
  },
  calCard: {
    backgroundColor: Colors.surface,
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    paddingHorizontal: wp(1.2),
    paddingTop: hp(0.55),
    paddingBottom: hp(0.7),
    marginBottom: hp(1.45),
    ...elevation.card,
  },
  calCardParent: {
    paddingHorizontal: wp(2),
    paddingTop: hp(0.65),
    paddingBottom: hp(0.85),
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  weekRowStudent: {
    justifyContent: 'flex-start',
    marginBottom: 0,
    marginTop: hp(0.15),
  },
  weekRowParent: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    marginBottom: hp(1.2),
  },
  emptyTextStudent: {
    color: Colors.textSecondary,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  toggleCard: {
    borderRadius: wp(8),
    overflow: 'hidden',
    marginBottom: hp(1.8),
  },
  weekCard: {
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(0.5),
  },
  monthCard: {
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(1.8),
  },
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#DCEBFD',
    borderRadius: wp(8),
    padding: wp(1.2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },
  toggleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(7),
  },
  toggleBtnActive: {
    backgroundColor: '#071A3D',
  },
  toggleText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  toggleTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthArrow: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
  },
  month: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.2),
  },
  dayCol: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginBottom: hp(0.8),
  },
  dateCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  dateCircleActive: {
    backgroundColor: Colors.primary,
    borderRadius: wp(9),
    overflow: 'hidden',
  },
  dateText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dateTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  scheduleTitle: {
    marginTop: hp(0.5),
  },
  loader: {
    marginTop: hp(4),
  },
  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginTop: hp(2),
  },
  slotInner: {
    paddingVertical: hp(1.4),
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  timePremium: {
    width: wp(22),
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  slotBody: {
    flex: 1,
  },
  subjectPremium: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  classPremium: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.35),
  },
});
