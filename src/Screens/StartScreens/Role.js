import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../Assets';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {wp, hp} from '../../Constants/Responsive';
import {ROLES, useRole} from '../../context/RoleContext';

const ROLE_OPTIONS = [
  {
    id: ROLES.PARENT,
    title: Strings.parentRole,
    description: Strings.parentRoleDesc,
    ionIcon: 'people',
    iconColor: Colors.primary,
    iconBg: '#E8F0FF',
  },
  {
    id: ROLES.STUDENT,
    title: Strings.studentRole,
    description: Strings.studentRoleDesc,
    icon: Images.cap,
    iconBg: '#E8F8F5',
  },
];

const RoleCard = ({item, onPress}) => (
  <Pressable
    style={({pressed}) => [styles.card, pressed && styles.cardPressed]}
    onPress={onPress}>
    <View style={[styles.iconWrap, {backgroundColor: item.iconBg}]}>
      {item.ionIcon ? (
        <Icon name={item.ionIcon} size={wp(7.5)} color={item.iconColor} />
      ) : (
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      )}
    </View>

    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
    </View>

    <View style={styles.arrowBtn}>
      <Icon name="arrow-forward" size={wp(4.2)} color={Colors.white} />
    </View>
  </Pressable>
);

const Role = () => {
  const navigation = useNavigation();
  const {setRole} = useRole();

  const handleRolePress = option => {
    setRole(option.id);
    navigation.replace('AuthNavigation');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar
        backgroundColor={Colors.BlueBackground}
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.brand}>{Strings.eschool}</Text>
        <Text style={styles.welcome}>{Strings.welcome}</Text>
        <Text style={styles.heading}>{Strings.selectRole}</Text>
        <Text style={styles.subtitle}>{Strings.roleSubtitle}</Text>
      </View>

      <View style={styles.cards}>
        {ROLE_OPTIONS.map(role => (
          <RoleCard
            key={role.id}
            item={role}
            onPress={() => handleRolePress(role)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Icon
          name="shield-checkmark-outline"
          size={wp(4)}
          color={Colors.whiteMuted75}
        />
        <Text style={styles.footerText}>{Strings.dataSafe}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BlueBackground,
  },
  header: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(1),
  },
  brand: {
    color: Colors.whiteMuted75,
    fontFamily: Fonts.medium,
    fontSize: Fontsize.sm,
    letterSpacing: 1.2,
    marginBottom: hp(2.5),
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
  cards: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: wp(5),
    paddingTop: hp(4.5),
    gap: hp(2),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(4.5),
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: hp(0.5)},
    shadowOpacity: 0.12,
    shadowRadius: wp(2),
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{scale: 0.98}],
  },
  iconWrap: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  icon: {
    width: wp(7.5),
    height: wp(7.5),
  },
  cardContent: {
    flex: 1,
    marginRight: wp(2),
  },
  cardTitle: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: Fontsize.m,
    marginBottom: hp(0.5),
  },
  cardDesc: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
    lineHeight: Fontsize.sm,
  },
  arrowBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    paddingBottom: hp(2.5),
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
