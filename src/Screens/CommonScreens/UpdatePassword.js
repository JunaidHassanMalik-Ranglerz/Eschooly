import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import AnimatedCard from '../../Component/AnimatedCard';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from '../../Component/Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {wp, hp} from '../../Constants/Responsive';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const REQUIREMENTS = [
  {key: 'length', label: 'At least 8 characters', test: value => value.length >= 8},
  {key: 'upper', label: 'One uppercase letter', test: value => /[A-Z]/.test(value)},
  {key: 'number', label: 'One number', test: value => /\d/.test(value)},
];

const PasswordField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onToggleSecure,
  focused,
  onFocus,
  onBlur,
  animationIndex = 0,
  entering,
  colors,
}) => (
  <ProfileGradientCard
    innerStyle={styles.fieldInner}
    animationIndex={animationIndex}
    entering={entering}
    colors={colors}
    noMargin>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={[styles.inputBox, focused && styles.inputBoxFocused]}>
      <Icon name="lock-closed-outline" size={wp(5)} color={Colors.whiteMuted85} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.whiteMuted75}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Pressable onPress={onToggleSecure} hitSlop={8}>
        <Icon
          name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
          size={wp(5)}
          color={Colors.whiteMuted85}
        />
      </Pressable>
    </View>
  </ProfileGradientCard>
);

const UpdatePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
        <MainHeaderComponent
          title={Strings.updatePassword}
          hideNotification
          navyBack
        />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? hp(1) : 0}>
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={false}>
            <AnimatedCard
              index={1}
              entering={getHomeScreenEnter(1)}
              style={styles.descEnter}>
              <Text style={styles.desc}>{Strings.updatePasswordDesc}</Text>
            </AnimatedCard>

            <PasswordField
              label={Strings.currentPassword}
              placeholder={Strings.currentPasswordPlaceholder}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrent}
              onToggleSecure={() => setShowCurrent(prev => !prev)}
              focused={focusedField === 'current'}
              onFocus={() => setFocusedField('current')}
              onBlur={() => setFocusedField('')}
              animationIndex={2}
              entering={getHomeScreenEnter(2)}
              colors={CARD_GRADIENTS.notification}
            />

            <PasswordField
              label={Strings.newPassword}
              placeholder={Strings.newPasswordPlaceholder}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNew}
              onToggleSecure={() => setShowNew(prev => !prev)}
              focused={focusedField === 'new'}
              onFocus={() => setFocusedField('new')}
              onBlur={() => setFocusedField('')}
              animationIndex={3}
              entering={getHomeScreenEnter(3)}
              colors={CARD_GRADIENTS.royal}
            />

            <PasswordField
              label={Strings.confirmPassword}
              placeholder={Strings.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              onToggleSecure={() => setShowConfirm(prev => !prev)}
              focused={focusedField === 'confirm'}
              onFocus={() => setFocusedField('confirm')}
              onBlur={() => setFocusedField('')}
              animationIndex={4}
              entering={getHomeScreenEnter(4)}
              colors={CARD_GRADIENTS.royal}
            />

            <ProfileGradientCard
              innerStyle={styles.checklistInner}
              animationIndex={5}
              entering={getHomeScreenEnter(5)}
              colors={CARD_GRADIENTS.deep}
              waveVariant="actionPassword"
              shadow={false}>
              <Text style={styles.checklistTitle}>Password requirements</Text>
              {REQUIREMENTS.map(item => {
                const met = item.test(newPassword);
                return (
                  <View key={item.key} style={styles.checkRow}>
                    <Icon
                      name={met ? 'checkmark-circle' : 'ellipse-outline'}
                      size={wp(4.2)}
                      color={met ? '#86EFAC' : Colors.whiteMuted75}
                    />
                    <Text style={[styles.checkText, met && styles.checkTextMet]}>
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </ProfileGradientCard>

            <AnimatedCard
              index={6}
              entering={getHomeScreenEnter(6)}
              style={styles.saveBtnWrap}>
            <Pressable
              style={[styles.saveBtnWrap, IDENTITY_CARD_SHADOW]}
              onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={PROFILE_GRADIENT}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>{Strings.updatePassword}</Text>
              </LinearGradient>
            </Pressable>
            </AnimatedCard>
          </ScrollEnterScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default withScreenEnter(UpdatePassword, 'updatePassword');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  flex: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  descEnter: {
    marginBottom: hp(2.2),
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(4),
  },
  desc: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginBottom: 0,
  },
  fieldInner: {
    paddingVertical: hp(1.3),
    marginBottom: hp(1.2),
  },
  fieldLabel: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.7),
    zIndex: 1,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: CARD_RADIUS,
    borderWidth: 1.5,
    borderColor: Colors.whiteOverlay18,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.3),
    gap: wp(2.5),
    zIndex: 1,
  },
  inputBoxFocused: {
    borderColor: 'rgba(255,255,255,0.4)',
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    padding: 0,
  },
  checklistInner: {
    paddingVertical: hp(1.5),
    marginBottom: hp(2),
    overflow: 'hidden',
  },
  checklistTitle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginBottom: hp(1),
    zIndex: 1,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.6),
    gap: wp(2),
    zIndex: 1,
  },
  checkText: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  checkTextMet: {
    color: '#86EFAC',
  },
  saveBtnWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.9),
    borderRadius: CARD_RADIUS,
  },
  saveBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
});
