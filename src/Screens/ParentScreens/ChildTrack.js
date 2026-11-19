import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import ParentIceCard from '../../Component/Parent/ParentIceCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import AnimatedCard from '../../Component/AnimatedCard';
import FeatureArtImage from '../../Component/Glass/FeatureArtImage';
import {SCREEN_WAVES} from '../../Component/CardWave';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {elevation} from '../../Constants/Theme';
import {FLOAT_CARD_RADIUS} from '../../Component/Glass/EschoolyScreenShell';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {showToast} from '../../utils/toast';
import {fetchChildDashboard, fetchChildTransport, fetchParentHome} from '../../store/slices/parentHomeSlice';

const TripCard = ({title, steps, animationIndex}) => (
  <AnimatedCard
    index={animationIndex}
    entering={getHomeScreenEnter(animationIndex)}>
    <ParentIceCard waveVariant={SCREEN_WAVES.transport}>
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
                  color={step.done ? Colors.white : Colors.brandRoyal}
                />
              </View>
              {isLast ? null : (
                <View style={[styles.line, step.done && styles.lineDone]} />
              )}
            </View>
            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepTime} numberOfLines={2}>
                {step.time || Strings.notYet}
              </Text>
            </View>
          </View>
        );
      })}
    </ParentIceCard>
  </AnimatedCard>
);

const EMPTY_TRIP = {status: '', morning: [], evening: []};

const ChildTrack = () => {
  const {activeStudent, childList, selectedChildId: roleChildId, setSelectedChildId, canSwitchChild: roleCanSwitch, childTrip, isParent} = useRoleData();
  const dispatch = useDispatch();
  const {selectedChildId: homeChildId, children} = useSelector(state => state.parentHome);
  const [parentTransport, setParentTransport] = useState(null);
  const [loading, setLoading] = useState(isParent);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const {width, height} = useWindowDimensions();
  const mapHeight = Math.min(width * 0.62, height * 0.34);
  const activeChildId = homeChildId || children[0]?.value || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) || children[0] || null;
  const shownChild = isParent ? parentChild : activeStudent;
  const canSwitchChild = isParent ? children.length > 1 : roleCanSwitch;
  const trip = isParent
    ? parentTransport?.allocated
      ? parentTransport.trip
      : EMPTY_TRIP
    : childTrip || EMPTY_TRIP;

  useEffect(() => {
    if (!isParent || activeChildId) {
      return undefined;
    }
    dispatch(fetchParentHome());
  }, [activeChildId, dispatch, isParent]);

  useEffect(() => {
    if (!isParent || !activeChildId) {
      return undefined;
    }
    let active = true;
    setLoading(true);
    dispatch(fetchChildTransport(activeChildId))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentTransport(payload);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentTransport(null);
        showToast({
          type: 'error',
          text1: error?.message || 'Unable to load transport.',
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

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  return (
    <ParentNavyIceLayout
      title={Strings.trackChild}
      subtitle={Strings.childTrackSubtitleParent}
      unreadCount={1}
      footer={
        canSwitchChild ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={isParent ? children : childList}
            selectedId={isParent ? String(activeChildId || '') : roleChildId}
            onSelect={nextId => {
              if (isParent) {
                if (String(nextId) !== String(activeChildId)) {
                  dispatch(fetchChildDashboard(nextId));
                }
                return;
              }
              setSelectedChildId(nextId);
            }}
            onClose={() => setSwitchVisible(false)}
            replayToken={modalReplay}
          />
        ) : null
      }>
        <SelectedChildBanner
          child={shownChild}
          variant="large"
          icy
          disableEnterAnimation
          compactMargin
          canSwitch={canSwitchChild}
          onSwitchPress={canSwitchChild ? openSwitch : undefined}
        />

        <AnimatedCard
          index={2}
          entering={getHomeScreenEnter(2)}
          style={[styles.mapShell, {height: mapHeight}]}>
          <View style={styles.mapClip}>
            <Image
              source={Images.transportMap}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapStatus}>
              <FeatureArtImage
                source={EducationIcons.transport}
                size={wp(11)}
              />
              <View style={styles.statusText}>
                <Text style={styles.statusLabel} numberOfLines={1}>
                  {shownChild?.label}
                </Text>
                <Text style={styles.statusValue} numberOfLines={2}>
                  {isParent && loading ? '—' : trip.status}
                </Text>
              </View>
            </View>
          </View>
        </AnimatedCard>

        {isParent && loading ? (
          <ActivityIndicator style={styles.loader} size="large" color={Colors.brandRoyal} />
        ) : isParent && parentTransport && !parentTransport.allocated ? (
          <Text style={styles.empty}>{Strings.noTransport}</Text>
        ) : (
          <>
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
          </>
        )}
    </ParentNavyIceLayout>
  );
};

export default withScreenEnter(ChildTrack, 'transport');

const styles = StyleSheet.create({
  mapShell: {
    width: '100%',
    borderRadius: FLOAT_CARD_RADIUS,
    backgroundColor: Colors.bannerIceStart,
    marginBottom: hp(1.6),
    overflow: 'visible',
    ...elevation.banner,
  },
  mapClip: {
    flex: 1,
    borderRadius: FLOAT_CARD_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  mapStatus: {
    position: 'absolute',
    left: wp(3),
    right: wp(3),
    bottom: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bannerIceStart,
    borderRadius: wp(5),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderGlass,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.85),
    ...elevation.card,
  },
  statusText: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(2),
  },
  statusLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  statusValue: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginTop: hp(0.15),
  },
  tripTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.3),
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
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
    backgroundColor: Colors.brandNavy,
  },
  dotWait: {
    backgroundColor: Colors.bannerIceEnd,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.brandRoyal,
  },
  line: {
    position: 'absolute',
    top: wp(6.2),
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(19, 69, 163, 0.18)',
  },
  lineDone: {
    backgroundColor: Colors.brandRoyal,
  },
  stepText: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp(2.5),
    paddingBottom: hp(1.5),
  },
  stepTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    flexShrink: 1,
  },
  stepTime: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  loader: {
    marginVertical: hp(3),
  },
  empty: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.s,
    textAlign: 'center',
    marginVertical: hp(2),
  },
});
