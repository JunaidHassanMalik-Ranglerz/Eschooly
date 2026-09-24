import React, {useCallback, useState} from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';

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

import {getIdCardData} from '../../Constants/StudentIdCardData';

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

  const {profilePerson, profileDetails, isParent} = useProfileStudent();
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const [modalReplay, setModalReplay] = useState(0);

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



  const openUpdatePassword = () => {

    const parentNav = navigation.getParent();

    if (parentNav) {

      parentNav.navigate('UpdatePassword');

      return;

    }

    navigation.navigate('UpdatePassword');

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
            person={profilePerson}
            animationIndex={1}
            entering={getHomeScreenEnter(1)}
          />
        ) : (
          <AnimatedCard
            index={1}
            entering={getHomeScreenEnter(1)}
            style={styles.idPreviewWrap}>
            <IdCardPreview data={getIdCardData(profilePerson)} navy />
          </AnimatedCard>
        )}

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
            {profileDetails.map((item, index) => {
              const iconColor = DETAIL_ICON_COLOR[item.key] || Colors.iconSky;

              return (
                <View
                  key={item.key}
                  style={[
                    styles.detailRow,
                    index === profileDetails.length - 1 && styles.detailRowLast,
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



        {isParent ? (

          <ProfileActionCard
            icon="information-circle-outline"
            iconColor={ACTION_ICON_COLOR.moreInfo}
            title={Strings.moreInfo}
            onPress={openMoreInfo}
            animationIndex={4}
            entering={getHomeScreenEnter(4)}
          />

        ) : null}

        <ProfileActionCard
          icon="lock-closed-outline"
          iconColor={ACTION_ICON_COLOR.updatePassword}
          title={Strings.updatePassword}
          onPress={openUpdatePassword}
          animationIndex={isParent ? 5 : 4}
          entering={getHomeScreenEnter(isParent ? 5 : 4)}
        />

        <ProfileActionCard
          icon="log-out-outline"
          iconColor={ACTION_ICON_COLOR.logout}
          title={Strings.logout}
          onPress={handleLogout}
          animationIndex={isParent ? 6 : 5}
          entering={getHomeScreenEnter(isParent ? 6 : 5)}
        />

      </ScrollEnterScrollView>



      {isParent && moreInfoVisible ? (
        <ParentMoreInfoModal
          visible
          person={profilePerson}
          replayToken={modalReplay}
          onClose={closeMoreInfo}
        />
      ) : null}

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

});

