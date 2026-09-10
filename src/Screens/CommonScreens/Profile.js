import React, {useCallback} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileHeaderCard from '../../Component/ProfileHeaderCard';
import SwitchStudentCard from '../../Component/SwitchStudentCard';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {MyStyling, setDarkStatusBar} from '../../Constants/MyStyling';
import {useRoleData} from '../../hooks/useRoleData';

const Profile = () => {
  const navigation = useNavigation();
  const {
    profilePerson,
    profileMenuList,
    isParent,
    childList,
    selectedChildId,
    setSelectedChildId,
  } = useRoleData();

  useFocusEffect(
    useCallback(() => {
      setDarkStatusBar();
    }, []),
  );

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        translucent={false}
      />
      <MainHeaderComponent
        title={Strings.profile}
        notificationCount={1}
      />

      <View style={styles.content}>
        <ProfileHeaderCard
          student={profilePerson}
          dropdownList={profileMenuList}
          dropdownType="menu"
          onItemSelect={item =>
            item.screen ? navigation.navigate(item.screen) : null
          }
        />

        {isParent ? (
          <View style={styles.childSwitch}>
            <SwitchStudentCard
              students={childList}
              selectedId={selectedChildId}
              onSelect={setSelectedChildId}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  childSwitch: {
    marginTop: hp(2),
  },
});
