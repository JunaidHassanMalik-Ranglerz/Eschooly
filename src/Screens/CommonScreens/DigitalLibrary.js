import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import LibraryProfileCard from '../../Component/DigitalLibrary/LibraryProfileCard';
import LibrarySearchBar from '../../Component/DigitalLibrary/LibrarySearchBar';
import LibraryCategoryFilter from '../../Component/DigitalLibrary/LibraryCategoryFilter';
import LibraryResourceCard from '../../Component/DigitalLibrary/LibraryResourceCard';
import LibraryStudentHeader from '../../Component/DigitalLibrary/LibraryStudentHeader';
import AnimatedCard from '../../Component/AnimatedCard';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {useRoleData} from '../../hooks/useRoleData';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {fetchChildDashboard, fetchChildLibrary, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentLibrary} from '../../store/slices/studentHomeSlice';
import {downloadStudentLibraryFile} from '../../services/studentService';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {
  LIBRARY_CATEGORIES,
  getFilteredResources,
} from '../../Constants/DigitalLibraryData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';

const EMPTY_LIBRARY_ITEMS = [];
const PREVIEW_COUNT = 4;

const DigitalLibrary = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isParent} = useRoleData();
  const icy = true;
  const bottomPad = useStackBottomPad();
  const {selectedChildId: homeChildId, children} = useSelector(
    state => state.parentHome,
  );
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [parentLibrary, setParentLibrary] = useState(null);
  const [studentItems, setStudentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);

  const activeChildId = homeChildId || children[0]?.value || null;
  const parentCanSwitch = isParent && children.length > 1;
  const parentChild =
    parentLibrary?.child?.label
      ? parentLibrary.child
      : children.find(item => item.value === String(activeChildId)) || null;
  const resources = isParent
    ? parentLibrary?.items || EMPTY_LIBRARY_ITEMS
    : studentItems;
  const profileStudent = isParent
    ? {...parentChild, status: parentChild?.status || 'Active'}
    : {
        label: homeStudent?.label || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        sectionName: homeStudent?.sectionName || '',
        photoUrl: homeStudent?.photoUrl || '',
        status: homeStudent?.status || (homeStudent?.label ? 'Active' : undefined),
      };

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
    dispatch(fetchChildLibrary(activeChildId))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentLibrary(payload);
        }
      })
      .catch(error => {
        console.log('error', error);
        if (!active) {
          return;
        }
        setParentLibrary(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load library.',
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
    const timer = setTimeout(() => {
      setLoading(true);
      dispatch(fetchStudentLibrary(search.trim()))
        .unwrap()
        .then(items => {
          if (active) {
            setStudentItems(items);
          }
        })
        .catch(error => {
          if (!active) {
            return;
          }
          setStudentItems([]);
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load library.',
          });
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
    }, search.trim() ? 350 : 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dispatch, isParent, search]);

  const categories = useMemo(() => {
    const known = new Set(LIBRARY_CATEGORIES.map(item => item.id));
    const extra = resources
      .map(item => item.category)
      .filter(id => id && id !== 'all' && !known.has(id))
      .filter((id, index, list) => list.indexOf(id) === index)
      .map(id => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      }));
    return [...LIBRARY_CATEGORIES, ...extra];
  }, [resources]);

  const books = isParent
    ? getFilteredResources(resources, search, category)
    : resources.filter(item => category === 'all' || item.category === category);

  useEffect(() => {
    setShowAll(false);
  }, [search, category]);

  const visibleBooks =
    showAll || books.length <= PREVIEW_COUNT
      ? books
      : books.slice(0, PREVIEW_COUNT);
  const canSeeAll = books.length > PREVIEW_COUNT && !showAll;

  const openStudentFile = async item => {
    if (!item?.id || downloadingId) {
      return;
    }
    setDownloadingId(item.id);
    try {
      const downloaded = await downloadStudentLibraryFile(
        item.id,
        item.title,
        item.pdfUrl,
      );
      if (downloaded.savedToDevice) {
        showToast({
          type: 'success',
          text1: Strings.libraryDownloadSuccess,
        });
      }
      navigation.navigate('PdfViewer', {
        pdfUrl: downloaded.uri,
        title: item.title,
      });
    } catch (error) {
      console.log('error', error?.message);
      if (error?.message === 'File already exists') {
        showToast({
          type: 'info',
          text1: 'File already exists',
        });
      } else {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to download this file.',
        });
      }
    } finally {
      setDownloadingId(null);
    }
  };

  const openSwitch = useCallback(() => {
    if (!parentCanSwitch) {
      return;
    }
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, [parentCanSwitch]);

  const handleSelectChild = useCallback(
    nextId => {
      if (!nextId || String(nextId) === String(activeChildId)) {
        return;
      }
      dispatch(fetchChildDashboard(nextId));
    },
    [activeChildId, dispatch],
  );

  const switchModal =
    parentCanSwitch ? (
      <ChildSwitchModal
        visible={switchVisible}
        childrenList={children}
        selectedId={String(activeChildId || '')}
        onSelect={handleSelectChild}
        onClose={() => setSwitchVisible(false)}
        replayToken={modalReplay}
      />
    ) : null;

  const handleDownload = item => {
    if (!isParent) {
      openStudentFile(item);
    }
  };

  const handleOpen = item => {
    if (!isParent) {
      openStudentFile(item);
      return;
    }

    if (item.pdfUrl) {
      navigation.navigate('PdfViewer', {
        pdfUrl: item.pdfUrl,
        title: item.title,
      });
    }
  };

  const grid = loading ? (
    <ActivityIndicator style={styles.loader} size="large" color={Colors.primary} />
  ) : (
    <View style={[styles.grid, icy && styles.gridStudent]}>
      {visibleBooks.map((item, index) => (
        <LibraryResourceCard
          key={item.id}
          item={item}
          onPress={handleOpen}
          onDownload={isParent ? undefined : handleDownload}
          downloading={downloadingId === item.id}
          animationIndex={index + 5}
        />
      ))}
    </View>
  );

  const empty =
    !loading && books.length === 0 ? (
      <Text style={[styles.emptyText, icy && styles.emptyTextStudent]}>
        {Strings.libraryNoResults}
      </Text>
    ) : null;

  const section = (
    <View style={[styles.sectionHeader, icy && styles.sectionHeaderStudent]}>
      <Text style={[styles.sectionTitle, icy && styles.sectionTitleStudent]}>
        {Strings.recentlyAdded}
      </Text>
      {canSeeAll ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowAll(true)}
          accessibilityRole="button"
          accessibilityLabel={Strings.seeAll}>
          <Text style={[styles.seeAll, icy && styles.seeAllStudent]}>
            {Strings.seeAll}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}>
            <EschoolyScreenShell.Header style={styles.libraryBand}>
              <LibraryStudentHeader
                unreadCount={unreadNotifications}
                subtitle={
                  isParent
                    ? Strings.librarySubtitleParent
                    : Strings.librarySubtitleStudent
                }
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.libraryBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  <LibraryProfileCard
                    student={profileStudent}
                    look="float"
                    canSwitch={parentCanSwitch}
                    onSwitchPress={parentCanSwitch ? openSwitch : undefined}
                  />
                  <LibrarySearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder={Strings.librarySearchPlaceholder}
                  />
                  <LibraryCategoryFilter
                    categories={categories}
                    selected={category}
                    onSelect={setCategory}
                  />
                  {section}
                  {grid}
                  {empty}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
          {switchModal}
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
        <MainHeaderComponent
          title={Strings.digitalLibrary}
          notificationCount={1}
          navyBack
        />
        <ScrollEnterScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, {paddingBottom: bottomPad}]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}>
          <LibraryProfileCard
            student={profileStudent}
            animationIndex={1}
            canSwitch={parentCanSwitch}
            onSwitchPress={parentCanSwitch ? openSwitch : undefined}
          />
          <LibrarySearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={Strings.librarySearchPlaceholder}
            animationIndex={2}
          />
          <AnimatedCard index={3} style={styles.filterWrap}>
            <LibraryCategoryFilter
              categories={categories}
              selected={category}
              onSelect={setCategory}
            />
          </AnimatedCard>
          <AnimatedCard index={4} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{Strings.recentlyAdded}</Text>
            {canSeeAll ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowAll(true)}
                accessibilityRole="button"
                accessibilityLabel={Strings.seeAll}>
                <Text style={styles.seeAll}>{Strings.seeAll}</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </AnimatedCard>
          {grid}
          {empty}
        </ScrollEnterScrollView>
        {switchModal}
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(DigitalLibrary, 'library');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scroll: {
    flex: 1,
    overflow: 'visible',
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  filterWrap: {
    marginBottom: hp(1),
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  sectionHeaderStudent: {
    marginTop: hp(0.55),
    marginBottom: hp(1.55),
    alignItems: 'baseline',
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  sectionTitleStudent: {
    color: Colors.textPrimary,
    fontSize: Fontsize.m,
  },
  seeAll: {
    color: Colors.linkBlue,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  seeAllStudent: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  gridStudent: {
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(4),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  libraryBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    borderBottomRightRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  libraryBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasForeground: {
    zIndex: 1,
  },
  loader: {
    marginVertical: hp(3),
  },
  emptyText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  emptyTextStudent: {
    color: Colors.textSecondary,
  },
});
