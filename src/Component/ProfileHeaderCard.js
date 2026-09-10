import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';
import {setDarkStatusBar} from '../Constants/MyStyling';

const ProfileHeaderCard = props => {
  const isDetails = props?.dropdownType === 'details';

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryLight]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <Dropdown
        data={props?.dropdownList}
        labelField="label"
        valueField={isDetails ? 'key' : 'value'}
        style={styles.dropdown}
        containerStyle={styles.menuBox}
        maxHeight={hp(42)}
        dropdownPosition="bottom"
        showsVerticalScrollIndicator={false}
        closeModalWhenSelectedItem
        onFocus={setDarkStatusBar}
        onBlur={setDarkStatusBar}
        onChange={item => props?.onItemSelect?.(item)}
        selectedTextStyle={styles.hideText}
        placeholderStyle={styles.hideText}
        placeholder=""
        renderItem={item => (
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Image source={item?.icon} style={styles.icon} />
            </View>
            {isDetails ? (
              <View style={styles.flex1}>
                <Text style={styles.detailLabel} numberOfLines={1}>{item?.label}</Text>
                <Text style={styles.detailValue} numberOfLines={1}>{item?.value}</Text>
              </View>
            ) : (
              <Text style={styles.menuText} numberOfLines={1}>{item?.label}</Text>
            )}
          </View>
        )}
        renderLeftIcon={() => (
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText} numberOfLines={1}>
                {props?.student?.initials}
              </Text>
            </View>
            <View>
              <Text style={styles.name} numberOfLines={1}>{props?.student?.label}</Text>
              <Text style={styles.classText} numberOfLines={1}>
                {props?.student?.classBadge}
              </Text>
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

export default ProfileHeaderCard;

const styles = StyleSheet.create({
  gradient: {borderRadius: wp(4)},
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
  },
  hideText: {width: 0, height: 0, opacity: 0},
  header: {flex: 1, flexDirection: 'row', alignItems: 'center'},
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
    fontSize: Fontsize.xs1,
    backgroundColor: Colors.whiteOverlay18,
    alignSelf: 'flex-start',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
    width: wp(23),
  },
  arrowBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.whiteOverlay18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  flex1: {flex: 1},
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  menuText: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp(3.7),
    width: wp(25),
  },
  detailLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginBottom: hp(0.3),
    width:wp(25),
  },
  detailValue: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
});
