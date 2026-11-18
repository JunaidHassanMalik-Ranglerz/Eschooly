import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ProfileMenuRow from '../../Component/Profile/ProfileMenuRow';
import {
  CARD_RADIUS,
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

  return (
    <ScreenEnterProvider motion="childProfile">
      <ParentNavyIceLayout
        title={Strings.childProfile}
        unreadCount={1}
        footer={
          canSwitchChild ? (
            <ChildSwitchModal
              visible={switchVisible}
              childrenList={childList}
              selectedId={selectedChildId}
              onSelect={setSelectedChildId}
              onClose={() => setSwitchVisible(false)}
            />
          ) : null
        }>
        <SelectedChildBanner
          child={activeStudent}
          variant="large"
          icy
          compactMargin
          canSwitch={canSwitchChild}
          onSwitchPress={
            canSwitchChild ? () => setSwitchVisible(true) : undefined
          }
        />
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
      </ParentNavyIceLayout>
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
