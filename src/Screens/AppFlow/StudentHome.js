import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
  AppState,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBell from '../../Component/NotificationBell';
import GlanceRow from '../../Component/Glass/GlanceRow';
import HomeSearchField from '../../Component/Glass/HomeSearchField';
import NavyHeaderBand from '../../Component/Glass/NavyHeaderBand';
import SectionHeader from '../../Component/Glass/SectionHeader';
import StateView from '../../Component/Glass/StateView';
import WelcomeCarousel from '../../Component/Glass/WelcomeCarousel';
import QuickAccessCard, {
  QUICK_ACCESS_GAP,
  QUICK_ACCESS_HEIGHT,
} from '../../Component/Student/QuickAccessCard';
import StudentChip from '../../Component/Student/StudentChip';
import {EducationIcons, getFeatureArt} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Typography} from '../../Constants/Typography';
import {Strings} from '../../Constants/Strings';
import {spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {
  ACADEMICS_ENTER_MOTION,
  ScreenEnterProvider,
} from '../../hooks/useScreenEnterGate';
import {showToast} from '../../utils/toast';
import {fetchStudentHome} from '../../store/slices/studentHomeSlice';
import {useGreeting} from '../../utils/getGreeting';
import {setBlueStatusBar} from '../../Constants/MyStyling';

const HUB_ITEMS = [
  {key: 'online', label: Strings.onlineClasses, screen: 'OnlineClass'},
  {key: 'timetable', label: Strings.timetable, screen: 'Timetable'},
  {key: 'assignments', label: Strings.assignment, screen: 'Assignment'},
  {key: 'library', label: Strings.digitalLibrary, screen: 'DigitalLibrary'},
  {key: 'announcements', label: Strings.announcements, screen: 'Announcements'},
  {key: 'results', label: Strings.results, screen: 'StudentResults'},
  {key: 'syllabus', label: Strings.syllabus, screen: 'Syllabus'},
];

const TWO_LINE_HUB_KEYS = new Set(['online', 'library']);

const hubLabelFor = item => {
  const label = String(item.label || '');
  if (TWO_LINE_HUB_KEYS.has(item.key) && label.includes(' ')) {
    return label.replace(' ', '\n');
  }
  return label;
};

const SCREEN_W = Dimensions.get('window').width;
const HUB_SIDE = spacing.md;
const HUB_PEEK = wp(5.5);
const QUICK_ACCESS_WIDTH =
  (SCREEN_W - HUB_SIDE - QUICK_ACCESS_GAP * 3 - HUB_PEEK) / 4;
const SEARCH_BANNER_GAP = hp(1.9);
const NAVY_TUCK = hp(2.2);

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

const firstNameFrom = name => {
  const token = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)[0];
  return token || '';
};

const chipLabelFor = student => {
  const classParts = [student?.className, student?.sectionName].filter(Boolean);
  if (!classParts.length) {
    return Strings.student;
  }
  return `${Strings.student} · ${classParts.join(' ')}`;
};

const StudentHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const greeting = useGreeting();
  const {student, modules, upcomingClass, unreadNotifications, error} =
    useSelector(state => state.studentHome);
  const [homeLoading, setHomeLoading] = useState(true);
  const hubItems = HUB_ITEMS.filter(
    item => modules?.[item.key] === true && getFeatureArt(item.key),
  );
  const firstName = firstNameFrom(student?.name || student?.label);
  const showGlance = Boolean(modules?.online === true && upcomingClass);

  const welcomeSlides = useMemo(() => {
    if (!student) {
      return [];
    }
    const nextMeta = upcomingClass
      ? [upcomingClass.title, upcomingClass.time].filter(Boolean).join(' · ')
      : '';
    return [
      {
        key: 'welcome',
        firstName,
        subtitle: Strings.keepLearning,
        art: EducationIcons.welcomeGraduationBooks,
      },
      {
        key: 'library',
        title: Strings.digitalLibrary,
        subtitle: Strings.libraryBooksHint,
        art: EducationIcons.digitalLibrary,
      },
      upcomingClass
        ? {
            key: 'next-class',
            title: Strings.nextClass,
            subtitle: nextMeta || Strings.keepLearning,
            art: EducationIcons.physicsAtom,
          }
        : {
            key: 'classes',
            title: Strings.onlineClasses,
            subtitle: Strings.keepLearning,
            art: EducationIcons.onlineClasses,
          },
    ];
  }, [student, firstName, upcomingClass]);

  const loadHome = useCallback(() => {
    setHomeLoading(true);
    return dispatch(fetchStudentHome())
      .unwrap()
      .catch(loadError => {
        showToast({
          type: 'error',
          text1: loadError?.message || 'Unable to load home.',
        });
      })
      .finally(() => {
        setHomeLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let active = true;
    setHomeLoading(true);
    dispatch(fetchStudentHome())
      .unwrap()
      .catch(loadError => {
        if (!active) {
          return;
        }
        showToast({
          type: 'error',
          text1: loadError?.message || 'Unable to load home.',
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

  const openMenu = () => navigation.navigate('Menu');
  const openLibrary = () => navigation.navigate('DigitalLibrary');
  const openOnlineClass = () => navigation.navigate('OnlineClass');

  const glanceMeta = upcomingClass
    ? [upcomingClass.title, upcomingClass.time].filter(Boolean).join(' · ')
    : '';

  return (
    <ScreenEnterProvider motion={ACADEMICS_ENTER_MOTION}>
      <SafeAreaView style={styles.screen} edges={['top']}>
        <StatusBar
          animated={false}
          translucent={true}
          backgroundColor={Colors.white}
          barStyle="dark-content"
        />

        <ScrollEnterScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
          nestedScrollEnabled>
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
                count={unreadNotifications}
                onDark
                numeric
              />
            </View>

            <View style={styles.greetRow}>
              <TouchableOpacity
                onPress={openMenu}
                activeOpacity={0.8}
                hitSlop={8}
                style={styles.menuBtn}
                accessibilityRole="button"
                accessibilityLabel={Strings.academics}>
                <Icon name="menu" size={wp(6.6)} color={Colors.white} />
              </TouchableOpacity>
              <View style={styles.greetCopy}>
                <Text style={styles.greeting} numberOfLines={1}>
                  {greeting},
                </Text>
                <Text style={styles.studentName} numberOfLines={1}>
                  {student?.label || ' '}
                </Text>
              </View>
            </View>

            {student ? (
              <StudentChip label={chipLabelFor(student)} style={styles.chip} />
            ) : null}

            {/* <HomeSearchField onPress={openLibrary} style={styles.search} /> */}
          </NavyHeaderBand>

          <View style={styles.body}>
            {homeLoading ? <StateView status="loading" /> : null}

            {!homeLoading && error && !student ? (
              <StateView status="error" message={error} onRetry={loadHome} />
            ) : null}

            {!homeLoading && !error && !student ? (
              <StateView status="empty" />
            ) : null}

            {!homeLoading && student ? (
              <WelcomeCarousel slides={welcomeSlides} />
            ) : null}

            {!homeLoading && student ? (
              <SectionHeader
                title={Strings.quickAccess}
                onViewAll={openMenu}
                style={styles.sectionHead}
              />
            ) : null}

            {!homeLoading && student && hubItems.length ? (
              <ScrollView
                horizontal
                nestedScrollEnabled
                directionalLockEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
                removeClippedSubviews={false}
                contentOffset={{x: 0, y: 0}}
                disableIntervalMomentum
                style={styles.hubBleed}
                contentContainerStyle={styles.hubRow}>
                {hubItems.map((item, index) => (
                  <QuickAccessCard
                    key={item.key}
                    label={hubLabelFor(item)}
                    art={getFeatureArt(item.key)}
                    selected={index === 0}
                    width={QUICK_ACCESS_WIDTH}
                    style={
                      index === hubItems.length - 1
                        ? styles.hubCardLast
                        : styles.hubCard
                    }
                    onPress={() => navigation.navigate(item.screen)}
                  />
                ))}
              </ScrollView>
            ) : null}

            {!homeLoading && student && !hubItems.length ? (
              <StateView status="empty" message={Strings.stateEmpty} />
            ) : null}

            {!homeLoading && showGlance ? (
              <>
                <SectionHeader
                  title={Strings.todayAtAGlance}
                  onViewAll={openMenu}
                  style={styles.glanceHead}
                />
                <GlanceRow
                  title={Strings.nextClass}
                  meta={glanceMeta}
                  art={getFeatureArt('nextClass')}
                  onPress={openOnlineClass}
                  animationIndex={9}
                />
              </>
            ) : null}
          </View>
        </ScrollEnterScrollView>
      </SafeAreaView>
    </ScreenEnterProvider>
  );
};

export default StudentHome;

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
  headerBand: {
    borderBottomLeftRadius: wp(12),
    paddingBottom: SEARCH_BANNER_GAP + NAVY_TUCK,
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
  greetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  menuBtn: {
    width: wp(8.5),
    height: wp(8.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  greetCopy: {
    flex: 1,
  },
  greeting: {
    ...Typography.greeting,
    color: Colors.textOnNavyMuted,
  },
  studentName: {
    ...Typography.displayName,
    color: Colors.white,
    marginTop: hp(0.02),
  },
  chip: {
    marginTop: hp(0.45),
  },
  search: {
    marginTop: hp(0.65),
  },
  body: {
    paddingHorizontal: spacing.md,
    marginTop: -NAVY_TUCK,
    overflow: 'visible',
  },
  sectionHead: {
    marginTop: hp(1.4),
  },
  hubBleed: {
    marginHorizontal: -spacing.md,
    overflow: 'visible',
  },
  hubRow: {
    paddingLeft: HUB_SIDE,
    paddingRight: HUB_SIDE,
    height: QUICK_ACCESS_HEIGHT + hp(0.6),
    alignItems: 'stretch',
  },
  hubCard: {
    marginRight: QUICK_ACCESS_GAP,
  },
  hubCardLast: {
    marginRight: 0,
  },
  glanceHead: {
    marginTop: hp(1.6),
  },
});
