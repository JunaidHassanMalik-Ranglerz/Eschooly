import React, {useState} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileMenuRow from '../../Component/Profile/ProfileMenuRow';
import PersonAvatar from '../../Component/Profile/PersonAvatar';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from '../../Component/Profile/ProfileTheme';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';

const MENU_ITEMS = [
  {
    key: 'attendance',
    title: Strings.attendance,
    icon: 'calendar-outline',
    iconColor: Colors.iconGreen,
    screen: 'ParentAttendance',
  },
  {
    key: 'diary',
    title: Strings.diary,
    icon: 'book-outline',
    iconColor: Colors.iconOrange,
    screen: 'ParentDiary',
  },
  {
    key: 'homework',
    title: Strings.homeworkAssignments,
    icon: 'document-text-outline',
    iconColor: Colors.iconPurple,
    screen: 'Assignment',
  },
  {
    key: 'timetable',
    title: Strings.timetable,
    icon: 'time-outline',
    iconColor: Colors.iconBlue,
    screen: 'Timetable',
  },
  {
    key: 'examSchedule',
    title: Strings.examSchedule,
    icon: 'reader-outline',
    iconColor: Colors.iconPink,
    screen: 'ExamSchedule',
  },
  {
    key: 'results',
    title: Strings.results,
    icon: 'trophy-outline',
    iconColor: Colors.iconTeal,
    screen: 'StudentResults',
  },
  {
    key: 'teachers',
    title: Strings.teachers,
    icon: 'people-outline',
    iconColor: Colors.iconCyan,
    screen: 'ParentTeachers',
  },
  {
    key: 'announcements',
    title: Strings.announcements,
    icon: 'megaphone-outline',
    iconColor: Colors.iconSky,
    screen: 'Announcements',
  },
];

const ChildProfile = () => {
  const navigation = useNavigation();
  const {activeStudent, childList, selectedChildId, setSelectedChildId, canSwitchChild} =
    useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);

  const classText =
    activeStudent?.classLabel ||
    (activeStudent?.className && activeStudent?.section
      ? `${activeStudent.className} ${activeStudent.section}`
      : activeStudent?.classBadge);

  return (
    <ScreenEnterProvider motion="childProfile">
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.childProfile} navyBack />

      <ScrollEnterScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <AnimatedCard index={0} style={[styles.childCardWrap, IDENTITY_CARD_SHADOW]}>
          <Pressable
            onPress={canSwitchChild ? () => setSwitchVisible(true) : undefined}
            disabled={!canSwitchChild}>
            <LinearGradient
              colors={PROFILE_GRADIENT}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.childCard}>
              <CardWave variant={SCREEN_WAVES.childProfile} />
              <View style={styles.avatarWrap}>
                <PersonAvatar person={activeStudent} size={wp(14)} />
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName} numberOfLines={1}>
                  {activeStudent?.label}
                </Text>
                <Text style={styles.childMeta} numberOfLines={1}>
                  {classText}
                </Text>
                {activeStudent?.rollNo ? (
                  <Text style={styles.childRoll} numberOfLines={1}>
                    {Strings.rollNo} {activeStudent.rollNo}
                  </Text>
                ) : null}
              </View>
              {canSwitchChild ? (
                <View style={styles.chevronWrap}>
                  <Icon
                    name="chevron-down"
                    size={wp(5)}
                    color={Colors.whiteMuted85}
                  />
                </View>
              ) : null}
            </LinearGradient>
          </Pressable>
        </AnimatedCard>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item, index) => (
            <ProfileMenuRow
              key={item.key}
              icon={item.icon}
              iconColor={item.iconColor}
              title={item.title}
              animationIndex={index + 1}
              onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </View>
      </ScrollEnterScrollView>

      {canSwitchChild ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={childList}
          selectedId={selectedChildId}
          onSelect={setSelectedChildId}
          onClose={() => setSwitchVisible(false)}
        />
      ) : null}
    </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default ChildProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(3),
  },
  childCardWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.8),
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  avatarWrap: {
    zIndex: 1,
  },
  chevronWrap: {
    zIndex: 1,
  },
  childInfo: {
    flex: 1,
    marginHorizontal: wp(3),
    zIndex: 1,
  },
  childName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  childMeta: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs5,
    marginTop: hp(0.2),
  },
  childRoll: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  menu: {
    marginTop: hp(2),
  },
});
