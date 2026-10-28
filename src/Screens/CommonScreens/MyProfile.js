import React, {useCallback, useMemo, useRef, useState} from 'react';

import {ActivityIndicator, Modal, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchParentProfile, fetchStudentProfile, logoutParent, logoutStudent} from '../../store/slices/authSlice';
import {downloadStudentIdCard} from '../../store/slices/studentHomeSlice';
import {showToast} from '../../utils/toast';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';

import MainHeaderComponent from '../../Component/MainHeaderComponent';

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
  const canDownloadIdCard = authRole === 'student' && !isParent;
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const [downloadingCard, setDownloadingCard] = useState(false);

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

  const handleDownloadIdCard = async () => {
    if (!canDownloadIdCard || downloadingCard) {
      return;
    }
    setDownloadingCard(true);
    try {
      const file = await dispatch(downloadStudentIdCard()).unwrap();
      if (file?.savedToDevice) {
        showToast({type: 'success', text1: Strings.idCardDownloadSuccess});
      }
      if (file?.uri) {
        const parentNav = navigation.getParent();
        const nav = parentNav || navigation;
        nav.navigate('PdfViewer', {
          pdfUrl: file.uri,
          title: Strings.studentIdCard,
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        text1: error?.message || Strings.idCardDownloadFailed,
      });
    } finally {
      setDownloadingCard(false);
    }
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



  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <StatusBar backgroundColor={Colors.parentBg} barStyle="dark-content" />

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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled">

        {isParent ? (
          <ParentIdentityCard
            person={isParent ? parentPerson : profilePerson}
            animationIndex={1}
            entering={getHomeScreenEnter(1)}
          />
        ) : studentCard ? (
          <AnimatedCard
            index={1}
            entering={getHomeScreenEnter(1)}
            style={styles.idPreviewWrap}>
            <IdCardPreview data={studentCard} navy />
          </AnimatedCard>
        ) : profileLoading ? (
          <ActivityIndicator
            style={styles.profileLoader}
            size="large"
            color={Colors.primary}
          />
        ) : null}

        {isParent || shownDetails.length > 0 ? (
        <>
        <AnimatedCard
          index={2}
          entering={getHomeScreenEnter(2)}
          style={styles.sectionTitleEnter}>
          <Text
            style={
              isParent ? styles.sectionTitle : styles.cardDetailsSectionTitle
            }>
            {isParent ? Strings.contactDetails : Strings.cardDetailsTitle}
          </Text>
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
            {shownDetails.map((item, index) => {
              const iconColor = DETAIL_ICON_COLOR[item.key] || Colors.iconSky;

              return (
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
                      color={iconColor}
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
              );
            })}
            </LinearGradient>
          </View>
        </AnimatedCard>
        </>
        ) : null}



        {isParent ? (

          <ProfileActionCard
            icon="information-circle-outline"
            iconColor={ACTION_ICON_COLOR.moreInfo}
            title={Strings.moreInfo}
            onPress={openMoreInfo}
            animationIndex={4}
            entering={getHomeScreenEnter(4)}
          />

        ) : canDownloadIdCard ? (
          <ProfileActionCard
            icon="download-outline"
            iconColor={ACTION_ICON_COLOR.idCard}
            title={Strings.downloadIdCard}
            onPress={handleDownloadIdCard}
            loading={downloadingCard}
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

      </ScrollEnterScrollView>



      {isParent && moreInfoVisible ? (
        <ParentMoreInfoModal
          visible
          person={isParent ? parentPerson : profilePerson}
          replayToken={modalReplay}
          onClose={closeMoreInfo}
        />
      ) : null}

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
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>{Strings.logout}</Text>
            <Text style={styles.confirmMessage}>Are you sure you want to logout?</Text>
            <View style={styles.confirmActions}>
              <Pressable
                style={styles.confirmNo}
                disabled={loggingOut}
                onPress={() => setLogoutConfirmVisible(false)}>
                <Text style={styles.confirmNoText}>No</Text>
              </Pressable>
              <Pressable
                style={styles.confirmYes}
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

    </SafeAreaView>
  );
};

export default withScreenEnter(MyProfile, 'myProfile');



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
    color: Colors.grayText,
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

});

