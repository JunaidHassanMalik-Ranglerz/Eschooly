import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from '../../Component/NotificationBell';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import ParentStatCard from '../../Component/Parent/ParentStatCard';
import ScheduleItem from '../../Component/Parent/ScheduleItem';
import NavyHeaderBand from '../../Component/Glass/NavyHeaderBand';
import SectionHeader from '../../Component/Glass/SectionHeader';
import GlassButton from '../../Component/Glass/GlassButton';
import {EducationIcons, getFeatureArt} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useGreeting} from '../../utils/getGreeting';
import {isNetworkFailure} from '../../utils/apiError';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {
  FLOAT_CARD_TUCK,
  FLOAT_HEADER_PAD,
  HEADER_NAVY_MIN_HEIGHT,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {setBlueStatusBar} from '../../Constants/MyStyling';
import {
  ACADEMICS_HEADER_ENTERING,
  ACADEMICS_PROFILE_ENTERING,
  getAcademicsMenuEntering,
} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {
  fetchChildDashboard,
  fetchParentHome,
} from '../../store/slices/parentHomeSlice';

const paintNavyStatusBar = navigation => {
  const nativeOptions = {
    statusBarStyle: 'light',
    statusBarBackgroundColor: Colors.brandNavy,
    statusBarTranslucent: false,
    statusBarAnimation: 'none',
  };
  let parent = navigation?.getParent?.();
  while (parent) {
    parent.setOptions?.(nativeOptions);
    parent = typeof parent.getParent === 'function' ? parent.getParent() : null;
  }
  setBlueStatusBar();
};

const parentDisplayName = (parent, authUser, authProfile) =>
  parent?.name ||
  parent?.full_name ||
  authUser?.name ||
  authUser?.full_name ||
  authProfile?.name ||
  authProfile?.full_name ||
  '';

const ParentHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const greeting = useGreeting();
  const {
    parent,
    children,
    selectedChildId,
    dashboard,
    dashboardLoading,
    homeLoading: sliceHomeLoading,
    error,
    errorKind,
  } = useSelector(state => state.parentHome);
  const authUser = useSelector(state => state.auth.user);
  const authProfile = useSelector(state => state.auth.profile);
  const hasCachedHome = Boolean(parent || (children && children.length));
  const hasCachedHomeRef = useRef(hasCachedHome);
  hasCachedHomeRef.current = hasCachedHome;
  const [homeLoading, setHomeLoading] = useState(!hasCachedHome);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const retryLock = useRef(false);
  const activeStudent =
    children.find(item => item.value === selectedChildId) || children[0] || null;
  const canSwitchChild = children.length > 1;
  const schedule = dashboard?.schedule || [];
  const todayLesson = schedule[0];
  const parentName = parentDisplayName(parent, authUser, authProfile);
  const isOffline = errorKind === 'network' || isNetworkFailure({message: error});
  const showCachedOffline = isOffline && hasCachedHome;
  const showEmptyOffline = isOffline && !hasCachedHome;
  const blockingLoader = homeLoading && !hasCachedHome && !isOffline;

  const openChildSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const loadHome = useCallback(
    ({silent} = {}) => {
      if (retryLock.current) {
        return Promise.resolve();
      }

      retryLock.current = true;
      if (!hasCachedHomeRef.current) {
        setHomeLoading(true);
      }

      return dispatch(fetchParentHome())
        .unwrap()
        .catch(nextError => {
          if (!silent && !nextError?.network) {
            showToast({
              type: 'error',
              text1: nextError?.message || 'Unable to load home.',
            });
          }
        })
        .finally(() => {
          retryLock.current = false;
          setHomeLoading(false);
        });
    },
    [dispatch],
  );

  const handleSelectChild = useCallback(
    nextId => {
      if (String(nextId) === String(selectedChildId)) {
        return;
      }
      dispatch(fetchChildDashboard(nextId))
        .unwrap()
        .catch(nextError => {
          if (nextError?.stale || nextError?.network) {
            return;
          }
          showToast({
            type: 'error',
            text1: nextError?.message || 'Unable to load dashboard.',
          });
        });
    },
    [dispatch, selectedChildId],
  );

  useEffect(() => {
    loadHome({silent: true});
  }, [loadHome]);

  useLayoutEffect(() => {
    paintNavyStatusBar(navigation);
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const paint = () => paintNavyStatusBar(navigation);
      paint();
      const later = setTimeout(paint, 80);
      const sub = AppState.addEventListener('change', next => {
        if (next === 'active') {
          paint();
          setTimeout(paint, 80);
          if (errorKind === 'network') {
            loadHome({silent: true});
          }
        }
      });
      return () => {
        clearTimeout(later);
        sub.remove();
      };
    }, [errorKind, loadHome, navigation]),
  );

  return (
    <ScreenEnterProvider motion={ACADEMICS_ENTER_MOTION}>
      <SafeAreaView style={styles.screen} edges={['top']}>
        <StatusBar
          animated={false}
          translucent={false}
          backgroundColor={Colors.brandNavy}
          barStyle="light-content"
        />

        <ScrollEnterScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          <AnimatedCard
            index={0}
            entering={ACADEMICS_HEADER_ENTERING}
            style={styles.headerShell}>
            <NavyHeaderBand
              style={styles.headerBand}
              contentStyle={styles.headerContent}>
              <View style={styles.brandRow}>
                <View style={styles.brandLeft}>
                  <Icon name="school" size={wp(5.2)} color={Colors.white} />
                  <View style={styles.brandRule} />
                  <Text style={styles.wordmark}>{Strings.eschoolyWordmark}</Text>
                </View>
                <NotificationBell
                  count={Number(dashboard?.unreadNotifications) || 0}
                  onDark
                />
              </View>

              <View style={styles.greetCopy}>
                <Text style={styles.greeting} numberOfLines={1}>
                  {greeting}
                </Text>
                {parentName ? (
                  <Text style={styles.parentName} numberOfLines={1}>
                    {parentName}
                  </Text>
                ) : null}
                <Text style={styles.subtitle} numberOfLines={1}>
                  {Strings.whatsHappening}
                </Text>
              </View>
            </NavyHeaderBand>
          </AnimatedCard>

          <View style={styles.body}>
            {showCachedOffline || showEmptyOffline ? (
              <View style={styles.offlineBanner}>
                <View style={styles.offlineRow}>
                  <Icon
                    name="cloud-offline-outline"
                    size={wp(5.2)}
                    color={Colors.brandRoyal}
                  />
                  <View style={styles.offlineCopy}>
                    <Text style={styles.offlineTitle} numberOfLines={2}>
                      {showEmptyOffline
                        ? Strings.offlineBannerEmpty
                        : Strings.offlineBannerCached}
                    </Text>
                    {showEmptyOffline ? (
                      <Text style={styles.offlineHint} numberOfLines={2}>
                        {Strings.offlineBannerEmptyHint}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <GlassButton
                  title={Strings.retryAction}
                  onPress={() => loadHome({silent: false})}
                  compact
                  loading={homeLoading || sliceHomeLoading}
                  style={styles.offlineRetry}
                />
              </View>
            ) : null}

            {blockingLoader ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.brandNavy}
              />
            ) : activeStudent ? (
              <AnimatedCard
                index={1}
                entering={ACADEMICS_PROFILE_ENTERING}
                style={styles.dropdownAnchor}>
                <SelectedChildBanner
                  child={activeStudent}
                  variant="large"
                  icy
                  disableEnterAnimation
                  compactMargin
                  canSwitch={canSwitchChild}
                  onSwitchPress={canSwitchChild ? openChildSwitch : undefined}
                />
              </AnimatedCard>
            ) : (
              <View style={styles.unavailableCard}>
                <Icon
                  name="people-outline"
                  size={wp(6)}
                  color={Colors.brandRoyal}
                />
                <Text style={styles.unavailableTitle} numberOfLines={2}>
                  {isOffline
                    ? Strings.offlineChildUnavailable
                    : 'No linked children'}
                </Text>
              </View>
            )}

            <View style={styles.statsGrid}>
              {dashboardLoading ? (
                <ActivityIndicator
                  style={styles.dashboardLoader}
                  size="small"
                  color={Colors.brandNavy}
                />
              ) : null}
              <ParentStatCard
                art={getFeatureArt('attendance')}
                label={Strings.attendance}
                value={dashboard?.attendance}
                hint={Strings.thisMonthShort}
                entering={getAcademicsMenuEntering(null, 2)}
                animationIndex={2}
                onPress={() => navigation.navigate('ParentAttendance')}
              />
              <ParentStatCard
                art={getFeatureArt('library')}
                label={Strings.digitalLibrary}
                value={dashboard?.libraryCount}
                hint={Strings.libraryBooksHint}
                entering={getAcademicsMenuEntering(null, 3)}
                animationIndex={3}
                onPress={() => navigation.navigate('DigitalLibrary')}
              />
              <ParentStatCard
                art={getFeatureArt('exams')}
                label={Strings.exams}
                value={dashboard?.exams}
                hint={Strings.upcoming}
                entering={getAcademicsMenuEntering(null, 4)}
                animationIndex={4}
              />
              <ParentStatCard
                art={getFeatureArt('announcements')}
                label={Strings.announcements}
                value={dashboard?.announcements}
                hint={Strings.newLabel}
                entering={getAcademicsMenuEntering(null, 5)}
                animationIndex={5}
                onPress={() => navigation.navigate('Announcements')}
              />
            </View>

            {!blockingLoader ? (
              <>
                <AnimatedCard
                  index={6}
                  entering={getAcademicsMenuEntering(null, 6)}
                  style={styles.sectionHeader}>
                  <SectionHeader title={Strings.todaySchedule} />
                </AnimatedCard>

                <ScheduleItem
                  item={{
                    subject: Strings.timetable,
                    time: Strings.viewFullWeek,
                  }}
                  art={getFeatureArt('timetable')}
                  entering={getAcademicsMenuEntering(null, 7)}
                  animationIndex={7}
                  waveVariant={SCREEN_WAVES.assignmentIce}
                  onPress={() => navigation.navigate('Timetable')}
                />

                {todayLesson ? (
                  <ScheduleItem
                    item={todayLesson}
                    art={EducationIcons.subjects}
                    entering={getAcademicsMenuEntering(null, 8)}
                    animationIndex={8}
                    waveVariant={SCREEN_WAVES.assignmentIce}
                  />
                ) : null}

                <ScheduleItem
                  item={{
                    subject: Strings.syllabus,
                    time: Strings.syllabusUnits,
                  }}
                  art={getFeatureArt('syllabus')}
                  entering={getAcademicsMenuEntering(null, 9)}
                  animationIndex={9}
                  waveVariant={SCREEN_WAVES.assignmentIce}
                  onPress={() => navigation.navigate('Syllabus')}
                />

                <ScheduleItem
                  item={{
                    subject: Strings.results,
                    time: Strings.resultCardHint,
                  }}
                  art={getFeatureArt('results')}
                  entering={getAcademicsMenuEntering(null, 10)}
                  animationIndex={10}
                  waveVariant={SCREEN_WAVES.assignmentIce}
                  onPress={() => navigation.navigate('StudentResults')}
                />

                <ScheduleItem
                  item={{
                    subject: Strings.trackChild,
                    time: Strings.trackChildHint,
                  }}
                  art={getFeatureArt('transport')}
                  entering={getAcademicsMenuEntering(null, 11)}
                  animationIndex={11}
                  waveVariant={SCREEN_WAVES.assignmentIce}
                  onPress={() => navigation.navigate('ChildTrack')}
                />
              </>
            ) : null}
          </View>
        </ScrollEnterScrollView>

        {canSwitchChild ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={children}
            selectedId={selectedChildId}
            onSelect={handleSelectChild}
            onClose={() => setSwitchVisible(false)}
            replayToken={modalReplay}
          />
        ) : null}
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default ParentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.brandNavy,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    paddingBottom: hp(3),
    overflow: 'visible',
  },
  headerShell: {
    width: '100%',
    overflow: 'visible',
  },
  headerBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    borderBottomRightRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_HEADER_PAD,
    minHeight: HEADER_NAVY_MIN_HEIGHT,
    overflow: 'visible',
  },
  headerContent: {
    paddingHorizontal: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  brandRule: {
    width: StyleSheet.hairlineWidth * 2,
    height: hp(2),
    backgroundColor: Colors.borderGlass,
    marginHorizontal: spacing.sm,
  },
  wordmark: {
    ...Typography.brand,
    color: Colors.white,
    letterSpacing: 0.8,
  },
  greetCopy: {
    marginTop: hp(0.7),
    paddingRight: wp(2),
  },
  greeting: {
    ...Typography.greeting,
    color: Colors.textOnNavyMuted,
  },
  parentName: {
    ...Typography.displayName,
    color: Colors.white,
    marginTop: hp(0.15),
  },
  subtitle: {
    ...Typography.bannerSubtitle,
    color: Colors.textOnNavyMuted,
    marginTop: hp(0.35),
  },
  body: {
    paddingHorizontal: spacing.md,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
    zIndex: 2,
  },
  dropdownAnchor: {
    width: '100%',
    zIndex: 100,
    overflow: 'visible',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: hp(1.2),
    zIndex: 1,
  },
  sectionHeader: {
    marginTop: hp(0.6),
    marginBottom: hp(0.2),
  },
  loader: {
    marginTop: hp(10),
    alignSelf: 'center',
  },
  dashboardLoader: {
    width: '100%',
    marginBottom: hp(1),
  },
  emptyChildren: {
    color: Colors.textSecondary,
    fontFamily: Typography.body.fontFamily,
    fontSize: Typography.body.fontSize,
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  offlineBanner: {
    backgroundColor: Colors.bannerIceStart,
    borderRadius: wp(5),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: spacing.md,
    paddingVertical: hp(1.4),
    marginBottom: hp(1.4),
    ...elevation.card,
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp(2.2),
  },
  offlineCopy: {
    flex: 1,
    minWidth: 0,
  },
  offlineTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.4,
  },
  offlineHint: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.35,
    marginTop: hp(0.3),
  },
  offlineRetry: {
    marginTop: hp(0.8),
    minWidth: wp(36),
    alignSelf: 'flex-start',
  },
  unavailableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bannerIceStart,
    borderRadius: wp(5),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: spacing.md,
    paddingVertical: hp(1.6),
    marginBottom: hp(0.4),
    gap: wp(2.5),
    ...elevation.card,
  },
  unavailableTitle: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.4,
  },
});
