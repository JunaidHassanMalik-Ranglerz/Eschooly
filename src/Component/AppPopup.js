import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const AppPopup = ({visible, title, message, onClose}) => (
  <Modal
    visible={!!visible}
    transparent
    animationType="fade"
    statusBarTranslucent
    onRequestClose={onClose}>
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.card} onPress={() => {}}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable style={styles.btn} onPress={onClose}>
          <Text style={styles.btnText}>{Strings.ok}</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

export default AppPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: wp(5.5),
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2.4),
    paddingBottom: hp(2),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.8),
  },
  message: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginBottom: hp(2),
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderRadius: wp(5),
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(1),
  },
  btnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
