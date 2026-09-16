import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const INFO_ROWS = [
  {key: 'driverName', label: Strings.driverNameLabel},
  {key: 'driverContact', label: Strings.driverContact},
  {key: 'pickupTime', label: Strings.pickupTime},
  {key: 'dropTime', label: Strings.dropTime},
];

const Transport = () => {
  const {activeStudent, transportDetails, classLabel} = useRoleData();
  const transport = transportDetails || {};

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent title={Strings.transport} notificationCount={1} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
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

        <View style={styles.mapCard}>
          <Image
            source={Images.transportMap}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.busCard}>
          <View style={styles.busTop}>
            <View style={styles.busIcon}>
              <Icon name="bus" size={wp(6)} color={Colors.iconOrange} />
            </View>
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
        </View>

        <View style={styles.notifyCard}>
          <View style={styles.notifyIcon}>
            <Image
              source={Images.notification}
              style={styles.notifyImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.notifyText}>{Strings.busNotify}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transport;

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
    marginBottom: hp(1.6),
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
  mapCard: {
    width: wp(92),
    height: wp(92),
    alignSelf: 'center',
    borderRadius: wp(5.5),
    backgroundColor: '#E8EEE8',
    marginBottom: hp(1.6),
    overflow: 'hidden',
  },
  mapImage: {
    width: wp(92),
    height: wp(92),
  },
  busCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    padding: wp(4.5),
    marginBottom: hp(1.4),
  },
  busTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  busIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3.5),
    backgroundColor: Colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  busInfo: {
    flex: 1,
  },
  busName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  busNo: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.2),
  },
  routeBadge: {
    backgroundColor: Colors.greenSoft,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.45),
  },
  routeBadgeText: {
    color: Colors.iconGreen,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xxm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.05),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  infoLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  infoValue: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  notifyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.orangeSoft,
    borderRadius: wp(4.5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5),
  },
  notifyIcon: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  notifyImage: {
    width: wp(4.5),
    height: wp(4.5),
    tintColor: Colors.iconOrange,
  },
  notifyText: {
    flex: 1,
    color: Colors.mutedText,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.m,
  },
});
