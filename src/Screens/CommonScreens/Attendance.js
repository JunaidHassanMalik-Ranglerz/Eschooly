import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import AttendanceStatCard from '../../Component/AttendanceStatCard';
import AttendanceRateCard from '../../Component/AttendanceRateCard';
import AttendanceDateDropdown from '../../Component/AttendanceDateDropdown';
import AttendanceHistoryItem from '../../Component/AttendanceHistoryItem';
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

const Attendance = () => {
  const {studentLabel, isParent, selectedChildId, setSelectedChildId} =
    useRoleData();
  const [showHistory, setShowHistory] = useState(false);
  const [dateRangeId, setDateRangeId] = useState('1');
  const [student, setStudent] = useState(ATTENDANCE_STUDENTS[0]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MainHeaderComponent
        title={Strings.attendance}
        notificationCount={1}
      />

      <View style={styles.dropdownWrap}>
        <AttendanceStudentDropdown
          student={student}
          students={ATTENDANCE_STUDENTS}
          selectedId={selectedChildId}
          onSelect={item => {
            setSelectedChildId(item.value);
            setStudent(item);
          }}
          readOnly={!isParent}
          label={studentLabel}
        />
      </View>

      <FlatList
        data={showHistory ? ATTENDANCE_HISTORY : []}
        keyExtractor={item => item.id}
        renderItem={({item}) => <AttendanceHistoryItem item={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.monthRow}>
              <Text style={styles.monthTitle} numberOfLines={1}>
                {Strings.thisMonth}
              </Text>
              <Text style={styles.monthText} numberOfLines={1}>
                {student.month}
              </Text>
            </View>

            <View style={styles.statsRow}>
              <AttendanceStatCard
                image={Images.tick}
                iconBg={Colors.successBg}
                label={Strings.present}
                count={student.present}
              />
              <AttendanceStatCard
                image={Images.cross}
                iconBg={Colors.overdueBg}
                label={Strings.absent}
                count={student.absent}
              />
              <AttendanceStatCard
                image={Images.clock}
                iconBg={Colors.pendingBg}
                label={Strings.leave}
                count={student.leave}
              />
            </View>

            <AttendanceRateCard
              rate={student.rate}
              rateText={student.rateText}
            />

            <Btn
              title={showHistory ? Strings.hideHistory : Strings.seeHistory}
              icon={showHistory ? 'eye-off-outline' : 'time-outline'}
              style={styles.historyBtn}
              onPress={() => setShowHistory(!showHistory)}
            />

            {showHistory ? (
              <View>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle} numberOfLines={1}>
                    {Strings.attendanceHistory}
                  </Text>
                  <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
                    <Icon
                      name="options-outline"
                      size={wp(4)}
                      color={Colors.primary}
                    />
                    <Text style={styles.filterText} numberOfLines={1}>
                      {Strings.filter}
                    </Text>
                  </TouchableOpacity>
                </View>

                <AttendanceDateDropdown
                  ranges={ATTENDANCE_DATE_RANGES}
                  selectedId={dateRangeId}
                  onSelect={setDateRangeId}
                />
              </View>
            ) : null}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    marginTop: -hp(0.6),
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  monthTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: wp(3.77),
    width: wp(40),
  },
  monthText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    width: wp(27),
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -wp(1),
    marginBottom: hp(2),
  },
  historyBtn: {
    marginTop: hp(1),
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
  },
  historyTitle: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
    width: wp(40),
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
    width: wp(9.82),
  },
});
