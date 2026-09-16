import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const IdCardActionButtons = ({onDownload, onPrint}) => {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.downloadBtn}
        activeOpacity={0.85}
        onPress={onDownload}>
        <Icon name="download-outline" size={wp(5)} color={Colors.white} />
        <Text style={styles.downloadText}>{Strings.downloadPdf}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.printBtn}
        activeOpacity={0.85}
        onPress={onPrint}>
        <Icon name="print-outline" size={wp(5)} color={Colors.primary} />
        <Text style={styles.printText}>{Strings.printIdCard}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IdCardActionButtons;

const styles = StyleSheet.create({
  wrap: {
    marginTop: hp(1),
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp(8),
    paddingVertical: hp(1.8),
    gap: wp(2),
    marginBottom: hp(1.5),
  },
  downloadText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  printBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: hp(1.8),
    gap: wp(2),
  },
  printText: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
});
