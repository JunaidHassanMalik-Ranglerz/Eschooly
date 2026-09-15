import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeaderComponent from '../../Component/MainHeaderComponent';
import ParentIdentityCard from '../../Component/Parent/ParentIdentityCard';
import IdCardPreview from '../../Component/StudentIdCard/IdCardPreview';
import Btn from '../../Component/btn';
import {useProfileStudent} from '../../hooks/useProfileStudent';
import {useRoleData} from '../../hooks/useRoleData';
import {getIdCardData} from '../../Constants/StudentIdCardData';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';

const STUDENT_MENU_META = {
  mySyllabus: {icon: 'book-outline', bg: Colors.blueSoft, color: Colors.iconBlue},
  onlineExams: {icon: 'clipboard-outline', bg: Colors.pinkSoft, color: Colors.iconPink},
  onlineClasses: {icon: 'videocam-outline', bg: Colors.cyanSoft, color: Colors.iconCyan},
  digitalLibrary: {icon: 'library-outline', bg: Colors.orangeSoft, color: Colors.iconOrange},
  studentIdCard: {icon: 'id-card-outline', bg: Colors.tealSoft, color: Colors.iconTeal},
};

const DETAIL_ICONS = {
  cnic: 'card-outline',
  email: 'mail-outline',
  phone: 'call-outline',
  address: 'location-outline',
  studentId: 'id-card-outline',
  guardian: 'people-outline',
  dob: 'calendar-outline',
  class: 'school-outline',
  section: 'people-outline',
};

const MyProfile = ({isTab = false}) => {
  const navigation = useNavigation();
  const {profilePerson, profileDetails, isParent, menuList} = useProfileStudent();
  const {childList, setSelectedChildId} = useRoleData();
  const [showChildren, setShowChildren] = useState(false);
  const title = isParent ? Strings.parentAccount : Strings.myProfile;
  const heroInitials = (profilePerson?.label || '')
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const shortcuts = (menuList || []).filter(
    item =>
      item.screen && item.value !== 'myProfile' && item.value !== 'menu',
  );

  const openChildProfile = child => {
    setSelectedChildId(child.value);
    navigation.navigate('ChildProfile');
  };

  const handleLogout = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.reset({
        index: 0,
        routes: [{name: 'AuthNavigation'}],
      });
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{name: 'AuthNavigation'}],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />
      <MainHeaderComponent
        title={title}
        notificationCount={1}
        hideBack={isTab}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.hero}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroInitials}>{heroInitials || profilePerson?.initials}</Text>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroName} numberOfLines={1}>
              {profilePerson?.label}
            </Text>
            <View style={styles.rolePill}>
              <Text style={styles.rolePillText}>
                {profilePerson?.classBadge}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {isParent ? (
          <ParentIdentityCard person={profilePerson} />
        ) : (
          <IdCardPreview data={getIdCardData(profilePerson)} />
        )}

        <Text style={styles.sectionTitle}>{Strings.contactDetails}</Text>
        <View style={styles.detailsCard}>
          {profileDetails.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.detailRow,
                index === profileDetails.length - 1 && styles.detailRowLast,
              ]}>
              <View style={styles.detailIcon}>
                <Icon
                  name={DETAIL_ICONS[item.key] || 'information-circle-outline'}
                  size={wp(5)}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {isParent ? (
          <View style={styles.moreWrap}>
            <Pressable
              style={styles.moreBtn}
              onPress={() => setShowChildren(prev => !prev)}
              android_ripple={{color: Colors.lightGray}}>
              <View style={styles.moreIcon}>
                <Icon
                  name="information-circle-outline"
                  size={wp(5.2)}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.moreTitle}>{Strings.moreInfo}</Text>
              <Icon
                name={showChildren ? 'chevron-up' : 'chevron-down'}
                size={wp(5)}
                color={Colors.grayText}
              />
            </Pressable>

            {showChildren ? (
              <View style={styles.childrenBox}>
                <Text style={styles.childrenHeading}>{Strings.myChildren}</Text>
                {childList.map((child, index) => (
                  <Pressable
                    key={child.value}
                    style={[
                      styles.childRow,
                      index === childList.length - 1 && styles.childRowLast,
                    ]}
                    onPress={() => openChildProfile(child)}
                    android_ripple={{color: Colors.lightGray}}>
                    <View style={styles.childAvatar}>
                      <Text style={styles.childInitials}>{child.initials}</Text>
                    </View>
                    <View style={styles.childInfo}>
                      <Text style={styles.childName} numberOfLines={1}>
                        {child.label}
                      </Text>
                      <Text style={styles.childMeta} numberOfLines={1}>
                        {child.classBadge}
                      </Text>
                      {child.rollNo ? (
                        <Text style={styles.childRoll} numberOfLines={1}>
                          {Strings.rollNo} {child.rollNo}
                        </Text>
                      ) : null}
                    </View>
                    <Icon
                      name="chevron-forward"
                      size={wp(4.5)}
                      color={Colors.grayText}
                    />
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.moreWrap}>
            <Text style={styles.sectionTitle}>{Strings.quickAccess}</Text>
            <View style={styles.detailsCard}>
              {shortcuts.map((item, index) => {
                const meta = STUDENT_MENU_META[item.value] || {
                  icon: 'grid-outline',
                  bg: Colors.blueSoft,
                  color: Colors.primary,
                };
                return (
                  <Pressable
                    key={item.value}
                    style={[
                      styles.detailRow,
                      index === shortcuts.length - 1 && styles.detailRowLast,
                    ]}
                    onPress={() => navigation.navigate(item.screen)}
                    android_ripple={{color: Colors.lightGray}}>
                    <View style={[styles.detailIcon, {backgroundColor: meta.bg}]}>
                      <Icon name={meta.icon} size={wp(5)} color={meta.color} />
                    </View>
                    <View style={styles.detailText}>
                      <Text style={styles.shortcutTitle} numberOfLines={1}>
                        {item.label}
                      </Text>
                    </View>
                    <Icon
                      name="chevron-forward"
                      size={wp(4.5)}
                      color={Colors.grayText}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <Btn
          variant="outline"
          icon="log-out-outline"
          title={Strings.logout}
          style={styles.logoutBtn}
          onPress={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parentBg,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
    paddingBottom: hp(3),
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5.5),
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2.1),
    marginBottom: hp(2.2),
  },
  heroAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: Colors.whiteOverlay22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  heroInitials: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
  },
  heroText: {
    flex: 1,
  },
  heroName: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.7),
  },
  rolePill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.whiteOverlay22,
    borderRadius: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
  },
  rolePillText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs0,
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(1.2),
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.4),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailRowLast: {
    borderBottomWidth: 0,
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
  detailLabel: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.25),
  },
  detailValue: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  moreWrap: {
    marginTop: hp(2.4),
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
  },
  moreIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  moreTitle: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  shortcutTitle: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs5,
  },
  childrenBox: {
    marginTop: hp(1.2),
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(3.5),
    paddingTop: hp(1.5),
    paddingBottom: hp(0.4),
  },
  childrenHeading: {
    color: Colors.grayText,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs0,
    marginBottom: hp(0.6),
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.4),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  childRowLast: {
    borderBottomWidth: 0,
  },
  childAvatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  childInitials: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs1,
  },
  childInfo: {
    flex: 1,
    marginRight: wp(2),
  },
  childName: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.xs5,
  },
  childMeta: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.15),
  },
  childRoll: {
    color: Colors.mutedText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs0,
    marginTop: hp(0.15),
  },
  logoutBtn: {
    marginTop: hp(2.4),
    marginBottom: hp(1),
  },
});
