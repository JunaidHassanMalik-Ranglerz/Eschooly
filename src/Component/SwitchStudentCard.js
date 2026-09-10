import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const SwitchStudentCard = ({students, selectedId, onSelect}) => {
  const student =
    students.find(item => item.value === selectedId) || students[0];

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryLight]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <Dropdown
        data={students}
        labelField="label"
        valueField="value"
        value={selectedId}
        onChange={item => onSelect?.(item.value)}
        style={styles.dropdown}
        containerStyle={styles.menuBox}
        maxHeight={hp(45)}
        dropdownPosition="bottom"
        showsVerticalScrollIndicator={false}
        closeModalWhenSelectedItem
        selectedTextStyle={styles.hideText}
        placeholderStyle={styles.hideText}
        placeholder=""
        flatListProps={{
          ListHeaderComponent: () => (
            <View style={styles.switchHeader}>
              <Text style={styles.switchTitle}>{Strings.switchStudent}</Text>
              <Text style={styles.linkedText}>
                {students.length} {Strings.linked}
              </Text>
            </View>
          ),
        }}
        renderItem={item => {
          const selected = item.value === selectedId;
          return (
            <View style={[styles.row, selected && styles.rowSelected]}>
              <View
                style={[
                  styles.rowAvatar,
                  selected ? styles.avatarActive : styles.avatarInactive,
                ]}>
                <Text
                  style={[
                    styles.rowAvatarText,
                    !selected && styles.avatarTextDark,
                  ]}>
                  {item.initials}
                </Text>
              </View>

              <View style={styles.rowInfo}>
                <Text style={styles.rowName}>{item.label}</Text>
                <Text style={styles.rowMeta}>{item.meta}</Text>
              </View>

              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && (
                  <Icon name="checkmark" size={wp(3.5)} color={Colors.white} />
                )}
              </View>
            </View>
          );
        }}
        renderLeftIcon={() => (
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student?.initials}</Text>
            </View>
            <View>
              <Text style={styles.name}>{student?.label}</Text>
              <Text style={styles.classText}>{student?.classBadge}</Text>
            </View>
          </View>
        )}
        renderRightIcon={open => (
          <View style={styles.arrowBtn}>
            <Icon
              name={open ? 'chevron-up' : 'chevron-down'}
              size={wp(4.2)}
              color={Colors.white}
            />
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default SwitchStudentCard;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: wp(4),
  },
  dropdown: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.2),
    minHeight: hp(10),
  },
  menuBox: {
    borderRadius: wp(3),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 8,
    marginTop: hp(0.5),
  },
  hideText: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  name: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    marginBottom: hp(0.4),
  },
  classText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
    backgroundColor: Colors.whiteOverlay18,
    alignSelf: 'flex-start',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  arrowBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  switchTitle: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.small,
    letterSpacing: 0.6,
  },
  linkedText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    marginHorizontal: wp(2),
    marginBottom: hp(0.5),
    borderRadius: wp(3),
  },
  rowSelected: {
    backgroundColor: Colors.cardBg,
  },
  rowAvatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  avatarActive: {
    backgroundColor: Colors.primary,
  },
  avatarInactive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowAvatarText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
    color: Colors.white,
  },
  avatarTextDark: {
    color: Colors.black,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.normal,
    marginBottom: hp(0.3),
  },
  rowMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.small,
  },
  radio: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
