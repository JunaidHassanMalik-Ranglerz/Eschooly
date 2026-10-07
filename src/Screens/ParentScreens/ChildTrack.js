import React, {useCallback, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../../Component/Profile/ProfileTheme';
import {Images} from '../../Assets';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const TripCard = ({title, steps, animationIndex}) => (
  <AnimatedCard
    index={animationIndex}
    entering={getHomeScreenEnter(animationIndex)}
    style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
    <LinearGradient
      colors={CARD_GRADIENTS.notification}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.tripCard}>
      <CardWave variant={SCREEN_WAVES.transport} />
      <Text style={styles.tripTitle}>{title}</Text>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.rail}>
              <View style={[styles.dot, step.done ? styles.dotDone : styles.dotWait]}>
                <Icon
                  name={step.done ? 'checkmark' : 'time-outline'}
                  size={wp(3.4)}
                  color={step.done ? Colors.white : Colors.whiteMuted85}
                />
              </View>
              {isLast ? null : <View style={styles.line} />}
            </View>
            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepTime} numberOfLines={1}>
                {step.done && step.time ? step.time : Strings.notYet}
              </Text>
            </View>
          </View>
        );
      })}
    </LinearGradient>
  </AnimatedCard>
);

const ChildTrack = () => {
  const {
    activeStudent,
    childList,
    selectedChildId,
    setSelectedChildId,
    canSwitchChild,
    childTrip,
  } = useRoleData();
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const mapHeight = Math.min(width * 0.62, height * 0.34);
  const trip = childTrip || {status: '', morning: [], evening: []};

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.trackChild} notificationCount={1} />

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: hp(2) + insets.bottom},
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        <AnimatedCard index={1} entering={getHomeScreenEnter(1)}>
          <SelectedChildBanner
            child={activeStudent}
            variant="large"
            waveVariant={SCREEN_WAVES.parentHome}
            disableEnterAnimation
            compactMargin
            canSwitch={canSwitchChild}
            onSwitchPress={canSwitchChild ? openSwitch : undefined}
          />
        </AnimatedCard>

        <AnimatedCard
          index={2}
          entering={getHomeScreenEnter(2)}
          style={[styles.mapCard, {height: mapHeight}]}>
          <Image
            source={Images.transportMap}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(7, 26, 61, 0)', 'rgba(7, 26, 61, 0.92)']}
            style={styles.mapStatus}>
            <Icon name="bus" size={wp(5.2)} color={Colors.iconAmber} />
            <View style={styles.statusText}>
              <Text style={styles.statusLabel} numberOfLines={1}>
                {activeStudent?.label}
              </Text>
              <Text style={styles.statusValue} numberOfLines={2}>
                {trip.status}
              </Text>
            </View>
          </LinearGradient>
        </AnimatedCard>

        <TripCard
          title={Strings.homeToSchool}
          steps={trip.morning}
          animationIndex={3}
        />
        <TripCard
          title={Strings.schoolToHome}
          steps={trip.evening}
          animationIndex={4}
        />
      </ScrollEnterScrollView>

      {canSwitchChild ? (
        <ChildSwitchModal
          visible={switchVisible}
          childrenList={childList}
          selectedId={selectedChildId}
          onSelect={setSelectedChildId}
          onClose={() => setSwitchVisible(false)}
          replayToken={modalReplay}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default withScreenEnter(ChildTrack, 'transport');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    flexGrow: 1,
  },
  cardWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(1.4),
  },
  mapCard: {
    width: '100%',
    borderRadius: CARD_RADIUS,
    backgroundColor: '#DCEBFD',
    marginBottom: hp(1.6),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.35)',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  mapStatus: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(2.4),
    paddingBottom: hp(1.4),
  },
  statusText: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(2.5),
  },
  statusLabel: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  statusValue: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.2),
  },
  tripCard: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4.5),
    paddingTop: hp(1.8),
    paddingBottom: hp(1.2),
    overflow: 'hidden',
  },
  tripTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.4),
    zIndex: 1,
    flexShrink: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    zIndex: 1,
  },
  rail: {
    width: wp(8),
    alignItems: 'center',
  },
  dot: {
    width: wp(6.2),
    height: wp(6.2),
    borderRadius: wp(3.1),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotDone: {
    backgroundColor: Colors.iconGreen,
  },
  dotWait: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  line: {
    position: 'absolute',
    top: wp(6.2),
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  stepText: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(2.5),
    paddingBottom: hp(1.5),
  },
  stepTitle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    flexShrink: 1,
  },
  stepTime: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
});
