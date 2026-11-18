import React, {useCallback, useMemo, useRef, useState} from 'react';

import {ActivityIndicator, Modal, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchParentProfile, fetchStudentProfile, logoutParent, logoutStudent} from '../../store/slices/authSlice';
import {studentIdCardDownloadUrl} from '../../services/studentService';
import {showToast} from '../../utils/toast';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';

import MainHeaderComponent from '../../Component/MainHeaderComponent';
import StudentBrandedHeader from '../../Component/Student/StudentBrandedHeader';
import EschoolyScreenShell, {
  FLOAT_CARD_GAP,
  FLOAT_CARD_TUCK,
  NAVY_ICE_CURVE,
} from '../../Component/Glass/EschoolyScreenShell';

import ParentIdentityCard from '../../Component/Parent/ParentIdentityCard';

import ParentMoreInfoModal from '../../Component/Parent/ParentMoreInfoModal';

import IdCardPreview from '../../Component/StudentIdCard/IdCardPreview';

import ProfileActionCard from '../../Component/Profile/ProfileActionCard';
import AnimatedCard from '../../Component/AnimatedCard';
import CardWave, {SCREEN_WAVES} from '../../Component/CardWave';

import {

  ACTION_ICON_COLOR,

  CARD_RADIUS,

  DETAIL_ICON_COLOR,

  GRADIENT_END,

  GRADIENT_START,

  IDENTITY_CARD_SHADOW,

  PROFILE_GRADIENT,

} from '../../Component/Profile/ProfileTheme';

import {useProfileStudent} from '../../hooks/useProfileStudent';

import {Colors} from '../../Constants/Colors';

import {Fonts} from '../../Constants/Fonts';

import {Fontsize} from '../../Constants/Fontsize';

import {Strings} from '../../Constants/Strings';

import {wp, hp} from '../../Constants/Responsive';
import {elevation, radius} from '../../Constants/Theme';
import {
  StudentToneProvider,
  useStackBottomPad,
} from '../../Component/Glass/StudentTone';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {getHomeScreenEnter} from '../../utils/cardAnimation';



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
  const dispatch = useDispatch();
  const apiProfile = useSelector(state => state.auth.profile);
  const profileLoading = useSelector(state => state.auth.profileLoading);
  const loggingOut = useSelector(state => state.auth.logoutLoading);
  const authRole = useSelector(state => state.auth.role);
  const logoutLock = useRef(false);

  const {profilePerson, profileDetails, isParent} = useProfileStudent();
  const icy = !isParent;
  const stackPad = useStackBottomPad();
  const bottomPad = isTab ? hp(3) : stackPad;
  const unreadNotifications = useSelector(
    state => state.studentHome?.unreadNotifications || 0,
  );
  const canDownloadIdCard = authRole === 'student' && !isParent;
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const parentPerson = useMemo(() => {
    if (!isParent || !apiProfile) {
      return profilePerson;
    }
    return {...profilePerson, ...apiProfile};
  }, [apiProfile, isParent, profilePerson]);

  const parentDetails = useMemo(() => {
    if (!isParent || !apiProfile) {
      return profileDetails;
    }
    return profileDetails.map(item => {
      const value = apiProfile[item.key];
      return value ? {...item, value} : item;
    });
  }, [apiProfile, isParent, profileDetails]);

  const studentCard = !isParent ? apiProfile?.card : null;
  const studentDetails = !isParent ? apiProfile?.details || [] : [];
  const shownDetails = isParent ? parentDetails : studentDetails;
  const title = isParent ? Strings.parentAccount : Strings.myProfile;

  const openMoreInfo = useCallback(() => {
    if (moreInfoVisible) {
      return;
    }
    setModalReplay(value => value + 1);
    setMoreInfoVisible(true);
  }, [moreInfoVisible]);

  const closeMoreInfo = useCallback(() => {
    setMoreInfoVisible(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const request = isParent ? fetchParentProfile() : fetchStudentProfile();
      dispatch(request)
        .unwrap()
        .catch(error => {
          if (error?.message) {
            showToast({type: 'error', text1: error.message});
          }
        });
      return undefined;
    }, [dispatch, isParent]),
  );

  const openUpdatePassword = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('UpdatePassword');
      return;
    }
    navigation.navigate('UpdatePassword');
  };

  const handleDownloadIdCard = () => {
    if (!canDownloadIdCard) {
      return;
    }
    const nav = navigation.getParent() || navigation;
    nav.navigate('PdfViewer', {
      pdfUrl: studentIdCardDownloadUrl,
      title: Strings.studentIdCard,
    });
  };

  const resetToLogin = () => {
    const parentNav = navigation.getParent();
    const nav = parentNav || navigation;
    nav.reset({
      index: 0,
      routes: [{name: 'AuthNavigation'}],
    });
  };

  const handleLogout = async () => {
    if (loggingOut || logoutLock.current) {
      return;
    }

    logoutLock.current = true;
    try {
      const result = await dispatch(isParent ? logoutParent() : logoutStudent()).unwrap();
      if (result?.message) {
        showToast({type: 'success', text1: result.message});
      }
    } catch (error) {
      // Local session is already cleared. Return to login either way.
    } finally {
      setLogoutConfirmVisible(false);
      resetToLogin();
      logoutLock.current = false;
    }
  };

  const onLogoutPress = () => {
    if (loggingOut) {
      return;
    }
    if (!isParent) {
      setLogoutConfirmVisible(true);
      return;
    }
    handleLogout();
  };

  const studentActions = (
    <>
      {canDownloadIdCard ? (
        <ProfileActionCard
          icon="download-outline"
          iconColor={ACTION_ICON_COLOR.idCard}
          title={Strings.downloadIdCard}
          onPress={handleDownloadIdCard}
          animationIndex={4}
          entering={getHomeScreenEnter(4)}
        />
      ) : null}
      <ProfileActionCard
        icon="lock-closed-outline"
        iconColor={ACTION_ICON_COLOR.updatePassword}
        title={Strings.updatePassword}
        onPress={openUpdatePassword}
        animationIndex={5}
        entering={getHomeScreenEnter(5)}
      />
      <ProfileActionCard
        icon="log-out-outline"
        iconColor={ACTION_ICON_COLOR.logout}
        title={Strings.logout}
        onPress={onLogoutPress}
        loading={loggingOut}
        animationIndex={6}
        entering={getHomeScreenEnter(6)}
      />
    </>
  );

  const logoutModal = (
    <Modal
      visible={logoutConfirmVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (!loggingOut) {
          setLogoutConfirmVisible(false);
        }
      }}>
      <View style={styles.confirmOverlay}>
        <View style={[styles.confirmCard, icy && styles.confirmCardIcy]}>
          <Text style={[styles.confirmTitle, icy && styles.confirmTitleIcy]}>
            {Strings.logout}
          </Text>
          <Text style={[styles.confirmMessage, icy && styles.confirmMessageIcy]}>
            Are you sure you want to logout?
          </Text>
          <View style={styles.confirmActions}>
            <Pressable
              style={[styles.confirmNo, icy && styles.confirmNoIcy]}
              disabled={loggingOut}
              onPress={() => setLogoutConfirmVisible(false)}>
              <Text style={[styles.confirmNoText, icy && styles.confirmNoTextIcy]}>
                No
              </Text>
            </Pressable>
            <Pressable
              style={[styles.confirmYes, icy && styles.confirmYesIcy]}
              disabled={loggingOut}
              onPress={handleLogout}>
              {loggingOut ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text style={styles.confirmYesText}>Yes</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (icy) {
    return (
      <StudentToneProvider active>
        <EschoolyScreenShell variant="navy-ice">
          <ScrollEnterScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.studentScroll,
              {paddingBottom: bottomPad},
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled">
            <EschoolyScreenShell.Header style={styles.studentBand}>
              <StudentBrandedHeader
                title={title}
                unreadCount={unreadNotifications}
                onBackPress={
                  isTab ? () => navigation.navigate('Home') : undefined
                }
              />
            </EschoolyScreenShell.Header>
            <EschoolyScreenShell.Body tuck={false} style={styles.studentBody}>
              <View style={styles.canvasStage}>
                <View pointerEvents="none" style={styles.canvasWave}>
                  <CardWave
                    variant={SCREEN_WAVES.assignmentIce}
                    color="rgba(37, 99, 235, 0.12)"
                  />
                </View>
                <View style={styles.canvasForeground}>
                  {studentCard ? (
                    <AnimatedCard
                      index={1}
                      entering={getHomeScreenEnter(1)}
                      style={styles.idPreviewWrapIcy}>
                      <IdCardPreview data={studentCard} variant="ice" />
                    </AnimatedCard>
                  ) : profileLoading ? (
                    <ActivityIndicator
                      style={styles.profileLoader}
                      size="large"
                      color={Colors.brandRoyal}
                    />
                  ) : null}

                  {shownDetails.length > 0 ? (
                    <>
                      <AnimatedCard
                        index={2}
                        entering={getHomeScreenEnter(2)}
                        style={styles.sectionTitleEnter}>
                        <Text style={styles.cardDetailsSectionTitleIcy}>
                          {Strings.cardDetailsTitle}
                        </Text>
                      </AnimatedCard>
                      <AnimatedCard
                        index={3}
                        entering={getHomeScreenEnter(3)}
                        style={styles.detailsWrapIcy}>
                        <View style={styles.detailsClipIcy}>
                          <LinearGradient
                            colors={[Colors.bannerIceStart, Colors.bannerIceEnd]}
                            start={{x: 0, y: 0.08}}
                            end={{x: 1, y: 1}}
                            style={styles.detailsFillIcy}
                          />
                          <CardWave
                            variant={SCREEN_WAVES.assignmentIce}
                            color="rgba(19, 69, 163, 0.16)"
                          />
                          <View style={styles.detailsInnerIcy}>
                            {shownDetails.map((item, index) => (
                              <View
                                key={item.key}
                                style={[
                                  styles.detailRowIcyNew,
                                  index === shownDetails.length - 1 &&
                                    styles.detailRowLast,
                                ]}>
                                <View style={styles.detailIconIcy}>
                                  <Icon
                                    name={
                                      DETAIL_ICONS[item.key] ||
                                      'information-circle-outline'
                                    }
                                    size={wp(5)}
                                    color={Colors.brandRoyal}
                                  />
                                </View>
                                <View style={styles.detailText}>
                                  <Text style={styles.detailLabelIcy}>
                                    {item.label}
                                  </Text>
                                  <Text style={styles.detailValueIcy}>
                                    {item.value}
                                  </Text>
                                </View>
                                <Icon
                                  name="chevron-forward"
                                  size={wp(5)}
                                  color={Colors.brandRoyal}
                                />
                              </View>
                            ))}
                          </View>
                        </View>
                      </AnimatedCard>
                    </>
                  ) : null}

                  {studentActions}
                </View>
              </View>
            </EschoolyScreenShell.Body>
          </ScrollEnterScrollView>
          {logoutModal}
        </EschoolyScreenShell>
      </StudentToneProvider>
    );
  }

  return (
    <StudentToneProvider active={false}>
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor={Colors.parentBg}
        barStyle="dark-content"
      />
      <MainHeaderComponent
        title={title}
        notificationCount={1}
        navyBack
        onBackPress={
          isTab ? () => navigation.navigate('Home') : undefined
        }
      />
      <ScrollEnterScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.content, {paddingBottom: bottomPad}]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">
        <ParentIdentityCard
          person={parentPerson}
          animationIndex={1}
          entering={getHomeScreenEnter(1)}
        />
        {shownDetails.length > 0 ? (
        <>
        <AnimatedCard
          index={2}
          entering={getHomeScreenEnter(2)}
          style={styles.sectionTitleEnter}>
          <Text style={styles.sectionTitle}>{Strings.contactDetails}</Text>
        </AnimatedCard>
        <AnimatedCard
          index={3}
          entering={getHomeScreenEnter(3)}
          style={styles.contactCardEnter}>
          <View style={[styles.gradientCardWrap, IDENTITY_CARD_SHADOW]}>
            <LinearGradient
              colors={PROFILE_GRADIENT}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.detailsCard}>
            <CardWave variant={SCREEN_WAVES.contactDetails} />
            {shownDetails.map((item, index) => (
              <View
                key={item.key}
                style={[
                  styles.detailRow,
                  index === shownDetails.length - 1 && styles.detailRowLast,
                ]}>
                <View style={styles.iconWrap}>
                  <Icon
                    name={DETAIL_ICONS[item.key] || 'information-circle-outline'}
                    size={wp(5)}
                    color={DETAIL_ICON_COLOR[item.key] || Colors.iconSky}
                  />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
                <Icon
                  name="chevron-forward"
                  size={wp(5)}
                  color={Colors.whiteMuted85}
                />
              </View>
            ))}
            </LinearGradient>
          </View>
        </AnimatedCard>
        </>
        ) : null}
        <ProfileActionCard
          icon="information-circle-outline"
          iconColor={ACTION_ICON_COLOR.moreInfo}
          title={Strings.moreInfo}
          onPress={openMoreInfo}
          animationIndex={4}
          entering={getHomeScreenEnter(4)}
        />
        <ProfileActionCard
          icon="lock-closed-outline"
          iconColor={ACTION_ICON_COLOR.updatePassword}
          title={Strings.updatePassword}
          onPress={openUpdatePassword}
          animationIndex={5}
          entering={getHomeScreenEnter(5)}
        />
        <ProfileActionCard
          icon="log-out-outline"
          iconColor={ACTION_ICON_COLOR.logout}
          title={Strings.logout}
          onPress={onLogoutPress}
          loading={loggingOut}
          animationIndex={6}
          entering={getHomeScreenEnter(6)}
        />
      </ScrollEnterScrollView>
      {moreInfoVisible ? (
        <ParentMoreInfoModal
          visible
          person={parentPerson}
          replayToken={modalReplay}
          onClose={closeMoreInfo}
        />
      ) : null}
      {logoutModal}
    </SafeAreaView>
    </StudentToneProvider>
  );
};

export default withScreenEnter(MyProfile, 'myProfile');



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.parentBg,

  },
  containerStudent: {
    backgroundColor: Colors.canvas,
  },
  detailsCardIcyWrap: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
  detailsCardIcy: {
    backgroundColor: Colors.surface,
  },
  detailRowIcy: {
    borderBottomColor: Colors.borderSubtle,
  },
  detailLabelIcy: {
    color: Colors.textSecondary,
  },
  detailValueIcy: {
    color: Colors.textPrimary,
  },

  scrollArea: {
    flex: 1,
  },

  content: {

    paddingHorizontal: wp(4),

    paddingTop: hp(0.8),

    paddingBottom: hp(3),

  },

  profileLoader: {
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  idPreviewWrap: {
    width: '100%',
    marginBottom: hp(2.4),
  },

  sectionTitleEnter: {
    marginTop: hp(0.4),
    marginBottom: hp(1.2),
  },

  sectionTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: 0,
    marginTop: 0,
  },

  cardDetailsSectionTitle: {
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 0,
    marginTop: 0,
  },

  contactCardEnter: {
    marginBottom: hp(0.4),
  },

  gradientCardWrap: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: Colors.transparent,
  },

  detailsCard: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(0.6),
    overflow: 'hidden',
  },

  detailRow: {

    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: hp(1.2),

    borderBottomWidth: 1,

    borderBottomColor: Colors.whiteOverlay18,

  },

  detailRowLast: {

    borderBottomWidth: 0,

  },

  iconWrap: {
    width: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    zIndex: 1,
  },
  detailText: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
    zIndex: 1,
  },

  detailLabel: {

    color: Colors.whiteMuted75,

    fontFamily: Fonts.medium,

    fontSize: Fontsize.xxm,

    letterSpacing: 0.4,

  },

  detailValue: {

    color: Colors.white,

    fontFamily: Fonts.semibold,

    fontSize: Fontsize.xs1,

    marginTop: hp(0.08),

  },

  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 26, 61, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
  },
  confirmCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: CARD_RADIUS,
    paddingHorizontal: wp(5),
    paddingTop: hp(2.2),
    paddingBottom: hp(2),
  },
  confirmTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
  },
  confirmMessage: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    marginTop: hp(0.8),
  },
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp(3),
    marginTop: hp(2.2),
  },
  confirmNo: {
    minWidth: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: CARD_RADIUS,
    backgroundColor: Colors.parentBg,
  },
  confirmNoText: {
    color: Colors.black,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  confirmYes: {
    minWidth: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: CARD_RADIUS,
    backgroundColor: PROFILE_GRADIENT[0],
  },
  confirmYesText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: Fontsize.xs1,
  },
  studentScroll: {
    flexGrow: 1,
    backgroundColor: Colors.canvas,
    overflow: 'visible',
  },
  studentBand: {
    borderBottomLeftRadius: NAVY_ICE_CURVE,
    paddingBottom: FLOAT_CARD_GAP + FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  studentBody: {
    paddingTop: 0,
    marginTop: -FLOAT_CARD_TUCK,
    overflow: 'visible',
  },
  canvasStage: {
    position: 'relative',
    overflow: 'visible',
    minHeight: hp(62),
  },
  canvasWave: {
    position: 'absolute',
    top: hp(2),
    right: -wp(4),
    left: 0,
    height: hp(56),
    zIndex: 0,
  },
  canvasForeground: {
    zIndex: 1,
  },
  idPreviewWrapIcy: {
    width: '100%',
    marginBottom: hp(1.35),
    zIndex: 2,
    overflow: 'visible',
  },
  cardDetailsSectionTitleIcy: {
    color: Colors.brandNavy,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    letterSpacing: 0.2,
    marginBottom: 0,
    marginTop: 0,
  },
  detailsWrapIcy: {
    marginBottom: hp(0.6),
    overflow: 'visible',
    backgroundColor: Colors.bannerIceStart,
    borderRadius: radius.banner,
    ...elevation.card,
  },
  detailsClipIcy: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: radius.banner,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
  },
  detailsFillIcy: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsInnerIcy: {
    paddingHorizontal: wp(3.4),
    paddingVertical: hp(0.5),
    zIndex: 1,
  },
  detailRowIcyNew: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.25),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.borderSubtle,
  },
  detailIconIcy: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  confirmCardIcy: {
    backgroundColor: Colors.bannerIceStart,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(91, 156, 255, 0.35)',
    ...elevation.banner,
  },
  confirmTitleIcy: {
    color: Colors.brandNavy,
  },
  confirmMessageIcy: {
    color: Colors.textSecondary,
  },
  confirmNoIcy: {
    backgroundColor: Colors.hubCard,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.borderSubtle,
  },
  confirmNoTextIcy: {
    color: Colors.brandNavy,
  },
  confirmYesIcy: {
    backgroundColor: Colors.brandNavy,
  },
});

