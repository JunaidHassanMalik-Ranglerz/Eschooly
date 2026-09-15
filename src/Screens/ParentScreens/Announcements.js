import React from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const CATEGORY_STYLES = {
  Event: {bg: Colors.orangeSoft, text: Colors.iconOrange},
  Notice: {bg: Colors.blueSoft, text: Colors.iconBlue},
  Update: {bg: Colors.purpleSoft, text: Colors.iconPurple},
};

const AnnouncementCard = ({item}) => {
  const category = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Notice;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.badge, {backgroundColor: category.bg}]}>
          <Text style={[styles.badgeText, {color: category.text}]}>
            {item.category}
          </Text>
        </View>
        <View style={styles.dateRow}>
          <Icon name="calendar-outline" size={wp(3.5)} color={Colors.grayText} />
          <Text style={styles.date} numberOfLines={1}>
            {item.date}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.timeRow}>
        <Icon name="time-outline" size={wp(3.5)} color={Colors.primary} />
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
};

const Announcements = () => {
  const {activeStudent, announcements} = useRoleData();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.announcements} />

      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        renderItem={({item}) => <AnnouncementCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<SelectedChildBanner child={activeStudent} />}
        ListEmptyComponent={
          <Text style={styles.empty}>{Strings.noAnnouncements}</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  badge: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.35),
  },
  badgeText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.6),
  },
  message: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.2),
  },
  time: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
    marginLeft: wp(1.2),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    marginTop: hp(6),
  },
});
