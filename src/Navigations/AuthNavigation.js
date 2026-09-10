import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../Screens/Auth/Register';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Register">
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
