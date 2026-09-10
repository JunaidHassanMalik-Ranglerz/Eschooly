import React, {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {wp, hp} from '../Constants/Responsive';

const AttendanceDateDropdown = props => {
  const dropdownRef = useRef(null);

  return (
    <View style={styles.wrap}>
      <Dropdown
        ref={dropdownRef}
        data={props?.ranges}
        labelField="label"
        valueField="value"
        value={props?.selectedId}
        onChange={item => props?.onSelect?.(item?.value)}
        style={styles.dropdown}
        containerStyle={styles.menuBox}
        selectedTextStyle={styles.dateText}
        selectedTextProps={{numberOfLines: 1}}
        itemTextStyle={styles.itemText}
        itemTextProps={{numberOfLines: 1}}
        maxHeight={hp(25)}
        renderLeftIcon={() => (
          <View style={styles.calendarWrap}>
            <Image
              source={Images.calendar}
              style={styles.calendarIcon}
              resizeMode="contain"
            />
          </View>
        )}
        renderRightIcon={open => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (open) {
                dropdownRef.current?.close();
              } else {
                dropdownRef.current?.open();
              }
            }}>
            <Icon
              name={open ? 'chevron-up' : 'chevron-down'}
              size={wp(4)}
              color={Colors.linkBlue}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AttendanceDateDropdown;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.duesCardBg,
    borderRadius: wp(3),
    marginBottom: hp(1.5),
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  menuBox: {
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: hp(0.5),
  },
  calendarWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  calendarIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.black,
  },
  dateText: {
    color: Colors.linkBlue,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
  },
  itemText: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.73),
  },
});
