import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnnouncementCard from '../../Component/AnnouncementCard';
import AnnouncementStudentCard from '../../Component/Announcement/AnnouncementStudentCard';
import AnnouncementStudentHeader from '../../Component/Announcement/AnnouncementStudentHeader';
import AnimatedCard from '../../Component/AnimatedCard';
import AttendanceStudentDropdown from '../../Component/AttendanceStudentDropdown';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import EschoolyScreenShell, {
  NAVY_ICE_SEARCH_GAP,
} from '../../Component/Glass/EschoolyScreenShell';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/toast';
import {fetchChildAnnouncements, fetchParentHome} from '../../store/slices/parentHomeSlice';
import {fetchStudentAnnouncement, fetchStudentAnnouncements} from '../../store/slices/studentHomeSlice';

const IDENTITY_TUCK = hp(1.8);

const escapeRegExp = value =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const classIncludesSection = (className, section) => {
  const cls = String(className || '').trim();
  const sec = String(section || '').trim();
  if (!cls || !sec) {
    return false;
  }
  const trailingToken = new RegExp(`(?:^|[\\s\\-_./])${escapeRegExp(sec)}$`, 'i');
  if (trailingToken.test(cls)) {
    return true;
  }
  const compact = cls.replace(/\s+/g, '').toLowerCase();
  const compactSec = sec.replace(/\s+/g, '').toLowerCase();
  return compact.endsWith(compactSec) && compact.length > compactSec.length;
};

const formatStudentClassLabel = student => {
  const className = String(
    student?.classLabel || student?.className || student?.classInfo || '',
  ).trim();
  const section = String(student?.sectionName || '').trim();
  if (!className) {
    return section;
  }
  if (!section || classIncludesSection(className, section)) {
    return className;
  }
  return `${className} ${section}`;
};

const AnnouncementsScreen = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const {
    isParent,
    activeStudent,
    childList,
    selectedChildId,
    setSelectedChildId,
    canSwitchChild,
    studentLabel,
  } = useRoleData();
  const icy = true;
  const bottomPad = useStackBottomPad();
  const {selectedChildId: homeChildId, children} = useSelector(state => state.parentHome);
  const homeStudent = useSelector(state => state.studentHome.student);
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const [pickedChildId, setPickedChildId] = useState(null);
  const [parentAnnouncements, setParentAnnouncements] = useState([]);
  const [studentAnnouncements, setStudentAnnouncements] = useState([]);
  const [detailById, setDetailById] = useState({});
  const [openId, setOpenId] = useState(null);
  const [parentChildCard, setParentChildCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const [contentReplay, setContentReplay] = useState(0);
  const activeChildId = pickedChildId || homeChildId || children[0]?.value || null;
  const parentChild =
    parentChildCard?.label
      ? parentChildCard
      : children.find(item => item.value === String(activeChildId)) || null;
  const announcements = isParent ? parentAnnouncements : studentAnnouncements;
  const bannerChild = isParent
    ? parentChild
    : {
        label: homeStudent?.label || '',
        classInfo: homeStudent?.className || homeStudent?.classLabel || '',
        classLabel: homeStudent?.classLabel || homeStudent?.className || '',
        className: homeStudent?.className || '',
        photoUrl: homeStudent?.photoUrl || '',
        sectionName: homeStudent?.sectionName || '',
      };
  const studentIdentity = isParent
    ? bannerChild
    : {
        ...bannerChild,
        classInfo: formatStudentClassLabel(homeStudent) || bannerChild.classInfo,
        classLabel: formatStudentClassLabel(homeStudent) || bannerChild.classLabel,
      };
  const parentCanSwitch = children.length > 1;

  const childKey = String(isParent ? activeChildId : selectedChildId ?? activeStudent?.value ?? '');

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
    dispatch(fetchChildAnnouncements(activeChildId))
      .unwrap()
      .then(payload => {
        if (!active) {
          return;
        }
        setParentAnnouncements(payload.items || []);
        setParentChildCard(payload.child);
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentAnnouncements([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load announcements.',
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
    dispatch(fetchStudentAnnouncements())
      .unwrap()
      .then(items => {
        if (active) {
          setStudentAnnouncements(items);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setStudentAnnouncements([]);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load announcements.',
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

  const openAnnouncement = announcement => {
    if (isParent || !announcement?.id) {
      return;
    }
    if (openId === announcement.id) {
      setOpenId(null);
      return;
    }
    setOpenId(announcement.id);
    if (detailById[announcement.id]) {
      return;
    }
    dispatch(fetchStudentAnnouncement(announcement.id))
      .unwrap()
      .then(detail => {
        setDetailById(current => ({...current, [announcement.id]: detail}));
      })
      .catch(error => {
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load announcement.',
        });
      });
  };

  const handleSelectChild = useCallback(
    nextId => {
      const nextKey = String(nextId);
      if (nextKey === childKey) {
        return;
      }
      if (isParent) {
        setPickedChildId(nextKey);
      } else {
        setSelectedChildId(nextId);
      }
      scrollRef.current?.scrollTo?.({y: 0, animated: false});
      setContentReplay(value => value + 1);
    },
    [childKey, isParent, setSelectedChildId],
  );

  const switchModal =
    (isParent ? parentCanSwitch : canSwitchChild) ? (
      <ChildSwitchModal
        visible={switchVisible}
        childrenList={isParent ? children : childList}
        selectedId={isParent ? String(activeChildId || '') : selectedChildId}
        onSelect={handleSelectChild}
        onClose={() => setSwitchVisible(false)}
        replayToken={modalReplay}
      />
    ) : null;

  const announcementList = loading ? (
    <ActivityIndicator
      style={styles.loader}
      size="large"
      color={icy ? Colors.brandRoyal : Colors.primary}
    />
  ) : announcements.length === 0 ? (
    <Text style={[styles.empty, icy && styles.emptyStudent]}>
      {Strings.noAnnouncements}
    </Text>
  ) : (
    announcements.map((item, index) => {
      const slot = index + 2;
      const detail = !isParent ? detailById[item.id] : null;
      const shown = detail
        ? {
            ...item,
            ...detail,
            title: detail.title || item.title,
            message: detail.message || item.message,
            date: detail.date || item.date,
            time: detail.time || item.time,
            category: detail.category || item.category,
            targeting: detail.targeting || item.targeting,
          }
        : item;
      const Card = icy ? AnnouncementStudentCard : AnnouncementCard;
      return (
        <Card
          key={item.id}
          item={shown}
          expanded={!isParent && openId === item.id}
          onPress={isParent ? undefined : () => openAnnouncement(item)}
          animationIndex={slot}
          entering={getHomeScreenEnter(slot)}
          replayToken={contentReplay}
        />
      );
    })
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            ref={scrollRef}
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
              <AnnouncementStudentHeader unreadCount={unreadNotifications} />
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
                    student={studentIdentity}
                    premium
                    embedded
                    readOnly={!isParent || !parentCanSwitch}
                    look={isParent ? 'float' : 'flyer'}
                    label={studentLabel}
                    containerStyle={styles.identityTuck}
                    externalPicker={isParent && parentCanSwitch}
                    onPickerPress={
                      isParent && parentCanSwitch
                        ? () => {
                            setSwitchVisible(true);
                            setModalReplay(value => value + 1);
                          }
                        : undefined
                    }
                  />
                  {announcementList}
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
          title={Strings.announcements}
          notificationCount={1}
          navyBack
        />

        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          replayToken={contentReplay}
          style={styles.profileCard}>
          <SelectedChildBanner
            child={bannerChild}
            variant="large"
            disableEnterAnimation
            onSwitchPress={
              parentCanSwitch
                ? () => {
                    setSwitchVisible(true);
                    setModalReplay(value => value + 1);
                  }
                : undefined
            }
            canSwitch={parentCanSwitch}
          />
        </AnimatedCard>

        <ScrollEnterScrollView
          ref={scrollRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled">
          {announcementList}
        </ScrollEnterScrollView>

        {switchModal}
      </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(AnnouncementsScreen, 'announcements');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    paddingBottom: NAVY_ICE_SEARCH_GAP + IDENTITY_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -IDENTITY_TUCK,
    overflow: 'visible',
  },
  identityTuck: {
    zIndex: 2,
    marginBottom: hp(1.55),
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
  profileCard: {
    marginHorizontal: wp(4),
    marginBottom: hp(0.4),
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.4),
    paddingBottom: hp(3),
    flexGrow: 1,
    backgroundColor: Colors.parentBg,
  },
  loader: {
    marginTop: hp(6),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
  emptyStudent: {
    color: Colors.textSecondary,
  },
});
