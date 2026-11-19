import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import FeatureArtImage from '../Glass/FeatureArtImage';
import AuthBrandHeader, {
  AUTH_CARD_TUCK,
  AUTH_CARD_TUCK_DENSE,
} from './AuthBrandHeader';
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
  const frameHeight = useRef(height).current;
  const compact = width < 360 || frameHeight < 680;
  const artSize = compact ? wp(24) : wp(30);
  const scrollRef = useRef(null);
  const scrollY = useRef(0);
  const passwordAnchor = useRef(null);
  const keyboardTop = useRef(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keyboardOpen = keyboardHeight > 80;
  const windowResized = frameHeight - height > 80;
  const cardTuck = keyboardOpen ? AUTH_CARD_TUCK_DENSE : AUTH_CARD_TUCK;
  const overlayInset =
    keyboardOpen && !windowResized ? keyboardHeight : 0;

  const keepPasswordVisible = useCallback(() => {
    const node = passwordAnchor.current;
    if (!node?.measureInWindow) {
      return;
    }
    node.measureInWindow((_x, y, _w, h) => {
      const limit = keyboardTop.current || height - 12;
      const overlap = y + h + hp(1.8) - limit;
      if (overlap > 0) {
        scrollRef.current?.scrollTo({
          y: Math.max(0, scrollY.current + overlap),
          animated: true,
        });
      }
    });
  }, [height]);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const show = Keyboard.addListener(showEvent, event => {
      const nextHeight = event?.endCoordinates?.height || 0;
      keyboardTop.current =
        event?.endCoordinates?.screenY || height - nextHeight;
      setKeyboardHeight(nextHeight);
      setTimeout(() => {
        requestAnimationFrame(keepPasswordVisible);
      }, Platform.OS === 'ios' ? 40 : 90);
    });
    const hide = Keyboard.addListener(hideEvent, () => {
      keyboardTop.current = 0;
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [height, keepPasswordVisible]);

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
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          bounces={!keyboardOpen}
          overScrollMode="auto"
          nestedScrollEnabled
          removeClippedSubviews={false}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          contentInsetAdjustmentBehavior="never"
          onScroll={event => {
            scrollY.current = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}>
          <AuthBrandHeader
            insets={insets}
            compact={compact || keyboardOpen}
            dense={keyboardOpen}
            showTagline={!keyboardOpen}
          />

          <View
            style={[
              styles.body,
              {
                marginTop: -cardTuck,
                paddingBottom:
                  hp(2.2) + (insets.bottom || 0) + overlayInset,
              },
            ]}>
            <AuthIceCard>
              <View
                style={[
                  styles.introRow,
                  keyboardOpen && styles.introRowDense,
                ]}>
                <View style={styles.introCopy}>
                  {keyboardOpen ? null : (
                    <Text style={styles.welcome} numberOfLines={1}>
                      {Strings.welcomeBack}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.heading,
                      keyboardOpen && styles.headingDense,
                    ]}
                    numberOfLines={keyboardOpen ? 1 : 2}
                    maxFontSizeMultiplier={1.15}>
                    {Strings.signInTitle}
                  </Text>
                  {keyboardOpen ? null : (
                    <Text
                      style={styles.description}
                      numberOfLines={3}
                      maxFontSizeMultiplier={1.15}>
                      {Strings.signInDesc}
                    </Text>
                  )}
                </View>
                {keyboardOpen ? null : (
                  <View
                    pointerEvents="none"
                    style={[styles.art, {width: artSize}]}>
                    <FeatureArtImage
                      source={EducationIcons.linkedChildren}
                      width={artSize}
                      height={artSize}
                    />
                  </View>
                )}
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
                helper={keyboardOpen ? undefined : Strings.familyIdHelper}
                helperStyle={authFieldStyles.helper}
              />
              <View
                ref={passwordAnchor}
                collapsable={false}
                onLayout={() => {
                  if (keyboardTop.current) {
                    keepPasswordVisible();
                  }
                }}>
                <CustomTextInput
                  label={Strings.password}
                  labelStyle={authFieldStyles.label}
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
                  onFocus={keepPasswordVisible}
                  rightVectorIcon={
                    showPassword ? 'eye-off-outline' : 'eye-outline'
                  }
                  rightIconColor={Colors.brandRoyal}
                  onRightPress={onTogglePassword}
                />
              </View>

              <AuthSignInButton signingIn={signingIn} onPress={onSignIn} />
              {keyboardOpen ? null : <AuthSecureFooter />}
            </AuthIceCard>
          </View>
        </ScrollView>
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
    zIndex: 2,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.6),
    zIndex: 1,
  },
  introRowDense: {
    marginBottom: hp(1.1),
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
  headingDense: {
    marginBottom: 0,
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
