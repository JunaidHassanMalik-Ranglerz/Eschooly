import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedCard from '../../Component/AnimatedCard';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

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

const ExamScheduleCard = ({item, animationIndex = 0, entering}) => {
  const dateParts = parseExamDate(item.date);

  return (
    <ProfileGradientCard
      innerStyle={styles.cardInner}
      animationIndex={animationIndex}
      entering={entering}>
      <View style={styles.cardRow}>
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
            <Icon name="calendar-outline" size={wp(3.6)} color={Colors.iconSky} />
            <Text style={styles.detailLabel}>{Strings.examDateLabel}</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="time-outline" size={wp(3.6)} color={Colors.iconOrange} />
            <Text style={styles.detailLabel}>{Strings.examTimeLabel}</Text>
            <Text style={styles.detailValue}>
              {item.time} · {item.duration}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="location-outline" size={wp(3.6)} color={Colors.iconGreen} />
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
    </ProfileGradientCard>
  );
};

const ExamSchedule = () => {
  const {activeStudent, examSchedule, classLabel} = useRoleData();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.examSchedule}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        <ProfileGradientCard
          innerStyle={styles.headerInner}
          animationIndex={1}
          entering={getHomeScreenEnter(1)}>
          <Text style={styles.headerTitle}>{Strings.upcomingExamsTitle}</Text>
          <Text style={styles.headerChild} numberOfLines={1}>
            {activeStudent?.label} · {classLabel}
          </Text>
          <Text style={styles.headerCount}>
            {examSchedule.length} {Strings.upcoming}
          </Text>
        </ProfileGradientCard>

        <AnimatedCard
          index={2}
          entering={getHomeScreenEnter(2)}
          style={styles.sectionEnter}>
          <ProfileSectionTitle disableAnimation>
            {Strings.examSchedule}
          </ProfileSectionTitle>
        </AnimatedCard>

        {examSchedule.length === 0 ? (
          <Text style={styles.empty}>{Strings.noExams}</Text>
        ) : (
          examSchedule.map((item, index) => {
            const slot = index + 3;
            return (
              <ExamScheduleCard
                key={item.id}
                item={item}
                animationIndex={slot}
                entering={getHomeScreenEnter(slot)}
              />
            );
          })
        )}
      </ScrollEnterScrollView>
    </SafeAreaView>
  );
};

export default withScreenEnter(ExamSchedule, 'examSchedule');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
    flexGrow: 1,
    backgroundColor: Colors.parentBg,
  },
  sectionEnter: {
    width: '100%',
  },
  headerInner: {
    paddingVertical: hp(1.8),
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  headerChild: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.5),
  },
  headerCount: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.35),
  },
  cardInner: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cardRow: {
    flexDirection: 'row',
  },
  dateCol: {
    width: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    backgroundColor: Colors.whiteOverlay18,
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
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginRight: wp(2),
  },
  typeBadge: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.35),
  },
  typeText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.55),
  },
  detailLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.4),
    marginRight: wp(1.5),
  },
  detailValue: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  syllabusBox: {
    marginTop: hp(0.8),
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
  },
  syllabusLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginBottom: hp(0.25),
  },
  syllabus: {
    color: Colors.white,
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
