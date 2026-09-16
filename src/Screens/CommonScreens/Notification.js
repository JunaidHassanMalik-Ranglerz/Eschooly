import React, {useMemo, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SegmentTabs from '../../Component/SegmentTabs';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {Images} from '../../Assets';
import {useRoleData} from '../../hooks/useRoleData';

const TABS = [Strings.tabAll, Strings.academic, Strings.general];

const NotificationItem = ({item}) => (
  <View style={[styles.card, item.unread && styles.cardUnread]}>
    {item.unread ? <View style={styles.unreadBar} /> : null}
    <View style={[styles.iconWrap, {backgroundColor: item.iconBg || Colors.blueSoft}]}>
      <Icon
        name={item.icon}
        size={wp(5)}
        color={item.iconColor || Colors.primary}
      />
    </View>
    <View style={styles.body}>
      <View style={styles.topRow}>
        <Text
          style={[styles.title, item.unread && styles.titleUnread]}
          numberOfLines={1}>
          {item.title}
        </Text>
        {item.unread ? <View style={styles.unreadDot} /> : null}
      </View>
      <Text style={styles.message} numberOfLines={4} ellipsizeMode="tail">
        {item.message}
      </Text>
      <View style={styles.metaRow}>
        <Icon name="time-outline" size={wp(3.3)} color={Colors.mutedText} />
        <Text style={styles.metaText} numberOfLines={1}>
          {item.date ? `${item.date}  ·  ${item.time}` : item.time}
        </Text>
      </View>
    </View>
  </View>
);

const Notification = () => {
  const {notifications} = useRoleData();
  const [activeTab, setActiveTab] = useState(Strings.tabAll);

  const data = useMemo(() => {
    if (activeTab === Strings.academic) {
      return notifications.filter(item => item.type === 'academic');
    }
    if (activeTab === Strings.general) {
      return notifications.filter(item => item.type === 'general');
    }
    return notifications;
  }, [activeTab, notifications]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.notifications}
        rightImage={Images.threeDots}
        onRightPress={() => {}}
      />

      <View style={styles.content}>
        <SegmentTabs
          tabs={TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
          outlined
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <NotificationItem item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>{Strings.noNotifications}</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(3.6),
    marginBottom: hp(1.3),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardUnread: {
    backgroundColor: '#F7F9FF',
  },
  unreadBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: wp(1.1),
    backgroundColor: Colors.primary,
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  body: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
    includeFontPadding: false,
  },
  titleUnread: {
    fontFamily: Fonts.bold,
  },
  unreadDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.primary,
  },
  message: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginTop: hp(0.4),
    minHeight: Fontsize.m * 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
  },
  metaText: {
    color: Colors.mutedText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    marginLeft: wp(1.2),
    includeFontPadding: false,
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
});
