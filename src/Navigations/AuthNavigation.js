import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../Screens/Auth/Register';
import {Colors} from '../Constants/Colors';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        statusBarStyle: 'light',
        statusBarTranslucent: true,
        statusBarBackgroundColor: Colors.transparent,
        statusBarAnimation: 'none',
        contentStyle: {backgroundColor: Colors.white},
      }}
      initialRouteName="Register">
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
