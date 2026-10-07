import React from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationCard from '../../Component/NotificationCard';
import AnimatedCard from '../../Component/AnimatedCard';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {ScreenEnterProvider} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';

const NAVY = '#071A3D';
const SCREEN_BG = '#DCEBFD';

const NotificationContent = () => {
  const navigation = useNavigation();
  const {notifications} = useRoleData();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={SCREEN_BG} barStyle="dark-content" />

      <AnimatedCard index={0} entering={getHomeScreenEnter(0)} style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={wp(5.5)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{Strings.notifications}</Text>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.85}>
          <Image
            source={Images.threeDots}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </AnimatedCard>

      <AnimatedCard index={1} entering={getHomeScreenEnter(1)} style={styles.tabsCard}>
        <View style={styles.tabsRow}>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabText}>{Strings.tabAll}</Text>
          </View>
        </View>
      </AnimatedCard>

      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        {notifications.length === 0 ? (
          <Text style={styles.empty}>{Strings.noNotifications}</Text>
        ) : (
          notifications.map((item, index) => {
            const slot = index + 2;
            return (
              <NotificationCard
                key={item.id}
                item={item}
                animationIndex={slot}
                entering={getHomeScreenEnter(slot)}
              />
            );
          })
        )}
      </ScrollEnterScrollView>
    </SafeAreaView>
  );
};

const Notification = () => (
  <ScreenEnterProvider motion="notification">
    <NotificationContent />
  </ScreenEnterProvider>
);

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(0.8),
    paddingBottom: hp(1.2),
    backgroundColor: SCREEN_BG,
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: NAVY,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.sm,
  },
  menuBtn: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: NAVY,
  },
  tabsCard: {
    marginHorizontal: wp(4),
    marginBottom: hp(0.4),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(0.2),
    backgroundColor: SCREEN_BG,
  },
  tab: {
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(0.7),
    borderRadius: wp(6),
    marginRight: wp(2),
  },
  tabActive: {
    backgroundColor: NAVY,
  },
  tabText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.4),
    paddingBottom: hp(3),
    flexGrow: 1,
  },
  empty: {
    textAlign: 'center',
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(6),
  },
});
