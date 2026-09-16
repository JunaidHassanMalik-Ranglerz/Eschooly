import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/Navigations/MainNavigation';
import { RoleProvider } from './src/context/RoleContext';
import { PopupProvider } from './src/context/PopupContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <RoleProvider>
        <MainNavigation />

        {/* <OnlineClass /> */}
      </RoleProvider>
    </SafeAreaProvider>
  );
};

export default App;
