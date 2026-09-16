import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PortalBrand from '../../Component/PortalBrand';
import { Colors } from '../../Constants/Colors';

const SplashScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Role');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <PortalBrand showWave topInset={insets.top} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashStart,
  },
});
