import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import IdCardDetailRow from './IdCardDetailRow';

const IdCardDetailsSection = ({data}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{Strings.cardDetails}</Text>

      <View style={styles.box}>
        <IdCardDetailRow label={Strings.studentName} value={data.name} />
        <IdCardDetailRow label={Strings.studentIdLabel} value={data.studentId} />
        <IdCardDetailRow
          label={Strings.classAndSection}
          value={data.classSectionValue}
        />
        <IdCardDetailRow label={Strings.rollNumber} value={data.rollNo} />
        <IdCardDetailRow
          label={Strings.dateOfIssue}
          value={data.dateOfIssue}
        />
        <IdCardDetailRow
          label={Strings.validUntil}
          value={data.validUntil}
          isLast
        />
      </View>
    </View>
  );
};

export default IdCardDetailsSection;

const styles = StyleSheet.create({
  wrap: {
    marginTop: hp(2.5),
    marginBottom: hp(2),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.8,
    marginBottom: hp(1.2),
    textTransform: 'uppercase',
  },
  box: {
    backgroundColor: Colors.cardBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
  },
});
