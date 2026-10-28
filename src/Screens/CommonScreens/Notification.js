import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationCard from '../../Component/NotificationCard';
import AnimatedCard from '../../Component/AnimatedCard';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {
  fetchStudentNotifications,
  fetchStudentUnreadCount,
  markStudentNotificationRead,
  markStudentNotificationsReadAll,
} from '../../store/slices/studentHomeSlice';

const NAVY = '#071A3D';
const SCREEN_BG = '#DCEBFD';
const TAB_IDLE_BG = '#EEF5FD';
const TAB_IDLE_BORDER = '#C0D5F2';
const TAB_IDLE_TEXT = '#5A6B82';
const TABS = [Strings.tabAll, Strings.tabUnread];

const NotificationContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const reduxUnread = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const {notifications: dummyNotifications} = useRoleData();
  const [activeTab, setActiveTab] = useState(Strings.tabAll);
  const [studentItems, setStudentItems] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const [refreshing, setRefreshing] = useState(false);
  const [readingId, setReadingId] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);
  const unreadOnly = activeTab === Strings.tabUnread;

  const parentItems = useMemo(() => {
    if (!unreadOnly) {
      return dummyNotifications;
    }
    return dummyNotifications.filter(item => item.unread);
  }, [dummyNotifications, unreadOnly]);

  const items = isParent ? parentItems : studentItems;
  const unreadCount = isParent
    ? dummyNotifications.filter(item => item.unread).length
    : reduxUnread;

  const loadStudentNotifications = useCallback(
    (isRefresh = false) => {
      if (isParent) {
        return undefined;
      }

      let active = true;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      Promise.all([
        dispatch(fetchStudentNotifications(unreadOnly)).unwrap(),
        dispatch(fetchStudentUnreadCount()).unwrap().catch(() => null),
      ])
        .then(([list]) => {
          if (active) {
            setStudentItems(list);
          }
        })
        .catch(error => {
          if (!active) {
            return;
          }
          if (!isRefresh) {
            setStudentItems([]);
          }
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load notifications.',
          });
        })
        .finally(() => {
          if (!active) {
            return;
          }
          setLoading(false);
          setRefreshing(false);
        });

      return () => {
        active = false;
      };
    },
    [dispatch, isParent, unreadOnly],
  );

  useFocusEffect(
    useCallback(() => {
      return loadStudentNotifications(false);
    }, [loadStudentNotifications]),
  );

  const handleReadOne = item => {
    if (isParent || !item?.id || !item.unread || readingId || markingAll) {
      return;
    }
    setReadingId(item.id);
    const previous = studentItems;
    setStudentItems(current =>
      unreadOnly
        ? current.filter(entry => entry.id !== item.id)
        : current.map(entry =>
            entry.id === item.id ? {...entry, unread: false} : entry,
          ),
    );
    dispatch(markStudentNotificationRead(item.id))
      .unwrap()
      .catch(error => {
        setStudentItems(previous);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to mark notification as read.',
        });
      })
      .finally(() => {
        setReadingId(null);
      });
  };

  const handleMarkAll = () => {
    if (isParent || markingAll || readingId || unreadCount <= 0) {
      return;
    }
    Alert.alert(Strings.notifications, Strings.markAllReadConfirm, [
      {text: 'No', style: 'cancel'},
      {
        text: Strings.markAllRead,
        onPress: () => {
          setMarkingAll(true);
          const previous = studentItems;
          setStudentItems(current =>
            unreadOnly
              ? []
              : current.map(entry => ({...entry, unread: false})),
          );
          dispatch(markStudentNotificationsReadAll())
            .unwrap()
            .catch(error => {
              setStudentItems(previous);
              showToast({
                type: 'error',
                text1: error?.message || 'Unable to mark notifications as read.',
              });
            })
            .finally(() => {
              setMarkingAll(false);
            });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={SCREEN_BG} barStyle="dark-content" />

      <AnimatedCard index={0} entering={getHomeScreenEnter(0)} style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={wp(5.5)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{Strings.notifications}</Text>
        <TouchableOpacity
          style={styles.menuBtn}
          activeOpacity={0.85}
          disabled={isParent || unreadCount <= 0 || markingAll}
          onPress={handleMarkAll}>
          {markingAll ? (
            <ActivityIndicator size="small" color={NAVY} />
          ) : (
            <Image
              source={Images.threeDots}
              style={[
                styles.menuIcon,
                !isParent && unreadCount <= 0 ? styles.menuIconDisabled : null,
              ]}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </AnimatedCard>

      <AnimatedCard index={1} entering={getHomeScreenEnter(1)} style={styles.tabsCard}>
        <View style={styles.tabsRow}>
          {TABS.map(tab => {
            const active = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}
                activeOpacity={0.85}
                onPress={() => setActiveTab(tab)}>
                <Text
                  style={[styles.tabText, active ? styles.tabTextActive : null]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </AnimatedCard>

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={!isParent}
        overScrollMode={isParent ? 'never' : 'auto'}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          isParent ? undefined : (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadStudentNotifications(true)}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          )
        }>
        {loading && !isParent ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.primary}
          />
        ) : items.length === 0 ? (
          <Text style={styles.empty}>
            {unreadOnly ? Strings.noUnreadNotifications : Strings.noNotifications}
          </Text>
        ) : (
          items.map((item, index) => {
            const slot = index + 2;
            return (
              <NotificationCard
                key={item.id}
                item={item}
                onPress={
                  isParent ? undefined : () => handleReadOne(item)
                }
                animationIndex={slot}
                entering={getHomeScreenEnter(slot)}
              />
            );
          })
        )}
      </ScrollEnterScrollView>
    </SafeAreaView>
  );
};

const Notification = () => (
  <ScreenEnterProvider motion="notification">
    <NotificationContent />
  </ScreenEnterProvider>
);

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(0.8),
    paddingBottom: hp(1.2),
    backgroundColor: SCREEN_BG,
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: NAVY,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  menuBtn: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: NAVY,
  },
  menuIconDisabled: {
    opacity: 0.35,
  },
  tabsCard: {
    marginHorizontal: wp(4),
    marginBottom: hp(0.4),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(0.2),
    backgroundColor: SCREEN_BG,
  },
  tab: {
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(0.7),
    borderRadius: wp(6),
    marginRight: wp(2),
  },
  tabActive: {
    backgroundColor: NAVY,
  },
  tabIdle: {
    backgroundColor: TAB_IDLE_BG,
    borderWidth: 1,
    borderColor: TAB_IDLE_BORDER,
  },
  tabText: {
    color: TAB_IDLE_TEXT,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  tabTextActive: {
    color: Colors.white,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.4),
    paddingBottom: hp(3),
    flexGrow: 1,
  },
  loader: {
    marginTop: hp(8),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
});
