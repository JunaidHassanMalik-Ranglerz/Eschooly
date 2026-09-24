import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from './NotificationBell';
import {EnterView} from './AnimatedCard';
import {
  enterFromTop,
  SCREEN_HEADER_HOME_ENTERING,
  ACADEMICS_HEADER_ENTERING,
} from '../utils/cardAnimation';
import {
  useHomeMatchedScreenEnter,
  useSequentialEnterScreen,
} from '../hooks/useScreenEnterGate';
import {hp, wp} from '../Constants/Responsive';
import {Colors} from '../Constants/Colors';
import {Fontsize} from '../Constants/Fontsize';
import {Fonts} from '../Constants/Fonts';

const MainHeaderComponent = props => {
  const navigation = useNavigation();
  const sequentialEnter = useSequentialEnterScreen();
  const homeMatchedEnter = useHomeMatchedScreenEnter();
  const headerEntering = sequentialEnter
    ? ACADEMICS_HEADER_ENTERING
    : homeMatchedEnter
      ? SCREEN_HEADER_HOME_ENTERING
      : enterFromTop(0);
  const disableEnterAnimation = props?.disableEnterAnimation === true;
  const dark = Boolean(props?.onDark);
  const lightBack = Boolean(props?.lightBack);
  const navyBack = !dark && !lightBack && props?.navyBack !== false;
  const iconColor = dark ? Colors.white : navyBack ? Colors.parentHeader : Colors.black;
  const showRightImage = !!props?.rightImage;
  const showRightIcon = !showRightImage && !!props?.rightIcon;
  const showNotification = !showRightImage && !showRightIcon && !props?.hideNotification;
  const showBack = !props?.hideBack;

  const headerStyle = [styles.header, props.style];
  const headerContent = (
    <>
      {showBack ? (
        <TouchableOpacity
          style={[
            styles.backBtn,
            dark && styles.btnDark,
            navyBack && styles.backBtnNavy,
            lightBack && styles.backBtnLight,
          ]}
          activeOpacity={0.8}
          onPress={props?.onBackPress || (() => navigation.goBack())}>
          <Icon
            name="chevron-back"
            size={wp(5.5)}
            color={
              navyBack || dark
                ? Colors.white
                : lightBack
                  ? Colors.parentHeader
                  : Colors.black
            }
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text
        style={[
          styles.title,
          dark && styles.titleDark,
          (navyBack || lightBack) && styles.titleNavy,
        ]}
        numberOfLines={2}>
        {props?.title}
      </Text>

      {showRightImage ? (
        <TouchableOpacity
          style={[styles.menuBtn, dark && styles.btnDark]}
          activeOpacity={0.8}
          onPress={props?.onRightPress}>
          <Image
            source={props.rightImage}
            style={[styles.menuIcon, {tintColor: iconColor}]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : showRightIcon ? (
        <TouchableOpacity
          style={[styles.bellWrap, dark && styles.btnDark]}
          activeOpacity={0.8}
          onPress={props?.onRightPress}>
          <Icon name={props.rightIcon} size={wp(5.5)} color={iconColor} />
        </TouchableOpacity>
      ) : showNotification ? (
        <NotificationBell count={props.notificationCount} onDark={dark} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </>
  );

  if (disableEnterAnimation) {
    return <View style={headerStyle}>{headerContent}</View>;
  }

  return (
    <EnterView motion={headerEntering} style={headerStyle}>
      {headerContent}
    </EnterView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
    paddingHorizontal: wp(2),
  },
  titleDark: {
    color: Colors.white,
  },
  titleNavy: {
    color: Colors.parentHeader,
  },
  btnDark: {
    backgroundColor: Colors.whiteOverlay18,
  },
  backBtnNavy: {
    backgroundColor: Colors.parentHeader,
  },
  backBtnLight: {
    backgroundColor: Colors.white,
    elevation: 1,
    shadowColor: '#0A4E8A',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  bellWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: wp(9),
  },
  menuBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.black,
  },
});

export default MainHeaderComponent;
