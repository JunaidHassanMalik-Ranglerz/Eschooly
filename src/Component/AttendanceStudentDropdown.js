import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const AttendanceStudentDropdown = props => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText} numberOfLines={1}>
          {props?.student?.initials}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.studentLabel} numberOfLines={1}>
          {props?.label || Strings.student}
        </Text>

        {props?.readOnly ? (
          <Text style={styles.name}>{props?.student?.label}</Text>
        ) : (
          <Dropdown
            data={props?.students}
            labelField="label"
            valueField="value"
            value={props?.selectedId}
            onChange={item => props?.onSelect?.(item)}
            style={styles.dropdown}
            containerStyle={styles.menuBox}
            selectedTextStyle={styles.name}
            itemContainerStyle={styles.itemContainer}
            maxHeight={hp(15)}
            dropdownPosition="bottom"
            inverted={false}
            showsVerticalScrollIndicator={false}
            flatListProps={{
              nestedScrollEnabled: true,
              scrollEnabled: true,
            }}
            renderItem={item => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.label}</Text>
              </View>
            )}
            renderRightIcon={() => (
              <View style={styles.chevronBtn}>
                <Icon name="chevron-down" size={wp(4)} color={Colors.black} />
              </View>
            )}
          />
        )}

        <Text style={styles.classText} numberOfLines={1}>
          {props?.student?.classInfo}
        </Text>
      </View>
    </View>
  );
};

export default AttendanceStudentDropdown;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
    marginBottom: hp(2),
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  info: {
    flex: 1,
  },
  studentLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginBottom: hp(0.2),
    width: wp(25),
  },
  dropdown: {
    padding: 0,
    minHeight: hp(3),
    flex: 1,
  },
  menuBox: {
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: hp(0.5),
    maxHeight: hp(15),
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    flexShrink: 1,
  },
  itemRow: {
    height: hp(5),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
  },
  itemName: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.normal,
  },
  itemContainer: {
    padding: 0,
  },
  classText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginTop: hp(0.2),
    width: wp(40),
  },
  chevronBtn: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
