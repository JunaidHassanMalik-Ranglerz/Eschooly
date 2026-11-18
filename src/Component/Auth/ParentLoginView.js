import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../ScrollEnterScrollView';
import CustomTextInput from '../CustomTextInput';
import FeatureArtImage from '../Glass/FeatureArtImage';
import AuthBrandHeader, {AUTH_CARD_TUCK} from './AuthBrandHeader';
import AuthIceCard from './AuthIceCard';
import AuthSignInButton from './AuthSignInButton';
import AuthSecureFooter from './AuthSecureFooter';
import {authFieldStyles} from './authFieldStyles';
import {Images} from '../../Assets';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const ParentLoginView = ({
  insets,
  familyId,
  onFamilyIdChange,
  password,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  signingIn,
  onSignIn,
}) => {
  const {width, height} = useWindowDimensions();
  const compact = width < 360 || height < 680;
  const artSize = compact ? wp(24) : wp(30);

  return (
    <View style={styles.screen}>
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
          bounces
          overScrollMode="auto"
          removeClippedSubviews={false}
          contentInsetAdjustmentBehavior="never">
          <AuthBrandHeader insets={insets} compact={compact} />

          <View
            style={[
              styles.body,
              {paddingBottom: hp(3.2) + (insets.bottom || 0)},
            ]}>
            <AuthIceCard>
              <View style={styles.introRow}>
                <View style={styles.introCopy}>
                  <Text style={styles.welcome} numberOfLines={1}>
                    {Strings.welcomeBack}
                  </Text>
                  <Text
                    style={styles.heading}
                    numberOfLines={2}
                    maxFontSizeMultiplier={1.15}>
                    {Strings.signInTitle}
                  </Text>
                  <Text
                    style={styles.description}
                    numberOfLines={3}
                    maxFontSizeMultiplier={1.15}>
                    {Strings.signInDesc}
                  </Text>
                </View>
                <View
                  pointerEvents="none"
                  style={[styles.art, {width: artSize}]}>
                  <FeatureArtImage
                    source={EducationIcons.linkedChildren}
                    width={artSize}
                    height={artSize}
                  />
                </View>
              </View>

              <CustomTextInput
                label={Strings.familyId}
                labelStyle={authFieldStyles.label}
                icon={Images.idCard}
                iconBg={Colors.surface}
                iconTintColor={Colors.brandRoyal}
                placeholder={Strings.familyIdPlaceholder}
                placeholderStyle={authFieldStyles.placeholder}
                inputStyle={authFieldStyles.fieldText}
                inputBoxStyle={authFieldStyles.fieldBox}
                wrapperStyle={authFieldStyles.fieldWrap}
                value={familyId}
                onChangeText={onFamilyIdChange}
                autoCapitalize="none"
                helper={Strings.familyIdHelper}
                helperStyle={authFieldStyles.helper}
              />
              <CustomTextInput
                vectorIcon="lock-closed-outline"
                iconBg={Colors.surface}
                iconColor={Colors.brandRoyal}
                placeholder={Strings.passwordPlaceholder}
                placeholderStyle={authFieldStyles.placeholder}
                inputStyle={authFieldStyles.fieldText}
                inputBoxStyle={authFieldStyles.fieldBox}
                wrapperStyle={authFieldStyles.fieldWrap}
                value={password}
                onChangeText={onPasswordChange}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                rightVectorIcon={
                  showPassword ? 'eye-off-outline' : 'eye-outline'
                }
                rightIconColor={Colors.brandRoyal}
                onRightPress={onTogglePassword}
              />

              <AuthSignInButton signingIn={signingIn} onPress={onSignIn} />
              <AuthSecureFooter />
            </AuthIceCard>
          </View>
        </ScrollEnterScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ParentLoginView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    overflow: 'visible',
  },
  body: {
    paddingHorizontal: spacing.md,
    marginTop: -AUTH_CARD_TUCK,
    paddingBottom: hp(3.2),
    zIndex: 2,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.6),
    zIndex: 1,
  },
  introCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  welcome: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.45),
  },
  heading: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    lineHeight: Fontsize.m * 1.22,
    marginBottom: hp(0.7),
  },
  description: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.4,
  },
  art: {
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
