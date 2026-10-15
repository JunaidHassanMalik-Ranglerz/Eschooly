import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import MainNavigation from './src/Navigations/MainNavigation';
import { RoleProvider } from './src/context/RoleContext';
import { PopupProvider } from './src/context/PopupContext';
import {Colors} from './src/Constants/Colors';
import {store} from './src/store/store';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.parentBg}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RoleProvider>
            <MainNavigation />

          {/* <OnlineClass /> */}
          </RoleProvider>
          <Toast />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
