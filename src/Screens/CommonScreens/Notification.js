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
import {useRoleData} from '../../hooks/useRoleData';

const TABS = [Strings.tabAll, Strings.academic, Strings.general];

const NotificationItem = ({item}) => (
  <View style={styles.card}>
    <View style={styles.iconWrap}>
      <Icon name={item.icon} size={wp(5)} color={Colors.primary} />
    </View>
    <View style={styles.body}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.time} numberOfLines={1}>
          {item.time}
        </Text>
      </View>
      <Text style={styles.message} numberOfLines={2}>
        {item.message}
      </Text>
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
        rightIcon="options-outline"
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
    paddingBottom: hp(3),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    padding: wp(3.5),
    marginBottom: hp(1.2),
  },
  iconWrap: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.blueSoft,
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
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  time: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
  },
  message: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    marginTop: hp(0.35),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
});
