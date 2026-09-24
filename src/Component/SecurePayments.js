import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {CARD_GRADIENTS} from '../Constants/CardTheme';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';
import {GRADIENT_END, GRADIENT_START} from './Profile/ProfileTheme';

const SecurePayments = () => {
  return (
    <LinearGradient
      colors={CARD_GRADIENTS.sapphire}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.card}>
      <View style={styles.iconBox}>
        <Image source={Images.secure} style={styles.icon} resizeMode="contain" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>{Strings.securePayments}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{Strings.securePaymentsSub}</Text>
      </View>
    </LinearGradient>
  );
};

export default SecurePayments;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(3),
    padding: wp(4),
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: '#65C4FF',
    overflow: 'hidden',
  },
  iconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(2.5),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.iconSky,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: wp(3.2),
    marginBottom: hp(0.3),
    width: wp(35),
  },
  subtitle: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    width: wp(60),
  },
});
