import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {
  ATTENDANCE_STUDENTS,
  ATTENDANCE_DATE_RANGES,
  ATTENDANCE_HISTORY,
} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {CARD_RADIUS} from '../../Component/Profile/ProfileTheme';
import {getAttendanceCardEnter} from '../../utils/cardAnimation';

const AttendanceContent = () => {
  const {
    studentLabel,
    isParent,
    selectedChildId,
    setSelectedChildId,
    activeStudent,
    childList,
    attendanceStudents,
    attendanceHistory,
    canSwitchChild,
  } = useRoleData();
  const [showHistory, setShowHistory] = useState(false);
  const [dateRangeId, setDateRangeId] = useState('1');
  const [viewMode, setViewMode] = useState(Strings.monthly);
  const [contentReplay, setContentReplay] = useState(0);
  const [switchVisible, setSwitchVisible] = useState(false);
  const skipContentReplayRef = useRef(true);
  const childKey = String(selectedChildId ?? activeStudent?.value ?? '');

  useEffect(() => {
    if (skipContentReplayRef.current) {
      skipContentReplayRef.current = false;
      return;
    }
    setContentReplay(value => value + 1);
  }, [childKey, dateRangeId, viewMode]);

  const statsSlot = isParent ? 3 : 2;
  const dateSlot = isParent ? 4 : 3;
  const historyActionSlot = isParent ? 5 : 4;
  const historyHeaderSlot = isParent ? 5 : 5;
  const historyListStart = isParent ? 6 : 6;

  const attendanceMeta =
    ATTENDANCE_STUDENTS.find(item => item.value === activeStudent?.value) ||
    ATTENDANCE_STUDENTS[0];
  const student = {...activeStudent, ...attendanceMeta};
  const history = isParent ? attendanceHistory : ATTENDANCE_HISTORY;
  const students = isParent ? childList : attendanceStudents;
  const showDaily = isParent && viewMode === Strings.daily;
  const dropdownReadOnly = isParent ? !canSwitchChild : students.length <= 1;
  const useExternalSwitch = !dropdownReadOnly && students.length > 1;
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
        contentContainerStyle={styles.content}>
        <View style={styles.dropdownWrap}>
          <AnimatedCard
            index={1}
            entering={getAttendanceCardEnter(1)}
            replayToken={contentReplay}
            style={styles.dropdownAnchor}>
            <AttendanceStudentDropdown
              student={student}
              students={students}
              selectedId={selectedChildId}
              premium
              embedded
              onSelect={item => setSelectedChildId(item.value)}
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

        {statsBlock}

        <AttendanceDateDropdown
          ranges={ATTENDANCE_DATE_RANGES}
          selectedId={dateRangeId}
          onSelect={setDateRangeId}
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
                entering={getAttendanceCardEnter(index + historyListStart)}
                replayToken={contentReplay}
              />
            ))
          : null}
      </ScrollEnterScrollView>

      {useExternalSwitch ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={students}
          selectedId={selectedChildId}
          onSelect={setSelectedChildId}
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
    overflow: 'visible',
  },
  statEnter: {
    flex: 1,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
  },
  monthTitlePremium: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    flex: 1,
  },
  monthTextPremium: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  statsCardInner: {
    paddingVertical: hp(1.4),
  },
  statsRowPremium: {
    flexDirection: 'row',
    marginHorizontal: -wp(0.5),
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
});
