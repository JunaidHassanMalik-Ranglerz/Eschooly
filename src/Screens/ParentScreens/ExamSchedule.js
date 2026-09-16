import React from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const parseExamDate = date => {
  const parts = String(date || '').replace(',', '').split(' ').filter(Boolean);
  if (parts.length >= 3) {
    return {
      weekday: parts[0],
      day: parts[1],
      month: parts[2],
      year: parts[3] || '',
    };
  }
  return {weekday: '', day: date, month: '', year: ''};
};

const ExamScheduleCard = ({item}) => {
  const dateParts = parseExamDate(item.date);

  return (
    <View style={styles.card}>
      <View style={styles.dateCol}>
        <Text style={styles.dateMonth}>{dateParts.month}</Text>
        <Text style={styles.dateDay}>{dateParts.day}</Text>
        <Text style={styles.dateWeek}>{dateParts.weekday}</Text>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.subjectRow}>
          <Text style={styles.subject} numberOfLines={1}>
            {item.subject}
          </Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={wp(3.6)} color={Colors.primary} />
          <Text style={styles.detailLabel}>{Strings.examDateLabel}</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="time-outline" size={wp(3.6)} color={Colors.primary} />
          <Text style={styles.detailLabel}>{Strings.examTimeLabel}</Text>
          <Text style={styles.detailValue}>
            {item.time} · {item.duration}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="location-outline" size={wp(3.6)} color={Colors.primary} />
          <Text style={styles.detailLabel}>{Strings.examVenueLabel}</Text>
          <Text style={styles.detailValue}>{item.venue}</Text>
        </View>
        {item.syllabus ? (
          <View style={styles.syllabusBox}>
            <Text style={styles.syllabusLabel}>{Strings.examSyllabusLabel}</Text>
            <Text style={styles.syllabus}>{item.syllabus}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const ExamSchedule = () => {
  const {activeStudent, examSchedule, classLabel} = useRoleData();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.examSchedule} />

      <FlatList
        data={examSchedule}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ExamScheduleCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Text style={styles.headerTitle}>{Strings.upcomingExamsTitle}</Text>
            <Text style={styles.headerChild} numberOfLines={1}>
              {activeStudent?.label} · {classLabel}
            </Text>
            <Text style={styles.headerCount}>
              {examSchedule.length} {Strings.upcoming}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{Strings.noExams}</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ExamSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  headerCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(4),
    marginBottom: hp(1.6),
  },
  headerTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  headerChild: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.5),
  },
  headerCount: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.35),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    marginBottom: hp(1.4),
    overflow: 'hidden',
  },
  dateCol: {
    width: wp(18),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
  },
  dateMonth: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    textTransform: 'uppercase',
  },
  dateDay: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginVertical: hp(0.2),
  },
  dateWeek: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  cardBody: {
    flex: 1,
    padding: wp(3.5),
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.1),
  },
  subject: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginRight: wp(2),
  },
  typeBadge: {
    backgroundColor: Colors.blueSoft,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.35),
  },
  typeText: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.55),
  },
  detailLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.4),
    marginRight: wp(1.5),
  },
  detailValue: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  syllabusBox: {
    marginTop: hp(0.8),
    backgroundColor: Colors.parentBg,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
  },
  syllabusLabel: {
    color: Colors.mutedText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginBottom: hp(0.25),
  },
  syllabus: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    marginTop: hp(6),
  },
});
