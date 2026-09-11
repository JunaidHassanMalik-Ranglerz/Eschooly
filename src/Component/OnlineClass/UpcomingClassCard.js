import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {ocText, ocTitle} from './onlineClassText';
import {wp, hp} from '../../Constants/Responsive';

const UpcomingClassCard = props => {
  const item = props?.item;

  return (
    <View style={styles.card}>
      <View style={[styles.stripe, {backgroundColor: item?.stripeColor}]} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View
            style={[styles.monthBadge, {backgroundColor: item?.monthBg}]}>
            <Text style={[styles.month, {color: item?.monthColor}]} numberOfLines={1}>
              {item?.month}
            </Text>
          </View>

          <View style={[styles.badge, {backgroundColor: item?.badgeBg}]}>
            <Text style={[styles.badgeText, {color: item?.badgeColor}]} numberOfLines={1}>
              {item?.badge}
            </Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>{item?.title}</Text>
        <Text style={styles.classInfo} numberOfLines={1}>{item?.classInfo}</Text>

        <View style={styles.infoRow}>
          <Icon name="time-outline" size={wp(3.5)} color={Colors.grayText} />
          <Text style={styles.infoText} numberOfLines={1}>{item?.time}</Text>
          <Icon
            name="hourglass-outline"
            size={wp(3.5)}
            color={Colors.grayText}
            style={styles.hourIcon}
          />
          <Text style={styles.infoText} numberOfLines={1}>{item?.duration}</Text>
        </View>

        {item?.showFooter ? (
          <View style={styles.footer}>
            <View style={styles.zoomRow}>
              <Icon name="link-outline" size={wp(3.5)} color={Colors.grayText} />
              <Text style={styles.zoomLink} numberOfLines={1}>{item?.zoomLink}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(Strings.setReminder, Strings.setReminderSoon)
              }>
              <Text style={styles.reminderText} numberOfLines={1}>{Strings.setReminder}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default UpcomingClassCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: hp(1.5),
    overflow: 'hidden',
  },
  stripe: {
    width: wp(1.2),
  },
  content: {
    flex: 1,
    padding: wp(4),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  monthBadge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  month: {
    ...ocText,
  },
  badge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
  },
  badgeText: {
    ...ocText,
  },
  title: {
    ...ocTitle,
    color: Colors.black,
    marginBottom: hp(0.3),
  },
  classInfo: {
    ...ocText,
    color: Colors.grayText,
    marginBottom: hp(1),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourIcon: {
    marginLeft: wp(3),
  },
  infoText: {
    ...ocText,
    color: Colors.grayText,
    marginLeft: wp(1.5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: hp(1),
    paddingTop: hp(1),
  },
  zoomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
  },
  zoomLink: {
    ...ocText,
    color: Colors.grayText,
  },
  reminderText: {
    ...ocText,
    color: Colors.onlineClassviewsColor,
  },
});
