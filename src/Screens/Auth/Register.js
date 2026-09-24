import React, {useCallback, useState} from 'react';
import {BackHandler, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from '../../Component/CustomTextInput';
import Btn from '../../Component/btn';
import {Images} from '../../Assets';
import PortalBrand from '../../Component/PortalBrand';
import {Colors} from '../../Constants/Colors';
import {getSubjectTheme} from '../../Component/Syllabus/SubjectTheme';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../../Component/Profile/ProfileTheme';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRole} from '../../context/RoleContext';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {EnterView} from '../../Component/AnimatedCard';
import {
  REGISTER_BUTTON_ENTERING,
  REGISTER_DESC_ENTERING,
  REGISTER_FOOTER_ENTERING,
  REGISTER_HEADING_ENTERING,
  REGISTER_HEADER_ENTERING,
  REGISTER_INPUT_1_ENTERING,
  REGISTER_INPUT_2_ENTERING,
  REGISTER_WELCOME_ENTERING,
} from '../../utils/cardAnimation';

const SYLLABUS_THEME = getSubjectTheme('Mathematics');
const SYLLABUS_BOX_GRADIENT = SYLLABUS_THEME.gradient;
const REGISTER_SCREEN_BG = SYLLABUS_BOX_GRADIENT[0];
const RegisterEnter = ({entering, style, children}) => (
  <EnterView motion={entering} style={style}>
    {children}
  </EnterView>
);

const RegisterContent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {clearRole, isParent} = useRole();
  const [cnic, setCnic] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const goToHome = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{name: 'BottomTab'}],
    });
  };

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
        animated={false}
        translucent
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollEnterScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          contentInsetAdjustmentBehavior="never">
          <View style={styles.headerImage}>
            <RegisterEnter entering={REGISTER_HEADER_ENTERING}>
              <PortalBrand
                compact
                showWave
                showPortalLabel
                portalLabel={Strings.learnSmarter}
                topInset={insets.top}
                waveFill={REGISTER_SCREEN_BG}
                gradientColors={SYLLABUS_BOX_GRADIENT}
                gradientLocations={[0, 0.5, 1]}
              />
            </RegisterEnter>
          </View>

          <View style={styles.formArea}>
              <LinearGradient
                colors={SYLLABUS_BOX_GRADIENT}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={[styles.signInCard, IDENTITY_CARD_SHADOW, styles.signInCardInner]}>
            <RegisterEnter entering={REGISTER_WELCOME_ENTERING} animKey="signin-welcome">
              <Text style={styles.welcome} numberOfLines={1}>
                {Strings.welcomeBack}
              </Text>
            </RegisterEnter>
            <RegisterEnter entering={REGISTER_HEADING_ENTERING} animKey="signin-heading">
              <Text style={styles.heading} numberOfLines={1}>
                {isParent ? Strings.signInTitle : Strings.signInAccount}
              </Text>
            </RegisterEnter>
            <RegisterEnter entering={REGISTER_DESC_ENTERING} animKey="signin-desc">
              <Text style={styles.description} numberOfLines={2}>
                {isParent ? Strings.signInDesc : Strings.studentSignInDesc}
              </Text>
            </RegisterEnter>

            {isParent ? (
              <RegisterEnter entering={REGISTER_INPUT_1_ENTERING} animKey="signin-input-1">
                <CustomTextInput
                  label={Strings.cnic}
                  labelStyle={styles.cnicLabel}
                  icon={Images.idCard}
                  iconBg={Colors.whiteOverlay22}
                  iconTintColor={SYLLABUS_THEME.iconColor}
                  rightIcon={Images.tick}
                  placeholder={Strings.cnicPlaceholder}
                  placeholderStyle={styles.cnicPlaceholder}
                  inputStyle={styles.cnicInput}
                  inputBoxStyle={styles.inputBox}
                  value={cnic}
                  onChangeText={setCnic}
                  keyboardType="number-pad"
                  helper={Strings.cnicHelper}
                  helperStyle={styles.cnicHelper}
                />
              </RegisterEnter>
            ) : (
              <View>
                <RegisterEnter entering={REGISTER_INPUT_1_ENTERING} animKey="signin-input-1">
                  <CustomTextInput
                    vectorIcon="person-outline"
                    iconBg={Colors.whiteOverlay22}
                    iconColor={SYLLABUS_THEME.iconColor}
                    placeholder={Strings.studentIdPlaceholder}
                    placeholderStyle={styles.cnicPlaceholder}
                    inputStyle={styles.cnicInput}
                    inputBoxStyle={styles.inputBox}
                    value={studentId}
                    onChangeText={setStudentId}
                    autoCapitalize="none"
                  />
                </RegisterEnter>
                <RegisterEnter entering={REGISTER_INPUT_2_ENTERING} animKey="signin-input-2">
                  <CustomTextInput
                    vectorIcon="lock-closed-outline"
                    iconBg={Colors.whiteOverlay22}
                    iconColor={SYLLABUS_THEME.iconColor}
                    placeholder={Strings.passwordPlaceholder}
                    placeholderStyle={styles.cnicPlaceholder}
                    inputStyle={styles.cnicInput}
                    inputBoxStyle={styles.inputBox}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    rightVectorIcon={
                      showPassword ? 'eye-off-outline' : 'eye-outline'
                    }
                    rightIconColor={Colors.whiteMuted85}
                    onRightPress={() => setShowPassword(prev => !prev)}
                  />
                </RegisterEnter>
              </View>
            )}

            <RegisterEnter entering={REGISTER_BUTTON_ENTERING} animKey="signin-btn">
              <Btn
                title={Strings.signIn}
                icon="arrow-forward"
                iconRight
                iconSize={wp(4.5)}
                style={styles.signInBtn}
                textStyle={styles.signInBtnText}
                onPress={goToHome}
              />
            </RegisterEnter>

            <RegisterEnter entering={REGISTER_FOOTER_ENTERING} style={styles.footer} animKey="signin-footer">
              <View style={styles.footerRow}>
                <View style={styles.footerContent}>
                  <View style={styles.footerIconWrap}>
                    <Icon
                      name="shield-checkmark-outline"
                      size={wp(12 / 3.75)}
                      color={SYLLABUS_THEME.iconColor}
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
                    color={SYLLABUS_THEME.iconColor}
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
            </RegisterEnter>
              </LinearGradient>
          </View>
        </ScrollEnterScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const Register = () => <RegisterContent />;

export default withScreenEnter(Register, 'register');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: REGISTER_SCREEN_BG,
  },
  headerImage: {
    backgroundColor: REGISTER_SCREEN_BG,
    marginBottom: -1,
  },
  flex: {
    flex: 1,
    backgroundColor: REGISTER_SCREEN_BG,
  },
  scrollView: {
    flex: 1,
    backgroundColor: REGISTER_SCREEN_BG,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: REGISTER_SCREEN_BG,
  },
  formArea: {
    flexGrow: 1,
    backgroundColor: REGISTER_SCREEN_BG,
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(4),
  },
  signInCard: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    flexGrow: 1,
  },
  signInCardInner: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4),
    paddingTop: hp(2.2),
    paddingBottom: hp(3),
    overflow: 'hidden',
    flexGrow: 1,
  },
  welcome: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.8),
    width: wp(40),
  },
  heading: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginBottom: hp(1.2),
  },
  description: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginBottom: hp(3),
    width: wp(70),
  },
  inputBox: {
    backgroundColor: Colors.whiteOverlay18,
    borderWidth: 0,
    borderColor: 'rgba(108, 183, 255, 0.35)',
  },
  cnicLabel: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  cnicInput: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
  },
  cnicPlaceholder: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
  },
  cnicHelper: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  signInBtn: {
    paddingVertical: hp(2),
    marginTop: hp(3),
    elevation: 0,
    backgroundColor: Colors.whiteOverlay22,
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.45)',
  },
  signInBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: hp(5),
    gap: hp(1.2),
  },
  footerRow: {
    width: wp(100),
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
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flexShrink: 1,
    minWidth: 0,
    maxWidth: wp(76),
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  website: {
    flexShrink: 1,
    minWidth: 0,
    maxWidth: wp(45),
    color: SYLLABUS_THEME.iconColor,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  globeIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
  },
});
