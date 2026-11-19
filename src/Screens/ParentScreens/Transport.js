import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DepthIcon from '../../Component/DepthIcon';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {Images} from '../../Assets';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
} from '../../Component/Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';
import {PARENT_TRANSPORT} from '../../Constants/parentData';
import {fetchChildDashboard} from '../../store/slices/parentHomeSlice';

const CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8'];

const INFO_ROWS = [
  {key: 'driverName', label: Strings.driverNameLabel},
  {key: 'driverContact', label: Strings.driverContact},
  {key: 'pickupTime', label: Strings.pickupTime},
  {key: 'dropTime', label: Strings.dropTime},
];

const Transport = () => {
  const dispatch = useDispatch();
  const {
    activeStudent,
    transportDetails,
    childList,
    selectedChildId: roleChildId,
    setSelectedChildId,
    canSwitchChild: roleCanSwitch,
    isParent,
  } = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(
    state => state.parentHome,
  );
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const activeChildId = homeChildId || children[0]?.value || roleChildId || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) ||
    childList.find(item => item.value === String(activeChildId)) ||
    children[0] ||
    childList[0] ||
    null;
  const shownChild = isParent ? parentChild || activeStudent : activeStudent;
  const canSwitchChild = isParent
    ? children.length > 1 || childList.length > 1
    : roleCanSwitch;
  const switchList = children.length ? children : childList;
  const transport =
    (isParent && shownChild?.value && PARENT_TRANSPORT[shownChild.value]) ||
    transportDetails ||
    {};

  const openSwitch = useCallback(() => {
    setSwitchVisible(true);
    setModalReplay(value => value + 1);
  }, []);

  const handleSelectChild = useCallback(
    nextId => {
      if (!nextId || String(nextId) === String(activeChildId)) {
        return;
      }
      if (isParent) {
        dispatch(fetchChildDashboard(nextId));
      }
      setSelectedChildId(String(nextId));
    },
    [activeChildId, dispatch, isParent, setSelectedChildId],
  );

  return (
    <ParentNavyIceLayout
      title={Strings.transport}
      subtitle={Strings.transportSubtitleParent}
      unreadCount={1}
      footer={
        canSwitchChild ? (
          <ChildSwitchModal
            visible={switchVisible}
            childrenList={switchList}
            selectedId={String(activeChildId || shownChild?.value || '')}
            onSelect={handleSelectChild}
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
          style={styles.mapCard}>
          <Image
            source={Images.transportMap}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </AnimatedCard>

        <AnimatedCard
          index={3}
          entering={getHomeScreenEnter(3)}
          style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
          <LinearGradient
            colors={CARD_GRADIENT}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.busCard}>
            <CardWave variant={SCREEN_WAVES.transport} />

            <View style={styles.busTop}>
              <DepthIcon name="bus-outline" size={wp(7)} color="#38BDF8" />
              <View style={styles.busInfo}>
                <Text style={styles.busName}>{transport.busName}</Text>
                <Text style={styles.busNo}>{transport.busNo}</Text>
              </View>
              <View style={styles.routeBadge}>
                <Text style={styles.routeBadgeText}>{Strings.onRoute}</Text>
              </View>
            </View>

            {INFO_ROWS.map(row => (
              <View key={row.key} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{transport[row.key]}</Text>
              </View>
            ))}
          </LinearGradient>
        </AnimatedCard>

        <AnimatedCard
          index={4}
          entering={getHomeScreenEnter(4)}
          style={[styles.cardWrap, IDENTITY_CARD_SHADOW]}>
          <LinearGradient
            colors={['#0A2F5C', '#0D5CA8', '#2563EB']}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.notifyCard}>
            <DepthIcon name="notifications-outline" size={wp(6.5)} color="#BFDBFE" />
            <Text style={styles.notifyText}>{Strings.busNotify}</Text>
          </LinearGradient>
        </AnimatedCard>
    </ParentNavyIceLayout>
  );
};

export default withScreenEnter(Transport, 'transport');

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
    paddingBottom: hp(3),
  },
  studentWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(1.6),
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2.1),
    overflow: 'hidden',
  },
  studentInfo: {
    flex: 1,
    marginLeft: wp(3.5),
    zIndex: 1,
  },
  studentName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  studentClass: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.3),
  },
  mapCard: {
    width: '100%',
    height: wp(70),
    alignSelf: 'center',
    borderRadius: CARD_RADIUS,
    backgroundColor: '#DCEBFD',
    marginBottom: hp(1.6),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.35)',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  cardWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(1.4),
  },
  busCard: {
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: '#65C4FF',
    padding: wp(4.5),
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
  },
  busTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.6),
    zIndex: 1,
  },
  busInfo: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  busName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  busNo: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  routeBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderRadius: wp(5),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.45),
  },
  routeBadgeText: {
    color: '#BFDBFE',
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.05),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    zIndex: 1,
  },
  infoLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  infoValue: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    textAlign: 'right',
    flex: 1,
    marginLeft: wp(3),
  },
  notifyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: 'rgba(108, 183, 255, 0.35)',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    gap: wp(3),
    overflow: 'hidden',
  },
  notifyText: {
    flex: 1,
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
    zIndex: 1,
  },
});
