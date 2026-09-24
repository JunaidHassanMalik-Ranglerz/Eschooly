import React, {useCallback, useMemo, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
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
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const OnlineClass = () => {
  const {onlineClasses, liveClass} = useRoleData();
  const [tab, setTab] = useState('live');
  const [tabReplay, setTabReplay] = useState(0);

  const showLive = tab === 'live';
  const showUpcoming = tab === 'live' || tab === 'upcoming';
  const showEnded = tab === 'live' || tab === 'ended';

  const upcoming = onlineClasses.upcoming || [];
  const recordings = onlineClasses.recordings || [];

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

  const slots = useMemo(() => {
    let cursor = 2;
    const liveSlot = showLive ? cursor++ : null;
    const upcomingHeaderSlot = showUpcoming ? cursor++ : null;
    const upcomingListStart = showUpcoming ? cursor : null;
    if (showUpcoming) {
      cursor += upcoming.length;
    }
    const recordingHeaderSlot = showEnded ? cursor++ : null;
    const recordingListStart = showEnded ? cursor : null;
    if (showEnded) {
      cursor += recordings.length;
    }
    const bannerSlot = showLive ? cursor : null;
    return {
      liveSlot,
      upcomingHeaderSlot,
      upcomingListStart,
      recordingHeaderSlot,
      recordingListStart,
      bannerSlot,
    };
  }, [showLive, showUpcoming, showEnded, upcoming.length, recordings.length]);

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
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          style={styles.tabBarCard}>
          <ClassTabBar tabs={CLASS_TABS} selected={tab} onSelect={selectTab} />
        </AnimatedCard>

        {showLive ? (
          <LiveClassCard
            item={liveClass || onlineClasses.live}
            animationIndex={slots.liveSlot}
            entering={getHomeScreenEnter(slots.liveSlot)}
            replayToken={tabReplay}
          />
        ) : null}

        {showUpcoming ? (
          <>
            <AnimatedCard
              index={slots.upcomingHeaderSlot}
              entering={getHomeScreenEnter(slots.upcomingHeaderSlot)}
              replayToken={tabReplay}
              style={styles.sectionEnter}>
              <ClassSectionHeader title={Strings.upcomingSessions} />
            </AnimatedCard>
            {upcoming.map((item, index) => {
              const slot = slots.upcomingListStart + index;
              return (
                <UpcomingClassCard
                  key={item.id}
                  item={item}
                  animationIndex={slot}
                  gradientIndex={0}
                  entering={getHomeScreenEnter(slot)}
                  replayToken={tabReplay}
                />
              );
            })}
          </>
        ) : null}

        {showEnded ? (
          <>
            <AnimatedCard
              index={slots.recordingHeaderSlot}
              entering={getHomeScreenEnter(slots.recordingHeaderSlot)}
              replayToken={tabReplay}
              style={styles.sectionEnter}>
              <ClassSectionHeader title={Strings.recentRecordings} />
            </AnimatedCard>
            {recordings.map((item, index) => {
              const slot = slots.recordingListStart + index;
              return (
                <RecordingClassCard
                  key={item.id}
                  item={item}
                  animationIndex={slot}
                  gradientIndex={0}
                  entering={getHomeScreenEnter(slot)}
                  replayToken={tabReplay}
                />
              );
            })}
          </>
        ) : null}

        {showLive ? (
          <AnimatedCard
            index={slots.bannerSlot}
            entering={getHomeScreenEnter(slots.bannerSlot)}
            replayToken={tabReplay}
            style={styles.bannerWrap}>
            <ZoomInfoBanner />
          </AnimatedCard>
        ) : null}
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
});
