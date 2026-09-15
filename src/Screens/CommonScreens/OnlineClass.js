import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ClassTabBar from '../../Component/OnlineClass/ClassTabBar';
import LiveClassCard from '../../Component/OnlineClass/LiveClassCard';
import ClassSectionHeader from '../../Component/OnlineClass/ClassSectionHeader';
import UpcomingClassCard from '../../Component/OnlineClass/UpcomingClassCard';
import RecordingClassCard from '../../Component/OnlineClass/RecordingClassCard';
import ZoomInfoBanner from '../../Component/OnlineClass/ZoomInfoBanner';
import {
  CLASS_TABS,
  LIVE_CLASS,
  UPCOMING_CLASSES,
  RECORDING_CLASSES,
} from '../../Constants/OnlineClassData';
import {Colors} from '../../Constants/Colors';
import {Strings} from '../../Constants/Strings';
import {MyStyling} from '../../Constants/MyStyling';
import {wp, hp} from '../../Constants/Responsive';

const OnlineClass = () => {
  const [tab, setTab] = useState('live');

  const showLive = tab === 'live';
  const showUpcoming = tab === 'live' || tab === 'upcoming';
  const showEnded = tab === 'live' || tab === 'ended';

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <MainHeaderComponent
        title={Strings.onlineClass}
        notificationCount={1}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ClassTabBar tabs={CLASS_TABS} selected={tab} onSelect={setTab} />

        {showLive ? <LiveClassCard item={LIVE_CLASS} /> : null}

        {showUpcoming ? (
          <>
            <ClassSectionHeader
              title={Strings.upcomingSessions}
              linkText={Strings.viewAll}
            />
            {UPCOMING_CLASSES.map(item => (
              <UpcomingClassCard key={item.id} item={item} />
            ))}
          </>
        ) : null}

        {showEnded ? (
          <>
            <ClassSectionHeader
              title={Strings.recentRecordings}
              linkText={Strings.all}
            />
            {RECORDING_CLASSES.map(item => (
              <RecordingClassCard key={item.id} item={item} />
            ))}
          </>
        ) : null}

        {showLive ? <ZoomInfoBanner /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineClass;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
});
