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
import { setAuthToken } from '../../api/axiosInstance';
import { ROLES, useRole } from '../../context/RoleContext';
import { setCredentials } from '../../store/slices/authSlice';
import { storage, storageKeys } from '../../utils/storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {setRole} = useRole();

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        const session = await storage.getSession();
        const token = session?.[storageKeys.token];
        const role = session?.[storageKeys.role];
        let user = null;
        if (session?.[storageKeys.user]) {
          try {
            user = JSON.parse(session[storageKeys.user]);
          } catch (error) {
            user = null;
          }
        }

        if (active && token && role === ROLES.PARENT) {
          dispatch(setCredentials({token, role: ROLES.PARENT, user}));
          setAuthToken(token);
          setRole(ROLES.PARENT);
          navigation.replace('BottomTab');
          return;
        }
      } catch (error) {
        // A saved session that cannot be read falls through to role selection.
      }

      if (active) {
        navigation.replace('Role');
      }
    }, 5000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dispatch, navigation, setRole]);

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
