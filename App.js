import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigation from './src/Navigations/MainNavigation';
import {RoleProvider} from './src/context/RoleContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <RoleProvider>
        <MainNavigation />
      </RoleProvider>
    </SafeAreaProvider>
  );
};

export default App;
