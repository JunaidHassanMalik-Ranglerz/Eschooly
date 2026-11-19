import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../../Component/AnimatedCard';
import {SCREEN_WAVES} from '../../Component/CardWave';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import ParentIceCard from '../../Component/Parent/ParentIceCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
import ChildSwitchModal from '../../Component/Parent/ChildSwitchModal';
import SegmentTabs from '../../Component/SegmentTabs';
import FeatureArtImage from '../../Component/Glass/FeatureArtImage';
import {EducationIcons} from '../../Assets/EducationIcons';
import {
  GRADIENT_END,
  GRADIENT_START,
} from '../../Component/Profile/ProfileTheme';
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
  childFeeChallanDownloadUrl,
  childFeeReceiptDownloadUrl,
} from '../../services/parentService';
import {
  fetchChildDashboard,
  fetchChildFees,
  fetchParentHome,
} from '../../store/slices/parentHomeSlice';

const EMPTY_FEES = {
  summary: {},
  charges: [],
  challans: [],
  receipts: [],
  documents: [],
  history: [],
};

const matchesFeeTab = (item, tabId) =>
  tabId === 'transport'
    ? item?.category === 'transport'
    : item?.category !== 'transport';

const isSettledStatus = status => {
  const key = String(status || '').toLowerCase();
  return key === 'paid' || key === 'settled' || key === 'complete' || key === 'completed';
};

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

const ACTION_ART = {
  details: EducationIcons.syllabus,
  history: EducationIcons.fees,
  receipts: EducationIcons.digitalLibrary,
  transport: EducationIcons.transport,
};

const DETAIL_ART = {
  'Tuition Fee': EducationIcons.syllabus,
  'Lab Fee': EducationIcons.physicsAtom,
  'Exam Fee': EducationIcons.exams,
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
  const dispatch = useDispatch();
  const {
    activeStudent,
    unreadNotificationCount,
    childList,
    selectedChildId: roleChildId,
    setSelectedChildId,
    canSwitchChild: roleCanSwitch,
    isParent,
  } = useRoleData();
  const {selectedChildId: homeChildId, children} = useSelector(
    state => state.parentHome,
  );
  const activeChildId = homeChildId || children[0]?.value || roleChildId || null;
  const parentChild =
    children.find(item => item.value === String(activeChildId)) ||
    childList.find(item => item.value === String(activeChildId)) ||
    children[0] ||
    childList[0] ||
    null;
  const shownChild = isParent ? parentChild || activeStudent : activeStudent;
  const canSwitchChild = isParent
    ? (children.length > 1 || childList.length > 1)
    : roleCanSwitch;
  const switchList = children.length ? children : childList;
  const [parentFees, setParentFees] = useState(EMPTY_FEES);
  const [feesChildId, setFeesChildId] = useState(null);
  const [loading, setLoading] = useState(isParent);
  const [feeTab, setFeeTab] = useState('school');
  const [viewMode, setViewMode] = useState('home');
  const [tabReplay, setTabReplay] = useState(0);
  const [viewReplay, setViewReplay] = useState(0);
  const [switchVisible, setSwitchVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const panelReplay = tabReplay + viewReplay;
  const fee = parentFees || EMPTY_FEES;
  const actionItems = feeTab === 'transport' ? TRANSPORT_ACTIONS : SCHOOL_ACTIONS;
  const headerTitle = VIEW_TITLES[viewMode] || Strings.fee;
  const details = (fee.charges || []).filter(item => matchesFeeTab(item, feeTab));
  const history = (fee.history || []).filter(item => matchesFeeTab(item, feeTab));
  const receipts = (fee.documents || []).filter(item => matchesFeeTab(item, feeTab));
  const headline =
    details.find(item => item.status && !isSettledStatus(item.status)) ||
    details[0] ||
    null;
  const summary = fee.summary || {};
  const summaryTitle = headline?.title || summary.title;
  const summaryAmount =
    headline?.dueAmount ||
    headline?.amount ||
    (feeTab === 'school' ? summary.dueAmount || summary.amount : '');
  const summaryDate =
    headline?.dueDate || (feeTab === 'school' ? summary.dueDate : '');
  const summaryStatus =
    headline?.status || (feeTab === 'school' ? summary.status : '');
  const showPayNow = Boolean(summaryAmount) && !isSettledStatus(summaryStatus);

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
    const requestedId = String(activeChildId);
    let active = true;
    setParentFees(EMPTY_FEES);
    setFeesChildId(null);
    setLoading(true);
    dispatch(fetchChildFees(requestedId))
      .unwrap()
      .then(payload => {
        if (active) {
          setParentFees(payload || EMPTY_FEES);
          setFeesChildId(requestedId);
        }
      })
      .catch(error => {
        if (!active) {
          return;
        }
        setParentFees(EMPTY_FEES);
        setFeesChildId(null);
        if (!error?.stale) {
          showToast({
            type: 'error',
            text1: error?.message || 'Unable to load fees.',
          });
        }
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

  const openDocument = useCallback(
    item => {
      const studentId = String(feesChildId || '');
      if (!studentId || !item) {
        return;
      }
      if (String(activeChildId || '') !== studentId) {
        showToast({
          type: 'error',
          text1: 'Select this child again to open their documents.',
        });
        return;
      }
      if (item.kind === 'receipt') {
        if (!item.paymentId) {
          showToast({
            type: 'error',
            text1: 'This receipt is missing a payment ID.',
          });
          return;
        }
        navigation.navigate('PdfViewer', {
          pdfUrl: childFeeReceiptDownloadUrl(studentId, item.paymentId),
          title: item.title || Strings.receiptDownload,
        });
        return;
      }
      if (!item.chargeId) {
        showToast({
          type: 'error',
          text1: 'This challan is missing a charge ID.',
        });
        return;
      }
      navigation.navigate('PdfViewer', {
        pdfUrl: childFeeChallanDownloadUrl(studentId, item.chargeId),
        title: item.title || Strings.feeChallan,
      });
    },
    [activeChildId, feesChildId, navigation],
  );

  const renderHome = () => (
    <>
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
        style={styles.tabCard}>
        <SegmentTabs
          variant="fee"
          tabs={FEE_TABS.map(tab => tab.label)}
          activeTab={FEE_TABS.find(tab => tab.id === feeTab)?.label}
          onChange={label => {
            const next = FEE_TABS.find(tab => tab.label === label);
            if (next) {
              selectFeeTab(next.id);
            }
          }}
        />
      </AnimatedCard>

      <AnimatedCard
        key={`${feeTab}-summary`}
        index={3}
        entering={getHomeScreenEnter(3)}
        replayToken={panelReplay}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.brandRoyal}
          />
        ) : (
        <ParentIceCard waveVariant={SCREEN_WAVES.fees}>
          <View style={styles.termTop}>
            <FeatureArtImage
              source={EducationIcons.fees}
              size={wp(11)}
              style={styles.termIcon}
            />
            <Text style={styles.termTitle} numberOfLines={1}>
              {summaryTitle || Strings.fee}
            </Text>
            {summaryStatus ? (
              <View
                style={[
                  styles.dueBadge,
                  {backgroundColor: getStatusStyle(summaryStatus).bg},
                ]}>
                <Text
                  style={[
                    styles.dueBadgeText,
                    {color: getStatusStyle(summaryStatus).text},
                  ]}>
                  {summaryStatus}
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.amount}>{summaryAmount || '—'}</Text>
          {summaryDate ? (
            <Text style={styles.dueDate}>
              {Strings.dueDateLabel} {summaryDate}
            </Text>
          ) : (
            <View style={styles.dueDateSpacer} />
          )}
          {showPayNow ? (
            <TouchableOpacity activeOpacity={0.88}>
              <LinearGradient
                colors={[Colors.brandNavy, Colors.brandRoyal, Colors.brandAccent]}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={styles.payBtn}>
                <Text style={styles.payBtnText}>{Strings.payOnline}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </ParentIceCard>
        )}
      </AnimatedCard>

      {actionItems.map((item, index) => {
        const slot = index + 4;
        return (
          <AnimatedCard
            key={`${feeTab}-${item.id}`}
            index={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={panelReplay}>
            <ParentIceCard onPress={() => handleActionPress(item)}>
              <View style={styles.actionRow}>
                <FeatureArtImage
                  source={ACTION_ART[item.id] || EducationIcons.fees}
                  size={wp(9)}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Icon
                  name="chevron-forward"
                  size={wp(4.5)}
                  color={Colors.brandRoyal}
                />
              </View>
            </ParentIceCard>
          </AnimatedCard>
        );
      })}

      <AnimatedCard
        index={7}
        entering={getHomeScreenEnter(7)}
        replayToken={panelReplay}
        style={styles.quoteEnter}>
        <View style={styles.quoteWrap}>
          <FeatureArtImage
            source={EducationIcons.welcomeGraduationBooks}
            size={wp(12)}
            style={styles.quoteIcon}
          />
          <Text style={styles.quote}>{Strings.feeQuote}</Text>
        </View>
      </AnimatedCard>
    </>
  );

  const renderDetails = () =>
    loading ? (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.brandRoyal}
      />
    ) : (
    <>
      <AnimatedCard
        index={1}
        entering={getHomeScreenEnter(1)}
        replayToken={viewReplay}>
        <ParentIceCard waveVariant={SCREEN_WAVES.fees}>
          <Text style={styles.summaryLabel}>{Strings.totalPayable}</Text>
          <Text style={styles.summaryAmount}>{summaryAmount || '—'}</Text>
          {summaryTitle || summaryDate ? (
            <Text style={styles.summaryMeta}>
              {[summaryTitle, summaryDate ? `${Strings.dueDateLabel} ${summaryDate}` : '']
                .filter(Boolean)
                .join(' · ')}
            </Text>
          ) : null}
        </ParentIceCard>
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
            <AnimatedCard
              key={item.id}
              index={slot}
              entering={getHomeScreenEnter(slot)}
              replayToken={viewReplay}>
              <ParentIceCard>
                <View style={styles.detailRow}>
                  <FeatureArtImage
                    source={DETAIL_ART[item.title] || EducationIcons.fees}
                    size={wp(9)}
                    style={styles.detailIcon}
                  />
                  <View style={styles.detailText}>
                    <Text style={styles.detailTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.detailHint}>
                      {[item.status, item.hint, item.dueDate].filter(Boolean).join(' · ') ||
                        `${index + 1} of ${details.length}`}
                    </Text>
                  </View>
                  <Text style={styles.detailAmount}>
                    {item.dueAmount || item.amount}
                  </Text>
                </View>
              </ParentIceCard>
            </AnimatedCard>
          );
        })
      ) : (
        <Text style={styles.empty}>{Strings.noFeeDetails}</Text>
      )}
    </>
    );

  const renderHistory = () =>
    loading ? (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.brandRoyal}
      />
    ) : history.length ? (
      history.map((item, index) => {
        const statusStyle = getStatusStyle(item.status);
        const slot = index + 1;
        return (
          <AnimatedCard
            key={item.id}
            index={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={viewReplay}>
            <ParentIceCard waveVariant={SCREEN_WAVES.fees}>
              <View style={styles.historyTop}>
                <FeatureArtImage
                  source={EducationIcons.fees}
                  size={wp(10)}
                  style={styles.historyIcon}
                />
                <View style={styles.historyText}>
                  <Text style={styles.historyTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.historyMeta} numberOfLines={1}>
                    {isSettledStatus(item.status) && item.date
                      ? `${Strings.paidOn} ${item.date}`
                      : item.date || item.status}
                  </Text>
                </View>
                {item.status ? (
                  <View style={[styles.statusChip, {backgroundColor: statusStyle.bg}]}>
                    <Text style={[styles.statusChipText, {color: statusStyle.text}]}>
                      {item.status}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.historyBottom}>
                <Text style={styles.historyAmountLabel}>Amount</Text>
                <Text style={styles.historyAmount}>{item.amount || '—'}</Text>
              </View>
            </ParentIceCard>
          </AnimatedCard>
        );
      })
    ) : (
      <Text style={styles.empty}>{Strings.noPaymentHistory}</Text>
    );

  const renderReceipts = () =>
    loading ? (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.brandRoyal}
      />
    ) : receipts.length ? (
      receipts.map((item, index) => {
        const slot = index + 1;
        return (
          <AnimatedCard
            key={item.id}
            index={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={viewReplay}>
            <ParentIceCard onPress={() => openDocument(item)}>
              <View style={styles.receiptRow}>
                <FeatureArtImage
                  source={EducationIcons.digitalLibrary}
                  size={wp(11)}
                  style={styles.receiptIcon}
                />
                <View style={styles.receiptBody}>
                  <View style={styles.receiptTop}>
                    <Text style={styles.receiptTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.typeChip}>
                      <Text style={styles.typeChipText}>{item.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.receiptDate}>
                    {[item.date, item.amount, item.status].filter(Boolean).join(' · ')}
                  </Text>
                  <View style={styles.receiptDivider} />
                  <View style={styles.downloadRow}>
                    <Icon
                      name="eye-outline"
                      size={wp(4)}
                      color={Colors.brandRoyal}
                    />
                    <Text style={styles.downloadText}>
                      {item.kind === 'receipt'
                        ? Strings.viewDetails
                        : Strings.viewChallan}
                    </Text>
                  </View>
                </View>
              </View>
            </ParentIceCard>
          </AnimatedCard>
        );
      })
    ) : (
      <Text style={styles.empty}>{Strings.noReceipts}</Text>
    );

  return (
    <ParentNavyIceLayout
      title={headerTitle}
      subtitle={Strings.feeSubtitleParent}
      unreadCount={unreadNotificationCount || 1}
      onBackPress={
        viewMode === 'home' ? undefined : () => setFeeViewMode('home')
      }
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
      {viewMode === 'home' && renderHome()}
      {viewMode === 'details' && renderDetails()}
      {viewMode === 'history' && renderHistory()}
      {viewMode === 'receipts' && renderReceipts()}
    </ParentNavyIceLayout>
  );
};

export default withScreenEnter(Fee, 'fee');

const styles = StyleSheet.create({
  sectionEnter: {
    marginBottom: hp(1.2),
  },
  quoteEnter: {
    marginTop: hp(1.2),
  },
  tabCard: {
    marginBottom: hp(1.35),
  },
  loader: {
    marginVertical: hp(2.5),
  },
  dueDateSpacer: {
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
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  dueBadge: {
    backgroundColor: Colors.pendingBg,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.45),
  },
  dueBadgeText: {
    color: Colors.warning,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  amount: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginTop: hp(1.4),
  },
  dueDate: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.45),
    marginBottom: hp(1.6),
  },
  payBtn: {
    borderRadius: wp(8),
    alignItems: 'center',
    paddingVertical: hp(1.45),
  },
  payBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: hp(5.2),
  },
  actionIcon: {
    marginRight: wp(3),
  },
  actionTitle: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  quoteWrap: {
    alignItems: 'center',
    paddingHorizontal: wp(8),
    paddingBottom: hp(1),
  },
  quoteIcon: {
    marginBottom: hp(0.8),
  },
  quote: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
    lineHeight: Fontsize.m,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  summaryAmount: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginTop: hp(0.6),
  },
  summaryMeta: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.7),
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: 0,
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
    minWidth: 0,
  },
  detailTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  detailHint: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.25),
  },
  detailAmount: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
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
    minWidth: 0,
    marginRight: wp(2),
  },
  historyTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  historyMeta: {
    color: Colors.textSecondary,
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
    marginTop: hp(1.3),
    paddingTop: hp(1.15),
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: 'rgba(19, 69, 163, 0.12)',
  },
  historyAmountLabel: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  historyAmount: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  receiptIcon: {
    marginRight: wp(3),
    marginTop: hp(0.1),
  },
  receiptBody: {
    flex: 1,
    minWidth: 0,
  },
  receiptTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptTitle: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  typeChip: {
    backgroundColor: Colors.bannerIceEnd,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.35),
  },
  typeChipText: {
    color: Colors.brandNavy,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  receiptDate: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.35),
  },
  receiptDivider: {
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: 'rgba(19, 69, 163, 0.12)',
    marginTop: hp(1.05),
    marginBottom: hp(0.85),
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    color: Colors.brandRoyal,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
    marginLeft: wp(1.4),
  },
  empty: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(4),
  },
});
