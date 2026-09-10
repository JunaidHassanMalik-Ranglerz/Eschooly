import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../Component/CustomTextInput';
import Btn from '../../Component/btn';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRole} from '../../context/RoleContext';

const Register = () => {
  const navigation = useNavigation();
  const {clearRole} = useRole();
  const [cnic, setCnic] = useState('');

  const goToRole = useCallback(() => {
    clearRole();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{name: 'Role'}],
    });
  }, [clearRole, navigation]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          goToRole();
          return true;
        },
      );

      return () => subscription.remove();
    }, [goToRole]),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image source={Images.parentPortal} style={styles.headerImage} />

          <View style={styles.content}>
            <Text style={styles.welcome} numberOfLines={1}>{Strings.welcomeBack}</Text>
            <Text style={styles.heading} numberOfLines={1}>{Strings.signInTitle}</Text>
            <Text style={styles.description} numberOfLines={2}>{Strings.signInDesc}</Text>

            <CustomTextInput
              label={Strings.cnic}
              labelStyle={styles.cnicLabel}
              icon={Images.idCard}
              rightIcon={Images.tick}
              placeholder={Strings.cnicPlaceholder}
              placeholderStyle={styles.cnicPlaceholder}
              inputStyle={styles.cnicInput}
              value={cnic}
              onChangeText={setCnic}
              keyboardType="number-pad"
              helper={Strings.cnicHelper}
              helperStyle={styles.cnicHelper}
            />

            <Btn
              title={Strings.signIn}
              icon="arrow-forward"
              iconRight
              iconSize={wp(4.5)}
              style={styles.signInBtn}
              onPress={() =>
                navigation.getParent()?.reset({
                  index: 0,
                  routes: [{name: 'BottomTab'}],
                })
              }
            />

            <View style={styles.footer}>
              <View style={styles.footerRow}>
                <View style={styles.footerContent}>
                  <View style={styles.footerIconWrap}>
                    <Icon
                      name="shield-checkmark-outline"
                      size={wp(12 / 3.75)}
                      color={Colors.primary}
                    />
                  </View>
                  <Text
                    style={styles.footerText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {Strings.dataSafe}
                  </Text>
                </View>
              </View>
              <View style={styles.footerRow}>
                <View style={styles.footerContent}>
                  <Icon
                    name="globe-outline"
                    size={wp(4.3)}
                    color={Colors.primary}
                    style={styles.globeIcon}
                  />
                  <Text
                    style={styles.website}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {Strings.website}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerImage: {
    width: wp(100),
    height: hp(33.99),
    resizeMode: 'cover',
    marginBottom: hp(2),
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },
  content: {
    paddingHorizontal: wp(6),
  },
  welcome: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.8),
    width: wp(40),
  },
  heading: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginBottom: hp(1.2),
  },
  description: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginBottom: hp(3),
    width: wp(70),
  },
  cnicLabel: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  cnicInput: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
  },
  cnicPlaceholder: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
  },
  cnicHelper: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    fontFamily:Fonts.regular,
  },
  signInBtn: {
    paddingVertical: hp(2),
    marginTop: hp(3),
    elevation: 4,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: hp(6),
    gap: hp(1.2),
  },
  footerRow: {
    width:wp(100),
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(88),
    maxWidth: wp(100),
    gap: wp(1.5),
  },
  footerIconWrap: {
    width: wp(24 / 3.75),
    height: wp(24 / 3.75),
    borderRadius: wp(5 / 3.75),
    backgroundColor: Colors.violetSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flexShrink: 1,
    minWidth: 0,
    maxWidth: wp(76),
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  website: {
    flexShrink: 1,
    minWidth: 0,
    maxWidth: wp(45),
    color: Colors.linkBlue,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  globeIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode:'contain',
  },
});
