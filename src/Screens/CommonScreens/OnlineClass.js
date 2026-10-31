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
import ClassTabBar from '../../Component/OnlineClass/ClassTabBar';
import LiveClassCard from '../../Component/OnlineClass/LiveClassCard';
import ClassSectionHeader from '../../Component/OnlineClass/ClassSectionHeader';
import UpcomingClassCard from '../../Component/OnlineClass/UpcomingClassCard';
import RecordingClassCard from '../../Component/OnlineClass/RecordingClassCard';
import ZoomInfoBanner from '../../Component/OnlineClass/ZoomInfoBanner';
import AnimatedCard from '../../Component/AnimatedCard';
import {CLASS_TABS} from '../../Constants/OnlineClassData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {
  downloadStudentOnlineClassSession,
  fetchStudentOnlineClassRecording,
  fetchStudentOnlineClasses,
  joinStudentOnlineClassSession,
  remindStudentOnlineClassSession,
} from '../../store/slices/studentHomeSlice';

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
  const dummy = useRoleData();
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
  const requestRef = useRef(0);

  const showLive = tab === 'live';
  const showUpcoming = tab === 'live' || tab === 'upcoming';
  const showEnded = tab === 'live' || tab === 'ended';

  const liveClasses = isParent
    ? dummy.liveClass || dummy.onlineClasses?.live
      ? [dummy.liveClass || dummy.onlineClasses.live]
      : []
    : live;
  const upcomingClasses = isParent
    ? dummy.onlineClasses?.upcoming || []
    : upcoming;
  const endedClasses = isParent
    ? dummy.onlineClasses?.recordings || []
    : ended;
  const recordings = isParent
    ? endedClasses
    : endedClasses.filter(item => item.hasRecording);
  const endedForTab = tab === 'ended' ? endedClasses : recordings;
  const tabs = CLASS_TABS.map(item =>
    item.id === 'live' ? {...item, showDot: liveClasses.length > 0} : item,
  );
  const showZoomBanner =
    showLive && (isParent || liveClasses.some(item => item.isZoom));

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
          setLive(payload.live || []);
          setUpcoming(payload.upcoming || []);
          setEnded(payload.ended || []);
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
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load online classes.',
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
    dispatch(joinStudentOnlineClassSession(item.id))
      .unwrap()
      .then(payload => openExternalUrl(payload?.meetingUrl || item.meetingUrl))
      .catch(error => {
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
    dispatch(remindStudentOnlineClassSession({onlineClassId: item.id}))
      .unwrap()
      .then(payload => {
        const minutes = payload?.minutesBefore || 15;
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
    dispatch(fetchStudentOnlineClassRecording(item.id))
      .unwrap()
      .then(payload => {
        if (!payload?.recordingUrl) {
          throw new Error(Strings.recordingUnavailable);
        }
        return openExternalUrl(payload.recordingUrl);
      })
      .catch(error => {
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
    dispatch(
      downloadStudentOnlineClassSession({
        onlineClassId: item.id,
        title: item.title,
      }),
    )
      .unwrap()
      .then(() => {
        showToast({type: 'success', text1: Strings.recordingDownloadSuccess});
      })
      .catch(error => {
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
      cursor += Math.max(upcomingClasses.length, 1);
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
    upcomingClasses.length,
    endedForTab.length,
  ]);

  const hideUpcomingSection =
    !isParent && showLive && upcomingClasses.length === 0;
  const hideEndedSection = !isParent && showLive && recordings.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={Strings.onlineClass}
        notificationCount={1}
        navyBack
      />

      <ScrollEnterScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={!isParent}
        overScrollMode={isParent ? 'never' : 'auto'}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          isParent ? undefined : (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadClasses(true)}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          )
        }>
        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          style={styles.tabBarCard}>
          <ClassTabBar tabs={tabs} selected={tab} onSelect={selectTab} />
        </AnimatedCard>

        {loading && !isParent ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.primary}
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
              <Text style={styles.emptyInline}>{Strings.noLiveClasses}</Text>
            ) : null}

            {showUpcoming && !hideUpcomingSection ? (
              <>
                <AnimatedCard
                  index={slots.upcomingHeaderSlot}
                  entering={getHomeScreenEnter(slots.upcomingHeaderSlot)}
                  replayToken={tabReplay}
                  style={styles.sectionEnter}>
                  <ClassSectionHeader title={Strings.upcomingSessions} />
                </AnimatedCard>
                {upcomingClasses.length ? (
                  upcomingClasses.map((item, index) => {
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
                  <Text style={styles.emptyInline}>
                    {Strings.noUpcomingClasses}
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
                  <ClassSectionHeader title={Strings.recentRecordings} />
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
                        onWatch={isParent ? undefined : handleWatch}
                        onDownload={isParent ? undefined : handleDownload}
                      />
                    );
                  })
                ) : (
                  <Text style={styles.emptyInline}>
                    {tab === 'ended'
                      ? Strings.noEndedClasses
                      : Strings.noRecordings}
                  </Text>
                )}
              </>
            ) : null}

            {showZoomBanner ? (
              <AnimatedCard
                index={slots.bannerSlot}
                entering={getHomeScreenEnter(slots.bannerSlot)}
                replayToken={tabReplay}
                style={styles.bannerWrap}>
                <ZoomInfoBanner />
              </AnimatedCard>
            ) : null}
          </>
        )}
      </ScrollEnterScrollView>
    </SafeAreaView>
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
});
