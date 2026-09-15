import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../Assets';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const FEE_TABS = [
  {id: 'school', label: Strings.schoolFees},
  {id: 'transport', label: Strings.transportFees},
];

const SCHOOL_ACTIONS = [
  {
    id: 'details',
    title: Strings.feeDetails,
    icon: 'document-text-outline',
    iconBg: Colors.purpleSoft,
    iconColor: Colors.iconPurple,
  },
  {
    id: 'history',
    title: Strings.paymentHistory,
    icon: 'card-outline',
    iconBg: Colors.blueSoft,
    iconColor: Colors.primary,
  },
  {
    id: 'receipts',
    title: Strings.receiptsChallans,
    icon: 'receipt-outline',
    iconBg: Colors.greenSoft,
    iconColor: Colors.iconGreen,
  },
];

const TRANSPORT_ACTIONS = [
  {
    id: 'transport',
    title: Strings.transport,
    icon: 'bus-outline',
    iconBg: Colors.orangeSoft,
    iconColor: Colors.iconOrange,
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

const Fee = () => {
  const navigation = useNavigation();
  const {activeStudent, feeDetails, unreadNotificationCount} = useRoleData();
  const fee = feeDetails || {};
  const [feeTab, setFeeTab] = useState('school');
  const [viewMode, setViewMode] = useState('home');
  const current = feeTab === 'transport' ? fee.transport : fee.school;
  const classLabel = activeStudent?.section
    ? `${activeStudent.className} - ${activeStudent.section}`
    : activeStudent?.classBadge;
  const actionItems = feeTab === 'transport' ? TRANSPORT_ACTIONS : SCHOOL_ACTIONS;
  const headerTitle = VIEW_TITLES[viewMode] || Strings.fee;
  const details = fee.details || [];
  const history = fee.history || [];
  const receipts = fee.receipts || [];

  const handleActionPress = item => {
    if (item.id === 'transport') {
      navigation.navigate('Transport');
      return;
    }
    setViewMode(item.id);
  };

  const renderHome = () => (
    <>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.studentCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{activeStudent?.initials}</Text>
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName} numberOfLines={1}>
            {activeStudent?.label}
          </Text>
          <Text style={styles.studentClass} numberOfLines={1}>
            {classLabel}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.tabWrap}>
        {FEE_TABS.map(tab => {
          const active = tab.id === feeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              activeOpacity={0.85}
              onPress={() => setFeeTab(tab.id)}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.termCard}>
        <View style={styles.termTop}>
          <View style={styles.termIcon}>
            <Icon name="wallet-outline" size={wp(4.5)} color={Colors.primary} />
          </View>
          <Text style={styles.termTitle}>{current?.term || fee.term}</Text>
          <View style={styles.dueBadge}>
            <Text style={styles.dueBadgeText}>{Strings.dueSoon}</Text>
          </View>
        </View>
        <Text style={styles.amount}>{current?.dueAmount || fee.dueAmount}</Text>
        <Text style={styles.dueDate}>
          {Strings.dueDateLabel} {current?.dueDate || fee.dueDate}
        </Text>
        <TouchableOpacity style={styles.payBtn} activeOpacity={0.85}>
          <Text style={styles.payBtnText}>{Strings.payOnline}</Text>
        </TouchableOpacity>
      </View>

      {actionItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.action}
          activeOpacity={0.85}
          onPress={() => handleActionPress(item)}>
          <View style={[styles.actionIcon, {backgroundColor: item.iconBg}]}>
            <Icon name={item.icon} size={wp(5)} color={item.iconColor} />
          </View>
          <Text style={styles.actionTitle}>{item.title}</Text>
          <Icon name="chevron-forward" size={wp(4.5)} color={Colors.grayText} />
        </TouchableOpacity>
      ))}

      <View style={styles.quoteWrap}>
        <Image source={Images.cap} style={styles.quoteIcon} resizeMode="contain" />
        <Text style={styles.quote}>{Strings.feeQuote}</Text>
      </View>
    </>
  );

  const renderDetails = () => (
    <>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
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

      <Text style={styles.sectionTitle}>{Strings.feeBreakdownTitle}</Text>
      {details.length ? (
        details.map((item, index) => (
          <View key={item.id} style={styles.detailCard}>
            <View style={styles.detailIcon}>
              <Icon
                name={DETAIL_ICONS[item.title] || 'cash-outline'}
                size={wp(5)}
                color={Colors.primary}
              />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailTitle}>{item.title}</Text>
              <Text style={styles.detailHint}>
                {index + 1} of {details.length}
              </Text>
            </View>
            <Text style={styles.detailAmount}>{item.amount}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>{Strings.noFeeDetails}</Text>
      )}
    </>
  );

  const renderHistory = () =>
    history.length ? (
      history.map(item => (
        <View key={item.id} style={styles.historyCard}>
          <View style={styles.historyTop}>
            <View style={styles.historyIconWrap}>
              <Icon name="checkmark-circle" size={wp(5.5)} color={Colors.success} />
            </View>
            <View style={styles.historyText}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyMeta}>
                {Strings.paidOn} {item.date}
              </Text>
            </View>
            <View style={styles.paidChip}>
              <Text style={styles.paidChipText}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.historyBottom}>
            <Text style={styles.historyAmountLabel}>{Strings.dueAmount}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.empty}>{Strings.noPaymentHistory}</Text>
    );

  const renderReceipts = () =>
    receipts.length ? (
      receipts.map(item => (
        <View key={item.id} style={styles.receiptCard}>
          <View style={styles.receiptIcon}>
            <Icon
              name={item.type === 'Challan' ? 'document-outline' : 'receipt-outline'}
              size={wp(6)}
              color={Colors.primary}
            />
          </View>
          <View style={styles.receiptBody}>
            <View style={styles.receiptTop}>
              <Text style={styles.receiptTitle}>{item.title}</Text>
              <View style={styles.typeChip}>
                <Text style={styles.typeChipText}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.receiptDate}>{item.date}</Text>
            <TouchableOpacity style={styles.downloadRow} activeOpacity={0.85}>
              <Icon name="download-outline" size={wp(4)} color={Colors.primary} />
              <Text style={styles.downloadText}>{Strings.downloadPdf}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.empty}>{Strings.noReceipts}</Text>
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={headerTitle}
        notificationCount={unreadNotificationCount || 1}
        onBackPress={viewMode === 'home' ? undefined : () => setViewMode('home')}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {viewMode === 'home' && renderHome()}
        {viewMode === 'details' && renderDetails()}
        {viewMode === 'history' && renderHistory()}
        {viewMode === 'receipts' && renderReceipts()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(6),
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2.1),
    marginBottom: hp(1.8),
  },
  avatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  avatarText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  studentInfo: {
    flex: 1,
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
  tabWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(8),
    padding: wp(1.2),
    marginBottom: hp(1.8),
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.15),
    borderRadius: wp(7),
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
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
  termCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    padding: wp(4.5),
    marginBottom: hp(1.6),
  },
  termTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termIcon: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  termTitle: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  dueBadge: {
    backgroundColor: Colors.orangeSoft,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.45),
  },
  dueBadgeText: {
    color: Colors.iconOrange,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  amount: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.md,
    marginTop: hp(1.6),
  },
  dueDate: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.5),
    marginBottom: hp(1.8),
  },
  payBtn: {
    backgroundColor: Colors.primary,
    borderRadius: wp(8),
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  payBtnText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
    marginBottom: hp(1.2),
  },
  actionIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  actionTitle: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  quoteWrap: {
    alignItems: 'center',
    marginTop: hp(2.5),
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
  summaryCard: {
    borderRadius: wp(5),
    padding: wp(5),
    marginBottom: hp(2),
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
    marginBottom: hp(1.2),
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(3.5),
    marginBottom: hp(1.2),
  },
  detailIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  detailText: {
    flex: 1,
  },
  detailTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  detailHint: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xxm,
    marginTop: hp(0.25),
  },
  detailAmount: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(4),
    marginBottom: hp(1.3),
  },
  historyTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIconWrap: {
    marginRight: wp(2.5),
  },
  historyText: {
    flex: 1,
  },
  historyTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  historyMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.25),
  },
  paidChip: {
    backgroundColor: Colors.greenSoft,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.4),
  },
  paidChipText: {
    color: Colors.iconGreen,
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
    borderTopColor: Colors.border,
  },
  historyAmountLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
  },
  historyAmount: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  receiptCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(4),
    marginBottom: hp(1.3),
  },
  receiptIcon: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(4),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
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
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
    marginRight: wp(2),
  },
  typeChip: {
    backgroundColor: Colors.parentBg,
    borderRadius: wp(4),
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(0.35),
  },
  typeChipText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xxm,
  },
  receiptDate: {
    color: Colors.grayText,
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
    color: Colors.primary,
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
