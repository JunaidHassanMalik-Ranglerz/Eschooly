import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SyllabusFilter = props => {
  const dropdownRef = useRef(null);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.dropdownWrap}
        activeOpacity={0.8}
        onPress={() => dropdownRef.current?.open()}>
        <Dropdown
          ref={dropdownRef}
          data={props?.subjects}
          labelField="label"
          valueField="value"
          value={props?.value}
          onChange={item => props?.onChange?.(item)}
          style={styles.dropdown}
          containerStyle={styles.dropdownMenu}
          selectedTextStyle={styles.hiddenSelectedText}
          placeholderStyle={styles.hiddenSelectedText}
          selectedTextProps={{numberOfLines: 1}}
          itemTextStyle={styles.itemText}
          maxHeight={hp(30)}
          showsVerticalScrollIndicator={false}
          renderLeftIcon={() => (
            <View style={styles.bookIcon}>
              <Icon name="book-outline" size={wp(5)} color={Colors.primary} />
            </View>
          )}
          renderRightIcon={() => (
            <Icon name="chevron-down" size={wp(4.5)} color={Colors.grayText} />
          )}
          renderItem={(item, selected) => (
            <View style={[styles.menuItem, selected && styles.menuItemActive]}>
              <Text style={styles.menuItemText} numberOfLines={1}>
                {item?.label}
              </Text>
            </View>
          )}
        />
        <Text
          style={styles.subjectLabel}
          numberOfLines={1}
          ellipsizeMode="tail"
          pointerEvents="none">
          {Strings.subject}
        </Text>
        <Text
          style={styles.selectedText}
          numberOfLines={1}
          ellipsizeMode="tail"
          pointerEvents="none">
          {props?.label}
        </Text>
      </TouchableOpacity>

      <View style={styles.classBadge}>
        <Icon name="school-outline" size={wp(4)} color={Colors.badgeText} />
        <Text style={styles.classText} numberOfLines={1} ellipsizeMode="tail">{props?.className}</Text>
      </View>
    </View>
  );
};

export default SyllabusFilter;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    padding: wp(3),
    marginBottom: hp(2),
  },
  dropdownWrap: {
    flex: 1,
    marginRight: wp(2),
    backgroundColor: Colors.cardBg,
    borderRadius: wp(3),
    overflow: 'hidden',
    height: wp(12.13),
  },
  dropdown: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    paddingHorizontal: wp(3),
    height: '100%',
    width: '100%',
    paddingTop: hp(0.6),
    paddingBottom: hp(0.4),
  },
  dropdownMenu: {
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: hp(0.5),
  },
  subjectLabel: {
    position: 'absolute',
    top: hp(1),
    left: wp(10.7),
    right: wp(10),
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(2.4),
    width:wp(20),
  },
  bookIcon: {
    marginRight: wp(2),
    justifyContent: 'center',
    marginTop: hp(0.5),
  },
  hiddenSelectedText: {
    opacity: 0,
  },
  selectedText: {
    position: 'absolute',
    top: hp(2.6),
    left: wp(10.7),
    right: wp(10),
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(2.93),
  },
  itemText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.normal,
  },
  menuItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
  },
  menuItemActive: {
    backgroundColor: Colors.duesCardBg,
  },
  menuItemText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs4,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.badgeBg,
    borderRadius: wp(1.8),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.7),
  },
  classText: {
    color: Colors.badgeText,
    fontFamily: Fonts.bold,
    fontSize: wp(2.85),
    marginLeft: wp(1.5),
    width:wp(15),
  },
});
