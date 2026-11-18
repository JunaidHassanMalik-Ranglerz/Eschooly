import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {hp, wp} from '../../Constants/Responsive';

const AuthSignInButton = ({signingIn, onPress, title = Strings.signIn}) => (
  <TouchableOpacity
    activeOpacity={0.88}
    disabled={signingIn}
    onPress={onPress}
    style={styles.ctaWrap}>
    <LinearGradient
      colors={[Colors.brandRoyal, Colors.brandAccent]}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.cta}>
      {signingIn ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <>
          <Text style={styles.ctaText}>{title}</Text>
          <Icon name="arrow-forward" size={wp(4.6)} color={Colors.white} />
        </>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export default AuthSignInButton;

const styles = StyleSheet.create({
  ctaWrap: {
    marginTop: hp(1.4),
    borderRadius: radius.pill,
    overflow: 'hidden',
    ...elevation.banner,
  },
  cta: {
    minHeight: hp(6.2),
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(2),
    paddingHorizontal: spacing.md,
  },
  ctaText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
});
