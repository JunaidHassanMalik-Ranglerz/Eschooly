import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AttendanceStudentDropdown from '../AttendanceStudentDropdown';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {wp, hp} from '../../Constants/Responsive';
import {getGreeting} from '../../utils/getGreeting';

const StudentAcademicHeader = ({
  student,
  students,
  selectedId,
  onSelect,
  readOnly,
  label,
}) => (
  <View style={styles.wrap}>
    <View style={styles.greetingRow}>
      <Text style={styles.greeting} numberOfLines={1}>
        {getGreeting()},
      </Text>
      <Text style={styles.name} numberOfLines={1}>
        {student?.label}
      </Text>
    </View>
    <AttendanceStudentDropdown
      student={student}
      students={students}
      selectedId={selectedId}
      premium
      onSelect={onSelect}
      readOnly={readOnly}
      label={label}
    />
  </View>
);

export default StudentAcademicHeader;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(0.4),
  },
  greetingRow: {
    marginBottom: hp(1),
    paddingHorizontal: wp(0.5),
  },
  greeting: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.15),
  },
});
