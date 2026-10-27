import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SyllabusFilter from '../../Component/SyllabusFilter';
import OverallProgressCard from '../../Component/OverallProgressCard';
import ChapterCard from '../../Component/ChapterCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
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

const Syllabus = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isParent} = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.syllabus}
        showBack
        navyBack
        onBackPress={() => navigation.goBack()}
        notificationCount={1}
      />

      <ScrollEnterFlatList
        data={loading ? [] : syllabus?.chapters}
        keyExtractor={item => `${syllabus?.value}-${item.id}`}
        extraData={openChapterId}
        renderItem={({item, index}) => (
          <ChapterCard
            chapter={item}
            subjectLabel={syllabus?.label}
            open={openChapterId === item.id}
            animationIndex={index + 5}
            onToggle={() =>
              setOpenChapterId(openChapterId === item.id ? null : item.id)
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {isParent ? (
              <AnimatedCard index={1} entering={getHomeScreenEnter(1)} style={styles.childWrap}>
                <SelectedChildBanner
                  child={parentChild}
                  variant="large"
                  waveVariant={SCREEN_WAVES.parentHome}
                  disableEnterAnimation
                  compactMargin
                  canSwitch={parentCanSwitch}
                  onSwitchPress={parentCanSwitch ? openSwitch : undefined}
                />
              </AnimatedCard>
            ) : null}

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

            <Text style={styles.sectionTitle}>{Strings.syllabusUnits}</Text>
            {loading ? (
              <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
            ) : null}
          </View>
        }
      />

      {isParent && parentCanSwitch ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={children}
          selectedId={String(activeChildId || '')}
          onSelect={nextId => setPickedChildId(String(nextId))}
          onClose={() => setSwitchVisible(false)}
          replayToken={modalReplay}
        />
      ) : null}
    </SafeAreaView>
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
  childWrap: {
    marginBottom: hp(0.6),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(0.6),
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
});
