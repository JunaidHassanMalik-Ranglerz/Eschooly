import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileHeaderCard from '../../Component/ProfileHeaderCard';
import {useProfileStudent} from '../../hooks/useProfileStudent';
import {Strings} from '../../Constants/Strings';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const MyProfile = () => {
  const {profilePerson, profileDetails, isParent} = useProfileStudent();

  const title = isParent ? Strings.parentAccount : Strings.myProfile;

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <MainHeaderComponent title={title} notificationCount={1} />

      <View style={styles.content}>
        <ProfileHeaderCard
          student={profilePerson}
          dropdownList={profileDetails}
          dropdownType="details"
        />
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
});
