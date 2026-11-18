import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
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
import {EducationIcons, getFeatureArt} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {Strings} from '../../Constants/Strings';
import {spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {useGreeting} from '../../utils/getGreeting';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
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

const ParentHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const greeting = useGreeting();
  const {parent, children, selectedChildId, dashboard, dashboardLoading} =
    useSelector(state => state.parentHome);
  const [homeLoading, setHomeLoading] = useState(true);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const activeStudent =
    children.find(item => item.value === selectedChildId) || children[0] || null;
  const canSwitchChild = children.length > 1;
  const schedule = dashboard?.schedule || [];
  const todayLesson = schedule[0];
  const parentName = parent?.name || parent?.full_name || '';

  const openChildSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const handleSelectChild = useCallback(
    nextId => {
      if (String(nextId) === String(selectedChildId)) {
        return;
      }
      dispatch(fetchChildDashboard(nextId))
        .unwrap()
        .catch(error => {
          if (error?.stale) {
            return;
          }
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load dashboard.',
          });
        });
    },
    [dispatch, selectedChildId],
  );

  useEffect(() => {
    let active = true;
    setHomeLoading(true);

    dispatch(fetchParentHome())
      .unwrap()
      .catch(error => {
        if (!active) {
          return;
        }
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load home.',
        });
      })
      .finally(() => {
        if (active) {
          setHomeLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dispatch]);

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
        }
      });
      return () => {
        clearTimeout(later);
        sub.remove();
      };
    }, [navigation]),
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
                <Text style={styles.parentName} numberOfLines={1}>
                  {parentName}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {Strings.whatsHappening}
                </Text>
              </View>
            </NavyHeaderBand>
          </AnimatedCard>

          <View style={styles.body}>
            {homeLoading ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.brandNavy}
              />
            ) : null}
            {!homeLoading && activeStudent ? (
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
            ) : null}
            {!homeLoading && !activeStudent ? (
              <Text style={styles.emptyChildren}>No linked children</Text>
            ) : null}

            {!homeLoading && activeStudent ? (
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
                  value={dashboard?.attendance || '—'}
                  hint={Strings.thisMonthShort}
                  entering={getAcademicsMenuEntering(null, 2)}
                  animationIndex={2}
                  onPress={() => navigation.navigate('ParentAttendance')}
                />
                <ParentStatCard
                  art={getFeatureArt('library')}
                  label={Strings.digitalLibrary}
                  value={dashboard?.libraryCount || '—'}
                  hint={Strings.libraryBooksHint}
                  entering={getAcademicsMenuEntering(null, 3)}
                  animationIndex={3}
                  onPress={() => navigation.navigate('DigitalLibrary')}
                />
                <ParentStatCard
                  art={getFeatureArt('exams')}
                  label={Strings.exams}
                  value={dashboard?.exams || '—'}
                  hint={Strings.upcoming}
                  entering={getAcademicsMenuEntering(null, 4)}
                  animationIndex={4}
                  // onPress={() => navigation.navigate('ExamSchedule')}
                />
                <ParentStatCard
                  art={getFeatureArt('announcements')}
                  label={Strings.announcements}
                  value={dashboard?.announcements || '—'}
                  hint={Strings.newLabel}
                  entering={getAcademicsMenuEntering(null, 5)}
                  animationIndex={5}
                  onPress={() => navigation.navigate('Announcements')}
                />
              </View>
            ) : null}

            {!homeLoading ? (
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
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
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
});
