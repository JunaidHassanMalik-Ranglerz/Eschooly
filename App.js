import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/Navigations/MainNavigation';
import { RoleProvider } from './src/context/RoleContext';
import { PopupProvider } from './src/context/PopupContext';
import {Colors} from './src/Constants/Colors';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.parentBg}}>
      <SafeAreaProvider>
        <RoleProvider>
          <MainNavigation />

        {/* <OnlineClass /> */}
        </RoleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
