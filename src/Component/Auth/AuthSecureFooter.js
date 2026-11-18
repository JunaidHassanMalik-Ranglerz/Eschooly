import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {hp, wp} from '../../Constants/Responsive';

const AuthSecureFooter = ({showWebsite = true, style}) => (
  <View style={[styles.footer, style]}>
    <View style={styles.footerRow}>
      <Icon
        name="shield-checkmark-outline"
        size={wp(4.2)}
        color={Colors.brandRoyal}
      />
      <Text style={styles.footerText} numberOfLines={1}>
        {Strings.dataSafe}
      </Text>
    </View>
    {showWebsite ? (
      <View style={styles.footerRow}>
        <Icon name="globe-outline" size={wp(4.2)} color={Colors.brandRoyal} />
        <Text style={styles.footerText} numberOfLines={1}>
          {Strings.website}
        </Text>
      </View>
    ) : null}
  </View>
);

export default AuthSecureFooter;

const styles = StyleSheet.create({
  footer: {
    marginTop: hp(2.4),
    alignItems: 'center',
    gap: hp(1),
    zIndex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.6),
    maxWidth: '92%',
  },
  footerText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    flexShrink: 1,
  },
});
