import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import MainNavigation from './src/Navigations/MainNavigation';
import { RoleProvider, useRole } from './src/context/RoleContext';
import { PopupProvider } from './src/context/PopupContext';
import {Colors} from './src/Constants/Colors';
import {persistor, store} from './src/store/store';
import {applySavedSession} from './src/store/restoreSession';

const SessionRestore = () => {
  const {setRole, setLoggedInStudentId} = useRole();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    applySavedSession(auth, {setRole, setLoggedInStudentId});
  }, [auth, setLoggedInStudentId, setRole]);

  return null;
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.parentBg}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RoleProvider>
            <PersistGate loading={null} persistor={persistor}>
              <SessionRestore />
              <MainNavigation />
            </PersistGate>
          </RoleProvider>
          <Toast />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
