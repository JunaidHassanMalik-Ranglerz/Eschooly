import React, {useCallback, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';
import {Images} from '../../Assets';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import PersonAvatar from '../../Component/Profile/PersonAvatar';
import ProfileGradientCard from '../../Component/Profile/ProfileGradientCard';
import {
  CARD_RADIUS,
  GRADIENT_END,
  GRADIENT_START,
  IDENTITY_CARD_SHADOW,
  PROFILE_GRADIENT,
} from '../../Component/Profile/ProfileTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const FEE_TABS = [
  {id: 'school', label: Strings.schoolFees},
  {id: 'transport', label: Strings.transportFees},
];

const SCHOOL_ACTIONS = [
  {
    id: 'details',
    title: Strings.feeDetails,
    icon: 'document-text-outline',
    iconColor: '#6366F1',
  },
  {
    id: 'history',
    title: Strings.paymentHistory,
    icon: 'card-outline',
    iconColor: '#2563EB',
  },
  {
    id: 'receipts',
    title: Strings.receiptsChallans,
    icon: 'receipt-outline',
    iconColor: '#0EA5E9',
  },
];

const TRANSPORT_ACTIONS = [
  {
    id: 'transport',
    title: Strings.transport,
    icon: 'bus-outline',
    iconColor: '#38BDF8',
  },
  SCHOOL_ACTIONS[1],
  SCHOOL_ACTIONS[2],
];

const VIEW_TITLES = {
  details: Strings.feeDetails,
  history: Strings.paymentHistory,
  receipts: Strings.receiptsChallans,
};

const DETAIL_ICONS = {
  'Tuition Fee': 'school-outline',
  'Lab Fee': 'flask-outline',
  'Exam Fee': 'clipboard-outline',
};

const DETAIL_ICON_COLORS = {
  'Tuition Fee': Colors.iconSky,
  'Lab Fee': '#6366F1',
  'Exam Fee': '#2563EB',
};

const getStatusStyle = status => {
  const key = String(status || '').toLowerCase();
  if (key === 'paid') {
    return {
      bg: Colors.successBg,
      text: Colors.success,
      icon: 'checkmark-circle',
      iconColor: Colors.success,
    };
  }
  if (key === 'pending') {
    return {
      bg: Colors.pendingBg,
      text: Colors.warning,
      icon: 'time-outline',
      iconColor: Colors.warning,
    };
  }
  if (key === 'overdue') {
    return {
      bg: Colors.overdueBg,
      text: Colors.red,
      icon: 'alert-circle',
      iconColor: Colors.red,
    };
  }
  return {
    bg: Colors.pendingBg,
    text: Colors.warning,
    icon: 'time-outline',
    iconColor: Colors.warning,
  };
};

const Fee = () => {
  const navigation = useNavigation();
  const {activeStudent, feeDetails, unreadNotificationCount, classLabel} = useRoleData();
  const fee = feeDetails || {};
  const [feeTab, setFeeTab] = useState('school');
  const [viewMode, setViewMode] = useState('home');
  const [tabReplay, setTabReplay] = useState(0);
  const [viewReplay, setViewReplay] = useState(0);
  const panelReplay = tabReplay + viewReplay;
  const current = feeTab === 'transport' ? fee.transport : fee.school;
  const actionItems = feeTab === 'transport' ? TRANSPORT_ACTIONS : SCHOOL_ACTIONS;
  const headerTitle = VIEW_TITLES[viewMode] || Strings.fee;
  const details = fee.details || [];
  const history = fee.history || [];
  const receipts = fee.receipts || [];

  const selectFeeTab = useCallback(tabId => {
    if (tabId === feeTab) {
      return;
    }
    setFeeTab(tabId);
    setTabReplay(value => value + 1);
  }, [feeTab]);

  const setFeeViewMode = useCallback(mode => {
    if (mode === viewMode) {
      return;
    }
    setViewMode(mode);
    setViewReplay(value => value + 1);
  }, [viewMode]);

  const handleActionPress = item => {
    if (item.id === 'transport') {
      navigation.navigate('Transport');
      return;
    }
    setFeeViewMode(item.id);
  };

  const renderHome = () => (
    <>
      <AnimatedCard
        index={1}
        entering={getHomeScreenEnter(1)}
        replayToken={viewReplay}
        style={[styles.studentWrap, IDENTITY_CARD_SHADOW]}>
        <LinearGradient
          colors={PROFILE_GRADIENT}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.studentCard}>
          <PersonAvatar person={activeStudent} size={wp(13)} />
          <View style={styles.studentInfo}>
            <Text style={styles.studentName} numberOfLines={1}>
              {activeStudent?.label}
            </Text>
            <Text style={styles.studentClass} numberOfLines={1}>
              {classLabel}
            </Text>
          </View>
        </LinearGradient>
      </AnimatedCard>

      <AnimatedCard
        index={2}
        entering={getHomeScreenEnter(2)}
        style={styles.tabCard}>
        <View style={styles.tabWrap}>
          {FEE_TABS.map(tab => {
            const active = tab.id === feeTab;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
                activeOpacity={0.85}
                onPress={() => selectFeeTab(tab.id)}>
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </AnimatedCard>

      <ProfileGradientCard
        key={`${feeTab}-summary`}
        innerStyle={styles.termCardInner}
        animationIndex={3}
        entering={getHomeScreenEnter(3)}
        replayToken={panelReplay}
        waveVariant={SCREEN_WAVES.fees}>
        <View style={styles.termTop}>
          <Icon name="wallet-outline" size={wp(5.5)} color={Colors.iconSky} style={styles.termIcon} />
          <Text style={styles.termTitle}>{current?.term || fee.term}</Text>
          <View style={styles.dueBadge}>
            <Text style={styles.dueBadgeText}>{Strings.dueSoon}</Text>
          </View>
        </View>
        <Text style={styles.amount}>{current?.dueAmount || fee.dueAmount}</Text>
        <Text style={styles.dueDate}>
          {Strings.dueDateLabel} {current?.dueDate || fee.dueDate}
        </Text>
        <TouchableOpacity activeOpacity={0.88}>
          <LinearGradient
            colors={['#071A3D', '#1345A3', '#2563EB']}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.payBtn}>
            <Text style={styles.payBtnText}>{Strings.payOnline}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ProfileGradientCard>

      {actionItems.map((item, index) => {
        const slot = index + 4;
        return (
        <ProfileGradientCard
          key={`${feeTab}-${item.id}`}
          innerStyle={styles.actionInner}
          animationIndex={slot}
          entering={getHomeScreenEnter(slot)}
          replayToken={panelReplay}
          onPress={() => handleActionPress(item)}>
          <View style={styles.actionRow}>
            <Icon name={item.icon} size={wp(5.5)} color={item.iconColor} style={styles.actionIcon} />
            <Text style={styles.actionTitle}>{item.title}</Text>
            <Icon name="chevron-forward" size={wp(4.5)} color={Colors.whiteMuted85} />
          </View>
        </ProfileGradientCard>
        );
      })}

      <AnimatedCard
        index={7}
        entering={getHomeScreenEnter(7)}
        replayToken={panelReplay}
        style={styles.quoteEnter}>
        <View style={styles.quoteWrap}>
          <Image source={Images.cap} style={styles.quoteIcon} resizeMode="contain" />
          <Text style={styles.quote}>{Strings.feeQuote}</Text>
        </View>
      </AnimatedCard>
    </>
  );

  const renderDetails = () => (
    <>
      <AnimatedCard
        index={1}
        entering={getHomeScreenEnter(1)}
        replayToken={viewReplay}
        style={[styles.summaryWrap, IDENTITY_CARD_SHADOW]}>
        <LinearGradient
          colors={PROFILE_GRADIENT}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{Strings.totalPayable}</Text>
          <Text style={styles.summaryAmount}>
            {current?.dueAmount || fee.dueAmount}
          </Text>
          <Text style={styles.summaryMeta}>
            {current?.term || fee.term} · {Strings.dueDateLabel}{' '}
            {current?.dueDate || fee.dueDate}
          </Text>
        </LinearGradient>
      </AnimatedCard>

      <AnimatedCard
        index={2}
        entering={getHomeScreenEnter(2)}
        replayToken={viewReplay}
        style={styles.sectionEnter}>
        <Text style={styles.sectionTitle}>{Strings.feeBreakdownTitle}</Text>
      </AnimatedCard>
      {details.length ? (
        details.map((item, index) => {
          const slot = index + 3;
          return (
          <ProfileGradientCard
            key={item.id}
            innerStyle={styles.detailCardInner}
            animationIndex={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={viewReplay}>
            <View style={styles.detailRow}>
              <Icon
                name={DETAIL_ICONS[item.title] || 'cash-outline'}
                size={wp(5.5)}
                color={DETAIL_ICON_COLORS[item.title] || Colors.iconSky}
                style={styles.detailIcon}
              />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>{item.title}</Text>
                <Text style={styles.detailHint}>
                  {index + 1} of {details.length}
                </Text>
              </View>
              <Text style={styles.detailAmount}>{item.amount}</Text>
            </View>
          </ProfileGradientCard>
          );
        })
      ) : (
        <Text style={styles.empty}>{Strings.noFeeDetails}</Text>
      )}
    </>
  );

  const renderHistory = () =>
    history.length ? (
      history.map((item, index) => {
        const statusStyle = getStatusStyle(item.status);
        const slot = index + 1;
        return (
          <ProfileGradientCard
            key={item.id}
            innerStyle={styles.historyCardInner}
            animationIndex={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={viewReplay}>
            <View style={styles.historyTop}>
              <Icon
                name={statusStyle.icon}
                size={wp(5.5)}
                color={statusStyle.iconColor}
                style={styles.historyIcon}
              />
              <View style={styles.historyText}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyMeta}>
                  {Strings.paidOn} {item.date}
                </Text>
              </View>
              <View style={[styles.statusChip, {backgroundColor: statusStyle.bg}]}>
                <Text style={[styles.statusChipText, {color: statusStyle.text}]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.historyBottom}>
              <Text style={styles.historyAmountLabel}>{Strings.dueAmount}</Text>
              <Text style={styles.historyAmount}>{item.amount}</Text>
            </View>
          </ProfileGradientCard>
        );
      })
    ) : (
      <Text style={styles.empty}>{Strings.noPaymentHistory}</Text>
    );

  const renderReceipts = () =>
    receipts.length ? (
      receipts.map((item, index) => {
        const slot = index + 1;
        return (
        <ProfileGradientCard
          key={item.id}
          innerStyle={styles.receiptCardInner}
          animationIndex={slot}
          entering={getHomeScreenEnter(slot)}
          replayToken={viewReplay}>
          <View style={styles.receiptRow}>
            <Icon
              name={item.type === 'Challan' ? 'document-outline' : 'receipt-outline'}
              size={wp(6)}
              color={Colors.iconSky}
              style={styles.receiptIcon}
            />
            <View style={styles.receiptBody}>
              <View style={styles.receiptTop}>
                <Text style={styles.receiptTitle}>{item.title}</Text>
                <View style={styles.typeChip}>
                  <Text style={styles.typeChipText}>{item.type}</Text>
                </View>
              </View>
              <Text style={styles.receiptDate}>{item.date}</Text>
              <TouchableOpacity style={styles.downloadRow} activeOpacity={0.85}>
                <Icon name="download-outline" size={wp(4)} color={Colors.iconSky} />
                <Text style={styles.downloadText}>{Strings.downloadPdf}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ProfileGradientCard>
        );
      })
    ) : (
      <Text style={styles.empty}>{Strings.noReceipts}</Text>
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={headerTitle}
        notificationCount={unreadNotificationCount || 1}
        onBackPress={viewMode === 'home' ? undefined : () => setFeeViewMode('home')}
      />

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        {viewMode === 'home' && renderHome()}
        {viewMode === 'details' && renderDetails()}
        {viewMode === 'history' && renderHistory()}
        {viewMode === 'receipts' && renderReceipts()}
      </ScrollEnterScrollView>
    </SafeAreaView>
  );
};

export default withScreenEnter(Fee, 'fee');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  scrollArea: {
    flex: 1,
  },
  sectionEnter: {
    marginBottom: hp(1.2),
  },
  quoteEnter: {
    marginTop: hp(2.5),
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  studentWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(1.8),
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
  tabCard: {
    borderRadius: wp(8),
    overflow: 'hidden',
    marginBottom: hp(1.8),
  },
  tabWrap: {
    flexDirection: 'row',
    backgroundColor: '#DCEBFD',
    borderRadius: wp(8),
    padding: wp(1.2),
    borderWidth: 1,
    borderColor: '#C0D5F2',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(7),
  },
  tabBtnActive: {
    backgroundColor: '#071A3D',
  },
  tabText: {
    color: Colors.grayText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  tabTextActive: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
  },
  termCardInner: {
    paddingVertical: hp(2),
    marginBottom: hp(1.6),
  },
  termTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termIcon: {
    marginRight: wp(2.5),
  },
  termTitle: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  dueBadge: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.45),
  },
  dueBadgeText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  amount: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginTop: hp(1.6),
  },
  dueDate: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.5),
    marginBottom: hp(1.8),
  },
  payBtn: {
    borderRadius: wp(8),
    alignItems: 'center',
    paddingVertical: hp(1.5),
    marginTop: hp(0.2),
    elevation: 4,
    shadowColor: '#0A4E8A',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  payBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  actionInner: {
    paddingVertical: hp(1.6),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: wp(3),
  },
  actionTitle: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  quoteWrap: {
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  quoteIcon: {
    width: wp(8),
    height: wp(8),
    tintColor: Colors.primary,
    marginBottom: hp(1),
  },
  quote: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    lineHeight: Fontsize.m,
  },
  summaryWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  summaryCard: {
    borderRadius: CARD_RADIUS,
    padding: wp(5),
  },
  summaryLabel: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  summaryAmount: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginTop: hp(0.6),
  },
  summaryMeta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.7),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: 0,
  },
  detailCardInner: {
    paddingVertical: hp(1.5),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: wp(3),
  },
  detailText: {
    flex: 1,
  },
  detailTitle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  detailHint: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.25),
  },
  detailAmount: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  historyCardInner: {
    paddingVertical: hp(1.5),
  },
  historyTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    marginRight: wp(2.5),
  },
  historyText: {
    flex: 1,
  },
  historyTitle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  historyMeta: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  statusChip: {
    borderRadius: wp(4),
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.4),
  },
  statusChipText: {
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  historyBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.4),
    paddingTop: hp(1.2),
    borderTopWidth: 1,
    borderTopColor: Colors.whiteOverlay18,
  },
  historyAmountLabel: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  historyAmount: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  receiptCardInner: {
    paddingVertical: hp(1.5),
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  receiptIcon: {
    marginRight: wp(3),
    marginTop: hp(0.2),
  },
  receiptBody: {
    flex: 1,
  },
  receiptTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptTitle: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  typeChip: {
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.35),
  },
  typeChipText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  receiptDate: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.35),
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.1),
  },
  downloadText: {
    color: Colors.iconSky,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.4),
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(4),
  },
});
