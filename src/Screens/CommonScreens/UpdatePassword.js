import React, {useRef, useState} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
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
import {elevation, radius} from '../../Constants/Theme';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {useRole} from '../../context/RoleContext';
import {updateParentPassword, updateStudentPassword} from '../../store/slices/authSlice';
import {showToast} from '../../utils/toast';

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
  icy = false,
}) => (
  <ProfileGradientCard
    innerStyle={styles.fieldInner}
    animationIndex={animationIndex}
    entering={entering}
    colors={icy ? undefined : colors}
    variant={icy ? 'light' : 'navy'}
    noMargin>
    <Text style={[styles.fieldLabel, icy && styles.fieldLabelIcy]}>{label}</Text>
    <View style={[styles.inputBox, icy && styles.inputBoxIcy, focused && (icy ? styles.inputBoxFocusedIcy : styles.inputBoxFocused)]}>
      <Icon name="lock-closed-outline" size={wp(5)} color={icy ? Colors.brandRoyal : Colors.whiteMuted85} />
      <TextInput
        style={[styles.input, icy && styles.inputIcy]}
        placeholder={placeholder}
        placeholderTextColor={icy ? Colors.textSecondary : Colors.whiteMuted75}
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
          color={icy ? Colors.brandRoyal : Colors.whiteMuted85}
        />
      </Pressable>
    </View>
  </ProfileGradientCard>
);

const UpdatePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const saving = useSelector(state => state.auth.loading);
  const submitLock = useRef(false);
  const {isParent} = useRole();
  const icy = !isParent;
  const bottomPad = useStackBottomPad(4);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const validateParentPassword = () => {
    if (!currentPassword.trim()) {
      return 'Current password is required.';
    }
    if (newPassword.length < 8) {
      return 'New password must be at least 8 characters.';
    }
    if (!/[A-Z]/.test(newPassword)) {
      return 'New password must contain at least one uppercase letter.';
    }
    if (!/\d/.test(newPassword)) {
      return 'New password must contain at least one digit.';
    }
    if (newPassword !== confirmPassword) {
      return 'Password confirmation does not match.';
    }
    return '';
  };

  const resetToLogin = () => {
    const parentNav = navigation.getParent();
    const nav = parentNav || navigation;
    nav.reset({
      index: 0,
      routes: [{name: 'AuthNavigation'}],
    });
  };

  const handleSave = async () => {
    if (saving || submitLock.current) {
      return;
    }

    const validationMessage = validateParentPassword();
    if (validationMessage) {
      showToast({type: 'error', text1: validationMessage});
      return;
    }

    submitLock.current = true;
    try {
      const request = isParent
        ? updateParentPassword({
            parent_current_password: currentPassword,
            parent_password: newPassword,
            parent_password_confirmation: confirmPassword,
          })
        : updateStudentPassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          });
      const result = await dispatch(request).unwrap();
      showToast({type: 'success', text1: result.message});
      resetToLogin();
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || 'Unable to update password.',
      });
    } finally {
      submitLock.current = false;
    }
  };

  const studentFields = [
    {
      key: 'current',
      label: Strings.currentPassword,
      placeholder: Strings.currentPasswordPlaceholder,
      value: currentPassword,
      onChangeText: setCurrentPassword,
      secureTextEntry: !showCurrent,
      onToggleSecure: () => setShowCurrent(prev => !prev),
    },
    {
      key: 'new',
      label: Strings.newPassword,
      placeholder: Strings.newPasswordPlaceholder,
      value: newPassword,
      onChangeText: setNewPassword,
      secureTextEntry: !showNew,
      onToggleSecure: () => setShowNew(prev => !prev),
    },
    {
      key: 'confirm',
      label: Strings.confirmPassword,
      placeholder: Strings.confirmPasswordPlaceholder,
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      secureTextEntry: !showConfirm,
      onToggleSecure: () => setShowConfirm(prev => !prev),
    },
  ];

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? hp(1) : 0}>
            <ScrollEnterScrollView
              style={styles.scrollArea}
              contentContainerStyle={[
                styles.studentScroll,
                {paddingBottom: bottomPad},
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
              overScrollMode="never"
              removeClippedSubviews={false}>
              <EschoolyScreenShell.Header style={styles.studentBand}>
                <StudentBrandedHeader
                  title={Strings.updatePassword}
                  showBell={false}
                />
              </EschoolyScreenShell.Header>
              <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
                <View style={styles.canvasStage}>
                  <View pointerEvents="none" style={styles.canvasWave}>
                    <CardWave
                      variant={SCREEN_WAVES.assignmentIce}
                      color="rgba(37, 99, 235, 0.12)"
                    />
                  </View>
                  <View style={styles.canvasForeground}>
                    <AnimatedCard
                      index={1}
                      entering={getHomeScreenEnter(1)}
                      style={styles.introWrapIcy}>
                      <View style={styles.glassClip}>
                        <LinearGradient
                          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                          start={GRADIENT_START}
                          end={GRADIENT_END}
                          style={styles.glassFill}
                        />
                        <View pointerEvents="none" style={styles.glassWave}>
                          <CardWave
                            variant={SCREEN_WAVES.assignmentIce}
                            color="rgba(91, 156, 255, 0.16)"
                          />
                        </View>
                        <Text style={styles.introTextIcy}>
                          {Strings.updatePasswordDesc}
                        </Text>
                      </View>
                    </AnimatedCard>

                    <AnimatedCard
                      index={2}
                      entering={getHomeScreenEnter(2)}
                      style={styles.formWrapIcy}>
                      <View style={styles.glassClip}>
                        <LinearGradient
                          colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                          start={GRADIENT_START}
                          end={GRADIENT_END}
                          style={styles.glassFill}
                        />
                        <View pointerEvents="none" style={styles.glassWave}>
                          <CardWave
                            variant={SCREEN_WAVES.assignmentIce}
                            color="rgba(91, 156, 255, 0.14)"
                          />
                        </View>
                        <View style={styles.formInnerIcy}>
                          {studentFields.map(field => (
                            <View key={field.key} style={styles.fieldBlockIcy}>
                              <Text style={styles.fieldLabelIcy}>{field.label}</Text>
                              <View
                                style={[
                                  styles.inputBoxIcyNew,
                                  focusedField === field.key &&
                                    styles.inputBoxFocusedIcyNew,
                                ]}>
                                <Icon
                                  name="lock-closed-outline"
                                  size={wp(5)}
                                  color={Colors.brandRoyal}
                                />
                                <TextInput
                                  style={styles.inputIcyNew}
                                  placeholder={field.placeholder}
                                  placeholderTextColor={Colors.textSecondary}
                                  value={field.value}
                                  onChangeText={field.onChangeText}
                                  secureTextEntry={field.secureTextEntry}
                                  autoCapitalize="none"
                                  onFocus={() => setFocusedField(field.key)}
                                  onBlur={() => setFocusedField('')}
                                />
                                <Pressable
                                  onPress={field.onToggleSecure}
                                  hitSlop={8}
                                  style={styles.eyeHit}>
                                  <Icon
                                    name={
                                      field.secureTextEntry
                                        ? 'eye-outline'
                                        : 'eye-off-outline'
                                    }
                                    size={wp(5)}
                                    color={Colors.brandRoyal}
                                  />
                                </Pressable>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </AnimatedCard>

                    <AnimatedCard
                      index={5}
                      entering={getHomeScreenEnter(5)}
                      style={styles.reqWrapIcy}>
                      <View style={styles.glassClip}>
                        <LinearGradient
                          colors={[Colors.hubCard, Colors.bannerIceStart]}
                          start={GRADIENT_START}
                          end={GRADIENT_END}
                          style={styles.glassFill}
                        />
                        <View style={styles.reqInnerIcy}>
                          <Text style={styles.checklistTitleIcy}>
                            Password requirements
                          </Text>
                          {REQUIREMENTS.map(item => {
                            const met = item.test(newPassword);
                            return (
                              <View key={item.key} style={styles.checkRow}>
                                <Icon
                                  name={
                                    met ? 'checkmark-circle' : 'ellipse-outline'
                                  }
                                  size={wp(4.2)}
                                  color={
                                    met ? Colors.brandRoyal : Colors.textSecondary
                                  }
                                />
                                <Text
                                  style={[
                                    styles.checkTextIcy,
                                    met && styles.checkTextMetIcy,
                                  ]}>
                                  {item.label}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </AnimatedCard>

                    <Pressable
                      style={[styles.saveCtaIcy, saving && styles.saveCtaDisabled]}
                      disabled={saving}
                      onPress={handleSave}>
                      {saving ? (
                        <ActivityIndicator size="small" color={Colors.white} />
                      ) : null}
                      <Text style={styles.saveBtnText}>
                        {Strings.updatePassword}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </EschoolyScreenShell.Body>
            </ScrollEnterScrollView>
          </KeyboardAvoidingView>
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar
          backgroundColor={Colors.parentBg}
          barStyle="dark-content"
        />
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
            contentContainerStyle={[styles.content, {paddingBottom: bottomPad}]}
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
                    <Text
                      style={[styles.checkText, met && styles.checkTextMet]}>
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
                disabled={saving}
                onPress={handleSave}>
                <LinearGradient
                  colors={PROFILE_GRADIENT}
                  start={GRADIENT_START}
                  end={GRADIENT_END}
                  style={styles.saveBtn}>
                  {saving ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                  ) : null}
                  <Text style={styles.saveBtnText}>{Strings.updatePassword}</Text>
                </LinearGradient>
              </Pressable>
            </AnimatedCard>
          </ScrollEnterScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(UpdatePassword, 'updatePassword');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  containerStudent: {
    backgroundColor: Colors.canvas,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.9),
    borderRadius: CARD_RADIUS,
    gap: wp(2),
  },
  saveBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  fieldLabelIcy: {
    color: Colors.textSecondary,
  },
  inputBoxIcy: {
    backgroundColor: Colors.hubCard,
    borderColor: Colors.borderSubtle,
  },
  inputBoxFocusedIcy: {
    borderColor: Colors.brandAccent,
  },
  inputIcy: {
    color: Colors.textPrimary,
  },
  checklistTitleIcy: {
    color: Colors.textPrimary,
  },
  checkTextIcy: {
    color: Colors.textSecondary,
  },
  checkTextMetIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.medium,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  introWrapIcy: {
    marginBottom: hp(1.35),
    overflow: 'visible',
    zIndex: 2,
    backgroundColor: Colors.bannerIceStart,
    borderRadius: radius.banner,
    ...elevation.banner,
  },
  formWrapIcy: {
    marginBottom: hp(1.25),
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    borderRadius: radius.banner,
    ...elevation.card,
  },
  reqWrapIcy: {
    marginBottom: hp(1.6),
    overflow: 'visible',
    backgroundColor: Colors.hubCard,
    borderRadius: radius.banner,
    ...elevation.card,
  },
  glassClip: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  glassFill: {
    ...StyleSheet.absoluteFillObject,
  },
  glassWave: {
    ...StyleSheet.absoluteFillObject,
  },
  introTextIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.7),
    zIndex: 1,
  },
  formInnerIcy: {
    paddingHorizontal: wp(3.6),
    paddingTop: hp(1.4),
    paddingBottom: hp(0.6),
    zIndex: 1,
  },
  fieldBlockIcy: {
    marginBottom: hp(1.35),
  },
  inputBoxIcyNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    paddingLeft: wp(3.2),
    paddingRight: wp(1.6),
    minHeight: hp(5.6),
    gap: wp(2),
  },
  inputBoxFocusedIcyNew: {
    borderColor: Colors.brandAccent,
  },
  inputIcyNew: {
    flex: 1,
    minWidth: 0,
    color: Colors.brandNavy,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    paddingVertical: hp(1.15),
    paddingRight: wp(1),
  },
  eyeHit: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqInnerIcy: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.55),
    zIndex: 1,
  },
  saveCtaIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandNavy,
    borderRadius: radius.pill,
    paddingVertical: hp(1.55),
    minHeight: hp(5.8),
    gap: wp(2),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.brandRoyal,
    ...elevation.banner,
  },
  saveCtaDisabled: {
    opacity: 0.7,
  },
});
