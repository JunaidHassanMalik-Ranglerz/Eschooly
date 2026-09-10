import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../Assets';
import {Colors} from '../Constants/Colors';
import {Fonts} from '../Constants/Fonts';
import {Fontsize} from '../Constants/Fontsize';
import {Strings} from '../Constants/Strings';
import {wp, hp} from '../Constants/Responsive';

const FeedListItem = ({item}) => {
  const isDiary = item?.type === 'diary';

  return (
    <View style={styles.card}>
      <View style={[styles.header, !isDiary && styles.headerCenter]}>
        {isDiary ? (
          <View style={styles.avatar}>
            <Text style={styles.initials}>{item?.initials}</Text>
          </View>
        ) : (
          <View style={styles.iconBox}>
            <Image
              source={Images.announcementDay}
              style={styles.announcementIcon}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.headerContent}>
          {isDiary ? (
            <>
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.name}
                </Text>
                <View style={styles.timeRow}>
                  <Text style={styles.time} numberOfLines={1}>
                    {item?.time}
                  </Text>
                  <Icon
                    name="chevron-forward"
                    size={wp(4)}
                  />
                </View>
              </View>
              <Text style={styles.diaryMessage} numberOfLines={2}>
                {item?.message}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText} numberOfLines={1}>{Strings.diaryBadge}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title} numberOfLines={1}>{item?.title}</Text>
              <Text style={styles.author} numberOfLines={1}>{item?.author}</Text>
            </>
          )}
        </View>
      </View>

      {!isDiary && (
        <>
          <Text style={styles.announcementMessage}>{item?.message}</Text>
          <View style={styles.dateRow}>
            <Icon name="calendar-outline" size={wp(4)} color={Colors.primary} />
            <Text style={styles.date} numberOfLines={1}>{item?.dateRange}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default FeedListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: wp(4),
    padding: wp(4),
    marginHorizontal: wp(4),
    marginBottom: hp(1.5),
  },
  header: {
    flexDirection: 'row',
  },
  headerCenter: {
    alignItems: 'center',
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  announcementIcon: {
    width: wp(4.27),
    height: wp(4.27),
    tintColor: Colors.primary,
  },
  initials: {
    color: Colors.primary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.normal,
  },
  headerContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: wp(3.5),
    flex: 1,
    width: wp(30),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xmm,
    marginRight: wp(1),
    width: wp(10),
  },
  diaryMessage: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
    lineHeight: Fontsize.m,
    marginTop: hp(0.8),
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.badgeBg,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
    marginTop: hp(1),
  },
  badgeText: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs,
    width:wp(7),
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xx1,
  },
  author: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.3),
  },
  announcementMessage: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginTop: hp(1.2),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.2),
  },
  date: {

    color:Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginLeft: wp(2),
    width: wp(50),
  },
});
