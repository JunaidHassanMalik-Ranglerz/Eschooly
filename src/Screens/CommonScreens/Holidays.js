import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {HOLIDAY_LIST} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';

const TYPE_STYLES = {
  National: {bg: Colors.greenSoft, text: Colors.iconGreen},
  Religious: {bg: Colors.purpleSoft, text: Colors.iconPurple},
  School: {bg: Colors.orangeSoft, text: Colors.iconOrange},
};

const Holidays = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.holidays} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{Strings.upcomingHolidays}</Text>
        {HOLIDAY_LIST.map(item => {
          const type = TYPE_STYLES[item.type] || TYPE_STYLES.School;
          return (
            <View key={item.id} style={styles.holidayCard}>
              <View style={[styles.iconWrap, {backgroundColor: type.bg}]}>
                <Icon name="sunny-outline" size={wp(5)} color={type.text} />
              </View>
              <View style={styles.holidayInfo}>
                <Text style={styles.holidayTitle}>{item.title}</Text>
                <Text style={styles.holidayMeta}>{item.date}</Text>
              </View>
              <View style={[styles.badge, {backgroundColor: type.bg}]}>
                <Text style={[styles.badgeText, {color: type.text}]}>
                  {item.type}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Holidays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.2),
    marginTop: hp(0.5),
  },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5),
    marginBottom: hp(1.1),
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  holidayInfo: {
    flex: 1,
    marginRight: wp(2),
  },
  holidayTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  holidayMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  badge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.4),
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
});
