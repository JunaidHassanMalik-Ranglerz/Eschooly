import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, {Path} from 'react-native-svg';
import {CARD_GRADIENTS} from '../../Constants/CardTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {EnterView} from '../../Component/AnimatedCard';
import {ROLES, useRole} from '../../context/RoleContext';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {GRADIENT_END, GRADIENT_START} from '../../Component/Profile/ProfileTheme';
import {
  getRoleCardEntering,
  getRoleFooterEntering,
  getRoleHeaderEntering,
} from '../../utils/cardAnimation';

const ROLE_ICON_COLOR = Colors.iconSky;

const ROLE_OPTIONS = [
  {
    id: ROLES.PARENT,
    title: Strings.parentRole,
    description: Strings.parentRoleDesc,
    ionIcon: 'people',
  },
  {
    id: ROLES.STUDENT,
    title: Strings.studentRole,
    description: Strings.studentRoleDesc,
    ionIcon: 'school',
  },
];

const ROLE_CARD_GRADIENT = CARD_GRADIENTS.royal;

const RoleWaves = () => (
  <View style={styles.waveWrap} pointerEvents="none">
    <Svg width="100%" height="100%" viewBox="0 0 390 320" preserveAspectRatio="none">
      <Path
        fill="rgba(255,255,255,0.08)"
        d="M0,128 C48,86 92,64 138,102 C184,140 228,78 286,48 C332,26 364,58 390,86 L390,320 L0,320 Z"
      />
      <Path
        fill="rgba(255,255,255,0.14)"
        d="M0,158 C56,118 102,108 148,142 C198,178 242,108 298,82 C340,64 368,92 390,118 L390,320 L0,320 Z"
      />
      <Path
        fill="rgba(255,255,255,0.22)"
        d="M0,198 C58,162 108,178 162,196 C218,216 262,150 318,138 C354,130 376,152 390,168 L390,320 L0,320 Z"
      />
    </Svg>
  </View>
);

const RoleCard = ({item, index, onPress}) => (
  <EnterView
    motion={getRoleCardEntering(index)}
    enterKey={`role-card-${index}`}
    style={styles.cardOuter}>
    <TouchableOpacity
      style={styles.cardPress}
      activeOpacity={0.88}
      delayPressIn={0}
      onPress={onPress}>
        <LinearGradient
          colors={ROLE_CARD_GRADIENT}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={[styles.card, CARD_SHADOW]}>
          <View style={styles.iconWrap}>
            <Icon
              name={item.ionIcon}
              size={wp(9.5)}
              color={ROLE_ICON_COLOR}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>

          <View style={styles.arrowBtn}>
            <Icon
              name="arrow-forward"
              size={wp(5)}
              color={ROLE_ICON_COLOR}
            />
          </View>
        </LinearGradient>
    </TouchableOpacity>
  </EnterView>
);

const Role = () => {
  const navigation = useNavigation();
  const {setRole} = useRole();

  const handleRolePress = option => {
    setRole(option.id);
    navigation.replace('AuthNavigation');
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[Colors.splashStart, Colors.primaryLight, Colors.splashEnd]}
        locations={[0, 0.42, 1]}
        start={{x: 0.1, y: 0}}
        end={{x: 0.9, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <RoleWaves />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar
          animated
          translucent={false}
          backgroundColor={Colors.splashStart}
          barStyle="light-content"
        />

        <EnterView
          motion={getRoleHeaderEntering()}
          enterKey="role-header"
          style={styles.header}>
          <Text style={styles.brand}>{Strings.eschool}</Text>
          <Text style={styles.welcome}>{Strings.welcome}</Text>
          <Text style={styles.heading}>{Strings.selectRole}</Text>
          <Text style={styles.subtitle}>{Strings.roleSubtitle}</Text>
        </EnterView>

        <View style={styles.cardsCenter}>
          {ROLE_OPTIONS.map((role, index) => (
            <RoleCard
              key={role.id}
              index={index}
              item={role}
              onPress={() => handleRolePress(role)}
            />
          ))}
        </View>

        <EnterView
          motion={getRoleFooterEntering()}
          enterKey="role-footer"
          style={styles.footerWrap}>
          <View style={styles.footer}>
            <Icon
              name="shield-checkmark-outline"
              size={wp(4)}
              color={Colors.whiteMuted75}
            />
            <Text style={styles.footerText}>{Strings.dataSafe}</Text>
          </View>
        </EnterView>
      </SafeAreaView>
    </View>
  );
};

export default withScreenEnter(Role, 'role');

const CARD_SHADOW = Platform.select({
  ios: {
    shadowColor: '#051A33',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.24,
    shadowRadius: 16,
  },
  android: {
    elevation: 10,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.splashStart,
  },
  safe: {
    flex: 1,
  },
  waveWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: hp(38),
    opacity: 0.95,
  },
  header: {
    paddingHorizontal: wp(6),
    paddingTop: hp(1.2),
    paddingBottom: hp(0.2),
  },
  brand: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.sm,
    letterSpacing: 1.2,
    marginBottom: hp(1.8),
  },
  welcome: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    letterSpacing: 0.8,
    marginBottom: hp(0.6),
  },
  heading: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.lg,
    lineHeight: Fontsize.xl,
    marginBottom: hp(1),
    flexShrink: 1,
  },
  subtitle: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
    lineHeight: Fontsize.m,
  },
  cardsCenter: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    gap: hp(2.8),
  },
  cardOuter: {
    borderRadius: wp(5.5),
    overflow: 'hidden',
  },
  cardPress: {
    borderRadius: wp(5.5),
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5.5),
    paddingVertical: hp(3.8),
    paddingHorizontal: wp(5.5),
    minHeight: hp(14.5),
    borderWidth: 1,
    borderColor: 'rgba(101, 196, 255, 0.35)',
    overflow: 'hidden',
  },
  iconWrap: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    backgroundColor: Colors.whiteOverlay18,
  },
  cardContent: {
    flex: 1,
    marginRight: wp(2),
  },
  cardTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.ml,
    marginBottom: hp(0.5),
  },
  cardDesc: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs3,
    lineHeight: Fontsize.sm,
  },
  arrowBtn: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: 'rgba(56, 189, 248, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrap: {
    paddingBottom: hp(2.5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(6),
  },
  footerText: {
    flexShrink: 1,
    color: Colors.whiteMuted75,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    textAlign: 'center',
  },
});

