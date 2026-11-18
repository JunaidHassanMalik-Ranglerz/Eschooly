import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollEnterScrollView from '../../Component/ScrollEnterScrollView';
import {EnterView} from '../../Component/AnimatedCard';
import FeatureArtImage from '../../Component/Glass/FeatureArtImage';
import AuthBrandHeader, {
  AUTH_CARD_TUCK,
} from '../../Component/Auth/AuthBrandHeader';
import AuthIceCard from '../../Component/Auth/AuthIceCard';
import AuthSecureFooter from '../../Component/Auth/AuthSecureFooter';
import {EducationIcons} from '../../Assets/EducationIcons';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {spacing} from '../../Constants/Theme';
import {wp, hp} from '../../Constants/Responsive';
import {ROLES, useRole} from '../../context/RoleContext';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {
  getRoleCardEntering,
  getRoleFooterEntering,
  getRoleHeaderEntering,
} from '../../utils/cardAnimation';

const ROLE_OPTIONS = [
  {
    id: ROLES.PARENT,
    title: Strings.parentRole,
    description: Strings.parentRoleDesc,
    art: EducationIcons.linkedChildren,
  },
  {
    id: ROLES.STUDENT,
    title: Strings.studentRole,
    description: Strings.studentRoleDesc,
    art: EducationIcons.welcomeGraduationBooks,
  },
];

const RoleCard = ({item, index, onPress}) => (
  <EnterView
    motion={getRoleCardEntering(index)}
    enterKey={`role-card-${index}`}
    style={styles.cardEnter}>
    <TouchableOpacity
      activeOpacity={0.88}
      delayPressIn={0}
      onPress={onPress}
      style={styles.cardPress}>
      <AuthIceCard contentStyle={styles.cardFill}>
        <View style={styles.cardRow}>
          <View style={styles.iconWrap} pointerEvents="none">
            <FeatureArtImage source={item.art} width={wp(16)} height={wp(16)} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardDesc} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
          <View style={styles.arrowBtn}>
            <Icon
              name="arrow-forward"
              size={wp(4.6)}
              color={Colors.brandRoyal}
            />
          </View>
        </View>
      </AuthIceCard>
    </TouchableOpacity>
  </EnterView>
);

const Role = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {setRole} = useRole();

  const handleRolePress = option => {
    setRole(option.id);
    navigation.replace('AuthNavigation');
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        animated={false}
        translucent
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <ScrollEnterScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}>
        <AuthBrandHeader insets={insets} showTagline={false}>
          <EnterView
            motion={getRoleHeaderEntering()}
            enterKey="role-header"
            style={styles.headerCopy}>
            <Text style={styles.welcome}>{Strings.welcome}</Text>
            <Text style={styles.heading}>{Strings.selectRole}</Text>
            <Text style={styles.subtitle}>{Strings.roleSubtitle}</Text>
          </EnterView>
        </AuthBrandHeader>

        <View
          style={[
            styles.body,
            {paddingBottom: hp(2.4) + (insets.bottom || 0)},
          ]}>
          {ROLE_OPTIONS.map((role, index) => (
            <RoleCard
              key={role.id}
              index={index}
              item={role}
              onPress={() => handleRolePress(role)}
            />
          ))}
          <EnterView
            motion={getRoleFooterEntering()}
            enterKey="role-footer">
            <AuthSecureFooter showWebsite={false} style={styles.footer} />
          </EnterView>
        </View>
      </ScrollEnterScrollView>
    </View>
  );
};

export default withScreenEnter(Role, 'role');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    overflow: 'visible',
  },
  headerCopy: {
    alignItems: 'center',
    marginTop: hp(1.6),
    paddingHorizontal: wp(6),
  },
  welcome: {
    color: Colors.textOnNavyMuted,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.xs1,
    letterSpacing: 1.8,
    marginBottom: hp(0.55),
  },
  heading: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.lg,
    lineHeight: Fontsize.lg * 1.18,
    textAlign: 'center',
    marginBottom: hp(0.8),
  },
  subtitle: {
    color: Colors.textOnNavyMuted,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.45,
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: spacing.md,
    marginTop: -AUTH_CARD_TUCK,
    zIndex: 2,
    gap: hp(1.6),
  },
  cardEnter: {
    overflow: 'visible',
  },
  cardPress: {
    overflow: 'visible',
  },
  cardFill: {
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3.4),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: hp(11.2),
    zIndex: 1,
  },
  iconWrap: {
    width: wp(16),
    height: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    marginRight: wp(2),
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.sm,
    marginBottom: hp(0.35),
  },
  cardDesc: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.xs1 * 1.4,
  },
  arrowBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.hubCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: hp(1.2),
  },
});
