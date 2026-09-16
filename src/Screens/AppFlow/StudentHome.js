import React, {useCallback, useLayoutEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from '../../Component/NotificationBell';
import StudentHubCard from '../../Component/Student/StudentHubCard';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {STUDENT_UPCOMING_CLASS} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {getGreeting} from '../../utils/getGreeting';
import {setDarkStatusBar} from '../../Constants/MyStyling';

const HUB_ITEMS = [
  {
    key: 'online',
    label: Strings.onlineClasses,
    icon: 'play',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'OnlineClass',
  },
  {
    key: 'timetable',
    label: Strings.timetable,
    icon: 'calendar-outline',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'Timetable',
  },
  {
    key: 'assignments',
    label: Strings.assignment,
    icon: 'document-text',
    iconBg: Colors.greenSoft,
    iconColor: Colors.iconGreen,
    screen: 'Assignment',
  },
  {
    key: 'library',
    label: Strings.digitalLibrary,
    icon: 'play-circle',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'DigitalLibrary',
  },
  {
    key: 'exams',
    label: Strings.exams,
    iconText: 'A+',
    iconBg: Colors.overdueBg,
    iconColor: Colors.red,
    screen: 'Exam',
  },
  {
    key: 'results',
    label: Strings.results,
    icon: 'bar-chart',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'StudentResults',
  },
];

const StudentHome = () => {
  const navigation = useNavigation();
  const {profilePerson, unreadNotificationCount, classLabel} = useRoleData();
  const avatarInitials = (profilePerson.label || '')
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useLayoutEffect(() => {
    setDarkStatusBar();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setDarkStatusBar();
    }, []),
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.scroll}>
        <LinearGradient
          colors={[Colors.parentHeader, Colors.parentHeaderEnd]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarInitials}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.greeting} numberOfLines={1}>
                {getGreeting()}
              </Text>
              <Text style={styles.studentName} numberOfLines={1}>
                {profilePerson.label}
              </Text>
              <Text style={styles.classText} numberOfLines={1}>
                {classLabel}
              </Text>
            </View>
            <NotificationBell count={unreadNotificationCount} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.hubGrid}>
            {HUB_ITEMS.map(item => (
              <StudentHubCard
                key={item.key}
                icon={item.icon}
                iconText={item.iconText}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
                label={item.label}
                onPress={() => navigation.navigate(item.screen)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('OnlineClass')}>
            <Text style={styles.sectionTitle}>{Strings.upcomingClass}</Text>
            <Icon name="chevron-forward" size={wp(5)} color={Colors.grayText} />
          </TouchableOpacity>

          <View style={styles.upcomingCard}>
            <View style={styles.upcomingIcon}>
              <Icon name="videocam-outline" size={wp(5.4)} color={Colors.primary} />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle} numberOfLines={1}>
                {STUDENT_UPCOMING_CLASS.title}
              </Text>
              <Text style={styles.upcomingMeta} numberOfLines={1}>
                {STUDENT_UPCOMING_CLASS.classInfo}
              </Text>
              <View style={styles.upcomingFooter}>
                <View style={styles.timeRow}>
                  <Icon name="time-outline" size={wp(3.6)} color={Colors.grayText} />
                  <Text style={styles.timeText}>{STUDENT_UPCOMING_CLASS.time}</Text>
                </View>
                <TouchableOpacity
                  style={styles.joinBtn}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('OnlineClass')}>
                  <Text style={styles.joinText}>{Strings.join}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    paddingBottom: hp(3),
    backgroundColor: Colors.parentBg,
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.8),
    paddingBottom: hp(2.4),
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp(13.5),
    height: wp(13.5),
    borderRadius: wp(6.75),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.2),
  },
  avatarText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  headerText: {
    flex: 1,
    marginRight: wp(3),
  },
  greeting: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  studentName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginTop: hp(0.1),
  },
  classText: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  body: {
    paddingHorizontal: wp(4.5),
    marginTop: hp(1.6),
  },
  hubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.8),
    marginBottom: hp(1.3),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.7),
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  upcomingIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3.5),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  upcomingMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  upcomingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.1),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.2),
  },
  joinBtn: {
    backgroundColor: Colors.primary,
    borderRadius: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.75),
  },
  joinText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
