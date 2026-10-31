import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AttendanceStatCard from '../../Component/AttendanceStatCard';
import AttendanceRateCard from '../../Component/AttendanceRateCard';
import AttendanceDateDropdown from '../../Component/AttendanceDateDropdown';
import AttendanceHistoryItem from '../../Component/AttendanceHistoryItem';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import {SCREEN_WAVES} from '../../Component/CardWave';
import SegmentTabs from '../../Component/SegmentTabs';
import Btn from '../../Component/btn';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {CARD_RADIUS} from '../../Component/Profile/ProfileTheme';
import {getAttendanceCardEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {fetchChildAttendance, fetchChildDashboard, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentAttendance} from '../../store/slices/studentHomeSlice';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const currentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const buildMonthRanges = () =>
  Array.from({length: 6}, (_, index) => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const month = MONTH_SHORT[date.getMonth()];
    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: `${month} 1 - ${month} ${lastDay}, ${date.getFullYear()}`,
    };
  });

const AttendanceContent = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const {children, selectedChildId: homeChildId} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const [parentAttendance, setParentAttendance] = useState(null);
  const [studentAttendance, setStudentAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [monthId, setMonthId] = useState(currentMonthKey);
  const [viewMode, setViewMode] = useState(Strings.monthly);
  const [contentReplay, setContentReplay] = useState(0);
  const [switchVisible, setSwitchVisible] = useState(false);
  const skipContentReplayRef = useRef(true);
  const monthRanges = useMemo(() => buildMonthRanges(), []);
  const activeChildId = homeChildId || children[0]?.value || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) || parentAttendance?.child || null;
  const childKey = isParent ? String(activeChildId || '') : monthId;
  const studentLabel = isParent ? Strings.child : Strings.student;

  useEffect(() => {
    if (!isParent || homeChildId || children.length) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [children.length, dispatch, homeChildId, isParent]);

  useEffect(() => {
    if (!isParent || !activeChildId) {
      return undefined;
    }
    let active = true;
    const monthly = viewMode !== Strings.daily;
    setLoading(true);
    dispatch(fetchChildAttendance({
      childId: activeChildId,
      view: monthly ? 'monthly' : 'daily',
      month: monthly ? monthId : undefined,
    }))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentAttendance(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentAttendance(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load attendance.',
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
  }, [activeChildId, dispatch, isParent, monthId, viewMode]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchStudentAttendance(monthId))
      .unwrap()
      .then(payload => {
        console.log('payload', payload);
        if (active) {
          setStudentAttendance(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentAttendance(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load attendance.',
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
  }, [dispatch, isParent, monthId]);

  useEffect(() => {
    if (skipContentReplayRef.current) {
      skipContentReplayRef.current = false;
      return;
    }
    setContentReplay(value => value + 1);
  }, [childKey, monthId, viewMode]);

  const statsSlot = isParent ? 3 : 2;
  const dateSlot = isParent ? 4 : 3;
  const historyActionSlot = isParent ? 5 : 4;
  const historyHeaderSlot = isParent ? 5 : 5;
  const historyListStart = isParent ? 6 : 6;

  const parentStats = parentAttendance || {};
  const studentStats = studentAttendance || {};
  const stats = isParent ? parentStats : studentStats;
  const student = isParent
    ? {
        ...parentChild,
        month: loading ? '—' : stats.month || '',
        present: loading ? '—' : stats.present ?? '',
        absent: loading ? '—' : stats.absent ?? '',
        late: loading ? '—' : stats.late ?? '',
        leave: loading ? '—' : stats.leave ?? '',
        rate: loading ? 0 : stats.rate || 0,
        rateText: loading ? '—' : stats.rateText || '',
        todayStatus: loading ? '—' : stats.todayStatus || '',
        todayDate: loading ? '—' : stats.todayDate || '',
      }
    : {
        label: homeStudent?.label || '',
        classInfo: homeStudent?.className || homeStudent?.classLabel || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        photoUrl: homeStudent?.photoUrl || '',
        month: loading ? '—' : stats.month || '',
        present: loading ? '—' : stats.present ?? '',
        absent: loading ? '—' : stats.absent ?? '',
        late: loading ? '—' : stats.late ?? '',
        leave: loading ? '—' : stats.leave ?? '',
        rate: loading ? 0 : stats.rate || 0,
        rateText: loading ? '—' : stats.rateText || '',
      };
  const history = loading ? [] : stats.history || [];
  const students = isParent ? children : [];
  const showDaily = isParent && viewMode === Strings.daily;
  const dropdownReadOnly = !isParent || students.length <= 1;
  const useExternalSwitch = isParent && students.length > 1;
  const showHistoryList = showHistory || isParent;
  const todayStatusStyle =
    student.todayStatus === 'Absent'
      ? {text: '#6366F1'}
      : student.todayStatus === 'Late'
        ? {text: '#0EA5E9'}
        : {text: '#38BDF8'};

  const statsBlock = (
    <View style={styles.statsShell}>
      <ProfileGradientCard
        innerStyle={styles.statsCardInner}
        noMargin
        waveVariant={SCREEN_WAVES.attendance}
        animationIndex={statsSlot}
        entering={getAttendanceCardEnter(statsSlot)}
        replayToken={contentReplay}>
        {showDaily ? (
          <>
            <Text style={styles.todayLabelPremium}>{Strings.todayAttendance}</Text>
            <Text style={styles.todayDatePremium}>{student.todayDate}</Text>
            <Text style={[styles.todayStatusPremium, {color: todayStatusStyle.text}]}>
              {student.todayStatus}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.monthRow}>
              <Text style={styles.monthTitlePremium} numberOfLines={1}>
                {isParent ? Strings.monthlyAttendance : Strings.thisMonth}
              </Text>
              <Text style={styles.monthTextPremium} numberOfLines={1}>
                {student.month} 
              </Text>
            </View>
            <View style={styles.statsRowPremium}>
              <View style={styles.statEnter}>
                <AttendanceStatCard
                  image={Images.tick}
                  iconBg={Colors.successBg}
                  label={Strings.present}
                  count={student.present}
                  premium
                />
              </View>
              <View style={styles.statEnter}>
                <AttendanceStatCard
                  image={Images.cross}
                  iconBg={Colors.overdueBg}
                  label={Strings.absent}
                  count={student.absent}
                  premium
                />
              </View>
              <View style={styles.statEnter}>
                <AttendanceStatCard
                  icon="alert-circle-outline"
                  iconBg={Colors.pendingBg}
                  iconColor={Colors.warning}
                  label={isParent ? Strings.late : Strings.leave}
                  count={isParent ? student.late : student.leave}
                  premium
                />
              </View>
            </View>
            <AttendanceRateCard
              rate={student.rate}
              rateText={student.rateText}
              premium
            />
          </>
        )}
      </ProfileGradientCard>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />

      <MainHeaderComponent
        title={Strings.attendance}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, {paddingBottom: hp(2) + insets.bottom}]}>
        <View style={styles.dropdownWrap}>
          <AnimatedCard
            index={1}
            entering={getAttendanceCardEnter(1)}
            replayToken={contentReplay}
            style={styles.dropdownAnchor}>
            <AttendanceStudentDropdown
              student={student}
              students={students}
              selectedId={isParent ? String(activeChildId || '') : undefined}
              premium
              embedded
              onSelect={item => {
                if (isParent && String(item.value) !== String(activeChildId)) {
                  dispatch(fetchChildDashboard(item.value));
                }
              }}
              readOnly={dropdownReadOnly}
              label={studentLabel}
              externalPicker={useExternalSwitch}
              onPickerPress={() => setSwitchVisible(true)}
            />
          </AnimatedCard>
        </View>

        {isParent ? (
          <AnimatedCard
            index={2}
            entering={getAttendanceCardEnter(2)}
            replayToken={contentReplay}
            style={styles.tabsWrap}>
            <SegmentTabs
              variant="fee"
              tabs={[Strings.daily, Strings.monthly]}
              activeTab={viewMode}
              onChange={setViewMode}
            />
          </AnimatedCard>
        ) : null}

        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
        ) : (
          statsBlock
        )}

        <AttendanceDateDropdown
          ranges={monthRanges}
          selectedId={monthId}
          onSelect={setMonthId}
          animationIndex={dateSlot}
          entering={getAttendanceCardEnter(dateSlot)}
          replayToken={contentReplay}
          premium
        />

        {isParent ? (
          <AnimatedCard
            index={historyActionSlot}
            entering={getAttendanceCardEnter(historyActionSlot)}
            replayToken={contentReplay}
            style={styles.historyTitleWrap}>
            <ProfileSectionTitle>{Strings.attendanceHistory}</ProfileSectionTitle>
          </AnimatedCard>
        ) : (
          <AnimatedCard
            index={historyActionSlot}
            entering={getAttendanceCardEnter(historyActionSlot)}
            replayToken={contentReplay}
            style={styles.historyBtnWrap}>
            <Btn
              title={showHistory ? Strings.hideHistory : Strings.seeHistory}
              icon={showHistory ? 'eye-off-outline' : 'time-outline'}
              style={styles.historyBtn}
              onPress={() => setShowHistory(!showHistory)}
            />
          </AnimatedCard>
        )}

        {!isParent && showHistory ? (
          <AnimatedCard
            index={historyHeaderSlot}
            entering={getAttendanceCardEnter(historyHeaderSlot)}
            replayToken={contentReplay}
            style={styles.historyHeader}>
            <Text style={styles.historyTitle} numberOfLines={1}>
              {Strings.attendanceHistory}
            </Text>
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
              <Icon name="options-outline" size={wp(4)} color={Colors.primary} />
              <Text style={styles.filterText} numberOfLines={1}>
                {Strings.filter}
              </Text>
            </TouchableOpacity>
          </AnimatedCard>
        ) : null}

        {showHistoryList
          ? history.map((item, index) => (
              <AttendanceHistoryItem
                key={`${item.id}-${contentReplay}`}
                item={item}
                premium
                animationIndex={index + historyListStart}
                entering={getAttendanceCardEnter(Math.min(index + historyListStart, 8))}
                replayToken={contentReplay}
              />
            ))
          : null}
        {showHistoryList && !loading && history.length === 0 ? (
          <Text style={styles.empty}>No attendance records yet.</Text>
        ) : null}
      </ScrollEnterScrollView>

      {useExternalSwitch ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={students}
          selectedId={String(activeChildId || '')}
          onSelect={nextId => {
            if (String(nextId) !== String(activeChildId)) {
              dispatch(fetchChildDashboard(nextId));
            }
          }}
          onClose={() => setSwitchVisible(false)}
        />
      ) : null}
    </SafeAreaView>
  );
};

const Attendance = () => <AttendanceContent />;

export default withScreenEnter(Attendance, 'attendance');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
    flexGrow: 1,
  },
  dropdownWrap: {
    marginTop: -hp(0.6),
    zIndex: 20,
    elevation: 20,
  },
  dropdownAnchor: {
    width: '100%',
  },
  tabsWrap: {
    marginTop: hp(1),
    marginBottom: hp(1.8),
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  historyBtnWrap: {
    marginTop: hp(0.5),
  },
  statsShell: {
    marginBottom: hp(1.2),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    width: '100%',
  },
  statEnter: {
    flex: 1,
    minWidth: 0,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
    width: '100%',
  },
  monthTitlePremium: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
  },
  monthTextPremium: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    flexShrink: 1,
    textAlign: 'right',
  },
  statsCardInner: {
    paddingVertical: hp(1.4),
  },
  statsRowPremium: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    marginBottom: hp(1.2),
  },
  historyBtn: {
    marginTop: hp(0.5),
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
    marginBottom: hp(1),
  },
  historyTitle: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: wp(3.73),
    flex: 1,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginLeft: wp(1),
  },
  todayLabelPremium: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  todayDatePremium: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.4),
  },
  todayStatusPremium: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
    marginTop: hp(0.8),
  },
  historyTitleWrap: {
    marginTop: hp(0.4),
    marginBottom: hp(0.4),
  },
  loader: {
    marginVertical: hp(3),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginTop: hp(2),
  },
});
