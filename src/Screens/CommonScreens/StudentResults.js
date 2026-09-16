import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import OverallGradeCard from '../../Component/Student/OverallGradeCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {
  STUDENT_RESULTS,
  STUDENT_RESULT_TERMS,
} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';

const SUBJECT_ICONS = {
  Mathematics: {name: 'calculator-outline', bg: Colors.blueSoft, color: Colors.iconBlue},
  Science: {name: 'flask-outline', bg: Colors.tealSoft, color: Colors.iconTeal},
  English: {name: 'book-outline', bg: Colors.purpleSoft, color: Colors.iconPurple},
  Computer: {name: 'laptop-outline', bg: Colors.cyanSoft, color: Colors.iconCyan},
  'Islamic Studies': {name: 'moon-outline', bg: Colors.orangeSoft, color: Colors.iconOrange},
};

const gradeTone = grade => {
  if (String(grade).startsWith('A')) {
    return {bg: Colors.greenSoft, text: Colors.iconGreen};
  }
  if (String(grade).startsWith('B')) {
    return {bg: Colors.blueSoft, text: Colors.primary};
  }
  return {bg: Colors.orangeSoft, text: Colors.iconOrange};
};

const StudentResults = () => {
  const [activeTerm, setActiveTerm] = useState(Strings.term1);
  const result = STUDENT_RESULTS[activeTerm] || STUDENT_RESULTS[Strings.term1];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.headerWrap}>
        <MainHeaderComponent title={Strings.results} notificationCount={1} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.tabTrack}>
          {STUDENT_RESULT_TERMS.map(tab => {
            const active = tab === activeTerm;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.88}
                onPress={() => setActiveTerm(tab)}
                style={[styles.tab, active && styles.tabActive]}>
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.listCard}>
          {result.subjects.map((item, index) => {
            const meta = SUBJECT_ICONS[item.name] || {
              name: 'school-outline',
              bg: Colors.blueSoft,
              color: Colors.primary,
            };
            const tone = gradeTone(item.grade);
            return (
              <View
                key={item.id}
                style={[
                  styles.subjectRow,
                  index === result.subjects.length - 1 && styles.subjectRowLast,
                ]}>
                <View style={[styles.subjectIcon, {backgroundColor: meta.bg}]}>
                  <Icon name={meta.name} size={wp(4.6)} color={meta.color} />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.subjectScore}>{item.score}%</Text>
                </View>
                <View style={[styles.gradeBadge, {backgroundColor: tone.bg}]}>
                  <Text style={[styles.gradeText, {color: tone.text}]}>
                    {item.grade}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <OverallGradeCard
          grade={result.overall}
          hint={result.hint || Strings.greatProgress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  headerWrap: {
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.6),
    paddingBottom: hp(4),
  },
  tabTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(8),
    padding: wp(1.2),
    marginBottom: hp(1.8),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(6.5),
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  tabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  listCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5.5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.4),
    marginBottom: hp(1.8),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.35),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  subjectRowLast: {
    borderBottomWidth: 0,
  },
  subjectIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3.2),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  subjectInfo: {
    flex: 1,
    marginRight: wp(2),
  },
  subjectName: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  subjectScore: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  gradeBadge: {
    minWidth: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  gradeText: {
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
});
