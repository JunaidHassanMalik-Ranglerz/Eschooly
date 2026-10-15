import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PortalBrand from '../../Component/PortalBrand';
import { EnterView } from '../../Component/AnimatedCard';
import { ScreenEnterProvider } from '../../hooks/useScreenEnterGate';
import { enterScaleUp } from '../../utils/cardAnimation';
import { Colors } from '../../Constants/Colors';
import { useRole } from '../../context/RoleContext';
import { store } from '../../store/store';
import { applySavedSession, restoreParentSession } from '../../store/restoreSession';

const SplashScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {setRole, setLoggedInStudentId} = useRole();

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        let auth = store.getState().auth;
        if (!auth?.isAuthenticated) {
          await restoreParentSession(dispatch, setRole);
          auth = store.getState().auth;
        }

        const session = applySavedSession(auth, {setRole, setLoggedInStudentId});
        if (active && session) {
          navigation.replace('BottomTab');
          return;
        }
      } catch (error) {
        // A saved session that cannot be read falls through to sign-in.
      }

      if (active) {
        navigation.replace('Role');
      }
    }, 5000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dispatch, navigation, setLoggedInStudentId, setRole]);

  return (
    <ScreenEnterProvider motion="generic">
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
          barStyle="light-content"
        />
        <EnterView motion={enterScaleUp(0)} style={styles.brand}>
          <PortalBrand showWave topInset={insets.top} />
        </EnterView>
      </View>
    </ScreenEnterProvider>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashStart,
  },
  brand: {
    flex: 1,
  },
});
