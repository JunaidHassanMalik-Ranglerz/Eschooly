import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import DepthIcon from '../../Component/DepthIcon';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import ProfileSectionTitle from '../../Component/Profile/ProfileSectionTitle';
import ParentChildCard from '../../Component/Parent/ParentChildCard';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import FeatureArtImage from '../../Component/Glass/FeatureArtImage';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import {
  StudentToneProvider,
  useStackBottomPad,
  useStudentTone,
} from '../../Component/Glass/StudentTone';
import {GRADIENT_END, GRADIENT_START} from '../../Component/Profile/ProfileTheme';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {HOLIDAY_LIST} from '../../Constants/dummydata';
import {elevation, radius} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {
  ACADEMICS_PROFILE_ENTERING,
  getHomeScreenEnter,
} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {fetchChildDashboard, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentHolidays} from '../../store/slices/studentHomeSlice';

const TYPE_THEMES = {
  National: {
    gradient: ['#071A3D', '#12325A', '#1345A3'],
    icon: 'flag-outline',
    iconColor: '#93C5FD',
    badgeBg: 'rgba(56, 189, 248, 0.18)',
    badgeText: '#BFDBFE',
  },
  Religious: {
    gradient: ['#0A2F5C', '#0D5CA8', '#2563EB'],
    icon: 'moon-outline',
    iconColor: '#7DD3FC',
    badgeBg: 'rgba(99, 102, 241, 0.18)',
    badgeText: '#C7D2FE',
  },
  School: {
    gradient: ['#062653', '#07346B', '#1E40AF'],
    icon: 'sunny-outline',
    iconColor: '#60A5FA',
    badgeBg: 'rgba(37, 99, 235, 0.18)',
    badgeText: '#DBEAFE',
  },
};

const parseHolidayDate = date => {
  const parts = String(date || '').split(',');
  if (parts.length >= 2) {
    return {dayLine: parts[0].trim(), dateLine: parts.slice(1).join(',').trim()};
  }
  return {dayLine: '', dateLine: date};
};

const HolidayCard = ({item, animationIndex, showWave}) => {
  const icy = useStudentTone();
  const theme = TYPE_THEMES[item.type] || TYPE_THEMES.School;
  const dateParts = parseHolidayDate(item.date);

  if (icy) {
    return (
      <AnimatedCard
        index={animationIndex}
        entering={getHomeScreenEnter(animationIndex)}
        style={styles.wrapIcy}>
        <View style={styles.clipIcy}>
          <LinearGradient
            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.fillIcy}
          />
          <View pointerEvents="none" style={styles.waveIcy}>
            <CardWave
              variant={SCREEN_WAVES.assignmentIce}
              color="rgba(91, 156, 255, 0.18)"
            />
          </View>
          <View style={styles.cardInnerIcy}>
            <View style={styles.icyMain}>
              <Text style={styles.titleIcy} numberOfLines={2}>
                {item.title}
              </Text>
              {dateParts.dateLine || item.date ? (
                <Text style={styles.dateIcy} numberOfLines={2}>
                  {dateParts.dateLine || item.date}
                </Text>
              ) : null}
              {dateParts.dayLine ? (
                <Text style={styles.dayIcy} numberOfLines={1}>
                  {dateParts.dayLine}
                </Text>
              ) : null}
              {item.duration ? (
                <Text style={styles.durationIcy} numberOfLines={1}>
                  {item.duration}
                </Text>
              ) : null}
            </View>
            <View style={styles.icyAccent}>
              {item.type ? (
                <View style={styles.badgeIcy}>
                  <Text style={styles.badgeTextIcy}>{item.type}</Text>
                </View>
              ) : null}
              <FeatureArtImage source={EducationIcons.holidays} size={wp(14)} />
            </View>
          </View>
        </View>
      </AnimatedCard>
    );
  }

  return (
    <ProfileGradientCard
      innerStyle={styles.cardInner}
      animationIndex={animationIndex}
      entering={getHomeScreenEnter(animationIndex)}
      colors={theme.gradient}
      waveVariant={showWave ? SCREEN_WAVES.holidays : null}>
      <View style={styles.topRow}>
        <DepthIcon name={theme.icon} size={wp(6)} color={theme.iconColor} />
        {item.type ? (
        <View style={[styles.badge, {backgroundColor: theme.badgeBg}]}>
          <Text style={[styles.badgeText, {color: theme.badgeText}]}>{item.type}</Text>
        </View>
        ) : null}
      </View>

      <Text style={styles.title}>{item.title}</Text>
      {dateParts.dateLine || item.date ? (
      <Text style={styles.date}>{dateParts.dateLine || item.date}</Text>
      ) : null}
      {dateParts.dayLine ? <Text style={styles.day}>{dateParts.dayLine}</Text> : null}
      {item.duration ? <Text style={styles.duration}>{item.duration}</Text> : null}
    </ProfileGradientCard>
  );
};

const Holidays = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const icy = true;
  const bottomPad = useStackBottomPad();
  const {children, selectedChildId: homeChildId} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [studentHolidays, setStudentHolidays] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const [switchVisible, setSwitchVisible] = useState(false);
  const activeChildId = homeChildId || children[0]?.value || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) || children[0] || null;
  const parentCanSwitch = children.length > 1;
  const holidays = isParent ? HOLIDAY_LIST : studentHolidays;
  const bannerStudent = isParent
    ? parentChild
    : {
        label: homeStudent?.label || '',
        classInfo: homeStudent?.className || homeStudent?.classLabel || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        photoUrl: homeStudent?.photoUrl || '',
      };

  useEffect(() => {
    if (!isParent || homeChildId || children.length) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [children.length, dispatch, homeChildId, isParent]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchStudentHolidays())
      .unwrap()
      .then(items => {
        if (active) {
          setStudentHolidays(items);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentHolidays([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load holidays.',
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [dispatch, isParent]);

  const holidayList = loading ? (
    <ActivityIndicator
      style={styles.loader}
      size="large"
      color={icy ? Colors.brandRoyal : Colors.primary}
    />
  ) : holidays.length === 0 ? (
    <Text style={[styles.empty, icy && styles.emptyIcy]}>No holidays yet.</Text>
  ) : (
    holidays.map((item, index) => {
      const slot = index + 3;
      return (
        <HolidayCard
          key={item.id}
          item={item}
          animationIndex={slot}
          showWave={index === 0}
        />
      );
    })
  );

  if (icy) {
    return (
      <ScreenEnterProvider motion="holidays">
        <StudentToneProvider active>
          <EschoolyScreenShell variant="navy-ice">
            <ScrollEnterScrollView
              style={styles.scrollArea}
              contentContainerStyle={[
                styles.studentScroll,
                {paddingBottom: bottomPad},
              ]}
              showsVerticalScrollIndicator={false}
              bounces={false}
              overScrollMode="never"
              removeClippedSubviews={false}
              keyboardShouldPersistTaps="handled">
              <EschoolyScreenShell.Header style={styles.studentBand}>
                <StudentBrandedHeader
                  title={Strings.holidays}
                  unreadCount={unreadNotifications}
                  subtitle={
                    isParent
                      ? Strings.holidaysSubtitleParent
                      : Strings.holidaysSubtitleStudent
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
                    <AttendanceStudentDropdown
                      student={bannerStudent}
                      premium
                      embedded
                      readOnly={!isParent || !parentCanSwitch}
                      look="float"
                      label={isParent ? Strings.child : Strings.student}
                      externalPicker={isParent && parentCanSwitch}
                      onPickerPress={
                        isParent && parentCanSwitch
                          ? () => setSwitchVisible(true)
                          : undefined
                      }
                    />
                    <ProfileSectionTitle
                      animationIndex={2}
                      style={styles.sectionIcy}>
                      {Strings.upcomingHolidays}
                    </ProfileSectionTitle>
                    {holidayList}
                  </View>
                </View>
              </EschoolyScreenShell.Body>
            </ScrollEnterScrollView>
            {isParent && parentCanSwitch ? (
              <ChildSwitchModal
                visible={switchVisible}
                childrenList={children}
                selectedId={String(activeChildId || '')}
                onSelect={nextId => {
                  if (String(nextId) !== String(activeChildId)) {
                    dispatch(fetchChildDashboard(nextId));
                  }
                }}
                onClose={() => setSwitchVisible(false)}
              />
            ) : null}
          </EschoolyScreenShell>
        </StudentToneProvider>
      </ScreenEnterProvider>
    );
  }

  return (
    <ScreenEnterProvider motion="holidays">
      <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
        <MainHeaderComponent
          title={Strings.holidays}
          notificationCount={1}
          navyBack
        />

        <View style={styles.parentChildWrap}>
          <AnimatedCard
            index={1}
            entering={ACADEMICS_PROFILE_ENTERING}
            style={styles.childCard}>
            <ParentChildCard
              child={parentChild}
              chevron={parentCanSwitch ? 'chevron-down' : undefined}
              accented
              solid
              prominent
              showWave
              waveVariant={SCREEN_WAVES.academics}
              onPress={parentCanSwitch ? () => setSwitchVisible(true) : undefined}
            />
          </AnimatedCard>
        </View>

        <ScrollEnterScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled">
          <ProfileSectionTitle animationIndex={2}>
            {Strings.upcomingHolidays}
          </ProfileSectionTitle>
          {holidayList}
        </ScrollEnterScrollView>

        {parentCanSwitch ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={children}
            selectedId={String(activeChildId || '')}
            onSelect={nextId => {
              if (String(nextId) !== String(activeChildId)) {
                dispatch(fetchChildDashboard(nextId));
              }
            }}
            onClose={() => setSwitchVisible(false)}
          />
        ) : null}
      </SafeAreaView>
      </StudentToneProvider>
    </ScreenEnterProvider>
  );
};

export default Holidays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
    overflow: 'visible',
  },
  parentChildWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    zIndex: 20,
    elevation: 20,
  },
  dropdownWrap: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(0.4),
    zIndex: 30,
    elevation: 30,
  },
  childCard: {
    marginBottom: hp(1),
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.4),
    paddingBottom: hp(3),
  },
  cardInner: {
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.25)',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.7),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
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
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  date: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.45),
  },
  day: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  duration: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.8),
  },
  loader: {
    marginTop: hp(6),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.medium,
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
  sectionIcy: {
    color: Colors.brandNavy,
    marginTop: hp(0.4),
  },
  wrapIcy: {
    marginBottom: hp(1.2),
    overflow: 'visible',
  },
  clipIcy: {
    borderRadius: radius.banner,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    backgroundColor: Colors.bannerIceStart,
    ...elevation.card,
  },
  fillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  waveIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  cardInnerIcy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.6),
    paddingVertical: hp(1.5),
  },
  icyMain: {
    flex: 1,
    minWidth: 0,
    paddingRight: wp(2),
  },
  icyAccent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  dateIcy: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.45),
  },
  dayIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  durationIcy: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.7),
  },
  badgeIcy: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.35),
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
    marginBottom: hp(0.6),
  },
  badgeTextIcy: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
});
