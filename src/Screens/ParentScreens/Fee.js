import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedCard from '../../Component/AnimatedCard';
import {SCREEN_WAVES} from '../../Component/CardWave';
import ParentNavyIceLayout from '../../Component/Parent/ParentNavyIceLayout';
import ParentIceCard from '../../Component/Parent/ParentIceCard';
import SelectedChildBanner from '../../Component/SelectedChildBanner';
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
  const {activeStudent, feeDetails, unreadNotificationCount} = useRoleData();
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
      <SelectedChildBanner
        child={activeStudent}
        icy
        canSwitch={false}
        compactMargin
        animationIndex={1}
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
        <ParentIceCard waveVariant={SCREEN_WAVES.fees}>
          <View style={styles.termTop}>
            <FeatureArtImage
              source={EducationIcons.fees}
              size={wp(11)}
              style={styles.termIcon}
            />
            <Text style={styles.termTitle} numberOfLines={1}>
              {current?.term || fee.term}
            </Text>
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
              colors={[Colors.brandNavy, Colors.brandRoyal, Colors.brandAccent]}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.payBtn}>
              <Text style={styles.payBtnText}>{Strings.payOnline}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ParentIceCard>
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

  const renderDetails = () => (
    <>
      <AnimatedCard
        index={1}
        entering={getHomeScreenEnter(1)}
        replayToken={viewReplay}>
        <ParentIceCard waveVariant={SCREEN_WAVES.fees}>
          <Text style={styles.summaryLabel}>{Strings.totalPayable}</Text>
          <Text style={styles.summaryAmount}>
            {current?.dueAmount || fee.dueAmount}
          </Text>
          <Text style={styles.summaryMeta}>
            {current?.term || fee.term} · {Strings.dueDateLabel}{' '}
            {current?.dueDate || fee.dueDate}
          </Text>
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
                      {index + 1} of {details.length}
                    </Text>
                  </View>
                  <Text style={styles.detailAmount}>{item.amount}</Text>
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
    history.length ? (
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
            </ParentIceCard>
          </AnimatedCard>
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
          <AnimatedCard
            key={item.id}
            index={slot}
            entering={getHomeScreenEnter(slot)}
            replayToken={viewReplay}>
            <ParentIceCard>
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
                  <Text style={styles.receiptDate}>{item.date}</Text>
                  <View style={styles.receiptDivider} />
                  <TouchableOpacity style={styles.downloadRow} activeOpacity={0.85}>
                    <Icon
                      name="download-outline"
                      size={wp(4)}
                      color={Colors.brandRoyal}
                    />
                    <Text style={styles.downloadText}>{Strings.downloadPdf}</Text>
                  </TouchableOpacity>
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
