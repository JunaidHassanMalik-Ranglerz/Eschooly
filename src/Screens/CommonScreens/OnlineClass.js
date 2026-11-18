import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import AssignmentStudentHeader from '../../Component/Assignment/AssignmentStudentHeader';
import ClassTabBar from '../../Component/OnlineClass/ClassTabBar';
import OnlineClassHero from '../../Component/OnlineClass/OnlineClassHero';
import LiveClassCard from '../../Component/OnlineClass/LiveClassCard';
import ClassSectionHeader from '../../Component/OnlineClass/ClassSectionHeader';
import UpcomingClassCard from '../../Component/OnlineClass/UpcomingClassCard';
import RecordingClassCard from '../../Component/OnlineClass/RecordingClassCard';
import ZoomInfoBanner from '../../Component/OnlineClass/ZoomInfoBanner';
import AnimatedCard from '../../Component/AnimatedCard';
import EschoolyScreenShell from '../../Component/Glass/EschoolyScreenShell';
import {CLASS_TABS} from '../../Constants/OnlineClassData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {sortOnlineClassesNearestFirst} from '../../services/studentService';
import {API_BASE_URL} from '../../api/axiosInstance';
import {
  downloadStudentOnlineClassSession,
  fetchStudentOnlineClassRecording,
  fetchStudentOnlineClasses,
  joinStudentOnlineClassSession,
  remindStudentOnlineClassSession,
} from '../../store/slices/studentHomeSlice';

const LIVE_PREVIEW_COUNT = 2;
const EMPTY_BUCKET_ERRORS = {live: null, upcoming: null, ended: null};
const ONLINE_CLASS_API = `${API_BASE_URL}/student/online-classes`;

const logOnlineClassApi = (method, endpoint, result) => {
  console.log('[OnlineClass API]', method, endpoint);
  console.log('[OnlineClass API] result', result);
};

const openExternalUrl = async url => {
  if (!url) {
    throw new Error(Strings.joinClassFailed);
  }
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    throw new Error(Strings.joinClassFailed);
  }
  await Linking.openURL(url);
};

const OnlineClass = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const isParent = role === 'parent';
  const icy = true;
  const bottomPad = useStackBottomPad();
  const dummy = useRoleData();
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const homeStudent = useSelector(state => state.studentHome.student);
  const [tab, setTab] = useState('live');
  const [tabReplay, setTabReplay] = useState(0);
  const [live, setLive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [ended, setEnded] = useState([]);
  const [loading, setLoading] = useState(!isParent);
  const [refreshing, setRefreshing] = useState(false);
  const [joiningId, setJoiningId] = useState(null);
  const [remindingId, setRemindingId] = useState(null);
  const [watchingId, setWatchingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [bucketErrors, setBucketErrors] = useState(EMPTY_BUCKET_ERRORS);
  const requestRef = useRef(0);

  const showLive = tab === 'live';
  const showUpcoming = tab === 'live' || tab === 'upcoming';
  const showEnded = tab === 'live' || tab === 'ended';

  const liveClasses = useMemo(() => {
    if (!isParent) {
      return live;
    }
    const row = dummy.liveClass || dummy.onlineClasses?.live;
    return row ? [row] : [];
  }, [isParent, live, dummy.liveClass, dummy.onlineClasses]);

  const upcomingClasses = useMemo(() => {
    const source = isParent ? dummy.onlineClasses?.upcoming || [] : upcoming;
    if (isParent) {
      return source;
    }
    const liveIds = new Set(live.map(item => String(item?.id)).filter(Boolean));
    return sortOnlineClassesNearestFirst(source).filter(
      item => !liveIds.has(String(item?.id)),
    );
  }, [isParent, dummy.onlineClasses, upcoming, live]);
  const upcomingForTab =
    tab === 'upcoming' || isParent
      ? upcomingClasses
      : upcomingClasses.slice(0, LIVE_PREVIEW_COUNT);
  const showUpcomingSeeAll =
    icy && tab === 'live' && upcomingClasses.length > LIVE_PREVIEW_COUNT;

  const endedClasses = isParent
    ? dummy.onlineClasses?.recordings || []
    : ended;
  const recordings = isParent
    ? endedClasses
    : endedClasses.filter(item => item.hasRecording);
  const endedForTab =
    tab === 'ended' || isParent
      ? endedClasses
      : recordings.slice(0, LIVE_PREVIEW_COUNT);
  const showEndedSeeAll =
    icy && tab === 'live' && recordings.length > LIVE_PREVIEW_COUNT;
  const tabs = CLASS_TABS.map(item =>
    item.id === 'live' ? {...item, showDot: liveClasses.length > 0} : item,
  );
  const showZoomBanner =
    showLive && (isParent || liveClasses.some(item => item.isZoom));
  const liveError = icy ? bucketErrors.live : null;
  const upcomingError = icy ? bucketErrors.upcoming : null;
  const endedError = icy ? bucketErrors.ended : null;

  const selectTab = useCallback(
    nextTab => {
      if (nextTab === tab) {
        return;
      }
      setTab(nextTab);
      setTabReplay(value => value + 1);
    },
    [tab],
  );

  const loadClasses = useCallback(
    (isRefresh = false) => {
      if (isParent) {
        return undefined;
      }
      logOnlineClassApi('GET', `${ONLINE_CLASS_API}?status=live`, 'requesting...');
      logOnlineClassApi(
        'GET',
        `${ONLINE_CLASS_API}?status=upcoming`,
        'requesting...',
      );
      logOnlineClassApi('GET', `${ONLINE_CLASS_API}?status=ended`, 'requesting...');
      const requestId = requestRef.current + 1;
      requestRef.current = requestId;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      dispatch(fetchStudentOnlineClasses())
        .unwrap()
        .then(payload => {
          if (requestRef.current !== requestId) {
            return;
          }
          const errors = payload.errors || EMPTY_BUCKET_ERRORS;
          logOnlineClassApi('GET', `${ONLINE_CLASS_API}?status=live`, {
            items: payload.live,
            error: errors.live,
          });
          logOnlineClassApi('GET', `${ONLINE_CLASS_API}?status=upcoming`, {
            items: payload.upcoming,
            error: errors.upcoming,
          });
          logOnlineClassApi('GET', `${ONLINE_CLASS_API}?status=ended`, {
            items: payload.ended,
            error: errors.ended,
          });
          if (!errors.live) {
            setLive(payload.live || []);
          } else if (!isRefresh) {
            setLive(payload.live || []);
          }
          if (!errors.upcoming) {
            setUpcoming(payload.upcoming || []);
          } else if (!isRefresh) {
            setUpcoming(payload.upcoming || []);
          }
          if (!errors.ended) {
            setEnded(payload.ended || []);
          } else if (!isRefresh) {
            setEnded(payload.ended || []);
          }
          setBucketErrors({
            live: errors.live?.message || null,
            upcoming: errors.upcoming?.message || null,
            ended: errors.ended?.message || null,
          });
          const firstError =
            errors.live?.message ||
            errors.upcoming?.message ||
            errors.ended?.message;
          if (firstError) {
            showToast({type: 'error', text1: firstError});
          }
        })
        .catch(error => {
          if (requestRef.current !== requestId) {
            return;
          }
          if (!isRefresh) {
            setLive([]);
            setUpcoming([]);
            setEnded([]);
          }
          const message = error?.message || 'Unable to load online classes.';
          logOnlineClassApi(
            'GET',
            `${ONLINE_CLASS_API}?status=live|upcoming|ended`,
            {error: message},
          );
          setBucketErrors({
            live: message,
            upcoming: message,
            ended: message,
          });
          showToast({
            type: 'error',
            text1: message,
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
    [dispatch, isParent],
  );

  useFocusEffect(
    useCallback(() => {
      return loadClasses(false);
    }, [loadClasses]),
  );

  const handleJoin = item => {
    if (isParent || !item?.id || joiningId) {
      return;
    }
    setJoiningId(item.id);
    const joinEndpoint = `${ONLINE_CLASS_API}/${item.id}/join`;
    const detailEndpoint = `${ONLINE_CLASS_API}/${item.id}`;
    logOnlineClassApi('POST', joinEndpoint, {onlineClassId: item.id});
    dispatch(joinStudentOnlineClassSession(item.id))
      .unwrap()
      .then(payload => {
        logOnlineClassApi('POST', joinEndpoint, payload);
        logOnlineClassApi(
          'GET',
          detailEndpoint,
          'used only if join response had no meetingUrl',
        );
        const meetingUrl = payload?.meetingUrl;
        if (!meetingUrl) {
          throw new Error(Strings.joinClassFailed);
        }
        return openExternalUrl(meetingUrl);
      })
      .catch(error => {
        logOnlineClassApi('POST', joinEndpoint, {
          error: error?.message || error,
        });
        showToast({
          type: 'error',
          text1: error?.message || Strings.joinClassFailed,
        });
      })
      .finally(() => setJoiningId(null));
  };

  const handleReminder = item => {
    if (isParent || !item?.id || remindingId || item.reminderSet) {
      return;
    }
    setRemindingId(item.id);
    const reminderEndpoint = `${ONLINE_CLASS_API}/${item.id}/reminder`;
    logOnlineClassApi('POST', reminderEndpoint, {onlineClassId: item.id});
    dispatch(remindStudentOnlineClassSession({onlineClassId: item.id}))
      .unwrap()
      .then(payload => {
        logOnlineClassApi('POST', reminderEndpoint, payload);
        const minutes = payload?.minutesBefore;
        const mark = row =>
          row.id === item.id
            ? {...row, reminderSet: true, reminderMinutes: minutes}
            : row;
        setUpcoming(current => current.map(mark));
        setLive(current => current.map(mark));
        setEnded(current => current.map(mark));
        showToast({type: 'success', text1: Strings.reminderSaved});
      })
      .catch(error => {
        logOnlineClassApi('POST', reminderEndpoint, {
          error: error?.message || error,
        });
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to set reminder.',
        });
      })
      .finally(() => setRemindingId(null));
  };

  const handleWatch = item => {
    if (isParent || !item?.id || watchingId) {
      return;
    }
    setWatchingId(item.id);
    const recordingEndpoint = `${ONLINE_CLASS_API}/${item.id}/recording`;
    logOnlineClassApi('GET', recordingEndpoint, {onlineClassId: item.id});
    dispatch(fetchStudentOnlineClassRecording(item.id))
      .unwrap()
      .then(payload => {
        logOnlineClassApi('GET', recordingEndpoint, payload);
        if (!payload?.recordingUrl) {
          throw new Error(Strings.recordingUnavailable);
        }
        return openExternalUrl(payload.recordingUrl);
      })
      .catch(error => {
        logOnlineClassApi('GET', recordingEndpoint, {
          error: error?.message || error,
        });
        showToast({
          type: 'error',
          text1: error?.message || Strings.recordingUnavailable,
        });
      })
      .finally(() => setWatchingId(null));
  };

  const handleDownload = item => {
    if (isParent || !item?.id || downloadingId) {
      return;
    }
    setDownloadingId(item.id);
    const downloadEndpoint = `${ONLINE_CLASS_API}/${item.id}/recording/download`;
    logOnlineClassApi('GET', downloadEndpoint, {onlineClassId: item.id});
    dispatch(
      downloadStudentOnlineClassSession({
        onlineClassId: item.id,
        title: item.title,
      }),
    )
      .unwrap()
      .then(payload => {
        logOnlineClassApi('GET', downloadEndpoint, payload);
        showToast({type: 'success', text1: Strings.recordingDownloadSuccess});
      })
      .catch(error => {
        logOnlineClassApi('GET', downloadEndpoint, {
          error: error?.message || error,
        });
        showToast({
          type: 'error',
          text1: error?.message || Strings.recordingDownloadFailed,
        });
      })
      .finally(() => setDownloadingId(null));
  };

  const slots = useMemo(() => {
    let cursor = 2;
    const liveCount = showLive ? Math.max(liveClasses.length, 1) : 0;
    const liveSlot = showLive ? cursor : null;
    if (showLive) {
      cursor += liveCount;
    }
    const upcomingHeaderSlot = showUpcoming ? cursor++ : null;
    const upcomingListStart = showUpcoming ? cursor : null;
    if (showUpcoming) {
      cursor += Math.max(upcomingForTab.length, 1);
    }
    const recordingHeaderSlot = showEnded ? cursor++ : null;
    const recordingListStart = showEnded ? cursor : null;
    if (showEnded) {
      cursor += Math.max(endedForTab.length, 1);
    }
    const bannerSlot = showZoomBanner ? cursor : null;
    return {
      liveSlot,
      upcomingHeaderSlot,
      upcomingListStart,
      recordingHeaderSlot,
      recordingListStart,
      bannerSlot,
    };
  }, [
    showLive,
    showUpcoming,
    showEnded,
    showZoomBanner,
    liveClasses.length,
    upcomingForTab.length,
    endedForTab.length,
  ]);

  const hideUpcomingSection =
    !isParent &&
    showLive &&
    upcomingClasses.length === 0 &&
    !upcomingError;
  const hideEndedSection =
    !isParent && showLive && recordings.length === 0 && !endedError;

  const classLists = loading && !isParent ? (
    <ActivityIndicator
      style={styles.loader}
      size="large"
      color={icy ? Colors.brandRoyal : Colors.primary}
    />
  ) : (
    <>
      {showLive
        ? liveClasses.map((item, index) => (
            <LiveClassCard
              key={item.id || `live-${index}`}
              item={item}
              animationIndex={slots.liveSlot + index}
              entering={getHomeScreenEnter(slots.liveSlot + index)}
              replayToken={tabReplay}
              joining={joiningId === item.id}
              onJoin={isParent ? undefined : handleJoin}
            />
          ))
        : null}

      {showLive && !liveClasses.length && !isParent ? (
        <Text style={[styles.emptyInline, icy && styles.emptyIcy]}>
          {liveError || Strings.noLiveClasses}
        </Text>
      ) : null}

      {showUpcoming && !hideUpcomingSection ? (
        <>
          <AnimatedCard
            index={slots.upcomingHeaderSlot}
            entering={getHomeScreenEnter(slots.upcomingHeaderSlot)}
            replayToken={tabReplay}
            style={styles.sectionEnter}>
            <ClassSectionHeader
              title={Strings.upcomingSessions}
              linkText={showUpcomingSeeAll ? Strings.seeAll : undefined}
              onPress={showUpcomingSeeAll ? () => selectTab('upcoming') : undefined}
            />
          </AnimatedCard>
          {upcomingForTab.length ? (
            upcomingForTab.map((item, index) => {
              const slot = slots.upcomingListStart + index;
              return (
                <UpcomingClassCard
                  key={item.id}
                  item={item}
                  animationIndex={slot}
                  gradientIndex={0}
                  entering={getHomeScreenEnter(slot)}
                  replayToken={tabReplay}
                  reminding={remindingId === item.id}
                  onReminder={isParent ? undefined : handleReminder}
                />
              );
            })
          ) : (
            <Text style={[styles.emptyInline, icy && styles.emptyIcy]}>
              {upcomingError || Strings.noUpcomingClasses}
            </Text>
          )}
        </>
      ) : null}

      {showEnded && !hideEndedSection ? (
        <>
          <AnimatedCard
            index={slots.recordingHeaderSlot}
            entering={getHomeScreenEnter(slots.recordingHeaderSlot)}
            replayToken={tabReplay}
            style={styles.sectionEnter}>
            <ClassSectionHeader
              title={Strings.recentRecordings}
              linkText={showEndedSeeAll ? Strings.seeAll : undefined}
              onPress={showEndedSeeAll ? () => selectTab('ended') : undefined}
            />
          </AnimatedCard>
          {endedForTab.length ? (
            endedForTab.map((item, index) => {
              const slot = slots.recordingListStart + index;
              return (
                <RecordingClassCard
                  key={item.id}
                  item={item}
                  animationIndex={slot}
                  gradientIndex={0}
                  entering={getHomeScreenEnter(slot)}
                  replayToken={tabReplay}
                  watching={watchingId === item.id}
                  downloading={downloadingId === item.id}
                  onWatch={
                    isParent || item.canWatch === false ? undefined : handleWatch
                  }
                  onDownload={
                    isParent || item.canDownload === false
                      ? undefined
                      : handleDownload
                  }
                />
              );
            })
          ) : (
            <Text style={[styles.emptyInline, icy && styles.emptyIcy]}>
              {endedError ||
                (tab === 'ended' ? Strings.noEndedClasses : Strings.noRecordings)}
            </Text>
          )}
        </>
      ) : null}

      {showZoomBanner ? (
        <AnimatedCard
          index={slots.bannerSlot}
          entering={getHomeScreenEnter(slots.bannerSlot)}
          replayToken={tabReplay}
          style={icy ? styles.bannerWrapIcy : styles.bannerWrap}>
          <ZoomInfoBanner />
        </AnimatedCard>
      ) : null}
    </>
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
            bounces
            overScrollMode="auto"
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              isParent ? undefined : (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => loadClasses(true)}
                  tintColor={Colors.brandRoyal}
                  colors={[Colors.brandRoyal]}
                />
              )
            }>
            <EschoolyScreenShell.Header>
              <AssignmentStudentHeader
                student={isParent ? dummy.activeStudent : homeStudent}
                unreadCount={unreadNotifications}
                roleLabel={isParent ? Strings.child : undefined}
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body>
              <OnlineClassHero
                tabs={tabs}
                selected={tab}
                onSelect={selectTab}
                entering={getHomeScreenEnter(1)}
                replayToken={tabReplay}
              />
              {classLists}
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
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
        title={Strings.onlineClass}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, {paddingBottom: bottomPad}]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          style={styles.tabBarCard}>
          <ClassTabBar tabs={tabs} selected={tab} onSelect={selectTab} />
        </AnimatedCard>
        {classLists}
      </ScrollEnterScrollView>
    </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(OnlineClass, 'onlineClass');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
    flexGrow: 1,
  },
  tabBarCard: {
    borderRadius: wp(5),
    overflow: 'hidden',
    marginBottom: hp(0.4),
  },
  sectionEnter: {
    overflow: 'visible',
  },
  bannerWrap: {
    borderRadius: wp(5),
    overflow: 'hidden',
  },
  loader: {
    marginTop: hp(6),
  },
  emptyInline: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginVertical: hp(1.2),
  },
  emptyIcy: {
    color: Colors.textSecondary,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  bannerWrapIcy: {
    overflow: 'visible',
    marginTop: hp(0.4),
  },
});
