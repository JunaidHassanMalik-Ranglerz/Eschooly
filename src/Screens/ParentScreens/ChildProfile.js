import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ChildProfileMenuItem from '../../Component/Parent/ChildProfileMenuItem';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const MENU_ITEMS = [
  {
    key: 'attendance',
    title: Strings.attendance,
    icon: 'calendar-outline',
    iconBg: Colors.greenSoft,
    iconColor: Colors.iconGreen,
    screen: 'ParentAttendance',
  },
  {
    key: 'diary',
    title: Strings.diary,
    icon: 'book-outline',
    iconBg: Colors.orangeSoft,
    iconColor: Colors.iconOrange,
    screen: 'ParentDiary',
  },
  {
    key: 'homework',
    title: Strings.homeworkAssignments,
    icon: 'document-text-outline',
    iconBg: Colors.purpleSoft,
    iconColor: Colors.iconPurple,
    screen: 'Assignment',
  },
  {
    key: 'timetable',
    title: Strings.timetable,
    icon: 'time-outline',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'Timetable',
  },
  {
    key: 'examSchedule',
    title: Strings.examSchedule,
    icon: 'reader-outline',
    iconBg: Colors.pinkSoft,
    iconColor: Colors.iconPink,
    screen: 'ExamSchedule',
  },
  {
    key: 'results',
    title: Strings.results,
    icon: 'trophy-outline',
    iconBg: Colors.tealSoft,
    iconColor: Colors.iconTeal,
    screen: 'ParentResults',
  },
  {
    key: 'teachers',
    title: Strings.teachers,
    icon: 'people-outline',
    iconBg: Colors.cyanSoft,
    iconColor: Colors.iconCyan,
    screen: 'ParentTeachers',
  },
  {
    key: 'announcements',
    title: Strings.announcements,
    icon: 'megaphone-outline',
    iconBg: Colors.blueSoft,
    iconColor: Colors.iconBlue,
    screen: 'Announcements',
  },
];

const ChildProfile = () => {
  const navigation = useNavigation();
  const {activeStudent, childList, selectedChildId, setSelectedChildId} =
    useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.childProfile} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <ParentChildCard
          child={activeStudent}
          showRoll
          chevron="chevron-down"
          onPress={() => setSwitchVisible(true)}
        />

        <View style={styles.menu}>
          {MENU_ITEMS.map(item => (
            <ChildProfileMenuItem
              key={item.key}
              item={item}
              onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </View>
      </ScrollView>

      <ChildSwitchModal
        visible={switchVisible}
        childrenList={childList}
        selectedId={selectedChildId}
        onSelect={setSelectedChildId}
        onClose={() => setSwitchVisible(false)}
      />
    </SafeAreaView>
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
    paddingBottom: hp(3),
  },
  menu: {
    marginTop: hp(2),
  },
});
