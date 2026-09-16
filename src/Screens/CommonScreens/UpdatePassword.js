import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import CustomTextInput from '../../Component/CustomTextInput';
import Btn from '../../Component/btn';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const UpdatePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.updatePassword}
        hideNotification
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.heading}>{Strings.updatePassword}</Text>
            <Text style={styles.desc}>{Strings.updatePasswordDesc}</Text>

            <CustomTextInput
              vectorIcon="lock-closed-outline"
              label={Strings.currentPassword}
              placeholder={Strings.currentPasswordPlaceholder}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrent}
              autoCapitalize="none"
              rightVectorIcon={showCurrent ? 'eye-off-outline' : 'eye-outline'}
              onRightPress={() => setShowCurrent(prev => !prev)}
            />
            <CustomTextInput
              vectorIcon="lock-closed-outline"
              label={Strings.newPassword}
              placeholder={Strings.newPasswordPlaceholder}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNew}
              autoCapitalize="none"
              rightVectorIcon={showNew ? 'eye-off-outline' : 'eye-outline'}
              onRightPress={() => setShowNew(prev => !prev)}
            />
            <CustomTextInput
              vectorIcon="lock-closed-outline"
              label={Strings.confirmPassword}
              placeholder={Strings.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
              rightVectorIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightPress={() => setShowConfirm(prev => !prev)}
            />

            <Btn
              title={Strings.savePassword}
              icon="checkmark"
              iconRight
              iconSize={wp(4.5)}
              style={styles.saveBtn}
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(3),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2.2),
    paddingBottom: hp(2.4),
  },
  heading: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.6),
  },
  desc: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginBottom: hp(2.2),
  },
  saveBtn: {
    marginTop: hp(1.2),
  },
});
