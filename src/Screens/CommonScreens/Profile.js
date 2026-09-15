import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MyProfile from './MyProfile';
import {Colors} from '../../Constants/Colors';
import {setDarkStatusBar} from '../../Constants/MyStyling';

const Profile = () => {
  useFocusEffect(
    useCallback(() => {
      setDarkStatusBar();
    }, []),
  );

  return (
    <>
      <StatusBar
        backgroundColor={Colors.parentBg}
        barStyle="dark-content"
        translucent={false}
      />
      <MyProfile isTab />
    </>
  );
};

export default Profile;
