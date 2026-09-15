import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const AttendanceStudentDropdown = props => {
  const [open, setOpen] = useState(false);
  const readOnly = !!props?.readOnly;
  const students = props?.students || [];

  const handleSelect = item => {
    props?.onSelect?.(item);
    setOpen(false);
  };

  return (
    <View style={styles.wrap}>
      <Pressable
        style={styles.card}
        onPress={() => {
          if (!readOnly) {
            setOpen(prev => !prev);
          }
        }}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText} numberOfLines={1}>
            {props?.student?.initials}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.studentLabel} numberOfLines={1}>
            {props?.label || Strings.student}
          </Text>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {props?.student?.label}
            </Text>
            {!readOnly ? (
              <View style={styles.chevronBtn}>
                <Icon
                  name={open ? 'chevron-up' : 'chevron-down'}
                  size={wp(4)}
                  color={Colors.black}
                />
              </View>
            ) : null}
          </View>
          <Text style={styles.classText} numberOfLines={1}>
            {props?.student?.classInfo}
          </Text>
        </View>
      </Pressable>

      {open && !readOnly ? (
        <View style={styles.menuBox}>
          {students.map(item => {
            const selected = item.value === props?.selectedId;
            return (
              <Pressable
                key={item.value}
                style={styles.itemRow}
                onPress={() => handleSelect(item)}>
                <Text
                  style={[styles.itemName, selected && styles.itemNameActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default AttendanceStudentDropdown;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: hp(2),
    zIndex: 20,
    elevation: 20,
    position: 'relative',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(4),
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
    fontSize: Fontsize.xs1,
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: wp(3.73),
    marginRight: wp(2),
  },
  menuBox: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: hp(0.8),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    zIndex: 30,
    elevation: 16,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  itemRow: {
    minHeight: hp(5),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
  },
  itemName: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.normal,
  },
  itemNameActive: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
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
