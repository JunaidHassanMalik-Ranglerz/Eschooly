import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import AttendanceStudentHeader from '../../Component/Attendance/AttendanceStudentHeader';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AttendanceStatCard from '../../Component/AttendanceStatCard';
import AttendanceRateCard from '../../Component/AttendanceRateCard';
import AttendanceDateDropdown from '../../Component/AttendanceDateDropdown';
import AttendanceHistoryItem from '../../Component/AttendanceHistoryItem';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import SegmentTabs from '../../Component/SegmentTabs';
import Btn from '../../Component/btn';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
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
  const icy = !isParent;
  const bottomPad = useStackBottomPad();
  const {children, selectedChildId: homeChildId} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
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

  const studentStatsPanel = (
    <AnimatedCard
      index={statsSlot}
      entering={getAttendanceCardEnter(statsSlot)}
      replayToken={contentReplay}
      style={styles.statsShellIcy}>
      <View style={styles.statsClipIcy}>
        <LinearGradient
          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
          start={{x: 0, y: 0.08}}
          end={{x: 1, y: 1}}
          style={styles.overviewFill}
        />
        <View pointerEvents="none" style={styles.overviewWave}>
          <CardWave
            variant={SCREEN_WAVES.assignmentIce}
            color="rgba(91, 156, 255, 0.18)"
          />
        </View>
        <View style={styles.overviewContent}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthTitleIcy} numberOfLines={1}>
              {Strings.thisMonth}
            </Text>
            <Text style={styles.monthTextIcy} numberOfLines={1}>
              {student.month}
            </Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricCol}>
              <AttendanceStatCard
                icon="checkmark-circle-outline"
                label={Strings.present}
                count={student.present}
                premium
              />
            </View>
            <View style={styles.metricCol}>
              <AttendanceStatCard
                icon="close-circle-outline"
                label={Strings.absent}
                count={student.absent}
                premium
              />
            </View>
            <View style={styles.metricCol}>
              <AttendanceStatCard
                icon="remove-circle-outline"
                label={Strings.leave}
                count={student.leave}
                premium
              />
            </View>
          </View>

          <View style={styles.attendanceRateSection}>
            <AttendanceRateCard
              rate={student.rate}
              rateText={student.rateText}
              premium
            />
          </View>
        </View>
      </View>
    </AnimatedCard>
  );

  const historyList = (
    <>
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
        <Text style={[styles.empty, icy && styles.emptyIcy]}>
          No attendance records yet.
        </Text>
      ) : null}
    </>
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled">
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <AttendanceStudentHeader unreadCount={unreadNotifications} />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  <AttendanceStudentDropdown
                    student={student}
                    premium
                    embedded
                    readOnly
                    look="float"
                    label={studentLabel}
                  />
                  {loading ? (
                    <ActivityIndicator
                      style={styles.loader}
                      size="large"
                      color={Colors.brandRoyal}
                    />
                  ) : (
                    studentStatsPanel
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
                  <TouchableOpacity
                    style={styles.historyCta}
                    activeOpacity={0.85}
                    onPress={() => setShowHistory(!showHistory)}>
                    <Icon
                      name={showHistory ? 'eye-off-outline' : 'time-outline'}
                      size={wp(4.6)}
                      color={Colors.white}
                    />
                    <Text style={styles.historyCtaText}>
                      {showHistory ? Strings.hideHistory : Strings.seeHistory}
                    </Text>
                  </TouchableOpacity>
                  {!isParent && showHistory ? (
                    <View style={styles.historyHeaderIcy}>
                      <Text style={styles.historyTitleIcy} numberOfLines={1}>
                        {Strings.attendanceHistory}
                      </Text>
                    </View>
                  ) : null}
                  {historyList}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
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

        {historyList}
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
    </StudentToneProvider>
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
    overflow: 'visible',
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
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
  statsShellIcy: {
    marginBottom: hp(1.45),
    overflow: 'visible',
  },
  statsClipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    backgroundColor: Colors.bannerIceStart,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    ...elevation.card,
  },
  overviewFill: {
    ...StyleSheet.absoluteFillObject,
  },
  overviewWave: {
    ...StyleSheet.absoluteFillObject,
  },
  overviewContent: {
    width: '100%',
    paddingHorizontal: wp(3.6),
    paddingTop: hp(1.5),
    paddingBottom: hp(1.4),
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.1),
    width: '100%',
  },
  monthTitleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
  },
  monthTextIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    flexShrink: 1,
    textAlign: 'right',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  metricCol: {
    flex: 1,
    minWidth: 0,
  },
  attendanceRateSection: {
    marginTop: hp(1.4),
    width: '100%',
  },
  historyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandNavy,
    borderRadius: radius.pill,
    paddingVertical: hp(1.15),
    paddingHorizontal: wp(4),
    minHeight: hp(5.2),
    marginBottom: hp(1.45),
    ...elevation.banner,
  },
  historyCtaText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.6),
  },
  historyHeaderIcy: {
    marginBottom: hp(1),
  },
  historyTitleIcy: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  emptyIcy: {
    color: Colors.textSecondary,
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
    zIndex: 1,
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
