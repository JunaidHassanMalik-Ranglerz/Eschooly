import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import NotificationCard from '../../Component/NotificationCard';
import AnimatedCard from '../../Component/AnimatedCard';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_RADIUS,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {
  GRADIENT_END,
  GRADIENT_START,
} from '../../Component/Profile/ProfileTheme';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {
  fetchStudentNotifications,
  markStudentNotificationRead,
  markStudentNotificationsReadAll,
  setUnreadNotifications,
} from '../../store/slices/studentHomeSlice';

const NAVY = '#071A3D';
const SCREEN_BG = '#DCEBFD';
const TAB_IDLE_BG = '#EEF5FD';
const TAB_IDLE_BORDER = '#C0D5F2';
const TAB_IDLE_TEXT = '#5A6B82';
const TABS = [Strings.tabAll, Strings.tabUnread];

const NotificationContent = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const reduxUnread = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [activeTab, setActiveTab] = useState(Strings.tabAll);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const [refreshing, setRefreshing] = useState(false);
  const [readingId, setReadingId] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);
  const bottomPad = useStackBottomPad();
  const unreadOnly = activeTab === Strings.tabUnread;
  const requestRef = useRef(0);
  const listUnread = unreadOnly
    ? items.length
    : items.filter(item => item.unread).length;
  const unreadCount =
    loading && items.length === 0 ? reduxUnread : listUnread;

  const syncUnreadCount = useCallback(
    nextItems => {
      const count = unreadOnly
        ? nextItems.length
        : nextItems.filter(item => item.unread).length;
      dispatch(setUnreadNotifications(count));
    },
    [dispatch, unreadOnly],
  );

  const loadStudentNotifications = useCallback(
    (isRefresh = false) => {
      if (isParent) {
        return undefined;
      }

      const requestId = requestRef.current + 1;
      requestRef.current = requestId;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      dispatch(fetchStudentNotifications(unreadOnly))
        .unwrap()
        .then(list => {
          if (requestRef.current !== requestId) {
            return;
          }
          const rows = Array.isArray(list) ? list : [];
          setItems(rows);
          syncUnreadCount(rows);
        })
        .catch(error => {
          if (requestRef.current !== requestId) {
            return;
          }
          if (!isRefresh) {
            setItems([]);
            dispatch(setUnreadNotifications(0));
          }
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load notifications.',
          });
        })
        .finally(() => {
          if (requestRef.current !== requestId) {
            return;
          }
          setLoading(false);
          setRefreshing(false);
        });

      return () => {
        requestRef.current += 1;
      };
    },
    [dispatch, isParent, syncUnreadCount, unreadOnly],
  );

  useFocusEffect(
    useCallback(() => {
      return loadStudentNotifications(false);
    }, [loadStudentNotifications]),
  );

  const handleReadOne = item => {
    if (isParent || !item?.id || readingId || markingAll) {
      return;
    }
    if (!item.unread && !unreadOnly) {
      return;
    }
    setReadingId(item.id);
    const previous = items;
    const nextItems = unreadOnly
      ? items.filter(entry => entry.id !== item.id)
      : items.map(entry =>
          entry.id === item.id ? {...entry, unread: false} : entry,
        );
    setItems(nextItems);
    syncUnreadCount(nextItems);
    dispatch(markStudentNotificationRead(item.id))
      .unwrap()
      .catch(error => {
        setItems(previous);
        syncUnreadCount(previous);
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
          const previous = items;
          const nextItems = unreadOnly
            ? []
            : items.map(entry => ({...entry, unread: false}));
          setItems(nextItems);
          dispatch(setUnreadNotifications(0));
          dispatch(markStudentNotificationsReadAll())
            .unwrap()
            .then(() => loadStudentNotifications(true))
            .catch(error => {
              setItems(previous);
              syncUnreadCount(previous);
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

  const overflowMenu = (
    <TouchableOpacity
      style={styles.menuBtn}
      activeOpacity={0.85}
      disabled={unreadCount <= 0 || markingAll}
      onPress={handleMarkAll}
      accessibilityRole="button"
      accessibilityLabel={Strings.markAllRead}>
      {markingAll ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Image
          source={Images.threeDots}
          style={[
            styles.menuIconStudent,
            unreadCount <= 0 ? styles.menuIconDisabled : null,
          ]}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );

  const filterTabs = TABS.map(tab => {
    const active = tab === activeTab;
    return (
      <TouchableOpacity
        key={tab}
        style={[styles.filterTab, active && styles.filterTabActive]}
        activeOpacity={0.85}
        onPress={() => setActiveTab(tab)}>
        <Text
          style={[styles.filterTabText, active && styles.filterTabTextActive]}
          numberOfLines={1}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  });

  const listBody =
    loading && !isParent ? (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.brandRoyal}
      />
    ) : items.length === 0 ? (
      <Text style={[styles.empty, styles.emptyIcy]}>
        {unreadOnly ? Strings.noUnreadNotifications : Strings.noNotifications}
      </Text>
    ) : (
      items.map((item, index) => {
        const slot = index + 2;
        return (
          <NotificationCard
            key={item.id}
            item={item}
            onPress={isParent ? undefined : () => handleReadOne(item)}
            animationIndex={slot}
            entering={getHomeScreenEnter(slot)}
          />
        );
      })
    );

  return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces
            overScrollMode="auto"
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              isParent ? undefined : (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => loadStudentNotifications(true)}
                  tintColor={Colors.brandRoyal}
                  colors={[Colors.brandRoyal]}
                />
              )
            }>
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <StudentBrandedHeader
                title={Strings.notifications}
                showBell={false}
                rightAction={overflowMenu}
                subtitle={
                  isParent
                    ? Strings.notificationsSubtitleParent
                    : Strings.notificationsSubtitleStudent
                }
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  <AnimatedCard
                    index={1}
                    entering={getHomeScreenEnter(1)}
                    style={styles.filterWrapIcy}>
                    <View style={styles.filterClipIcy}>
                      <LinearGradient
                        colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                        start={GRADIENT_START}
                        end={GRADIENT_END}
                        style={styles.filterFillIcy}
                      />
                      <View pointerEvents="none" style={styles.filterWaveIcy}>
                        <CardWave
                          variant={SCREEN_WAVES.assignmentIce}
                          color="rgba(91, 156, 255, 0.16)"
                        />
                      </View>
                      <View style={styles.filterInnerIcy}>{filterTabs}</View>
                    </View>
                  </AnimatedCard>
                  {listBody}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
        </EschoolyScreenShell>
      </StudentToneProvider>
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
  containerStudent: {
    backgroundColor: Colors.canvas,
  },
  headerStudent: {
    backgroundColor: Colors.canvas,
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
  tabsRowStudent: {
    backgroundColor: Colors.canvas,
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
  tabIdleStudent: {
    backgroundColor: Colors.hubCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
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
  emptyIcy: {
    color: Colors.textSecondary,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    borderBottomRightRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  menuIconStudent: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.white,
  },
  filterWrapIcy: {
    marginBottom: hp(1.35),
    zIndex: 2,
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    borderRadius: FLOAT_CARD_RADIUS,
    ...elevation.banner,
  },
  filterClipIcy: {
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  filterFillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  filterWaveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  filterInnerIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(1.05),
    zIndex: 1,
    gap: wp(1.6),
  },
  filterTab: {
    flex: 1,
    minHeight: hp(4.6),
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: Colors.hubCard,
  },
  filterTabActive: {
    backgroundColor: Colors.brandNavy,
  },
  filterTabText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  filterTabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
});
