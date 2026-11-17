import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {wp, hp} from '../Constants/Responsive';
import {useStudentTone} from './Glass/StudentTone';

const ICON_COLORS = {
  present: '#38BDF8',
  absent: '#6366F1',
  late: '#0EA5E9',
  leave: '#60A5FA',
};

const resolveIconName = (icon, labelKey) =>
  icon ||
  (labelKey === 'present'
    ? 'checkmark-circle-outline'
    : labelKey === 'absent'
      ? 'close-circle-outline'
      : 'remove-circle-outline');

const AttendanceStatCard = props => {
  const icy = useStudentTone();
  const premium = props?.premium;
  const labelKey = String(props?.label || '').toLowerCase();
  const iconColor = icy
    ? Colors.brandRoyal
    : props?.iconColor ||
      ICON_COLORS[labelKey] ||
      (props?.image ? ICON_COLORS.present : Colors.iconSky);

  if (icy) {
    return (
      <View style={styles.metricIcy}>
        <View style={styles.iconSlotIcy}>
          <Icon
            name={resolveIconName(props?.icon, labelKey)}
            size={wp(5.2)}
            color={iconColor}
          />
        </View>
        <Text style={styles.countIcy} numberOfLines={1}>
          {props?.count}
        </Text>
        <Text style={styles.labelIcy} numberOfLines={1}>
          {props?.label}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, premium && styles.cardPremium]}>
      <View style={styles.iconSlot}>
        {props?.image ? (
          <Image
            source={props?.image}
            style={[styles.iconImage, {tintColor: iconColor}]}
            resizeMode="contain"
          />
        ) : (
          <Icon
            name={resolveIconName(props?.icon, labelKey)}
            size={wp(5.2)}
            color={iconColor}
          />
        )}
      </View>
      <Text
        style={[styles.label, premium && styles.labelPremium]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}>
        {props?.label}
      </Text>
      <Text
        style={[styles.count, premium && styles.countPremium]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}>
        {props?.count}
      </Text>
    </View>
  );
};

export default AttendanceStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(1),
    marginHorizontal: wp(0.6),
  },
  cardPremium: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
  },
  iconSlot: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.8),
  },
  iconImage: {
    width: wp(5),
    height: wp(5),
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    marginBottom: hp(0.5),
    width: '100%',
    textAlign: 'center',
  },
  labelPremium: {
    color: Colors.whiteMuted75,
  },
  count: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    width: '100%',
    textAlign: 'center',
  },
  countPremium: {
    color: Colors.white,
  },
  metricIcy: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(0.4),
  },
  iconSlotIcy: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.4),
  },
  countIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm1,
    lineHeight: hp(2.5),
    minHeight: hp(2.5),
    textAlign: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  labelIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    lineHeight: hp(2.15),
    minHeight: hp(2.15),
    marginTop: hp(0.12),
    textAlign: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
});
