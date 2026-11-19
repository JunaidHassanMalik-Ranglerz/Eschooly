import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SyllabusFilter from '../../Component/SyllabusFilter';
import SyllabusStudentHeader from '../../Component/Syllabus/SyllabusStudentHeader';
import OverallProgressCard from '../../Component/OverallProgressCard';
import ChapterCard from '../../Component/ChapterCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import FeatureArtImage from '../../Component/Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation, radius, spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import {fetchChildSyllabus, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentSyllabus} from '../../store/slices/studentHomeSlice';

const STATS = [
  {
    key: 'total',
    icon: 'document-text-outline',
    colors: ['#3B82F6', '#2563EB'],
    label: Strings.totalSyllabi,
  },
  {
    key: 'published',
    icon: 'checkmark-circle-outline',
    colors: ['#22C55E', '#16A34A'],
    label: Strings.published,
  },
  {
    key: 'draft',
    icon: 'create-outline',
    colors: ['#F59E0B', '#EA580C'],
    label: Strings.inDraft,
  },
];

const STUDENT_STAT_ART = {
  total: EducationIcons.digitalLibrary,
  published: EducationIcons.assignments,
  draft: EducationIcons.exams,
};

const STAT_ART_SIZE = wp(8.4);
const STAT_TILE_SIZE = wp(10.4);

const PILL_ICONS = {
  total: 'school',
  published: 'checkmark-circle',
};

const StatCard = ({item, value, hint}) => (
  <LinearGradient colors={item.colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.statCard}>
    <View style={styles.statIcon}>
      <Icon name={item.icon} size={wp(4.6)} color={Colors.white} />
    </View>
    <View style={styles.statText}>
      <Text style={styles.statLabel} numberOfLines={1}>
        {item.label}
      </Text>
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.statHint} numberOfLines={1}>
        {hint}
      </Text>
    </View>
  </LinearGradient>
);

const statHintText = (label, hint) => {
  const hintText = String(hint || '').trim();
  if (!hintText || hintText.toLowerCase() === String(label || '').toLowerCase()) {
    return '';
  }
  return hintText;
};

const StudentMetric = ({item, value, hint, showDivider}) => {
  const support = statHintText(item.label, hint);
  const pillIcon = PILL_ICONS[item.key];
  const labelLines = item.key === 'total' ? 2 : 1;

  return (
    <View
      style={[styles.studentMetric, showDivider && styles.studentMetricDivider]}>
      <View style={styles.studentMetricTile}>
        <FeatureArtImage
          source={STUDENT_STAT_ART[item.key]}
          width={STAT_ART_SIZE}
          height={STAT_ART_SIZE}
        />
      </View>
      <View style={styles.studentMetricLabelSlot}>
        <Text
          style={styles.studentMetricLabel}
          numberOfLines={labelLines}
          textBreakStrategy="simple"
          maxFontSizeMultiplier={1.2}>
          {item.label}
        </Text>
      </View>
      <View style={styles.studentMetricValueSlot}>
        <Text
          style={styles.studentMetricValue}
          numberOfLines={1}
          maxFontSizeMultiplier={1.2}>
          {value}
        </Text>
      </View>
      <View style={styles.studentMetricPillSlot}>
        {support ? (
          <View style={styles.studentMetricPill}>
            {pillIcon ? (
              <Icon name={pillIcon} size={wp(2.8)} color={Colors.brandRoyal} />
            ) : null}
            <Text
              style={styles.studentMetricHint}
              numberOfLines={1}
              maxFontSizeMultiplier={1.15}>
              {support}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const StudentStatsPanel = ({items, values}) => (
  <View style={styles.studentMetricsRow}>
    {items.map((item, index) => (
      <StudentMetric
        key={item.key}
        item={item}
        value={values[item.key]?.value}
        hint={values[item.key]?.hint}
        showDivider={index > 0}
      />
    ))}
  </View>
);

const Syllabus = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isParent} = useRoleData();
  const icy = true;
  const bottomPad = useStackBottomPad();
  const {selectedChildId: homeChildId, children} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [pickedChildId, setPickedChildId] = useState(null);
  const [parentSyllabus, setParentSyllabus] = useState(null);
  const [studentSyllabus, setStudentSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const subjects = isParent ? parentSyllabus?.subjects || [] : studentSyllabus?.subjects || [];
  const activeChildId = pickedChildId || homeChildId || children[0]?.value || null;
  const parentChild =
    parentSyllabus?.child?.label
      ? parentSyllabus.child
      : children.find(item => item.value === String(activeChildId)) || null;
  const classLabel = isParent ? parentChild?.className || '' : homeStudent?.className || '';
  const [syllabus, setSyllabus] = useState(subjects[0]);
  const [openChapterId, setOpenChapterId] = useState(null);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const parentCanSwitch = children.length > 1;

  useEffect(() => {
    if (!isParent || homeChildId || children.length) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [children.length, dispatch, homeChildId, isParent]);

  useEffect(() => {
    if (!isParent || !activeChildId) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchChildSyllabus(activeChildId))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentSyllabus(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentSyllabus(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load syllabus.',
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
  }, [activeChildId, dispatch, isParent]);

  useEffect(() => {
    if (isParent) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchStudentSyllabus())
      .unwrap()
      .then(payload => {
        if (active) {
          setStudentSyllabus(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentSyllabus(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load syllabus.',
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

  useEffect(() => {
    const next = isParent ? parentSyllabus?.subjects || [] : studentSyllabus?.subjects || [];
    setSyllabus(next[0]);
    setOpenChapterId(null);
  }, [isParent, parentSyllabus, studentSyllabus]);

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const publishedCount = subjects.filter(item => item.status === 'published' || item.progress >= 0.5).length;
  const draftCount = subjects.filter(item => item.status === 'draft' || (item.progress > 0 && item.progress < 0.5)).length;
  const updateCount = subjects.filter(item => item.status === 'needs_update' || item.progress < 0.55).length;
  const apiStats = isParent ? parentSyllabus?.stats : studentSyllabus?.stats;
  const shownCount = (value, fallback) => value === undefined || value === null || value === '' ? fallback : value;
  const statValues = {
    total: {value: shownCount(apiStats?.total, subjects.length), hint: classLabel || Strings.thisClass},
    published: {value: shownCount(apiStats?.published, publishedCount), hint: syllabus?.percentText || ''},
    draft: {value: shownCount(apiStats?.draft, draftCount), hint: Strings.inDraft},
    update: {value: shownCount(apiStats?.update, updateCount), hint: Strings.needsUpdate},
  };

  const statsSection = icy ? (
    <View style={styles.statsPanel}>
      <View style={styles.statsClip}>
        <LinearGradient
          colors={[Colors.bannerIceStart, '#F8FBFF', '#DCEBFD']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.statsFace}>
          <CardWave
            variant={SCREEN_WAVES.assignmentIce}
            color="rgba(91, 156, 255, 0.14)"
          />
          <StudentStatsPanel items={STATS} values={statValues} />
        </LinearGradient>
      </View>
    </View>
  ) : (
    <View style={styles.statsGrid}>
      {STATS.map(item => (
        <StatCard
          key={item.key}
          item={item}
          value={statValues[item.key].value}
          hint={statValues[item.key].hint}
        />
      ))}
    </View>
  );

  const headerBody = (
    <>
      {isParent ? (
        <AnimatedCard index={1} entering={getHomeScreenEnter(1)} style={styles.childWrap}>
          <SelectedChildBanner
            child={parentChild}
            variant="large"
            icy
            disableEnterAnimation
            compactMargin
            canSwitch={parentCanSwitch}
            onSwitchPress={parentCanSwitch ? openSwitch : undefined}
          />
        </AnimatedCard>
      ) : null}

      {statsSection}

      <SyllabusFilter
        subjects={subjects}
        value={syllabus?.value}
        label={syllabus?.label}
        animationIndex={2}
        onChange={item => {
          setSyllabus(item);
          setOpenChapterId(null);
        }}
        className={classLabel}
      />

      <OverallProgressCard
        overview={syllabus}
        subjectLabel={syllabus?.label}
        animationIndex={3}
      />

      <Text style={[styles.sectionTitle, icy && styles.sectionTitleStudent]}>
        {Strings.syllabusUnits}
      </Text>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={icy ? Colors.brandRoyal : Colors.primary}
        />
      ) : null}
    </>
  );

  const list = (
    <ScrollEnterFlatList
      data={loading ? [] : syllabus?.chapters}
      keyExtractor={item => `${syllabus?.value}-${item.id}`}
      extraData={openChapterId}
      renderItem={({item, index}) => (
        <View style={icy ? styles.studentItem : null}>
          <ChapterCard
            chapter={item}
            subjectLabel={syllabus?.label}
            open={openChapterId === item.id}
            animationIndex={index + 5}
            onToggle={() =>
              setOpenChapterId(openChapterId === item.id ? null : item.id)
            }
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      removeClippedSubviews={false}
      contentContainerStyle={[
        icy ? styles.studentList : styles.content,
        {paddingBottom: bottomPad},
      ]}
      ListHeaderComponent={
        icy ? (
          <>
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <SyllabusStudentHeader
                unreadCount={unreadNotifications}
                subtitle={
                  isParent
                    ? Strings.syllabusSubtitleParent
                    : Strings.syllabusSubtitleStudent
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
                <View style={styles.canvasForeground}>{headerBody}</View>
              </View>
            </EschoolyScreenShell.Body>
          </>
        ) : (
          <View>{headerBody}</View>
        )
      }
    />
  );

  const switchModal =
    isParent && parentCanSwitch ? (
      <ChildSwitchModal
        visible={switchVisible}
        childrenList={children}
        selectedId={String(activeChildId || '')}
        onSelect={nextId => setPickedChildId(String(nextId))}
        onClose={() => setSwitchVisible(false)}
        replayToken={modalReplay}
      />
    ) : null;

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          {list}
          {switchModal}
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar
          backgroundColor={Colors.parentBg}
          barStyle="dark-content"
        />
        <MainHeaderComponent
          title={Strings.syllabus}
          showBack
          navyBack
          onBackPress={() => navigation.goBack()}
          notificationCount={1}
        />
        {list}
        {switchModal}
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(Syllabus, 'syllabus');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  studentList: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentItem: {
    paddingHorizontal: spacing.md,
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
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(42),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  childWrap: {
    marginBottom: hp(0.6),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(0.6),
  },
  statsPanel: {
    marginBottom: hp(1.35),
    borderRadius: radius.pill,
    backgroundColor: Colors.bannerIceStart,
    overflow: 'visible',
    zIndex: 2,
    ...elevation.card,
  },
  statsClip: {
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  statsFace: {
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.32)',
    paddingVertical: hp(1.55),
    paddingHorizontal: wp(3.2),
  },
  studentMetricsRow: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  studentMetric: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    paddingHorizontal: wp(1.4),
  },
  studentMetricDivider: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'rgba(19, 69, 163, 0.18)',
  },
  studentMetricTile: {
    width: STAT_TILE_SIZE,
    height: STAT_TILE_SIZE,
    borderRadius: wp(3.2),
    backgroundColor: 'rgba(220, 235, 253, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.7),
  },
  studentMetricLabelSlot: {
    width: '100%',
    minHeight: Fontsize.xs1 * 2.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: hp(0.25),
  },
  studentMetricLabel: {
    width: '100%',
    color: Colors.brandNavy,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.25,
    textAlign: 'center',
    includeFontPadding: false,
  },
  studentMetricValueSlot: {
    width: '100%',
    minHeight: Fontsize.ml + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentMetricValue: {
    width: '100%',
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    lineHeight: Fontsize.ml + 2,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
  },
  studentMetricPillSlot: {
    width: '100%',
    minHeight: hp(2.35),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.35),
  },
  studentMetricPill: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.hubCard,
    borderRadius: radius.pill,
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(0.28),
  },
  studentMetricHint: {
    flexShrink: 1,
    color: Colors.brandRoyal,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
    lineHeight: Fontsize.xs0 + 1,
    marginLeft: wp(0.8),
    includeFontPadding: false,
  },
  statCard: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.3),
    marginBottom: hp(1.2),
    minHeight: hp(8.5),
  },
  statIcon: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(2.4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginRight: wp(2),
  },
  statText: {
    flex: 1,
    minWidth: 0,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  statValue: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.1),
  },
  statHint: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.1),
  },
  loader: {
    marginVertical: hp(2),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.2),
  },
  sectionTitleStudent: {
    color: Colors.textPrimary,
    fontSize: Fontsize.m,
  },
});
