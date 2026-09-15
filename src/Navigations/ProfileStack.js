import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Syllabus from '../Screens/CommonScreens/Syllabus';
import Dues from '../Screens/CommonScreens/Dues';
import Profile from '../Screens/CommonScreens/Profile';
import MyProfile from '../Screens/CommonScreens/MyProfile';
import Register from '../Screens/Auth/Register';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Register">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Syllabus" component={Syllabus} />
      <Stack.Screen name="Dues" component={Dues} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
