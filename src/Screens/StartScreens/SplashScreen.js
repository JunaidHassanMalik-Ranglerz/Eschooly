import React, { useEffect } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyStyling } from '../../Constants/MyStyling';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import { Strings } from '../../Constants/Strings';
import { wp } from '../../Constants/Responsive';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Role');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={MyStyling.container1} edges={[]}>
      <StatusBar
        backgroundColor={Colors.BlueBackground}
        barStyle="light-content"
      />
      <View style={styles.center}>
        <Text style={styles.logo} numberOfLines={1} ellipsizeMode="tail">
          {Strings.eschool}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(69.9),
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxxl,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
