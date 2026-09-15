import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SelectedChildBanner = ({child}) => {
  if (!child) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.label} numberOfLines={1}>
        {Strings.viewingFor}
      </Text>
      <Text style={styles.name} numberOfLines={1}>
        {child.label} · {child.classBadge}
      </Text>
    </View>
  );
};

export default SelectedChildBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.blueSoft,
    borderRadius: wp(3),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.1),
    marginBottom: hp(1.5),
  },
  label: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
  },
  name: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.2),
  },
});
