import React from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/Navigations/MainNavigation';
import { RoleProvider } from './src/context/RoleContext';
import { PopupProvider } from './src/context/PopupContext';
import {Colors} from './src/Constants/Colors';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        translucent={false}
      />
      <RoleProvider>
        <MainNavigation />

        {/* <OnlineClass /> */}
      </RoleProvider>
    </SafeAreaProvider>
  );
};

export default App;
